// Class to run the VBR calculations based on predetermined figures

export class VbrCal {
  vbrServerCal(vmCount: number): number {
    return Math.ceil(vmCount / 1500);
  }

  vbrRepoCal(vbrServers: number): number {
    return vbrServers * 4;
  }

  vbrProxyCal(vbrRepo: number): number {
    return vbrRepo * 4; // should this be on capacity?
  }

  vbrJobsCal(vmCount: number): number {
    return Math.ceil(vmCount / 70); // set the job count based on the vm count at 70 VMs per job
  }

  vbrCalRestore(vmCount: number): number {
      return Math.ceil(vmCount / 100); // figure I just came up with
  }
}
