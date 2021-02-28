import { Unknown } from './UnknownParam';
import { VeeamSettings } from './Settings';

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

  vbrPerfold(): number {
    const monthDays = 30.44 * this.vbrSettings.historicPerfData;
    const timeVar1 = (96 * 7) + (13 * monthDays); 
    const timeVar2 = (96 * 7) + (25 * monthDays); 
    const timeVar3 = (24 * 7) + (2 * monthDays); 
    const result =
      ((this.vbrSettings.entermanQty + this.vbrSettings.vbrServers) *
        timeVar1 *
        12 +
        this.vbrSettings.vbrAvNumRepo *
          this.vbrSettings.vbrServers *
          ((timeVar1 * 9 + timeVar2 + timeVar3) * 2) + 
        this.vbrSettings.vbrAvNumProxy *
          this.vbrSettings.vbrServers *
          ((timeVar1 * 15 + timeVar2) * 3) + 
        this.vbrSettings.vbrAvNumWan *
          this.vbrSettings.vbrServers *
          timeVar1 *
          11 + 
        this.vbrSettings.vbrAvJobsServer *
          this.vbrSettings.vbrServers *
          timeVar1 *
          2 + 
        timeVar2 * (4 + 184 * this.vbrSettings.vbrServers)) * 
      this.unknown.unknownParamExtended; 
    return result;
  }

  vbrPerf(): number{
    const monthDays = 30.44 * this.vbrSettings.historicPerfData;
    const timeVar1 = (96 * 7) + (13 * monthDays);
    const timeVar2 = (96 * 7) + (25 * monthDays); 
    const timeVar3 = (24 * 7) + (2 * monthDays); 
    const part1 = (((this.vbrSettings.entermanQty + this.vbrSettings.vbrServers) * timeVar1) * 12);
    const part2 = ((this.vbrSettings.vbrAvNumRepo  * this.vbrSettings.vbrServers) * ((timeVar1 * 9) + (timeVar2 * 1) + (timeVar3 * 2)));
    const part3 = ((this.vbrSettings.vbrAvNumProxy * this.vbrSettings.vbrServers) * ((timeVar1 * 15) + (timeVar2 * 3)));
    const part4 = ((this.vbrSettings.vbrAvNumWan * this.vbrSettings.vbrServers) * ((timeVar3 * 11)));
    const part5 = (((this.vbrSettings.vbrAvJobsServer * this.vbrSettings.vbrServers) * timeVar1) * 2);
    const part6 = ((24*7) + (25 * monthDays)) * (4+(184 * this.vbrSettings.vbrServers))
    const returnVal = (part1 + part2 + part3 + part4 + part5 + part6) *  this.unknown.unknownParamExtended;
    return returnVal
  }

  vbrPerft(): number {
    const monthDays = 30.44 * this.vbrSettings.historicPerfData;
    const timeVar1 = (96 * 7) + (13 * monthDays); 
    const timeVar2 = (96 * 7) + (25 * monthDays); 
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
      this.unknown.unknownParamExtended; 
    return result;
  }
}
