import { General } from './Interfaces';
import { Unknown } from './UnknownParam';

interface OtherDataInter extends General {
  resourcePool: number; // Resource Pools
  vapp: number; // vApps
  clusters: number;
}

interface VhOtherDataInter extends General {
  hvHosts: number;
  historicPerfData: number;
  hvAvNumVol: number;
  hvAvNumNics: number;
  avVswitchHost: number;
  unknownParam: number;
  hvNumCsv?: number;
}

class OtherDataSize {
  private unknown = new Unknown();

  otherData(data: OtherDataInter): number {
    const monthDays = 30.44 * data.historicPerfData;
    const result =
      ((data.resourcePool + data.vapp) * (288 * 7 + 13 * monthDays) * 24 +
        data.resourcePool * (288 * 7 + 13 * monthDays) * 27) *
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
  // has clusters which the other don't
  otherDatat(data: OtherDataInter) {
    const monthDays = 30.44 * data.historicPerfData;
    const result =
      ((data.resourcePool + data.vapp) * (288 * 7 + 13 * monthDays) * 46 +
        data.clusters * (288 * 7 + 13 * monthDays) * 56) *
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
