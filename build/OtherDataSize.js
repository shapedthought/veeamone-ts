"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtherDataSizeCal = void 0;
var UnknownParam_1 = require("./UnknownParam");
var OtherDataSizeCal = /** @class */ (function () {
    function OtherDataSizeCal(settings) {
        this.unknown = new UnknownParam_1.Unknown();
        this.settings = settings;
    }
    OtherDataSizeCal.prototype.otherData = function () {
        var monthDays = 30.44 * this.settings.historicPerfData;
        var result = ((this.settings.resourcePoolQty + this.settings.vappQty) * (288 * 7 + 13 * monthDays) * 24 +
            this.settings.clusterQty * (288 * 7 + 13 * monthDays) * 27) *
            this.unknown.unknownParamExtended;
        return result;
    };
    OtherDataSizeCal.prototype.hvOtherData = function (data) {
        var monthDays = 30.44 * data.historicPerfData;
        var result = (5 * ((96 * 7 + 13 * monthDays) * 2 + (48 * 7 + 3 * monthDays) * 1) +
            this.unknown.unknownParam *
                ((96 * 7 + 13 * monthDays) * 2 + (48 * 7 + 3 * monthDays) * 1)) *
            this.unknown.unknownParamExtended;
        return result;
    };
    // has clusters which the other doesn't
    OtherDataSizeCal.prototype.otherDatat = function () {
        var monthDays = 30.44 * this.settings.historicPerfData;
        var result = ((this.settings.resourcePoolQty + this.settings.vappQty) * (288 * 7 + 13 * monthDays) * 46 +
            this.settings.clusterQty * (288 * 7 + 13 * monthDays) * 56) *
            this.unknown.unknownParamExtended;
        return result;
    };
    // different interface to the advanced version
    OtherDataSizeCal.prototype.hvOtherDatat = function (data) {
        var monthDays = 30.44 * data.historicPerfData;
        var result = (5 * ((288 * 7 + 13 * monthDays) * 7 + (48 * 7 + 3 * monthDays) * 3) +
            data.hvNumCsv *
                ((288 * 7 + 13 * monthDays) * (18 + 2) +
                    (48 * 7 + 3 * monthDays) * 3)) *
            this.unknown.unknownParamExtended;
        return result;
    };
    return OtherDataSizeCal;
}());
exports.OtherDataSizeCal = OtherDataSizeCal;
//# sourceMappingURL=OtherDataSize.js.map