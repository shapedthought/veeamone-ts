import { General } from './Interfaces';
import { Unknown } from './UnknownParam';
import { InfraSettings } from './Settings';

export interface HvHostSizeInter extends General {
  hvHosts: number; // Hosts
  hvAvNumVol: number; // Average number of volumes per Host
  hvAvNumNics: number; // Average number of NICs per Host
  avVswitchHost: number; // Average number of Virtual Switch per Host
}

export class HostSizeCal {
  private unknown = new Unknown();
  private settings: InfraSettings;

  constructor(settings: InfraSettings){
    this.settings = settings;
  }

  // Advanced
  hostSize(): number { 

    const monthDays = 30.44 * this.settings.historicPerfData;
    const result =
      this.settings.hostQty * 
      (288 * 7 + 13 * monthDays) *
      (49 +
        (12 * this.settings.datastoreQty) / this.settings.hostQty +
        9 * this.settings.avNicsHost +
        6 * (this.settings.avSdPerHost + this.settings.avSpPerHost)) *
      this.unknown.unknownParamExtended;
    return result;
  }
  // will probably delete
  hvHosts(data: HvHostSizeInter): number {
    const monthDays = 30.44 * data.historicPerfData;
    const result =
      data.hvHosts *
      (96 * 7 + 13 * monthDays) *
      (24 + 6 * data.hvAvNumVol + 5 * data.hvAvNumNics) *
      this.unknown.unknownParamExtended;
    return result;
  }

  // Typical
  hostSizet(): number {
    const result =
      this.settings.hostQty *
      (288 * 7 + 13 * (30.44 * this.settings.historicPerfData)) *
      (55 +
        (12 * this.settings.datastoreQty) / this.settings.hostQty +
        11 * this.settings.avNicsHost +
        7 * (this.settings.avSdPerHost + this.settings.avSpPerHost)) *
      this.unknown.unknownParamExtended;
    return result;
  }

  hvHostst(data: HvHostSizeInter): number {
    const result =
      data.hvHosts *
      (288 * 7 + 13 * (30.44 * data.historicPerfData)) *
      (46 +
        6 * data.hvAvNumVol +
        10 * data.hvAvNumNics +
        6 * data.avVswitchHost) *
      this.unknown.unknownParamExtended;
    return result;
  }
}
