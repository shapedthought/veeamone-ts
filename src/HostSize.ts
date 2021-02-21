import { General } from './Interfaces';
import { Unknown } from './UnknownParam';

export interface HostSizeInter extends General {
  hosts: number; // Hosts
  datastores: number; // Datastores
  avNicsHost: number; // Average number of NICs per Host
  avVswitchHost: number;
  avSdPerHost: number; // Average number of Storage Adapter per Host
  avSpPerHost: number; // Average number of Storage Path per Host
}

export interface HvHostSizeInter extends General {
  hvHosts: number; // Hosts
  hvAvNumVol: number; // Average number of volumes per Host
  hvAvNumNics: number; // Average number of NICs per Host
  avVswitchHost: number; // Average number of Virtual Switch per Host
}

class HostSize {
  private unknown = new Unknown();

  // Advanced
  hostSize(data: HostSizeInter): number {
    const monthDays = 30.44 * data.historicPerfData;
    const result =
      data.hosts *
      (288 * 7 + 13 * monthDays) *
      (49 +
        (12 * data.datastores) / data.hosts +
        9 * data.avNicsHost +
        6 * (data.avSdPerHost + data.avSpPerHost)) *
      this.unknown.unknownParamExtended;
    return result;
  }

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
  hostSizet(data: HostSizeInter) {
    const result =
      data.hosts *
      (288 * 7 + 13 * (30.44 * data.historicPerfData)) *
      (55 +
        (12 * data.datastores) / data.hosts +
        11 * data.avNicsHost +
        7 * (data.avSdPerHost + data.avSpPerHost)) *
      this.unknown.unknownParamExtended;
    return result;
  }

  hvHostst(data: HvHostSizeInter) {
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
