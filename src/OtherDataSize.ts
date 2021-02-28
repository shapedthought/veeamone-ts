import { General } from './Interfaces';
import { Unknown } from './UnknownParam';
import { InfraSettings } from './Settings';

interface VhOtherDataInter extends General {
  hvHosts: number;
  historicPerfData: number;
  hvAvNumVol: number;
  hvAvNumNics: number;
  avVswitchHost: number;
  unknownParam: number;
  hvNumCsv?: number;
}

export class OtherDataSizeCal {
  private unknown = new Unknown();
  private settings: InfraSettings;

  constructor(settings: InfraSettings) {
    this.settings = settings;
  }

  otherData(): number {
    const monthDays = 30.44 * this.settings.historicPerfData;

    const result =
      ((this.settings.resourcePoolQty + this.settings.vappQty) * (288 * 7 + 13 * monthDays) * 24 +
        this.settings.clusterQty * (288 * 7 + 13 * monthDays) * 27) *
      this.unknown.unknownParamExtended;
    return result;
  }

  hvOtherData(data: General) {
    const monthDays = 30.44 * data.historicPerfData;
    const result =
      (5 * ((96 * 7 + 13 * monthDays) * 2 + (48 * 7 + 3 * monthDays) * 1) +
        this.unknown.unknownParam *
          ((96 * 7 + 13 * monthDays) * 2 + (48 * 7 + 3 * monthDays) * 1)) *
      this.unknown.unknownParamExtended;
    return result;
  }

  // has clusters which the other doesn't
  otherDatat(): number {
    const monthDays = 30.44 * this.settings.historicPerfData;

    const result =
      ((this.settings.resourcePoolQty + this.settings.vappQty) * (288 * 7 + 13 * monthDays) * 46 +
        this.settings.clusterQty * (288 * 7 + 13 * monthDays) * 56) *
      this.unknown.unknownParamExtended;
    return result;
  }

  // different interface to the advanced version
  hvOtherDatat(data: VhOtherDataInter) {
    const monthDays = 30.44 * data.historicPerfData;
    const result =
      (5 * ((288 * 7 + 13 * monthDays) * 7 + (48 * 7 + 3 * monthDays) * 3) +
        (data.hvNumCsv as number) *
          ((288 * 7 + 13 * monthDays) * (18 + 2) +
            (48 * 7 + 3 * monthDays) * 3)) *
      this.unknown.unknownParamExtended;
    return result;
  }
}
