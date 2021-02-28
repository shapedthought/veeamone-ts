import { General } from './Interfaces';
import { Unknown } from './UnknownParam';
import {InfraSettings } from './Settings';

// Will remove if Hyper-V is used later
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

  // Advanced calculation
  vmSize(): number { // data: VmSizeInter
    const monthDays = 30.44 * this.settings.historicPerfData; 
    const vmCount = this.settings.vmQty; // changed the name so it doesn't break
    const result =
      vmCount * 
      (((96 * 7) + (13 * monthDays)) *
        (43 +
          (10 * this.settings.avNumDsOneVm) +  
          (5 * this.settings.avNicsVM) + 
          (6 * this.settings.avNumVDisksVm)) +
        ((48 * 7) + (2 * monthDays)) *
          (2 * (this.settings.avNumDsOneVm + this.settings.avNumGDiskVm))) * 
      this.unknown.unknownParamExtended;
    return result;
  }

  // NOT in use currently - maybe for future (Hyper-V)
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

  // Typical calculation
  vmSizet(): number {
    const monthDays = 30.44 * this.settings.historicPerfData;
    const vmCount = this.settings.vmQty; // changed the name so it doesn't break
    const result =
      vmCount *
      ((288 * 7 + 13 * monthDays) *
        (47 +
          13 * this.settings.avNumDsOneVm +
          5 * this.settings.avNicsVM + 
          6 * this.settings.avNumVDisksVm) +
        (48 * 7 + 2 * monthDays) *
          (2 * (this.settings.avNumDsOneVm + this.settings.avNumGDiskVm))) *
      this.unknown.unknownParamExtended;
    return result;
  }

  // NOT in use currently - maybe for future (Hyper-V)
  hvVmSizet(data: HvVmSizeInter): number {
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

export {VmSizeCal}