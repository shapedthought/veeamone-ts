import { General } from './Interfaces';
import { PerfSizeInter } from './PerformanceSize';
import { VbrCal } from './VbrCal';
import { InfraSettings } from './Settings';

interface EventsDataInter extends General {
  vmCount: number; // VMs
  hosts: number; // Hosts
  eventsData: number; // Period of time for keeping events data
}

interface EventsVmwareInter extends EventsDataInter {
  datastores: number; // Datastores
  clusters: number; // Clusters
  vapp: number; // vApps
}



export class EventsDataCal {

  private settings: InfraSettings;

  constructor(settings: InfraSettings) {
    this.settings = settings;
  }

  eventsData(): number {
    const vmCount = this.settings.vmQty;
    const result =
      ((vmCount * 28.6 +
        this.settings.hostQty * 765.8 +
        this.settings.datastoreQty * 7.3 +
        this.settings.clusterQty * 6.2 +
        this.settings.vappQty * 0.1) *
        (30.44 * this.settings.eventsHistory)) /   // data.eventsData
      1024 /
      1024;
    return result;
  }

  hvEventsData(data: EventsDataInter) {
    const result =
      ((data.vmCount * 0.1 + data.hosts * 527.2) * (30.44 * this.settings.eventsHistory)) / // data.eventsData
      1024 /
      1024;
    return result;
  }
  
}
