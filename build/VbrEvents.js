"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VbrEventsCal = void 0;
var VbrEventsCal = /** @class */ (function () {
    function VbrEventsCal(settings) {
        this.settings = settings;
    }
    VbrEventsCal.prototype.vbrEvents = function () {
        var result = ((this.settings.entermanQty * 0.47 + //data.vbrNumVbrEn
            this.settings.vbrServers * 1963 +
            this.settings.vbrAvNumRepo * this.settings.vbrServers * 0.18 +
            this.settings.vbrAvNumProxy * this.settings.vbrServers * 0.37 +
            this.settings.vbrAvNumWan * this.settings.vbrServers * 0.55) *
            (30.44 * this.settings.eventsHistory)) /
            1024 /
            1024;
        return result;
    };
    return VbrEventsCal;
}());
exports.VbrEventsCal = VbrEventsCal;
//# sourceMappingURL=VbrEvents.js.map