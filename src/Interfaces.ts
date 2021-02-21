export interface General {
    historicPerfData: number, //Period of time for keeping historical performance and backup data
    unknownParam: number // Unknown
}

export interface VmSizeInter extends General {
    vmCount: number, // VMs
    avNumDsOneVm: number, // Average number of Datastores where one VM stored
    avNicsHost: number, // Average number of NICs per Host
    avNumVDisksVm: number, // Average number of virtual disks per VM
    avNumGDiskVm: number, // Average number of Guest Disk per VM 
}

// Interesting that this doesn't include NICS per-host where the VMware version does
export interface HvVmSizeInter extends General {
    hvVmCount: number, // VMs
    hvAvNumNicsVm: number, // Average number of NICs per VM
    haAvNumVdVm: number, // Average number of virtual disks per VM
    hvAvNumGdVm: number // Average number of Guest Disk per VM 
}
export interface HostSizeInter extends General {
    hosts: number, // Hosts
    datastores: number, // Datastores
    avNicsHost: number, // Average number of NICs per Host
    avSdPerHost: number, // Average number of Storage Adapter per Host
    avSpPerHost: number // Average number of Storage Path per Host
}

export interface HvHostSizeInter extends General {
    hvHosts: number, // Hosts
    hvAvNumVol: number, // Average number of volumes per Host
    hvAvNumNics: number, // Average number of NICs per Host
}

export interface DatastoreSizeInter extends General {
    datastores: number // Datastores
}

export interface OtherDataInter extends General {
    resourcePool: number, // Resource Pools
    vapp: number // vApps
}

export interface EventsDataInter extends General {
    vmCount: number, // VMs
    hosts: number,  // Hosts
    datastores: number, // Datastores
    clusters: number, // Clusters
    vapp: number, // vApps
    eventsData: number // Period of time for keeping events data
}

export interface HvEventsDataInter {
    hvVmCount: number, // VMs
    hvHosts: number, // Hosts
    eventsData: number // Period of time for keeping events data
}

