"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Main interface for the app
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var Requirements_1 = require("./Requirements");
var app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
var PORT = process.env.PORT || 4001;
app.post('/simpleCal', function (req, res) {
    var requirements = new Requirements_1.Requirements();
    var result = requirements.runCal(req.body.vmQty, req.body.hostQty);
    if (result.totalCap > 0) {
        res.status(200).send(result);
    }
});
app.post('/advancedCal', function (req, res) {
    var requirements = new Requirements_1.Requirements();
    requirements.settings.updateSettings = req.body.settings;
    requirements.veeamSettings.updateSettings(req.body.settings.historicPerfData, req.body.settings.eventsHistory);
    var result = requirements.runCal(req.body.vmQty, req.body.hostQty);
    if (result.totalCap > 0) {
        res.status(200).send(result);
    }
});
app.listen(PORT, function () {
    console.log("listening on " + PORT + " :)");
});
// document.getElementById('simpleNextBtn')?.addEventListener('click', ()=> {
//   const vmQty = (document.getElementById('vmQty') as HTMLInputElement).value;
//   const hostQty = (document.getElementById('hostQty') as HTMLInputElement).value;
//   // create new instance of the requirements class below
//   const requirements = new Requirements();
//   // Check if the advanced is checked
//   if((document.getElementById('advancedMode') as HTMLInputElement).checked) {
//     // Updates the settings for the hypervisor which calculates the requirements based on ratios
//     // see the Settings.TS file
//     requirements.settings.updateQty(parseInt(vmQty), parseInt(hostQty));
//     // Get the updated settings and output the results into the second form group
//     const settings = requirements.settings.getSettings();
//     (document.getElementById('advScaleThresh') as HTMLInputElement).value = settings.vmThreashold.toString();
//     (document.getElementById('avNumVDisksVm') as HTMLInputElement).value = settings.avNumVDisksVm.toString();
//     (document.getElementById('clusterQty') as HTMLInputElement).value = settings.clusterQty.toString();
//     (document.getElementById('avNumGDiskVm') as HTMLInputElement).value = settings.avNumGDiskVm.toString();
//     (document.getElementById('avNicsHost') as HTMLInputElement).value = settings.avNicsHost.toString();
//     (document.getElementById('historicPerfData') as HTMLInputElement).value = settings.historicPerfData.toString();
//     (document.getElementById('avSdPerHost') as HTMLInputElement).value = settings.avSdPerHost.toString();
//     (document.getElementById('eventsHistory') as HTMLInputElement).value = settings.eventsHistory.toString();
//     (document.getElementById('vappQty') as HTMLInputElement).value = settings.vappQty.toString(); 
//     (document.getElementById('datastoreQty') as HTMLInputElement).value = settings.datastoreQty.toString();
//     (document.getElementById('avNicsVM') as HTMLInputElement).value = settings.avNicsVM.toString();
//     document.getElementById('advancedForm')?.classList.toggle('d-none');
//   } else {
//     // If advanced isn't selected the run the calculation using the ratios only
//     requirements.runCal(parseInt(vmQty), parseInt(hostQty));
//     // Output results to the DOM
//     setOutput(requirements);
//   }
// })
// // 
// document.getElementById('advancedNextBtn')?.addEventListener('click', ()=> {
//   // Create a new instances of the Requirements class
//   const requirements = new Requirements();
//   // Grab the updated elements from the form
//   const vmQty = parseInt((document.getElementById('vmQty') as HTMLInputElement).value);
//   const hostQty = parseInt((document.getElementById('hostQty') as HTMLInputElement).value);
//   const clusterQty = parseInt((document.getElementById('clusterQty') as HTMLInputElement).value);
//   const avNumVDisksVm = parseInt((document.getElementById('avNumVDisksVm') as HTMLInputElement).value);
//   const avNumGDiskVm = parseInt((document.getElementById('avNumGDiskVm') as HTMLInputElement).value);
//   const avNicsHost = parseInt((document.getElementById('avNicsHost') as HTMLInputElement).value);
//   const historicPerfData = parseInt((document.getElementById('historicPerfData') as HTMLInputElement).value);
//   const avSdPerHost = parseInt((document.getElementById('avSdPerHost') as HTMLInputElement).value);
//   const eventsHistory = parseInt((document.getElementById('eventsHistory') as HTMLInputElement).value);
//   const vappQty = parseInt((document.getElementById('vappQty') as HTMLInputElement).value);
//   const datastoreQty = parseInt((document.getElementById('datastoreQty') as HTMLInputElement).value);
//   const avNicsVM = parseInt((document.getElementById('avNicsVM') as HTMLInputElement).value);
//   // Create a new single object with the form data
//   const data = {
//     vmQty,
//     hostQty,
//     clusterQty,
//     avNumVDisksVm,
//     avNumGDiskVm,
//     avNicsHost,
//     historicPerfData,
//     avSdPerHost,
//     eventsHistory,
//     vappQty,
//     datastoreQty,
//     avNicsVM
//   }
//   // update the settings which uses a "set"
//   requirements.settings.updateSettings = data;
//   // Update the veeam settings with the timescales which are the only variable
//   // All other settings are calculated from the VM Quantity
//   requirements.veeamSettings.updateSettings(historicPerfData, eventsHistory);
//   // Now run the calculation based on the new settings
//   requirements.runCal(vmQty, hostQty);
//   // Output the final results to the DOM
//   setOutput(requirements);
// });
// function setOutput(r: Requirements): void {
//   const totalCap = (r.vmCap + r.hostCap + r.dataStoreCap + r.otherData + r.eventsData + r.vbrPerfData + r.vbrEventsData + r.vbrDbTimeData) * 1.2;
//   (document.getElementById('vmDataGB') as HTMLInputElement).innerHTML = r.vmCap.toFixed(2);
//   (document.getElementById('hostDataGB') as HTMLInputElement).innerHTML = r.hostCap.toFixed(2);
//   (document.getElementById('dataStoreGB') as HTMLInputElement).innerHTML = r.dataStoreCap.toFixed(2);
//   (document.getElementById('otherStoreGB') as HTMLInputElement).innerHTML = r.otherData.toFixed(2);
//   (document.getElementById('eventGB') as HTMLInputElement).innerHTML = r.eventsData.toFixed(2);
//   (document.getElementById('vbrperfGB') as HTMLInputElement).innerHTML = r.vbrPerfData.toFixed(2);
//   (document.getElementById('vbrEventGB') as HTMLInputElement).innerHTML = r.vbrEventsData.toFixed(2);
//   (document.getElementById('vbrJobGB') as HTMLInputElement).innerHTML = r.vbrDbTimeData.toFixed(2);
//   (document.getElementById('totalCap') as HTMLInputElement).innerHTML = totalCap.toFixed(2);
// }
//# sourceMappingURL=index.js.map