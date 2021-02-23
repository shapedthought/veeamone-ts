interface VbrEventsInter {
    vbrNumVbrEm: number; // Veeam Backup & Replication Enterprise Manager
    vbrServers: number; // Veeam Backup & Replication servers
    vbrAvNumRepo: number; // Average number of Repositories  per VBR
    vbrAvNumProxy: number; // Average number of Proxy  per VBR
    vbrAvNumWan: number; // Average number of WAN Accelerators  per VBR
    eventsData: number; // Period of time for keeping events data
  }

class VbrEventsCal {
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
  vbrEventst(data: VbrEventsInter) {
    return this.vbrEvents(data);
  }
}
