// Main interface for the app

import {
  General,
  HostSizeInter,
  HvHostSizeInter,
  DatastoreSizeInter,
  OtherDataInter,
  EventsDataInter,
  HvEventsDataInter,
} from './Interfaces';

import { InfraSettings, VeeamSettings } from './Settings'

import {VmSizeInter, HvVmSizeInter, VmSizeCal} from './VmSize';
import { DataStoreSizeCal } from './DatastoreSize';
import { HostSizeCal } from './HostSize';
import { OtherDataSizeCal} from './OtherDataSize';
import { EventsDataCal } from './EventsData';
import { PerformanceSize } from './PerformanceSize';
import { VbrEventsCal } from './VbrEvents';
import { VbrDbTime } from './VbrDbTime';

interface formData {

}


document.getElementById('simpleNextBtn')?.addEventListener('click', ()=> {
  const vmQty = (document.getElementById('vmQty') as HTMLInputElement).value;
  const hostQty = (document.getElementById('hostQty') as HTMLInputElement).value;
  const requirements = new runCalculation();
  if((document.getElementById('advancedCheck') as HTMLInputElement).checked) {
    requirements.settings.updateQty(parseInt(vmQty), parseInt(hostQty));
    const settings = requirements.settings.getSettings();
    (document.getElementById('avNumVDisksVm') as HTMLInputElement).value = settings.avNumVDisksVm.toString();
    (document.getElementById('clusterQty') as HTMLInputElement).value = settings.clusterQty.toString();
    (document.getElementById('avNumGDiskVm') as HTMLInputElement).value = settings.avNumGDiskVm.toString();
    (document.getElementById('avNicsHost') as HTMLInputElement).value = settings.avNicsHost.toString();
    (document.getElementById('historicPerfData') as HTMLInputElement).value = settings.historicPerfData.toString();
    (document.getElementById('avSdPerHost') as HTMLInputElement).value = settings.avSdPerHost.toString();
    (document.getElementById('eventsHistory') as HTMLInputElement).value = settings.eventsHistory.toString();
    (document.getElementById('vappQty') as HTMLInputElement).value = settings.vappQty.toString(); 
    (document.getElementById('datastoreQty') as HTMLInputElement).value = settings.datastoreQty.toString(); 
  } else {
    requirements.runCal(parseInt(vmQty), parseInt(hostQty));
    (document.getElementById('vmDataGB') as HTMLInputElement).value = requirements.vmCap.toString();
    (document.getElementById('hostDataGB') as HTMLInputElement).value = requirements.hostCap.toString();
    (document.getElementById('dataStoreGB') as HTMLInputElement).value = requirements.dataStoreCap.toString();
    (document.getElementById('eventGB') as HTMLInputElement).value = requirements.eventsData.toString();
    (document.getElementById('vbrperfGB') as HTMLInputElement).value = requirements.vbrPerfData.toString();
    (document.getElementById('vbrEventGB') as HTMLInputElement).value = requirements.vbrEventsData.toString();
    (document.getElementById('vbrJobGB') as HTMLInputElement).value = requirements.vbrDbTimeData.toString();
  }
})

document.getElementById('advancedNextBtn')?.addEventListener('click', ()=> {
  const requiremets = new runCalculation();
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
    datastoreQty
  }
  requiremets.settings.updateSettings = data;
  requiremets.runCal(vmQty, hostQty);
  (document.getElementById('vmDataGB') as HTMLInputElement).value = requiremets.vmCap.toString();
  (document.getElementById('hostDataGB') as HTMLInputElement).value = requiremets.hostCap.toString();
  (document.getElementById('dataStoreGB') as HTMLInputElement).value = requiremets.dataStoreCap.toString();
  (document.getElementById('eventGB') as HTMLInputElement).value = requiremets.eventsData.toString();
  (document.getElementById('vbrperfGB') as HTMLInputElement).value = requiremets.vbrPerfData.toString();
  (document.getElementById('vbrEventGB') as HTMLInputElement).value = requiremets.vbrEventsData.toString();
  (document.getElementById('vbrJobGB') as HTMLInputElement).value = requiremets.vbrDbTimeData.toString();
})

class runCalculation {
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

  runCal(vmCount: number, hosts: number){
    this.settings.updateQty(vmCount, hosts);
    this.veeamSettings.updateQty(vmCount);

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




