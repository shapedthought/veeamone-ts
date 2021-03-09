"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceSize = void 0;
var UnknownParam_1 = require("./UnknownParam");
var PerformanceSize = /** @class */ (function () {
    function PerformanceSize(veeamSettings) {
        this.unknown = new UnknownParam_1.Unknown();
        this.vbrSettings = veeamSettings;
    }
    PerformanceSize.prototype.vbrPerfold = function () {
        var monthDays = 30.44 * this.vbrSettings.historicPerfData;
        var timeVar1 = (96 * 7) + (13 * monthDays);
        var timeVar2 = (96 * 7) + (25 * monthDays);
        var timeVar3 = (24 * 7) + (2 * monthDays);
        var result = ((this.vbrSettings.entermanQty + this.vbrSettings.vbrServers) *
            timeVar1 *
            12 +
            this.vbrSettings.vbrAvNumRepo *
                this.vbrSettings.vbrServers *
                ((timeVar1 * 9 + timeVar2 + timeVar3) * 2) +
            this.vbrSettings.vbrAvNumProxy *
                this.vbrSettings.vbrServers *
                ((timeVar1 * 15 + timeVar2) * 3) +
            this.vbrSettings.vbrAvNumWan *
                this.vbrSettings.vbrServers *
                timeVar1 *
                11 +
            this.vbrSettings.vbrAvJobsServer *
                this.vbrSettings.vbrServers *
                timeVar1 *
                2 +
            timeVar2 * (4 + 184 * this.vbrSettings.vbrServers)) *
            this.unknown.unknownParamExtended;
        return result;
    };
    PerformanceSize.prototype.vbrPerf = function () {
        var monthDays = 30.44 * this.vbrSettings.historicPerfData;
        var timeVar1 = (96 * 7) + (13 * monthDays);
        var timeVar2 = (96 * 7) + (25 * monthDays);
        var timeVar3 = (24 * 7) + (2 * monthDays);
        var part1 = (((this.vbrSettings.entermanQty + this.vbrSettings.vbrServers) * timeVar1) * 12);
        var part2 = ((this.vbrSettings.vbrAvNumRepo * this.vbrSettings.vbrServers) * ((timeVar1 * 9) + (timeVar2 * 1) + (timeVar3 * 2)));
        var part3 = ((this.vbrSettings.vbrAvNumProxy * this.vbrSettings.vbrServers) * ((timeVar1 * 15) + (timeVar2 * 3)));
        var part4 = ((this.vbrSettings.vbrAvNumWan * this.vbrSettings.vbrServers) * ((timeVar3 * 11)));
        var part5 = (((this.vbrSettings.vbrAvJobsServer * this.vbrSettings.vbrServers) * timeVar1) * 2);
        var part6 = ((24 * 7) + (25 * monthDays)) * (4 + (184 * this.vbrSettings.vbrServers));
        var returnVal = (part1 + part2 + part3 + part4 + part5 + part6) * this.unknown.unknownParamExtended;
        return returnVal;
    };
    PerformanceSize.prototype.vbrPerft = function () {
        var monthDays = 30.44 * this.vbrSettings.historicPerfData;
        var timeVar1 = (96 * 7) + (13 * monthDays);
        var timeVar2 = (96 * 7) + (25 * monthDays);
        var result = ((this.vbrSettings.entermanQty + this.vbrSettings.vbrServers) *
            timeVar1 *
            12 +
            this.vbrSettings.vbrAvNumRepo *
                this.vbrSettings.vbrServers *
                (timeVar1 * 14 + timeVar2 * 1 + (168 + 2 * monthDays) * 2) +
            this.vbrSettings.vbrAvNumProxy *
                this.vbrSettings.vbrServers *
                (timeVar1 * 15 + timeVar2 * 3) +
            this.vbrSettings.vbrAvNumWan *
                this.vbrSettings.vbrServers *
                timeVar1 *
                14 +
            this.vbrSettings.vbrAvJobsServer *
                this.vbrSettings.vbrServers *
                timeVar1 *
                2 +
            (168 + 25 * monthDays) *
                (4 +
                    4 *
                        this.vbrSettings.vbrAvJobsServer *
                        this.vbrSettings.vbrServers)) *
            this.unknown.unknownParamExtended;
        return result;
    };
    return PerformanceSize;
}());
exports.PerformanceSize = PerformanceSize;
//# sourceMappingURL=PerformanceSize.js.map