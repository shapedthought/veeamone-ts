import { General } from './Interfaces';
import { PerfSizeInter } from './PerformanceSize';

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

interface VbrEventsInter {
  vbrNumVbrEm: number;
  vbrServers: number;
  vbrAvNumRepo: number;
  vbrAvNumProxy: number;
  vbrAvNumWan: number;
  eventsData: number;
}

class EventsData {
  eventsData(data: EventsVmwareInter): number {
    const result =
      ((data.vmCount * 28.6 +
        data.hosts * 765.8 +
        data.datastores * 7.3 +
        data.clusters * 6.2 +
        data.vapp * 0.1) *
        (30.44 * data.eventsData)) /
      1024 /
      1024;
    return result;
  }

  hvEventsData(data: EventsDataInter) {
    const result =
      ((data.vmCount * 0.1 + data.hosts * 527.2) * (30.44 * data.eventsData)) /
      1024 /
      1024;
    return result;
  }

  vbrEvents(data: VbrEventsInter) {
    const result =
      ((data.vbrNumVbrEm * 0.47 +
        data.vbrServers * 1963 +
        data.vbrAvNumRepo * data.vbrServers * 0.18 +
        data.vbrAvNumProxy * data.vbrServers * 0.37 +
        data.vbrAvNumWan * data.vbrServers * 0.55) *
        (30.44 * data.eventsData)) /
      1024 /
      1024;
    return result;
  }
  // Same as advanced
  ventsDatat(data: EventsVmwareInter) {
    return this.eventsData(data);
  }

  // Same as advanced
  hvEventsDatat(data: EventsDataInter) {
    return this.hvEventsData(data);
  }
  
  // Same as advanced
  vbrEventst(data: VbrEventsInter) {
    return this.vbrEvents(data);
  }
}
