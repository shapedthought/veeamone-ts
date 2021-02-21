import { General } from './Interfaces';
import { Unknown } from './UnknownParam';

interface VmSizeInter extends General {
  vmCount: number; // VMs
  avNumDsOneVm: number; // Average number of Datastores where one VM stored
  avNicsHost: number; // Average number of NICs per Host >> as in physical host
  avNumVDisksVm: number; // Average number of virtual disks per VM
  avNumGDiskVm: number; // Average number of Guest Disk per VM
}

// Interesting that this doesn't include NICS per-host where the VMware version does
interface HvVmSizeInter extends General {
  hvVmCount: number; // VMs
  hvAvNumNicsVm: number; // Average number of NICs per VM
  haAvNumVdVm: number; // Average number of virtual disks per VM
  hvAvNumGdVm: number; // Average number of Guest Disk per VM
}

class VmSize {
  private unknown = new Unknown();

  vmSize(data: VmSizeInter): number {
    const monthDays = 30.44 * data.historicPerfData;
    const result =
      data.vmCount *
      ((96 * 7 + 13 * monthDays) *
        (43 +
          10 * data.avNumDsOneVm +
          5 * data.avNicsHost +
          6 * data.avNumVDisksVm) +
        (48 * 7 + 2 * monthDays) *
          (2 * (data.avNumDsOneVm + data.avNumGDiskVm))) *
      this.unknown.unknownParamExtended;
    return result;
  }

  hvVmSize(data: HvVmSizeInter): number {
    const monthDays = 30.44 * data.historicPerfData;
    const result =
      data.hvVmCount *
      ((288 * 7 + 13 * monthDays) *
        (20 + 8 * 3 * data.haAvNumVdVm + 3 * data.hvAvNumNicsVm) +
        (48 * 7 + 2 * monthDays) * (2 + 2 * data.haAvNumVdVm) +
        (48 * 7 + 4 * monthDays) * (2 * data.hvAvNumGdVm)) *
      this.unknown.unknownParamExtended;
    return result;
  }

  vmSizet(data: VmSizeInter) {
    const monthDays = 30.44 * data.historicPerfData;
    const result =
      data.vmCount *
      ((288 * 7 + 13 * monthDays) *
        (47 +
          13 * data.avNumDsOneVm +
          5 * data.avNicsHost +
          6 * data.avNumDsOneVm) +
        (48 * 7 + 2 * monthDays) *
          (2 * (data.avNumDsOneVm + data.avNumGDiskVm))) *
      this.unknown.unknownParamExtended;
    return result;
  }

  hvVmSizet(data: HvVmSizeInter) {
    const monthDays = 30.44 * data.historicPerfData;
    const result =
      data.hvVmCount *
      ((288 * 7 + 13 * monthDays) *
        (28 + 8 * 3 * data.haAvNumVdVm + 9 * data.haAvNumVdVm) +
        (48 * 7 + 2 * monthDays) *
          (2 + 2 * data.haAvNumVdVm) +
        (48 * 7 + 4 * monthDays) *
          (2 * data.hvAvNumGdVm)) *
      this.unknown.unknownParamExtended;
    return result;
  }
}

export {VmSizeInter, HvVmSizeInter, VmSize}