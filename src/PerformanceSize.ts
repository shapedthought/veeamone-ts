import { Unknown } from './UnknownParam';
import { VbrCal } from './VbrCal';
import { VeeamSettings } from './Settings';

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

export class PerformanceSize {
  private unknown = new Unknown();

  private vbrSettings: VeeamSettings;

  constructor(veeamSettings: VeeamSettings) {
    this.vbrSettings = veeamSettings;
  }

  vbrPerf(): number {
    const monthDays = 30.44 * this.vbrSettings.historicPerfData;
    const timeVar1 = 96 * 7 + 13 * monthDays; // 96 hours? * 7 * 13 * monthDays
    const timeVar2 = 96 * 7 + 25 * monthDays; // 4
    const timeVar3 = 24 * 7 + 2 * monthDays; // hours in 2 x historic years?
    const result =
      ((this.vbrSettings.entermanQty + this.vbrSettings.vbrServers) *
        timeVar1 *
        12 +
        this.vbrSettings.vbrAvNumRepo *
          this.vbrSettings.vbrServers *
          ((timeVar1 + timeVar2 + timeVar3) * 2) + // Repos * vbrServers
        this.vbrSettings.vbrAvNumProxy *
          this.vbrSettings.vbrServers *
          ((timeVar1 + timeVar2) * 3) + // Proxies * vbrServers
        this.vbrSettings.vbrAvNumWan *
          this.vbrSettings.vbrServers *
          timeVar1 *
          11 + // WAN Acc * vbrServers
        this.vbrSettings.vbrAvJobsServer *
          this.vbrSettings.vbrServers *
          timeVar1 *
          2 + // Jobs * vbrServers
        timeVar2 * (4 + 184 * this.vbrSettings.vbrServers)) * // additional value
      this.unknown.unknownParamExtended; // Unknown param
    return result;
  }

  vbrPerft() {
    const monthDays = 30.44 * this.vbrSettings.historicPerfData;
    const timeVar1 = 96 * 7 + 13 * monthDays; // 96 hours? * 7 * 13 * monthDays
    const timeVar2 = 96 * 7 + 25 * monthDays; // 4
    const result =
      ((this.vbrSettings.entermanQty + this.vbrSettings.vbrServers) *
        timeVar1 *
        12 +
        this.vbrSettings.vbrAvNumRepo *
          this.vbrSettings.vbrServers *
          (timeVar1 * 14 + timeVar2 * 1 + (168 + 2 * monthDays) * 2) +
        this.vbrSettings.vbrAvNumProxy *
          this.vbrSettings.vbrServers *
          (timeVar1 * 15 + timeVar2 * 3) +
        this.vbrSettings.vbrAvNumWan *
          this.vbrSettings.vbrServers *
          timeVar1 *
          14 +
        this.vbrSettings.vbrAvJobsServer *
          this.vbrSettings.vbrServers *
          timeVar1 *
          2 +
        (168 + 25 * monthDays) *
          (4 +
            4 *
              this.vbrSettings.vbrAvJobsServer *
              this.vbrSettings.vbrServers)) *
      this.unknown.unknownParamExtended; // Unknown param
    return result;
  }
}
