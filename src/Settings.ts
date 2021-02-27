import { VbrCal } from './VbrCal';

interface settingsUpdateInter {
  avNicsHost: number,
  avNumVDisksVm: number,
  avNumGDiskVm: number,
  avSdPerHost: number,
  historicPerfData: number,
  eventsHistory: number,
  vmQty: number,
  hostQty: number,
  clusterQty: number,
  vappQty: number,
  datastoreQty: number,
}

interface returnSettings {
  vmThreashold: number,
  resourcePoolQty: number;
  clusterQty: number;
  vappQty: number;
  datastoreQty: number;
  avNicsHost: number;
  avNumVDisksVm: number;
  avNumGDiskVm: number;
  avSdPerHost: number;
  avSpPerHost: number;
  historicPerfData: number;
  eventsHistory: number;
}

export class InfraSettings {
  // Calculation ratios
  private datastoreRatio = 30; // vm to datastore ratio
  // private hostRatio = 50; // provided by user input
  private rPoolRatio = 20; // hosts to resource pool ratio
  private clusterRatio = 5; // clusters to hosts ratio
  private vappRatio = 2; // vapp to hosts ratio

  //Average values
  avNumDsOneVm = 0; // Average datastores with one vm- not changeable
  avNicsHost = 4;
  avNumVDisksVm = 3;
  avNumGDiskVm = 0;
  avSdPerHost = 2;
  avSpPerHost = 2; // used by host data size
  historicPerfData = 12;
  eventsHistory = 12;

  // These are calculated values is using simple mode
  vmThreashold = 1500;
  vmQty = 0
  hostQty = 0;
  resourcePoolQty = 0;
  clusterQty = 0;
  vappQty = 0;
  datastoreQty = 0;

  updateQty(vmCount: number, hosts: number): void {
    // calculate these values based on the VM count
    // in simple mode.
    this.vmQty = vmCount;
    this.hostQty = hosts;
    this.resourcePoolQty = Math.ceil(vmCount / this.rPoolRatio);
    this.clusterQty = Math.ceil(vmCount / this.clusterRatio);
    this.vappQty = Math.ceil(vmCount / this.vappRatio);
    this.datastoreQty = Math.ceil(vmCount / this.datastoreRatio);
  }

  // To be used when you run advanced
  getSettings(): returnSettings{
    return {
      vmThreashold: this.vmThreashold,
      resourcePoolQty: this.resourcePoolQty,
      clusterQty: this.clusterQty,
      vappQty: this.vappQty,
      datastoreQty: this.datastoreQty,
      avNicsHost: this.avNicsHost,
      avNumVDisksVm: this.avNumVDisksVm,
      avNumGDiskVm: this.avNumGDiskVm,
      avSdPerHost: this.avSdPerHost,
      avSpPerHost: this.avSpPerHost,
      historicPerfData: this.historicPerfData,
      eventsHistory: this.eventsHistory
    }
  }

  set updateSettings(data: settingsUpdateInter) {
      this.avNicsHost = data.avNicsHost;
      this.avNumVDisksVm = data.avNumVDisksVm;
      this.avNumGDiskVm = data.avNumGDiskVm;
      this.avSdPerHost = data.avSdPerHost;
      this.historicPerfData = data.historicPerfData;
      this.eventsHistory = data.eventsHistory;
      this.vmQty = data.vmQty;
      this.hostQty = data.hostQty;
      this.clusterQty = data.clusterQty;
      this.vappQty = data.vappQty;
      this.datastoreQty = data.datastoreQty;
  }
}

export class VeeamSettings {
  // Veeam ratios
  vbrVmRatio = 1500;
  proxyToVmRatio = 400; // TODO need to look at this
  repoRatio = 3;
  wanAccRatio = 0;
  vmsPerJobRatio = 70;
  jobsRatio = 70; // might not need this
  restoreRatio = 100; // one restore per 100 VMs

  // Calculated values
  entermanQty = 1; // hard coded
  vbrServers = 1;
  vbrAvNumProxy = 0; // Average number of Proxy  per VBR
  vbrAvNumRepo = 0; // Average number of Repositories  per VBR
  vbrAvJobsServer = 0;  // Average number of Jobs per backup server
  vbrAvNumWan = 0; // Average number of WAN Accelerators  per VBR - hardcoded
  vbrRestore = 0;

  // non-calculated
  vmQty = 0;
  historicPerfData = 12; // only updated if advanced is used
  eventsHistory = 12;

  updateQty(vmCount: number){
    this.vmQty = vmCount;
    this.vbrServers = Math.ceil(vmCount / this.vbrVmRatio);
    this.vbrAvNumRepo = Math.ceil(vmCount / this.repoRatio);
    this.vbrAvNumProxy = Math.ceil(vmCount / this.proxyToVmRatio);
    this.vbrAvJobsServer = Math.ceil(vmCount / this.jobsRatio);
    this.vbrRestore = Math.ceil(vmCount / this.restoreRatio);
  }

  // Can delete this as the ratios don't get updated
  updateSettings(historicPerfData: number, eventsHistory: number) {
    // only exception are these
    this.historicPerfData = historicPerfData;
    this.eventsHistory = eventsHistory;
  }
}
