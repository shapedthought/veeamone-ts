"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VbrDbTime = void 0;
var VbrDbTime = /** @class */ (function () {
    function VbrDbTime(settings) {
        this.settings = settings;
    }
    VbrDbTime.prototype.vbrDb = function () {
        var result = ((this.settings.historicPerfData / 12) *
            this.settings.vbrServers *
            this.settings.vbrAvJobsServer *
            (365 * 2179 +
                365 * 1436 * this.settings.vmsPerJobRatio +
                366 * 3262 * this.settings.vbrRestore)) /
            1024 /
            1024 /
            1024;
        return result;
    };
    return VbrDbTime;
}());
exports.VbrDbTime = VbrDbTime;
//# sourceMappingURL=VbrDbTime.js.map