"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeeamSettings = exports.InfraSettings = void 0;
var InfraSettings = /** @class */ (function () {
    function InfraSettings() {
        // Calculation ratios
        this.datastoreRatio = 200; // vm to datastore ratio
        this.rPoolRatio = 100; // vm to resource pool ratio
        this.clusterRatio = 10; // host to clusters
        this.vappRatio = 50; // vm to vapp ratio
        //Average values
        this.avNumDsOneVm = 0; // Average datastores with one vm- not changeable
        this.avNicsHost = 4;
        this.avNicsVM = 1;
        this.avNumVDisksVm = 3;
        this.avNumGDiskVm = 0;
        this.avSdPerHost = 2;
        this.avSpPerHost = 2; // used by host data size
        this.historicPerfData = 12;
        this.eventsHistory = 12;
        // These are calculated values is using simple mode
        this.vmThreashold = 1500;
        this.vmQty = 0;
        this.hostQty = 0;
        this.resourcePoolQty = 0;
        this.clusterQty = 0;
        this.vappQty = 0;
        this.datastoreQty = 0;
    }
    InfraSettings.prototype.updateQty = function (vmCount, hosts) {
        // calculate these values based on the VM count
        // in simple mode.
        this.vmQty = vmCount;
        this.hostQty = hosts;
        this.resourcePoolQty = Math.ceil(vmCount / this.rPoolRatio);
        this.clusterQty = Math.ceil(hosts / this.clusterRatio);
        this.vappQty = Math.ceil(vmCount / this.vappRatio);
        this.datastoreQty = Math.ceil(vmCount / this.datastoreRatio);
    };
    // To be used when you run advanced
    InfraSettings.prototype.getSettings = function () {
        return {
            vmThreashold: this.vmThreashold,
            resourcePoolQty: this.resourcePoolQty,
            clusterQty: this.clusterQty,
            vappQty: this.vappQty,
            datastoreQty: this.datastoreQty,
            avNicsHost: this.avNicsHost,
            avNumVDisksVm: this.avNumVDisksVm,
            avNumGDiskVm: this.avNumGDiskVm,
            avSdPerHost: this.avSdPerHost,
            avSpPerHost: this.avSpPerHost,
            historicPerfData: this.historicPerfData,
            eventsHistory: this.eventsHistory,
            avNicsVM: this.avNicsVM
        };
    };
    Object.defineProperty(InfraSettings.prototype, "updateSettings", {
        set: function (data) {
            this.avNicsHost = data.avNicsHost;
            this.avNumVDisksVm = data.avNumVDisksVm;
            this.avNumGDiskVm = data.avNumGDiskVm;
            this.avSdPerHost = data.avSdPerHost;
            this.historicPerfData = data.historicPerfData;
            this.eventsHistory = data.eventsHistory;
            this.vmQty = data.vmQty;
            this.hostQty = data.hostQty;
            this.clusterQty = data.clusterQty;
            this.vappQty = data.vappQty;
            this.datastoreQty = data.datastoreQty;
            this.avNicsVM = data.avNicsVM;
        },
        enumerable: false,
        configurable: true
    });
    return InfraSettings;
}());
exports.InfraSettings = InfraSettings;
var VeeamSettings = /** @class */ (function () {
    function VeeamSettings() {
        // Veeam ratios
        this.vbrVmRatio = 1500;
        this.proxyToVmRatio = 400;
        this.repoRatio = 2;
        this.wanAccRatio = 0;
        this.vmsPerJobRatio = 70;
        this.jobsRatio = 70;
        this.restoreRatio = 1000;
        // Calculated values
        this.entermanQty = 1; // hard coded
        this.vbrServers = 1;
        this.vbrAvNumProxy = 0; // Average number of Proxy  per VBR
        this.vbrAvNumRepo = 0; // Average number of Repositories  per VBR
        this.vbrAvJobsServer = 0; // Average number of Jobs per backup server
        this.vbrAvNumWan = 0; // Average number of WAN Accelerators  per VBR - hardcoded
        this.vbrRestore = 0;
        // non-calculated
        this.vmQty = 0;
        this.historicPerfData = 12;
        this.eventsHistory = 12;
    }
    VeeamSettings.prototype.updateQty = function (vmCount) {
        this.vmQty = vmCount;
        this.vbrServers = Math.ceil(vmCount / this.vbrVmRatio);
        this.vbrAvNumRepo = Math.ceil(this.vbrServers * this.repoRatio);
        this.vbrAvNumProxy = Math.ceil(this.proxyCal());
        this.vbrAvJobsServer = Math.ceil(vmCount / this.jobsRatio) / this.vbrServers;
        this.vbrRestore = Math.ceil(vmCount / this.restoreRatio);
    };
    VeeamSettings.prototype.updateSettings = function (historicPerfData, eventsHistory) {
        this.historicPerfData = historicPerfData;
        this.eventsHistory = eventsHistory;
    };
    VeeamSettings.prototype.proxyCal = function () {
        var calculation = ((((this.vmQty * 51200) * 0.05) / (8 * 3600)) / 25);
        return calculation;
    };
    return VeeamSettings;
}());
exports.VeeamSettings = VeeamSettings;
//# sourceMappingURL=Settings.js.map