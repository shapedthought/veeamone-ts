import {VbrCal} from './VbrCal';

// interface VbrDbTimeInter {
//   vmQty: number; // added
//   historicPerfData: number;
//   vbrServers: number;
//   vbrAvJobsServer: number;
//   vbrAvVmJob: number;
//   vbrAvRestoreDay: number;
// }

interface VbrDbTimeInter {
  vmQty: number; // added
  historicPerfData: number;
}

class VbrDbTime {
  public vbrServers = 0;
  public vbrAvJobsServer = 0;
  public vbrAvVmJob = 0;
  public vbrAvRestoreDay = 0;

  public vbrCal = new VbrCal();


  vbrDb(data: VbrDbTimeInter) {
    this.vbrAvJobsServer = this.vbrCal.vbrJobsCal(data.vmQty);
    this.vbrAvVmJob = this.vbrCal.vbrJobsCal(data.vmQty);
    this.vbrAvRestoreDay = this.vbrCal.vbrCalRestore(data.vmQty);
    const result =
      ((data.historicPerfData / 12) *
        this.vbrServers *
        this.vbrAvJobsServer *
        (365 * 2179 +
          365 * 1436 * this.vbrAvVmJob +
          366 * 3262 * this.vbrAvRestoreDay)) /
      1024 /
      1024 /
      1024;
    return result;
  }
}
