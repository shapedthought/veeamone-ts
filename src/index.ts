// Main interface for the app
import express, {Request, Response} from 'express';
import cors from 'cors';
import { Requirements } from './Requirements'
import { settingsUpdateInter,  returnSettings} from './Settings';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4001;

interface SimpleCalVariables extends Request {
  body: {vmQty: number, hostQty: number }
}

interface AdvancedCalVariables extends Request {
  body: {vmQty: number, hostQty: number, settings: settingsUpdateInter}
}

app.post('/simpleCal', (req: SimpleCalVariables, res: Response) => {
  const requirements = new Requirements();
  const result = requirements.runCal(req.body.vmQty, req.body.hostQty, false);
  if(result.totalCap > 0) {
    res.status(200).send(result)
  } else {
    res.status(400).send({ status: 'Calculation Error' })
  }
})


app.post('/advancedCal', (req: AdvancedCalVariables, res: Response) => {
  const requirements = new Requirements();
  requirements.settings.updateSettings = req.body.settings;
  requirements.veeamSettings.updateSettings(req.body.settings.historicPerfData, req.body.settings.eventsHistory);
  const result = requirements.runCal(req.body.vmQty, req.body.hostQty, true);
  if(result.totalCap > 0) {
    res.status(200).send(result)
  } else {
    res.status(400).send({ status: 'Calculation Error' })
  }
})

app.listen(PORT, () => {
  console.log(`listening on ${PORT} :)`);
});





