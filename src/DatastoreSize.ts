import { General } from './Interfaces';
import { Unknown } from './UnknownParam';
import { InfraSettings } from './Settings';

export interface DatastoreSizeInter extends General {
  datastores: number; // Datastores
}

export class DataStoreSizeCal {
  private unknown = new Unknown();
  private settings: InfraSettings;

  constructor(settings: InfraSettings) {
    this.settings = settings;
  }

  datastoreSize(): number { // data: DatastoreSizeInter

    const monthDays = 30.44 * this.settings.historicPerfData;
    const result =
      this.settings.datastoreQty * // calculated value, was data.datastores
      ((96 * 7 + 13 * monthDays) * 10 + (48 * 7 + 2 * monthDays) * 2) *
      this.unknown.unknownParamExtended;
    return result;
  }

  datastoreSizet() {
    const monthDays = 30.44 * this.settings.historicPerfData;
    const result =
      this.settings.datastoreQty *
      ((288 * 7 + 13 * monthDays) * 10 +
        (48 * 7 + 2 * monthDays) * 2) *
      this.unknown.unknownParamExtended;
    return result;
  }
}
