import { VeeamSettings } from './Settings';

export class VbrDbTime {
  private settings: VeeamSettings;

  constructor(settings: VeeamSettings) {
    this.settings = settings;
  }

  vbrDb(): number {
    const result =
      ((this.settings.historicPerfData / 12) *
        this.settings.vbrServers *
        this.settings.vbrAvJobsServer *
        (365 * 2179 +
          365 * 1436 * this.settings.vmsPerJobRatio +
          366 * 3262 * this.settings.vbrRestore)) /
      1024 /
      1024 /
      1024;
    return result;
  }
}
