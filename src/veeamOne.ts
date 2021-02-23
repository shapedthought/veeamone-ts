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
import { EventsDataCal } from './EventsData'


class runCalculation {
  settings = new InfraSettings()
  veeamSettings = new VeeamSettings()

  // update the Infra settings
  updateInfraSettings(settings: InfraSettings){
    settings.updateSettings = settings;
  }

  // update the Veeam settings
  updateVeeamSettings(veeamSettings: VeeamSettings){
    veeamSettings.updateSettings = veeamSettings;
  }

  infraRequirements(vmCount: number, hosts: number, type: string){
    this.settings.updateQty(vmCount, hosts);
    const vmSizeCapCal = new VmSizeCal(this.settings);
    const hostSizeCal = new HostSizeCal(this.settings);
    const datastoreSizeCal = new DataStoreSizeCal(this.settings);
    const otherDataSizeCal = new OtherDataSizeCal(this.settings);
    const eventsDataSizeCal = new EventsDataCal(this.settings);
    let vmCap = 0;
    let hostCap = 0;
    let dataStoreCap = 0;
    let otherData = 0;
    let eventsData = 0;
    // check the threashold then run typical or advanced
    if(vmCount > this.settings.vmThreashold){
      vmCap = vmSizeCapCal.vmSizet();
      hostCap = hostSizeCal.hostSizet();
      dataStoreCap = datastoreSizeCal.datastoreSizet();
      otherData = otherDataSizeCal.otherDatat();
      eventsData = eventsDataSizeCal.eventsData();
    } else {
      vmCap = vmSizeCapCal.vmSize();
      hostCap = hostSizeCal.hostSize();
      dataStoreCap = datastoreSizeCal.datastoreSize();
      otherData = otherDataSizeCal.otherData();
      eventsData = eventsDataSizeCal.eventsData();
    }

  }

}




