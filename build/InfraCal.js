"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var infraCal = /** @class */ (function () {
    function infraCal(vmCount, hosts, settings) {
        this.vmCount = vmCount;
        this.hosts = hosts;
        this.datastores = settings.datastoreRatio * this.hosts;
    }
    // datastores calculated from ratio 
    infraCal.prototype.datastoreCal = function () {
    };
    return infraCal;
}());
//# sourceMappingURL=InfraCal.js.map