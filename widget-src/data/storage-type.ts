export enum FoxholeStorageType {
  StorageDepot = "Storage Depot",
  Seaport = "Seaport",
  AircraftDepot = "Aircraft Depot",
}

export type FoxholeStorageTypeInfo = {
  name: string;
  imgUrl: string;
};

export const FOXHOLE_STORAGE_TYPE_ALIASES: Record<string, FoxholeStorageType> = {
  "Storage Depot": FoxholeStorageType.StorageDepot,
  "Складское помещение": FoxholeStorageType.StorageDepot,
  "Seaport": FoxholeStorageType.Seaport,
  "Морской порт": FoxholeStorageType.Seaport,
  "Aircraft Depot": FoxholeStorageType.AircraftDepot,
};

export const FOXHOLE_STORAGE_TYPES: FoxholeStorageTypeInfo[] = [
  { 
    name: FoxholeStorageType.StorageDepot, 
    imgUrl: "https://foxhole.wiki.gg/images/thumb/MapIconStorageFacility.png/24px-MapIconStorageFacility.png?d2232c" 
  },
  { 
    name: FoxholeStorageType.Seaport, 
    imgUrl: "https://foxhole.wiki.gg/images/thumb/MapIconSeaport.png/24px-MapIconSeaport.png?11e4c8" 
  },
  { 
    name: FoxholeStorageType.AircraftDepot, 
    imgUrl: "https://foxhole.wiki.gg/images/thumb/MapIconAircraftDepot.png/24px-MapIconAircraftDepot.png?a08b80" 
  },
];
