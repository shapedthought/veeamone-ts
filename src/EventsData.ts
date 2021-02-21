import { General } from './Interfaces';
import { PerfSizeInter } from './PerformanceSize';
import { VbrCal } from './VbrCal';

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
  vbrNumVbrEm: number; // Veeam Backup & Replication Enterprise Manager
  vbrServers: number; // Veeam Backup & Replication servers
  vbrAvNumRepo: number; // Average number of Repositories  per VBR
  vbrAvNumProxy: number; // Average number of Proxy  per VBR
  vbrAvNumWan: number; // Average number of WAN Accelerators  per VBR
  eventsData: number; // Period of time for keeping events data
}

class EventsData {
  enterpriseMan = 1;
  vbrServers = 1;
  datastores = 3;
  vapp = 3;
  clusters = 5;
  eventsHistory = 12;
  vbrAvNumRepo = 3;
  vbrAvNumProxy: number; // need to calculate this!
  

  constructor(vmCount: number) {
    const vbrCal = new VbrCal();
    this.vbrServers = vbrCal.vbrServerCal(vmCount);
    this.vbrAvNumProxy = vbrCal.vbrProxyCal(vmCount);
  }

  eventsData(data: EventsVmwareInter): number {
    const result =
      ((data.vmCount * 28.6 +
        data.hosts * 765.8 +
        this.datastores * 7.3 +
        this.clusters * 6.2 +
        this.vapp * 0.1) *
        (30.44 * this.eventsHistory)) /   // data.eventsData
      1024 /
      1024;
    return result;
  }

  hvEventsData(data: EventsDataInter) {
    const result =
      ((data.vmCount * 0.1 + data.hosts * 527.2) * (30.44 * this.eventsHistory)) / // data.eventsData
      1024 /
      1024;
    return result;
  }

  vbrEvents(data: VbrEventsInter) {
    const result =
      ((this.enterpriseMan * 0.47 + //data.vbrNumVbrEn
        this.vbrServers * 1963 + 
        this.vbrAvNumRepo * this.vbrServers * 0.18 +
        data.vbrAvNumProxy * this.vbrServers * 0.37 +
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
