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
      this.historicPerfData = data.historicPerfData;
      this.eventsHistory = data.eventsHistory;
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
  entermanQty = 1; // hard coded
  vmQty = 0;
  vbrServers = 0;
  vbrAvNumProxy = 0; // Average number of Proxy  per VBR
  vbrAvNumRepo = 0; // Average number of Repositories  per VBR
  vbrAvJobsServer = 0;  // Average number of Jobs per backup server
  vbrAvNumWan = 0; // Average number of WAN Accelerators  per VBR - hardcoded
  vbrRestore = 0;
  historicPerfData = 12;
  eventsHistory = 12;

  updateQty(vmCount: number){
    this.vbrServers = Math.ceil(vmCount / this.vbrVmRatio);
    this.vbrAvNumRepo = Math.ceil(vmCount / this.repoRatio);
    this.vbrAvNumProxy = Math.ceil(vmCount / this.proxyToVmRatio);
    this.vbrAvJobsServer = Math.ceil(vmCount / this.jobsRatio);
    this.vbrRestore = Math.ceil(vmCount / this.restoreRatio);
  }


  // vbrServerCal(vmCount: number): number {
  //   return Math.ceil(vmCount / 1500);
  // }

  // vbrRepoCal(vbrServers: number): number {
  //   return vbrServers * 4;
  // }

  // vbrProxyCal(vbrRepo: number): number {
  //   return vbrRepo * 4; // should this be on capacity?
  // }

  // vbrJobsCal(vmCount: number): number {
  //   return Math.ceil(vmCount / 70); // set the job count based on the vm count at 70 VMs per job
  // }

  // vbrCalRestore(vmCount: number): number {
  //     return Math.ceil(vmCount / 100); // figure I just came up with
  // }


  set updateSettings(data: VeeamSettings) {
    this.vbrVmRatio = data.vbrVmRatio;
    this.proxyToVmRatio = data.proxyToVmRatio; // TODO need to look at this
    this.repoRatio = data.repoRatio;
    this.wanAccRatio = data.wanAccRatio;
    this.vmsPerJobRatio = data.vmsPerJobRatio;
    this.jobsRatio = data.jobsRatio; // might not need this
    this.restoreRatio = data.restoreRatio; // one restore per 100 VMs
    this.historicPerfData = data.historicPerfData;
    this.eventsHistory = data.eventsHistory;
  }
}
