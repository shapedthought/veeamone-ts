import { VbrCal } from './VbrCal';


export class InfraSettings {
  //Infrastructure
  vmThreashold = 1500;
  avNumDsOneVm = 0;
  avNicsHost = 4;
  avNumVDisksVm = 3;
  avNumGDiskVm = 0;
  avSdPerHost = 2;
  avSpPerHost = 2;
  historicPerfData = 12;
  eventsHistory = 12;
  private datastoreRatio = 30; // vm to datastore ratio
  private hostRatio = 50; // need to look at
  private rPoolRatio = 20; // hosts to resource pool ratio
  private clusterRatio = 5; // clusters to hosts ratio
  private vappRatio = 2; // vapp to hosts ratio
  vmQty = 0
  hostQty = 0;
  resourcePoolQty = 0;
  clusterQty = 0;
  vappQty = 0;
  datastoreQty = 0;

  updateQty(vmCount: number, hosts: number): void {
    this.vmQty = vmCount;
    this.hostQty = hosts;
    this.resourcePoolQty = Math.ceil(vmCount / this.rPoolRatio);
    this.clusterQty = Math.ceil(vmCount / this.clusterRatio);
    this.vappQty = Math.ceil(vmCount / this.vappRatio);
    this.datastoreQty = Math.ceil(vmCount / this.datastoreRatio);
  }

  // hostqty(vmCount: number): number{
  //   return Math.ceil(vmCount / this.hostRatio)
  // }

  // resourcePoolQty(vmCount: number): number {
  //   return Math.ceil(vmCount / this.rPoolRatio);
  // }

  // clusterQty(vmCount: number): number {
  //   return Math.ceil(vmCount / this.clusterRatio)
  // }

  // vappQty(vmCount: number): number {
  //   return Math.ceil(vmCount / this.vappRatio)
  // }

  // datastoreqty(vmCount: number): number{
  //   return Math.ceil(vmCount / this.datastoreRatio)
  // }

  set updateSettings(data: InfraSettings) {
      this.avNumDsOneVm = data.avNumDsOneVm;
      this.avNicsHost = data.avNumDsOneVm;
      this.avNumVDisksVm = data.avNumVDisksVm;
      this.avNumGDiskVm = data.avNumGDiskVm;
      this.avSdPerHost = data.avSdPerHost;
      this.avSpPerHost = data.avSpPerHost;
      this.datastoreRatio = data.datastoreRatio;
      this.rPoolRatio = data.rPoolRatio; // hosts to resource pool ratio
      this.clusterRatio = data.clusterRatio; // clusters to hosts ratio
      this.vappRatio = data.vappRatio; // vapp to hosts ratio
  }
}

export class VeeamSettings {
  // Veeam
  vbrVmRatio = 1500;
  proxyToVmRatio = 400; // TODO need to look at this
  repoRatio = 3;
  wanAccRatio = 0;
  vmsPerJobRatio = 70;
  jobsRatio = 70; // might not need this
  restoreRatio = 100; // one restore per 100 VMs
  vbrCals = new VbrCal(); // adding the calculations to each of the instances... good idea?

  set updateSettings(data: VeeamSettings) {
    this.vbrVmRatio = data.vbrVmRatio;
    this.proxyToVmRatio = data.proxyToVmRatio; // TODO need to look at this
    this.repoRatio = data.repoRatio;
    this.wanAccRatio = data.wanAccRatio;
    this.vmsPerJobRatio = data.vmsPerJobRatio;
    this.jobsRatio = data.jobsRatio; // might not need this
    this.restoreRatio = data.restoreRatio; // one restore per 100 VMs
  }
}
