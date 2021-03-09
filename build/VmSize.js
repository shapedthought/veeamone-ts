"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VmSizeCal = void 0;
var UnknownParam_1 = require("./UnknownParam");
// need to create each class passing in the settings object
var VmSizeCal = /** @class */ (function () {
    function VmSizeCal(settings) {
        this.unknown = new UnknownParam_1.Unknown();
        this.settings = settings;
    }
    // Advanced calculation
    VmSizeCal.prototype.vmSize = function () {
        var monthDays = 30.44 * this.settings.historicPerfData;
        var vmCount = this.settings.vmQty; // changed the name so it doesn't break
        var result = vmCount *
            (((96 * 7) + (13 * monthDays)) *
                (43 +
                    (10 * this.settings.avNumDsOneVm) +
                    (5 * this.settings.avNicsVM) +
                    (6 * this.settings.avNumVDisksVm)) +
                ((48 * 7) + (2 * monthDays)) *
                    (2 * (this.settings.avNumDsOneVm + this.settings.avNumGDiskVm))) *
            this.unknown.unknownParamExtended;
        return result;
    };
    // NOT in use currently - maybe for future (Hyper-V)
    VmSizeCal.prototype.hvVmSize = function (data) {
        var monthDays = 30.44 * data.historicPerfData;
        var result = data.hvVmCount *
            ((288 * 7 + 13 * monthDays) *
                (20 + 8 * 3 * data.haAvNumVdVm + 3 * data.hvAvNumNicsVm) +
                (48 * 7 + 2 * monthDays) * (2 + 2 * data.haAvNumVdVm) +
                (48 * 7 + 4 * monthDays) * (2 * data.hvAvNumGdVm)) *
            this.unknown.unknownParamExtended;
        return result;
    };
    // Typical calculation
    VmSizeCal.prototype.vmSizet = function () {
        var monthDays = 30.44 * this.settings.historicPerfData;
        var vmCount = this.settings.vmQty; // changed the name so it doesn't break
        var result = vmCount *
            ((288 * 7 + 13 * monthDays) *
                (47 +
                    13 * this.settings.avNumDsOneVm +
                    5 * this.settings.avNicsVM +
                    6 * this.settings.avNumVDisksVm) +
                (48 * 7 + 2 * monthDays) *
                    (2 * (this.settings.avNumDsOneVm + this.settings.avNumGDiskVm))) *
            this.unknown.unknownParamExtended;
        return result;
    };
    // NOT in use currently - maybe for future (Hyper-V)
    VmSizeCal.prototype.hvVmSizet = function (data) {
        var monthDays = 30.44 * data.historicPerfData;
        var result = data.hvVmCount *
            ((288 * 7 + 13 * monthDays) *
                (28 + 8 * 3 * data.haAvNumVdVm + 9 * data.haAvNumVdVm) +
                (48 * 7 + 2 * monthDays) *
                    (2 + 2 * data.haAvNumVdVm) +
                (48 * 7 + 4 * monthDays) *
                    (2 * data.hvAvNumGdVm)) *
            this.unknown.unknownParamExtended;
        return result;
    };
    return VmSizeCal;
}());
exports.VmSizeCal = VmSizeCal;
//# sourceMappingURL=VmSize.js.map