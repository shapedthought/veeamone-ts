import { General } from './Interfaces';
import { Unknown } from './UnknownParam';
import {InfraSettings } from './Settings';

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

// need to create each class passing in the settings object
class VmSizeCal {
  private unknown = new Unknown();
  private settings: InfraSettings;

  constructor(settings: InfraSettings) {
    this.settings = settings;
  }

  vmSize(): number { // data: VmSizeInter
    const monthDays = 30.44 * this.settings.historicPerfData; // data.historicPerData
    const vmCount = this.settings.vmQty; // changed the name so it doesn't break
    const result =
      vmCount * // only actual varible that is added as part of the method
      (((96 * 7) + (13 * monthDays)) *
        (43 +
          (10 * this.settings.avNumDsOneVm) +  //data.avNumDsOneVm
          // (5 * this.settings.avNicsHost) +
          (6 * this.settings.avNumVDisksVm)) +
        ((48 * 7) + (2 * monthDays)) *
          (2 * (this.settings.avNumDsOneVm + this.settings.avNumGDiskVm))) * //data.avNumGDiskVm
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

  // Using in the VeeamOne.ts
  vmSizet() {
    const monthDays = 30.44 * this.settings.historicPerfData;
    const vmCount = this.settings.vmQty; // changed the name so it doesn't break
    const result =
      vmCount *
      ((288 * 7 + 13 * monthDays) *
        (47 +
          13 * this.settings.avNumDsOneVm +
          5 * this.settings.avNicsHost +
          6 * this.settings.avNumDsOneVm) +
        (48 * 7 + 2 * monthDays) *
          (2 * (this.settings.avNumDsOneVm + this.settings.avNumGDiskVm))) *
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

export {VmSizeInter, HvVmSizeInter, VmSizeCal}