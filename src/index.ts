// Main interface for the app

import { InfraSettings, VeeamSettings } from './Settings'

import { VmSizeCal} from './VmSize';
import { DataStoreSizeCal } from './DatastoreSize';
import { HostSizeCal } from './HostSize';
import { OtherDataSizeCal} from './OtherDataSize';
import { EventsDataCal } from './EventsData';
import { PerformanceSize } from './PerformanceSize';
import { VbrEventsCal } from './VbrEvents';
import { VbrDbTime } from './VbrDbTime';


document.getElementById('simpleNextBtn')?.addEventListener('click', ()=> {
  const vmQty = (document.getElementById('vmQty') as HTMLInputElement).value;
  const hostQty = (document.getElementById('hostQty') as HTMLInputElement).value;

  // create new instance of the requirements class below
  const requirements = new Requirements();

  // Check if the advanced is checked
  if((document.getElementById('advancedMode') as HTMLInputElement).checked) {
    // Updates the settings for the hypervisor which calculates the requirements based on ratios
    // see the Settings.TS file
    requirements.settings.updateQty(parseInt(vmQty), parseInt(hostQty));

    // Get the updated settings and output the results into the second form group
    const settings = requirements.settings.getSettings();
    (document.getElementById('advScaleThresh') as HTMLInputElement).value = settings.vmThreashold.toString();
    (document.getElementById('avNumVDisksVm') as HTMLInputElement).value = settings.avNumVDisksVm.toString();
    (document.getElementById('clusterQty') as HTMLInputElement).value = settings.clusterQty.toString();
    (document.getElementById('avNumGDiskVm') as HTMLInputElement).value = settings.avNumGDiskVm.toString();
    (document.getElementById('avNicsHost') as HTMLInputElement).value = settings.avNicsHost.toString();
    (document.getElementById('historicPerfData') as HTMLInputElement).value = settings.historicPerfData.toString();
    (document.getElementById('avSdPerHost') as HTMLInputElement).value = settings.avSdPerHost.toString();
    (document.getElementById('eventsHistory') as HTMLInputElement).value = settings.eventsHistory.toString();
    (document.getElementById('vappQty') as HTMLInputElement).value = settings.vappQty.toString(); 
    (document.getElementById('datastoreQty') as HTMLInputElement).value = settings.datastoreQty.toString();
    (document.getElementById('avNicsVM') as HTMLInputElement).value = settings.avNicsVM.toString();

    document.getElementById('advancedForm')?.classList.toggle('d-none');
  } else {

    // If advanced isn't selected the run the calculation using the ratios only
    requirements.runCal(parseInt(vmQty), parseInt(hostQty));

    // Output results to the DOM
    setOutput(requirements);
  }
})

// 
document.getElementById('advancedNextBtn')?.addEventListener('click', ()=> {
  // Create a new instances of the Requirements class
  const requirements = new Requirements();

  // Grab the updated elements from the form
  const vmQty = parseInt((document.getElementById('vmQty') as HTMLInputElement).value);
  const hostQty = parseInt((document.getElementById('hostQty') as HTMLInputElement).value);
  const clusterQty = parseInt((document.getElementById('clusterQty') as HTMLInputElement).value);
  const avNumVDisksVm = parseInt((document.getElementById('avNumVDisksVm') as HTMLInputElement).value);
  const avNumGDiskVm = parseInt((document.getElementById('avNumGDiskVm') as HTMLInputElement).value);
  const avNicsHost = parseInt((document.getElementById('avNicsHost') as HTMLInputElement).value);
  const historicPerfData = parseInt((document.getElementById('historicPerfData') as HTMLInputElement).value);
  const avSdPerHost = parseInt((document.getElementById('avSdPerHost') as HTMLInputElement).value);
  const eventsHistory = parseInt((document.getElementById('eventsHistory') as HTMLInputElement).value);
  const vappQty = parseInt((document.getElementById('vappQty') as HTMLInputElement).value);
  const datastoreQty = parseInt((document.getElementById('datastoreQty') as HTMLInputElement).value);
  const avNicsVM = parseInt((document.getElementById('avNicsVM') as HTMLInputElement).value);

  // Create a new single object with the form data
  const data = {
    vmQty,
    hostQty,
    clusterQty,
    avNumVDisksVm,
    avNumGDiskVm,
    avNicsHost,
    historicPerfData,
    avSdPerHost,
    eventsHistory,
    vappQty,
    datastoreQty,
    avNicsVM
  }
  // update the settings which uses a "set"
  requirements.settings.updateSettings = data;

  // Update the veeam settings with the timescales which are the only variable
  // All other settings are calculated from the VM Quantity
  requirements.veeamSettings.updateSettings(historicPerfData, eventsHistory);

  // Now run the calculation based on the new settings
  requirements.runCal(vmQty, hostQty);

  // Output the final results to the DOM
  setOutput(requirements);
});

function setOutput(r: Requirements): void {
  const totalCap = (r.vmCap + r.hostCap + r.dataStoreCap + r.otherData + r.eventsData + r.vbrPerfData + r.vbrEventsData + r.vbrDbTimeData) * 1.2;
  (document.getElementById('vmDataGB') as HTMLInputElement).innerHTML = r.vmCap.toFixed(2);
  (document.getElementById('hostDataGB') as HTMLInputElement).innerHTML = r.hostCap.toFixed(2);
  (document.getElementById('dataStoreGB') as HTMLInputElement).innerHTML = r.dataStoreCap.toFixed(2);
  (document.getElementById('otherStoreGB') as HTMLInputElement).innerHTML = r.otherData.toFixed(2);
  (document.getElementById('eventGB') as HTMLInputElement).innerHTML = r.eventsData.toFixed(2);
  (document.getElementById('vbrperfGB') as HTMLInputElement).innerHTML = r.vbrPerfData.toFixed(2);
  (document.getElementById('vbrEventGB') as HTMLInputElement).innerHTML = r.vbrEventsData.toFixed(2);
  (document.getElementById('vbrJobGB') as HTMLInputElement).innerHTML = r.vbrDbTimeData.toFixed(2);
  (document.getElementById('totalCap') as HTMLInputElement).innerHTML = totalCap.toFixed(2);
}

class Requirements {
  vmCap = 0;
  hostCap = 0;
  dataStoreCap = 0;
  otherData = 0;
  eventsData = 0;
  vbrPerfData = 0;
  vbrEventsData = 0;
  vbrDbTimeData = 0;

  settings = new InfraSettings()
  veeamSettings = new VeeamSettings()

  // update the Infra settings- used with advanced only
  updateInfraSettings(settings: InfraSettings){
    settings.updateSettings = settings;
  }

  // update the Veeam settings - used with advanced only
  updateVeeamSettings(historicPerfData: number, eventsHistory: number){
    this.veeamSettings.updateSettings(historicPerfData, eventsHistory)
  }

  runCal(vmCount: number, hosts: number): void{
    this.settings.updateQty(vmCount, hosts);
    this.veeamSettings.updateQty(vmCount);

    console.log(
      `
      vbr servers: ${this.veeamSettings.vbrServers}
      Proxies: ${this.veeamSettings.vbrAvNumProxy}
      Repos: ${this.veeamSettings.vbrAvNumRepo},
      Jobs: ${this.veeamSettings.vbrAvJobsServer},
      vms per-job: ${this.veeamSettings.vmsPerJobRatio},
      Restore: ${this.veeamSettings.vbrRestore},
      `
    )

    const vmSizeCapCal = new VmSizeCal(this.settings);
    const hostSizeCal = new HostSizeCal(this.settings);
    const datastoreSizeCal = new DataStoreSizeCal(this.settings);
    const otherDataSizeCal = new OtherDataSizeCal(this.settings);
    const eventsDataSizeCal = new EventsDataCal(this.settings);
    const vbrPerfDataSizeCal = new PerformanceSize(this.veeamSettings);
    const vbrEventsDataSizeCal = new VbrEventsCal(this.veeamSettings);
    const vbrDbTimeSizeCal = new VbrDbTime(this.veeamSettings);

    // check the threashold then run typical or advanced
    if(vmCount < this.settings.vmThreashold){
      // Advanced
      this.vmCap = vmSizeCapCal.vmSizet();
      this.hostCap = hostSizeCal.hostSizet();
      this.dataStoreCap = datastoreSizeCal.datastoreSizet();
      this.otherData = otherDataSizeCal.otherDatat();
      this.eventsData = eventsDataSizeCal.eventsData(); // same for both
      this.vbrPerfData = vbrPerfDataSizeCal.vbrPerft();
      this.vbrEventsData = vbrEventsDataSizeCal.vbrEvents();
      this.vbrDbTimeData = vbrDbTimeSizeCal.vbrDb();
    } else {
      // Typical
      this.vmCap = vmSizeCapCal.vmSize();
      this.hostCap = hostSizeCal.hostSize();
      this.dataStoreCap = datastoreSizeCal.datastoreSize();
      this.otherData = otherDataSizeCal.otherData();
      this.eventsData = eventsDataSizeCal.eventsData();
      this.vbrPerfData = vbrPerfDataSizeCal.vbrPerf();
      this.vbrEventsData = vbrEventsDataSizeCal.vbrEvents();
      this.vbrDbTimeData = vbrDbTimeSizeCal.vbrDb();
    }

  }

}




