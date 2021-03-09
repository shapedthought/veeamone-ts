"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsDataCal = void 0;
var EventsDataCal = /** @class */ (function () {
    function EventsDataCal(settings) {
        this.settings = settings;
    }
    EventsDataCal.prototype.eventsData = function () {
        var vmCount = this.settings.vmQty;
        var result = ((vmCount * 28.6 +
            this.settings.hostQty * 765.8 +
            this.settings.datastoreQty * 7.3 +
            this.settings.clusterQty * 6.2 +
            this.settings.vappQty * 0.1) *
            (30.44 * this.settings.eventsHistory)) /
            1024 /
            1024;
        return result;
    };
    EventsDataCal.prototype.hvEventsData = function (data) {
        var result = ((data.vmCount * 0.1 + data.hosts * 527.2) * (30.44 * this.settings.eventsHistory)) /
            1024 /
            1024;
        return result;
    };
    return EventsDataCal;
}());
exports.EventsDataCal = EventsDataCal;
//# sourceMappingURL=EventsData.js.map