"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostSizeCal = void 0;
var UnknownParam_1 = require("./UnknownParam");
var HostSizeCal = /** @class */ (function () {
    function HostSizeCal(settings) {
        this.unknown = new UnknownParam_1.Unknown();
        this.settings = settings;
    }
    // Advanced
    HostSizeCal.prototype.hostSize = function () {
        var monthDays = 30.44 * this.settings.historicPerfData;
        var result = this.settings.hostQty *
            (288 * 7 + 13 * monthDays) *
            (49 +
                (12 * this.settings.datastoreQty) / this.settings.hostQty +
                9 * this.settings.avNicsHost +
                6 * (this.settings.avSdPerHost + this.settings.avSpPerHost)) *
            this.unknown.unknownParamExtended;
        return result;
    };
    // will probably delete
    HostSizeCal.prototype.hvHosts = function (data) {
        var monthDays = 30.44 * data.historicPerfData;
        var result = data.hvHosts *
            (96 * 7 + 13 * monthDays) *
            (24 + 6 * data.hvAvNumVol + 5 * data.hvAvNumNics) *
            this.unknown.unknownParamExtended;
        return result;
    };
    // Typical
    HostSizeCal.prototype.hostSizet = function () {
        var result = this.settings.hostQty *
            (288 * 7 + 13 * (30.44 * this.settings.historicPerfData)) *
            (55 +
                (12 * this.settings.datastoreQty) / this.settings.hostQty +
                11 * this.settings.avNicsHost +
                7 * (this.settings.avSdPerHost + this.settings.avSpPerHost)) *
            this.unknown.unknownParamExtended;
        return result;
    };
    HostSizeCal.prototype.hvHostst = function (data) {
        var result = data.hvHosts *
            (288 * 7 + 13 * (30.44 * data.historicPerfData)) *
            (46 +
                6 * data.hvAvNumVol +
                10 * data.hvAvNumNics +
                6 * data.avVswitchHost) *
            this.unknown.unknownParamExtended;
        return result;
    };
    return HostSizeCal;
}());
exports.HostSizeCal = HostSizeCal;
//# sourceMappingURL=HostSize.js.map