"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStoreSizeCal = void 0;
var UnknownParam_1 = require("./UnknownParam");
var DataStoreSizeCal = /** @class */ (function () {
    function DataStoreSizeCal(settings) {
        this.unknown = new UnknownParam_1.Unknown();
        this.settings = settings;
    }
    DataStoreSizeCal.prototype.datastoreSize = function () {
        var monthDays = 30.44 * this.settings.historicPerfData;
        var result = this.settings.datastoreQty *
            ((96 * 7 + 13 * monthDays) * 10 + (48 * 7 + 2 * monthDays) * 2) *
            this.unknown.unknownParamExtended;
        return result;
    };
    DataStoreSizeCal.prototype.datastoreSizet = function () {
        var monthDays = 30.44 * this.settings.historicPerfData;
        var result = this.settings.datastoreQty *
            ((288 * 7 + 13 * monthDays) * 10 +
                (48 * 7 + 2 * monthDays) * 2) *
            this.unknown.unknownParamExtended;
        return result;
    };
    return DataStoreSizeCal;
}());
exports.DataStoreSizeCal = DataStoreSizeCal;
//# sourceMappingURL=DatastoreSize.js.map