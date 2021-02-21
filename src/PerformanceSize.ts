import { Unknown } from './UnknownParam';
import { VbrCal } from './VbrCal';

// export interface PerfSizeInter {
//   vmQty: number;
//   vbrNumVbrEm: number; // Veeam Backup & Replication Enterprise Manager
//   vbrServers: number; // Veeam Backup & Replication servers
//   historicPerfData: number; // Period of time for keeping historical performance and backup data
//   vbrAvNumRepo: number; // Average number of Repositories  per VBR
//   vbrAvNumProxy: number; // Average number of Proxy  per VBR
//   vbrAvNumWan: number; // Average number of WAN Accelerators  per VBR
//   vbrAvJobsServer: number; // Average number of Jobs per backup server
// }

export interface PerfSizeInter {
  vmQty: number;
  historicPerfData: number; // Period of time for keeping historical performance and backup data
}

class PerformanceSize {
  private unknown = new Unknown();
  private vbrCal = new VbrCal();
  public vbrAvNumWan = 0;
  public entermanQty = 1;
  public vbrServers = 0;
  public vbrAvNumRepo = 0;
  public vbrAvNumProxy = 0;
  public vbrAvJobsServer = 0;

  vbrPerf(data: PerfSizeInter) {
    this.vbrServers = this.vbrCal.vbrServerCal(data.vmQty);
    this.vbrAvNumRepo = this.vbrCal.vbrRepoCal(this.vbrServers);
    this.vbrAvNumProxy = this.vbrCal.vbrProxyCal(this.vbrServers); //TODO: need to update this with vm count input and change the vbrCal method
    this.vbrAvJobsServer = this.vbrCal.vbrProxyCal(data.vmQty);
    const monthDays = 30.44 * data.historicPerfData;
    const timeVar1 = 96 * 7 + 13 * monthDays; // 96 hours? * 7 * 13 * monthDays
    const timeVar2 = 96 * 7 + 25 * monthDays; // 4
    const timeVar3 = 24 * 7 + 2 * monthDays; // hours in 2 x historic years?
    const result =
      ((this.entermanQty + this.vbrServers) * timeVar1 * 12 +
        this.vbrAvNumRepo *
          this.vbrServers *
          ((timeVar1 + timeVar2 + timeVar3) * 2) + // Repos * vbrServers
        this.vbrAvNumProxy * this.vbrServers * ((timeVar1 + timeVar2) * 3) + // Proxies * vbrServers
        this.vbrAvNumWan * this.vbrServers * timeVar1 * 11 + // WAN Acc * vbrServers
        this.vbrAvJobsServer * this.vbrServers * timeVar1 * 2 + // Jobs * vbrServers
        timeVar2 * (4 + 184 * this.vbrServers)) * // additional value
      this.unknown.unknownParamExtended; // Unknown param
    return result;
  }

  vbrPerft(data: PerfSizeInter) {
    this.vbrServers = this.vbrCal.vbrServerCal(data.vmQty);
    this.vbrAvNumRepo = this.vbrCal.vbrRepoCal(this.vbrServers);
    this.vbrAvNumProxy = this.vbrCal.vbrProxyCal(this.vbrServers);
    this.vbrAvJobsServer = this.vbrCal.vbrProxyCal(data.vmQty);
    const monthDays = 30.44 * data.historicPerfData;
    const timeVar1 = 96 * 7 + 13 * monthDays; // 96 hours? * 7 * 13 * monthDays
    const timeVar2 = 96 * 7 + 25 * monthDays; // 4
    const result =
      ((this.entermanQty + this.vbrServers) * timeVar1 * 12 +
        this.vbrAvNumRepo *
          this.vbrServers *
          (timeVar1 * 14 +
            timeVar2 * 1 +
            (168 + 2 * monthDays) * 2) +
        this.vbrAvNumProxy * this.vbrServers * (timeVar1 * 15 + timeVar2 * 3) +
        this.vbrAvNumWan * this.vbrServers * timeVar1 * 14 +
        this.vbrAvJobsServer * this.vbrServers * timeVar1 * 2 +
        (168 + 25 * monthDays) *
          (4 + 4 * this.vbrAvJobsServer * this.vbrServers)) *
      this.unknown.unknownParamExtended; // Unknown param
    return result;
  }
}
