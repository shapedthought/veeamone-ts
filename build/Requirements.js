"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Requirements = void 0;
var Settings_1 = require("./Settings");
var VmSize_1 = require("./VmSize");
var DatastoreSize_1 = require("./DatastoreSize");
var HostSize_1 = require("./HostSize");
var OtherDataSize_1 = require("./OtherDataSize");
var EventsData_1 = require("./EventsData");
var PerformanceSize_1 = require("./PerformanceSize");
var VbrEvents_1 = require("./VbrEvents");
var VbrDbTime_1 = require("./VbrDbTime");
var Requirements = /** @class */ (function () {
    function Requirements() {
        this.vmCap = 0;
        this.hostCap = 0;
        this.dataStoreCap = 0;
        this.otherData = 0;
        this.eventsData = 0;
        this.vbrPerfData = 0;
        this.vbrEventsData = 0;
        this.vbrDbTimeData = 0;
        this.settings = new Settings_1.InfraSettings();
        this.veeamSettings = new Settings_1.VeeamSettings();
    }
    // update the Infra settings- used with advanced only
    Requirements.prototype.updateInfraSettings = function (settings) {
        settings.updateSettings = settings;
    };
    // update the Veeam settings - used with advanced only
    Requirements.prototype.updateVeeamSettings = function (historicPerfData, eventsHistory) {
        this.veeamSettings.updateSettings(historicPerfData, eventsHistory);
    };
    Requirements.prototype.getResults = function () {
        return 1;
    };
    Requirements.prototype.runCal = function (vmCount, hosts) {
        this.settings.updateQty(vmCount, hosts);
        this.veeamSettings.updateQty(vmCount);
        console.log("\n        vbr servers: " + this.veeamSettings.vbrServers + "\n        Proxies: " + this.veeamSettings.vbrAvNumProxy + "\n        Repos: " + this.veeamSettings.vbrAvNumRepo + ",\n        Jobs: " + this.veeamSettings.vbrAvJobsServer + ",\n        vms per-job: " + this.veeamSettings.vmsPerJobRatio + ",\n        Restore: " + this.veeamSettings.vbrRestore + ",\n        ");
        var vmSizeCapCal = new VmSize_1.VmSizeCal(this.settings);
        var hostSizeCal = new HostSize_1.HostSizeCal(this.settings);
        var datastoreSizeCal = new DatastoreSize_1.DataStoreSizeCal(this.settings);
        var otherDataSizeCal = new OtherDataSize_1.OtherDataSizeCal(this.settings);
        var eventsDataSizeCal = new EventsData_1.EventsDataCal(this.settings);
        var vbrPerfDataSizeCal = new PerformanceSize_1.PerformanceSize(this.veeamSettings);
        var vbrEventsDataSizeCal = new VbrEvents_1.VbrEventsCal(this.veeamSettings);
        var vbrDbTimeSizeCal = new VbrDbTime_1.VbrDbTime(this.veeamSettings);
        // check the threashold then run typical or advanced
        if (vmCount < this.settings.vmThreashold) {
            // Advanced
            this.vmCap = vmSizeCapCal.vmSizet();
            this.hostCap = hostSizeCal.hostSizet();
            this.dataStoreCap = datastoreSizeCal.datastoreSizet();
            this.otherData = otherDataSizeCal.otherDatat();
            this.eventsData = eventsDataSizeCal.eventsData(); // same for both
            this.vbrPerfData = vbrPerfDataSizeCal.vbrPerft();
            this.vbrEventsData = vbrEventsDataSizeCal.vbrEvents();
            this.vbrDbTimeData = vbrDbTimeSizeCal.vbrDb();
        }
        else {
            // Typical
            this.vmCap = vmSizeCapCal.vmSize();
            this.hostCap = hostSizeCal.hostSize();
            this.dataStoreCap = datastoreSizeCal.datastoreSize();
            this.otherData = otherDataSizeCal.otherData();
            this.eventsData = eventsDataSizeCal.eventsData();
            this.vbrPerfData = vbrPerfDataSizeCal.vbrPerf();
            this.vbrEventsData = vbrEventsDataSizeCal.vbrEvents();
            this.vbrDbTimeData = vbrDbTimeSizeCal.vbrDb();
        }
        var totalCap = (this.vmCap + this.hostCap + this.dataStoreCap + this.otherData + this.eventsData + this.vbrPerfData + this.vbrEventsData + this.vbrDbTimeData) * 1.2;
        var data = {
            "vmCap": this.vmCap,
            "hostCap": this.hostCap,
            "dataStoreCap": this.dataStoreCap,
            "otherData": this.otherData,
            "eventsData": this.eventsData,
            "vbrPerfData": this.vbrPerfData,
            "vbrEventsData": this.vbrEventsData,
            "vbrDbTimeData": this.vbrDbTimeData,
            "totalCap": totalCap,
            "settings": this.settings
        };
        return data;
    };
    return Requirements;
}());
exports.Requirements = Requirements;
//# sourceMappingURL=Requirements.js.map