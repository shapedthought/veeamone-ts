import {VeeamSettings} from './Settings';

interface VbrEventsInter {
    vbrNumVbrEm: number; // Veeam Backup & Replication Enterprise Manager
    vbrServers: number; // Veeam Backup & Replication servers
    vbrAvNumRepo: number; // Average number of Repositories  per VBR
    vbrAvNumProxy: number; // Average number of Proxy  per VBR
    vbrAvNumWan: number; // Average number of WAN Accelerators  per VBR
    eventsData: number; // Period of time for keeping events data
  }

export class VbrEventsCal {
  private settings: VeeamSettings;

  constructor(settings: VeeamSettings){
    this.settings = settings;
  }

  vbrEvents() {
    const result =
      ((this.settings.entermanQty * 0.47 + //data.vbrNumVbrEn
        this.settings.vbrServers * 1963 +
        this.settings.vbrAvNumRepo * this.settings.vbrServers * 0.18 +
        this.settings.vbrAvNumProxy * this.settings.vbrServers * 0.37 +
        this.settings.vbrAvNumWan * this.settings.vbrServers * 0.55) *
        (30.44 * this.settings.eventsHistory)) /
      1024 /
      1024;
    return result;
  }

  // Same as advanced
  // vbrEventst(data: VbrEventsInter) {
  //   return this.vbrEvents(data);
  // }
}
