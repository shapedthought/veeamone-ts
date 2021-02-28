// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Settings.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VeeamSettings = exports.InfraSettings = void 0;

var InfraSettings =
/** @class */
function () {
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
    this.eventsHistory = 12; // These are calculated values is using simple mode

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
  }; // To be used when you run advanced


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
    set: function set(data) {
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
}();

exports.InfraSettings = InfraSettings;

var VeeamSettings =
/** @class */
function () {
  function VeeamSettings() {
    // Veeam ratios
    this.vbrVmRatio = 1500;
    this.proxyToVmRatio = 400;
    this.repoRatio = 2;
    this.wanAccRatio = 0;
    this.vmsPerJobRatio = 70;
    this.jobsRatio = 70;
    this.restoreRatio = 1000; // Calculated values

    this.entermanQty = 1; // hard coded

    this.vbrServers = 1;
    this.vbrAvNumProxy = 0; // Average number of Proxy  per VBR

    this.vbrAvNumRepo = 0; // Average number of Repositories  per VBR

    this.vbrAvJobsServer = 0; // Average number of Jobs per backup server

    this.vbrAvNumWan = 0; // Average number of WAN Accelerators  per VBR - hardcoded

    this.vbrRestore = 0; // non-calculated

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
    var calculation = this.vmQty * 51200 * 0.05 / (8 * 3600) / 25;
    return calculation;
  };

  return VeeamSettings;
}();

exports.VeeamSettings = VeeamSettings;
},{}],"UnknownParam.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Unknown = void 0;

var Unknown =
/** @class */
function () {
  function Unknown() {
    this.unknownParam = 0.113828584342402;
    this.unknownParamExtended = 0.113828584342402 / 1024 / 1024;
  }

  return Unknown;
}();

exports.Unknown = Unknown;
},{}],"VmSize.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VmSizeCal = void 0;

var UnknownParam_1 = require("./UnknownParam"); // need to create each class passing in the settings object


var VmSizeCal =
/** @class */
function () {
  function VmSizeCal(settings) {
    this.unknown = new UnknownParam_1.Unknown();
    this.settings = settings;
  } // Advanced calculation


  VmSizeCal.prototype.vmSize = function () {
    var monthDays = 30.44 * this.settings.historicPerfData;
    var vmCount = this.settings.vmQty; // changed the name so it doesn't break

    var result = vmCount * ((96 * 7 + 13 * monthDays) * (43 + 10 * this.settings.avNumDsOneVm + 5 * this.settings.avNicsVM + 6 * this.settings.avNumVDisksVm) + (48 * 7 + 2 * monthDays) * (2 * (this.settings.avNumDsOneVm + this.settings.avNumGDiskVm))) * this.unknown.unknownParamExtended;
    return result;
  }; // NOT in use currently - maybe for future (Hyper-V)


  VmSizeCal.prototype.hvVmSize = function (data) {
    var monthDays = 30.44 * data.historicPerfData;
    var result = data.hvVmCount * ((288 * 7 + 13 * monthDays) * (20 + 8 * 3 * data.haAvNumVdVm + 3 * data.hvAvNumNicsVm) + (48 * 7 + 2 * monthDays) * (2 + 2 * data.haAvNumVdVm) + (48 * 7 + 4 * monthDays) * (2 * data.hvAvNumGdVm)) * this.unknown.unknownParamExtended;
    return result;
  }; // Typical calculation


  VmSizeCal.prototype.vmSizet = function () {
    var monthDays = 30.44 * this.settings.historicPerfData;
    var vmCount = this.settings.vmQty; // changed the name so it doesn't break

    var result = vmCount * ((288 * 7 + 13 * monthDays) * (47 + 13 * this.settings.avNumDsOneVm + 5 * this.settings.avNicsVM + 6 * this.settings.avNumVDisksVm) + (48 * 7 + 2 * monthDays) * (2 * (this.settings.avNumDsOneVm + this.settings.avNumGDiskVm))) * this.unknown.unknownParamExtended;
    return result;
  }; // NOT in use currently - maybe for future (Hyper-V)


  VmSizeCal.prototype.hvVmSizet = function (data) {
    var monthDays = 30.44 * data.historicPerfData;
    var result = data.hvVmCount * ((288 * 7 + 13 * monthDays) * (28 + 8 * 3 * data.haAvNumVdVm + 9 * data.haAvNumVdVm) + (48 * 7 + 2 * monthDays) * (2 + 2 * data.haAvNumVdVm) + (48 * 7 + 4 * monthDays) * (2 * data.hvAvNumGdVm)) * this.unknown.unknownParamExtended;
    return result;
  };

  return VmSizeCal;
}();

exports.VmSizeCal = VmSizeCal;
},{"./UnknownParam":"UnknownParam.ts"}],"DatastoreSize.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataStoreSizeCal = void 0;

var UnknownParam_1 = require("./UnknownParam");

var DataStoreSizeCal =
/** @class */
function () {
  function DataStoreSizeCal(settings) {
    this.unknown = new UnknownParam_1.Unknown();
    this.settings = settings;
  }

  DataStoreSizeCal.prototype.datastoreSize = function () {
    var monthDays = 30.44 * this.settings.historicPerfData;
    var result = this.settings.datastoreQty * ((96 * 7 + 13 * monthDays) * 10 + (48 * 7 + 2 * monthDays) * 2) * this.unknown.unknownParamExtended;
    return result;
  };

  DataStoreSizeCal.prototype.datastoreSizet = function () {
    var monthDays = 30.44 * this.settings.historicPerfData;
    var result = this.settings.datastoreQty * ((288 * 7 + 13 * monthDays) * 10 + (48 * 7 + 2 * monthDays) * 2) * this.unknown.unknownParamExtended;
    return result;
  };

  return DataStoreSizeCal;
}();

exports.DataStoreSizeCal = DataStoreSizeCal;
},{"./UnknownParam":"UnknownParam.ts"}],"HostSize.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HostSizeCal = void 0;

var UnknownParam_1 = require("./UnknownParam");

var HostSizeCal =
/** @class */
function () {
  function HostSizeCal(settings) {
    this.unknown = new UnknownParam_1.Unknown();
    this.settings = settings;
  } // Advanced


  HostSizeCal.prototype.hostSize = function () {
    var monthDays = 30.44 * this.settings.historicPerfData;
    var result = this.settings.hostQty * (288 * 7 + 13 * monthDays) * (49 + 12 * this.settings.datastoreQty / this.settings.hostQty + 9 * this.settings.avNicsHost + 6 * (this.settings.avSdPerHost + this.settings.avSpPerHost)) * this.unknown.unknownParamExtended;
    return result;
  }; // will probably delete


  HostSizeCal.prototype.hvHosts = function (data) {
    var monthDays = 30.44 * data.historicPerfData;
    var result = data.hvHosts * (96 * 7 + 13 * monthDays) * (24 + 6 * data.hvAvNumVol + 5 * data.hvAvNumNics) * this.unknown.unknownParamExtended;
    return result;
  }; // Typical


  HostSizeCal.prototype.hostSizet = function () {
    var result = this.settings.hostQty * (288 * 7 + 13 * (30.44 * this.settings.historicPerfData)) * (55 + 12 * this.settings.datastoreQty / this.settings.hostQty + 11 * this.settings.avNicsHost + 7 * (this.settings.avSdPerHost + this.settings.avSpPerHost)) * this.unknown.unknownParamExtended;
    return result;
  };

  HostSizeCal.prototype.hvHostst = function (data) {
    var result = data.hvHosts * (288 * 7 + 13 * (30.44 * data.historicPerfData)) * (46 + 6 * data.hvAvNumVol + 10 * data.hvAvNumNics + 6 * data.avVswitchHost) * this.unknown.unknownParamExtended;
    return result;
  };

  return HostSizeCal;
}();

exports.HostSizeCal = HostSizeCal;
},{"./UnknownParam":"UnknownParam.ts"}],"OtherDataSize.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OtherDataSizeCal = void 0;

var UnknownParam_1 = require("./UnknownParam");

var OtherDataSizeCal =
/** @class */
function () {
  function OtherDataSizeCal(settings) {
    this.unknown = new UnknownParam_1.Unknown();
    this.settings = settings;
  }

  OtherDataSizeCal.prototype.otherData = function () {
    var monthDays = 30.44 * this.settings.historicPerfData;
    var result = ((this.settings.resourcePoolQty + this.settings.vappQty) * (288 * 7 + 13 * monthDays) * 24 + this.settings.clusterQty * (288 * 7 + 13 * monthDays) * 27) * this.unknown.unknownParamExtended;
    return result;
  };

  OtherDataSizeCal.prototype.hvOtherData = function (data) {
    var monthDays = 30.44 * data.historicPerfData;
    var result = (5 * ((96 * 7 + 13 * monthDays) * 2 + (48 * 7 + 3 * monthDays) * 1) + this.unknown.unknownParam * ((96 * 7 + 13 * monthDays) * 2 + (48 * 7 + 3 * monthDays) * 1)) * this.unknown.unknownParamExtended;
    return result;
  }; // has clusters which the other doesn't


  OtherDataSizeCal.prototype.otherDatat = function () {
    var monthDays = 30.44 * this.settings.historicPerfData;
    var result = ((this.settings.resourcePoolQty + this.settings.vappQty) * (288 * 7 + 13 * monthDays) * 46 + this.settings.clusterQty * (288 * 7 + 13 * monthDays) * 56) * this.unknown.unknownParamExtended;
    return result;
  }; // different interface to the advanced version


  OtherDataSizeCal.prototype.hvOtherDatat = function (data) {
    var monthDays = 30.44 * data.historicPerfData;
    var result = (5 * ((288 * 7 + 13 * monthDays) * 7 + (48 * 7 + 3 * monthDays) * 3) + data.hvNumCsv * ((288 * 7 + 13 * monthDays) * (18 + 2) + (48 * 7 + 3 * monthDays) * 3)) * this.unknown.unknownParamExtended;
    return result;
  };

  return OtherDataSizeCal;
}();

exports.OtherDataSizeCal = OtherDataSizeCal;
},{"./UnknownParam":"UnknownParam.ts"}],"EventsData.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventsDataCal = void 0;

var EventsDataCal =
/** @class */
function () {
  function EventsDataCal(settings) {
    this.settings = settings;
  }

  EventsDataCal.prototype.eventsData = function () {
    var vmCount = this.settings.vmQty;
    var result = (vmCount * 28.6 + this.settings.hostQty * 765.8 + this.settings.datastoreQty * 7.3 + this.settings.clusterQty * 6.2 + this.settings.vappQty * 0.1) * (30.44 * this.settings.eventsHistory) / 1024 / 1024;
    return result;
  };

  EventsDataCal.prototype.hvEventsData = function (data) {
    var result = (data.vmCount * 0.1 + data.hosts * 527.2) * (30.44 * this.settings.eventsHistory) / 1024 / 1024;
    return result;
  };

  return EventsDataCal;
}();

exports.EventsDataCal = EventsDataCal;
},{}],"PerformanceSize.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerformanceSize = void 0;

var UnknownParam_1 = require("./UnknownParam");

var PerformanceSize =
/** @class */
function () {
  function PerformanceSize(veeamSettings) {
    this.unknown = new UnknownParam_1.Unknown();
    this.vbrSettings = veeamSettings;
  }

  PerformanceSize.prototype.vbrPerfold = function () {
    var monthDays = 30.44 * this.vbrSettings.historicPerfData;
    var timeVar1 = 96 * 7 + 13 * monthDays;
    var timeVar2 = 96 * 7 + 25 * monthDays;
    var timeVar3 = 24 * 7 + 2 * monthDays;
    var result = ((this.vbrSettings.entermanQty + this.vbrSettings.vbrServers) * timeVar1 * 12 + this.vbrSettings.vbrAvNumRepo * this.vbrSettings.vbrServers * ((timeVar1 * 9 + timeVar2 + timeVar3) * 2) + this.vbrSettings.vbrAvNumProxy * this.vbrSettings.vbrServers * ((timeVar1 * 15 + timeVar2) * 3) + this.vbrSettings.vbrAvNumWan * this.vbrSettings.vbrServers * timeVar1 * 11 + this.vbrSettings.vbrAvJobsServer * this.vbrSettings.vbrServers * timeVar1 * 2 + timeVar2 * (4 + 184 * this.vbrSettings.vbrServers)) * this.unknown.unknownParamExtended;
    return result;
  };

  PerformanceSize.prototype.vbrPerf = function () {
    var monthDays = 30.44 * this.vbrSettings.historicPerfData;
    var timeVar1 = 96 * 7 + 13 * monthDays;
    var timeVar2 = 96 * 7 + 25 * monthDays;
    var timeVar3 = 24 * 7 + 2 * monthDays;
    var part1 = (this.vbrSettings.entermanQty + this.vbrSettings.vbrServers) * timeVar1 * 12;
    var part2 = this.vbrSettings.vbrAvNumRepo * this.vbrSettings.vbrServers * (timeVar1 * 9 + timeVar2 * 1 + timeVar3 * 2);
    var part3 = this.vbrSettings.vbrAvNumProxy * this.vbrSettings.vbrServers * (timeVar1 * 15 + timeVar2 * 3);
    var part4 = this.vbrSettings.vbrAvNumWan * this.vbrSettings.vbrServers * (timeVar3 * 11);
    var part5 = this.vbrSettings.vbrAvJobsServer * this.vbrSettings.vbrServers * timeVar1 * 2;
    var part6 = (24 * 7 + 25 * monthDays) * (4 + 184 * this.vbrSettings.vbrServers);
    var returnVal = (part1 + part2 + part3 + part4 + part5 + part6) * this.unknown.unknownParamExtended;
    return returnVal;
  };

  PerformanceSize.prototype.vbrPerft = function () {
    var monthDays = 30.44 * this.vbrSettings.historicPerfData;
    var timeVar1 = 96 * 7 + 13 * monthDays;
    var timeVar2 = 96 * 7 + 25 * monthDays;
    var result = ((this.vbrSettings.entermanQty + this.vbrSettings.vbrServers) * timeVar1 * 12 + this.vbrSettings.vbrAvNumRepo * this.vbrSettings.vbrServers * (timeVar1 * 14 + timeVar2 * 1 + (168 + 2 * monthDays) * 2) + this.vbrSettings.vbrAvNumProxy * this.vbrSettings.vbrServers * (timeVar1 * 15 + timeVar2 * 3) + this.vbrSettings.vbrAvNumWan * this.vbrSettings.vbrServers * timeVar1 * 14 + this.vbrSettings.vbrAvJobsServer * this.vbrSettings.vbrServers * timeVar1 * 2 + (168 + 25 * monthDays) * (4 + 4 * this.vbrSettings.vbrAvJobsServer * this.vbrSettings.vbrServers)) * this.unknown.unknownParamExtended;
    return result;
  };

  return PerformanceSize;
}();

exports.PerformanceSize = PerformanceSize;
},{"./UnknownParam":"UnknownParam.ts"}],"VbrEvents.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VbrEventsCal = void 0;

var VbrEventsCal =
/** @class */
function () {
  function VbrEventsCal(settings) {
    this.settings = settings;
  }

  VbrEventsCal.prototype.vbrEvents = function () {
    var result = (this.settings.entermanQty * 0.47 + //data.vbrNumVbrEn
    this.settings.vbrServers * 1963 + this.settings.vbrAvNumRepo * this.settings.vbrServers * 0.18 + this.settings.vbrAvNumProxy * this.settings.vbrServers * 0.37 + this.settings.vbrAvNumWan * this.settings.vbrServers * 0.55) * (30.44 * this.settings.eventsHistory) / 1024 / 1024;
    return result;
  };

  return VbrEventsCal;
}();

exports.VbrEventsCal = VbrEventsCal;
},{}],"VbrDbTime.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VbrDbTime = void 0;

var VbrDbTime =
/** @class */
function () {
  function VbrDbTime(settings) {
    this.settings = settings;
  }

  VbrDbTime.prototype.vbrDb = function () {
    var result = this.settings.historicPerfData / 12 * this.settings.vbrServers * this.settings.vbrAvJobsServer * (365 * 2179 + 365 * 1436 * this.settings.vmsPerJobRatio + 366 * 3262 * this.settings.vbrRestore) / 1024 / 1024 / 1024;
    return result;
  };

  return VbrDbTime;
}();

exports.VbrDbTime = VbrDbTime;
},{}],"index.ts":[function(require,module,exports) {
"use strict"; // Main interface for the app

var _a, _b;

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Settings_1 = require("./Settings");

var VmSize_1 = require("./VmSize");

var DatastoreSize_1 = require("./DatastoreSize");

var HostSize_1 = require("./HostSize");

var OtherDataSize_1 = require("./OtherDataSize");

var EventsData_1 = require("./EventsData");

var PerformanceSize_1 = require("./PerformanceSize");

var VbrEvents_1 = require("./VbrEvents");

var VbrDbTime_1 = require("./VbrDbTime");

(_a = document.getElementById('simpleNextBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
  var _a;

  var vmQty = document.getElementById('vmQty').value;
  var hostQty = document.getElementById('hostQty').value; // create new instance of the requirements class below

  var requirements = new Requirements(); // Check if the advanced is checked

  if (document.getElementById('advancedMode').checked) {
    // Updates the settings for the hypervisor which calculates the requirements based on ratios
    // see the Settings.TS file
    requirements.settings.updateQty(parseInt(vmQty), parseInt(hostQty)); // Get the updated settings and output the results into the second form group

    var settings = requirements.settings.getSettings();
    document.getElementById('advScaleThresh').value = settings.vmThreashold.toString();
    document.getElementById('avNumVDisksVm').value = settings.avNumVDisksVm.toString();
    document.getElementById('clusterQty').value = settings.clusterQty.toString();
    document.getElementById('avNumGDiskVm').value = settings.avNumGDiskVm.toString();
    document.getElementById('avNicsHost').value = settings.avNicsHost.toString();
    document.getElementById('historicPerfData').value = settings.historicPerfData.toString();
    document.getElementById('avSdPerHost').value = settings.avSdPerHost.toString();
    document.getElementById('eventsHistory').value = settings.eventsHistory.toString();
    document.getElementById('vappQty').value = settings.vappQty.toString();
    document.getElementById('datastoreQty').value = settings.datastoreQty.toString();
    document.getElementById('avNicsVM').value = settings.avNicsVM.toString();
    (_a = document.getElementById('advancedForm')) === null || _a === void 0 ? void 0 : _a.classList.toggle('d-none');
  } else {
    // If advanced isn't selected the run the calculation using the ratios only
    requirements.runCal(parseInt(vmQty), parseInt(hostQty)); // Output results to the DOM

    setOutput(requirements);
  }
}); // 

(_b = document.getElementById('advancedNextBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
  // Create a new instances of the Requirements class
  var requirements = new Requirements(); // Grab the updated elements from the form

  var vmQty = parseInt(document.getElementById('vmQty').value);
  var hostQty = parseInt(document.getElementById('hostQty').value);
  var clusterQty = parseInt(document.getElementById('clusterQty').value);
  var avNumVDisksVm = parseInt(document.getElementById('avNumVDisksVm').value);
  var avNumGDiskVm = parseInt(document.getElementById('avNumGDiskVm').value);
  var avNicsHost = parseInt(document.getElementById('avNicsHost').value);
  var historicPerfData = parseInt(document.getElementById('historicPerfData').value);
  var avSdPerHost = parseInt(document.getElementById('avSdPerHost').value);
  var eventsHistory = parseInt(document.getElementById('eventsHistory').value);
  var vappQty = parseInt(document.getElementById('vappQty').value);
  var datastoreQty = parseInt(document.getElementById('datastoreQty').value);
  var avNicsVM = parseInt(document.getElementById('avNicsVM').value); // Create a new single object with the form data

  var data = {
    vmQty: vmQty,
    hostQty: hostQty,
    clusterQty: clusterQty,
    avNumVDisksVm: avNumVDisksVm,
    avNumGDiskVm: avNumGDiskVm,
    avNicsHost: avNicsHost,
    historicPerfData: historicPerfData,
    avSdPerHost: avSdPerHost,
    eventsHistory: eventsHistory,
    vappQty: vappQty,
    datastoreQty: datastoreQty,
    avNicsVM: avNicsVM
  }; // update the settings which uses a "set"

  requirements.settings.updateSettings = data; // Update the veeam settings with the timescales which are the only variable
  // All other settings are calculated from the VM Quantity

  requirements.veeamSettings.updateSettings(historicPerfData, eventsHistory); // Now run the calculation based on the new settings

  requirements.runCal(vmQty, hostQty); // Output the final results to the DOM

  setOutput(requirements);
});

function setOutput(r) {
  var totalCap = (r.vmCap + r.hostCap + r.dataStoreCap + r.otherData + r.eventsData + r.vbrPerfData + r.vbrEventsData + r.vbrDbTimeData) * 1.2;
  document.getElementById('vmDataGB').innerHTML = r.vmCap.toFixed(2);
  document.getElementById('hostDataGB').innerHTML = r.hostCap.toFixed(2);
  document.getElementById('dataStoreGB').innerHTML = r.dataStoreCap.toFixed(2);
  document.getElementById('otherStoreGB').innerHTML = r.otherData.toFixed(2);
  document.getElementById('eventGB').innerHTML = r.eventsData.toFixed(2);
  document.getElementById('vbrperfGB').innerHTML = r.vbrPerfData.toFixed(2);
  document.getElementById('vbrEventGB').innerHTML = r.vbrEventsData.toFixed(2);
  document.getElementById('vbrJobGB').innerHTML = r.vbrDbTimeData.toFixed(2);
  document.getElementById('totalCap').innerHTML = totalCap.toFixed(2);
}

var Requirements =
/** @class */
function () {
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
  } // update the Infra settings- used with advanced only


  Requirements.prototype.updateInfraSettings = function (settings) {
    settings.updateSettings = settings;
  }; // update the Veeam settings - used with advanced only


  Requirements.prototype.updateVeeamSettings = function (historicPerfData, eventsHistory) {
    this.veeamSettings.updateSettings(historicPerfData, eventsHistory);
  };

  Requirements.prototype.runCal = function (vmCount, hosts) {
    this.settings.updateQty(vmCount, hosts);
    this.veeamSettings.updateQty(vmCount);
    console.log("\n      vbr servers: " + this.veeamSettings.vbrServers + "\n      Proxies: " + this.veeamSettings.vbrAvNumProxy + "\n      Repos: " + this.veeamSettings.vbrAvNumRepo + ",\n      Jobs: " + this.veeamSettings.vbrAvJobsServer + ",\n      vms per-job: " + this.veeamSettings.vmsPerJobRatio + ",\n      Restore: " + this.veeamSettings.vbrRestore + ",\n      ");
    var vmSizeCapCal = new VmSize_1.VmSizeCal(this.settings);
    var hostSizeCal = new HostSize_1.HostSizeCal(this.settings);
    var datastoreSizeCal = new DatastoreSize_1.DataStoreSizeCal(this.settings);
    var otherDataSizeCal = new OtherDataSize_1.OtherDataSizeCal(this.settings);
    var eventsDataSizeCal = new EventsData_1.EventsDataCal(this.settings);
    var vbrPerfDataSizeCal = new PerformanceSize_1.PerformanceSize(this.veeamSettings);
    var vbrEventsDataSizeCal = new VbrEvents_1.VbrEventsCal(this.veeamSettings);
    var vbrDbTimeSizeCal = new VbrDbTime_1.VbrDbTime(this.veeamSettings); // check the threashold then run typical or advanced

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
    } else {
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
  };

  return Requirements;
}();
},{"./Settings":"Settings.ts","./VmSize":"VmSize.ts","./DatastoreSize":"DatastoreSize.ts","./HostSize":"HostSize.ts","./OtherDataSize":"OtherDataSize.ts","./EventsData":"EventsData.ts","./PerformanceSize":"PerformanceSize.ts","./VbrEvents":"VbrEvents.ts","./VbrDbTime":"VbrDbTime.ts"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "15164" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map