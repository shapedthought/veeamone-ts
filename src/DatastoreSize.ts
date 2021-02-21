import { General } from './Interfaces';
import { Unknown } from './UnknownParam';

export interface DatastoreSizeInter extends General {
  datastores: number; // Datastores
}

class DataStoreSizeAd {
  private unknown = new Unknown();

  datastoreSize(data: DatastoreSizeInter): number {
    const monthDays = 30.44 * data.historicPerfData;
    const result =
      data.datastores *
      ((96 * 7 + 13 * monthDays) * 10 + (48 * 7 + 2 * monthDays) * 2) *
      this.unknown.unknownParamExtended;
    return result;
  }

  datastoreSizet(data: DatastoreSizeInter) {
    const monthDays = 30.44 * data.historicPerfData;
    const result =
      data.datastores *
      ((288 * 7 + 13 * monthDays) * 10 +
        (48 * 7 + 2 * monthDays) * 2) *
      this.unknown.unknownParamExtended;
    return result;
  }
}
