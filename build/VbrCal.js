"use strict";
// Class to run the VBR calculations based on predetermined figures
Object.defineProperty(exports, "__esModule", { value: true });
exports.VbrCal = void 0;
var VbrCal = /** @class */ (function () {
    function VbrCal() {
    }
    VbrCal.prototype.vbrServerCal = function (vmCount) {
        return Math.ceil(vmCount / 1500);
    };
    VbrCal.prototype.vbrRepoCal = function (vbrServers) {
        return vbrServers * 4;
    };
    VbrCal.prototype.vbrProxyCal = function (vbrRepo) {
        return vbrRepo * 4; // should this be on capacity?
    };
    VbrCal.prototype.vbrJobsCal = function (vmCount) {
        return Math.ceil(vmCount / 70); // set the job count based on the vm count at 70 VMs per job
    };
    VbrCal.prototype.vbrCalRestore = function (vmCount) {
        return Math.ceil(vmCount / 100); // figure I just came up with
    };
    return VbrCal;
}());
exports.VbrCal = VbrCal;
//# sourceMappingURL=VbrCal.js.map