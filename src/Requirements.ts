import { InfraSettings, VeeamSettings } from './Settings'
import { VmSizeCal} from './VmSize';
import { DataStoreSizeCal } from './DatastoreSize';
import { HostSizeCal } from './HostSize';
import { OtherDataSizeCal} from './OtherDataSize';
import { EventsDataCal } from './EventsData';
import { PerformanceSize } from './PerformanceSize';
import { VbrEventsCal } from './VbrEvents';
import { VbrDbTime } from './VbrDbTime';


interface returnObject {
    vmCap: number,
    hostCap: number,
    dataStoreCap: number,
    otherData: number,
    eventsData: number,
    vbrPerfData: number, 
    vbrEventsData: number,
    vbrDbTimeData: number,
    totalCap: number, 
    settings: InfraSettings | number
}

export class Requirements {
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

    getResults(): number {
        return 1
    }
  
    runCal(vmCount: number, hosts: number, advanced: boolean): returnObject{
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
      const totalCap = (this.vmCap + this.hostCap + this.dataStoreCap + this.otherData + this.eventsData + this.vbrPerfData + this.vbrEventsData + this.vbrDbTimeData) * 1.2;
      console.log(advanced)
      const data = {
        "vmCap": this.vmCap,
        "hostCap": this.hostCap,
        "dataStoreCap": this.dataStoreCap,
        "otherData": this.otherData,
        "eventsData": this.eventsData,
        "vbrPerfData": this.vbrPerfData,
        "vbrEventsData": this.vbrEventsData,
        "vbrDbTimeData": this.vbrDbTimeData,
        "totalCap": totalCap,
        "settings": advanced === true ? 0 : this.settings
    }
      return data;
    }
  
  }