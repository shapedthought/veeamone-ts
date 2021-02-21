export class InfraSettings {
  //Infrastructure
  avNumDsOneVm = 0;
  avNicsHost = 4;
  avNumVDisksVm = 3;
  avNumGDiskVm = 0;
  avSdPerHost = 2;
  avSpPerHost = 2;
  datastoreRatio = 3; // host to datastore ratio
  rPoolRatio = 4; // hosts to resource pool ratio
  clusterRation = 5; // clusters to hosts ratio
  vappRatio = 2; // vapp to hosts ratio

  set updateSettigs(data: InfraSettings) {
      this.avNumDsOneVm = data.avNumDsOneVm;
      this.avNicsHost = data.avNumDsOneVm;
      this.avNumVDisksVm = data.avNumVDisksVm;
      this.avNumGDiskVm = data.avNumGDiskVm;
      this.avSdPerHost = data.avSdPerHost;
      this.avSpPerHost = data.avSpPerHost;
      this.datastoreRatio = data.datastoreRatio;
      this.rPoolRatio = data.rPoolRatio; // hosts to resource pool ratio
      this.clusterRation = data.clusterRation; // clusters to hosts ratio
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
