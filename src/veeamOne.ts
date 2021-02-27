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


class runCalculation {
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

  infraRequirements(vmCount: number, hosts: number){
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
    let vmCap = 0;
    let hostCap = 0;
    let dataStoreCap = 0;
    let otherData = 0;
    let eventsData = 0;
    let vbrPerfData = 0;
    let vbrEventsData = 0;
    let vbrDbTimeData = 0;
    // check the threashold then run typical or advanced
    if(vmCount < this.settings.vmThreashold){
      // Advanced
      vmCap = vmSizeCapCal.vmSizet();
      hostCap = hostSizeCal.hostSizet();
      dataStoreCap = datastoreSizeCal.datastoreSizet();
      otherData = otherDataSizeCal.otherDatat();
      eventsData = eventsDataSizeCal.eventsData(); // same for both
      vbrPerfData = vbrPerfDataSizeCal.vbrPerft();
      vbrEventsData = vbrEventsDataSizeCal.vbrEvents();
      vbrDbTimeData = vbrDbTimeSizeCal.vbrDb();
    } else {
      // Typical
      vmCap = vmSizeCapCal.vmSize();
      hostCap = hostSizeCal.hostSize();
      dataStoreCap = datastoreSizeCal.datastoreSize();
      otherData = otherDataSizeCal.otherData();
      eventsData = eventsDataSizeCal.eventsData();
      vbrPerfData = vbrPerfDataSizeCal.vbrPerf();
      vbrEventsData = vbrEventsDataSizeCal.vbrEvents();
      vbrDbTimeData = vbrDbTimeSizeCal.vbrDb();
    }

  }

}




