import { InfraSettings } from './Settings';

class infraCal {
    // class to calculated the infrastructure requirements based on VM or
    // host count
    vmCount: number;
    hosts: number;
    datastores: number;

    constructor(vmCount: number, hosts: number, settings: InfraSettings) {
        this.vmCount = vmCount;
        this.hosts = hosts;
        this.datastores = settings.datastoreRatio * this.hosts;
    }

    // datastores calculated from ratio 
    datastoreCal() {

    }
}