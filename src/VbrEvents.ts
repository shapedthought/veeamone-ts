import {VeeamSettings} from './Settings';

export class VbrEventsCal {
  private settings: VeeamSettings;

  constructor(settings: VeeamSettings){
    this.settings = settings;
  }

  vbrEvents() {
    const result =
      ((this.settings.entermanQty * 0.47 + //data.vbrNumVbrEn
        this.settings.vbrServers * 1963 +
        this.settings.vbrAvNumRepo * this.settings.vbrServers * 0.18 +
        this.settings.vbrAvNumProxy * this.settings.vbrServers * 0.37 +
        this.settings.vbrAvNumWan * this.settings.vbrServers * 0.55) *
        (30.44 * this.settings.eventsHistory)) /
      1024 /
      1024;
    return result;
  }

}
