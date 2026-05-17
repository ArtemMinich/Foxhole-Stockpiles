export enum FoxholeItemCategory {
  All = "All",
  SmallArms = "Small Arms",
  HeavyArms = "Heavy Arms",
  HeavyAmmunition = "Heavy Ammunition",
  Utility = "Utility",
  Medical = "Medical",
  Resource = "Resource",
  Uniforms = "Uniforms",
  AircraftParts = "Aircraft Parts",
  Vehicles = "Vehicles",
  VehiclesNonCrate = "Vehicles Non-Crate",
  ShippableStructures = "Shippable Structures",
  ShippableStructuresNonCrate = "Shippable Structures Non-Crate",
}

export type FoxholeItemCategoryInfo = {
  name: string;
  imgUrl: string;
};

export const FOXHOLE_ITEMS_CATEGORIES: FoxholeItemCategoryInfo[] = [
  { 
    name: FoxholeItemCategory.All, 
    imgUrl: "https://foxhole.wiki.gg/images/thumb/IconFilterAllCrate.png/36px-IconFilterAllCrate.png?952756" 
  },
  { 
    name: FoxholeItemCategory.SmallArms, 
    imgUrl: "https://foxhole.wiki.gg/images/thumb/SmallWeaponsCrateIcon.png/24px-SmallWeaponsCrateIcon.png?a28eb9" 
  },
  { 
    name: FoxholeItemCategory.HeavyArms, 
    imgUrl: "https://foxhole.wiki.gg/images/thumb/HeavyWeaponsCrateIcon.png/24px-HeavyWeaponsCrateIcon.png?f1996b" 
  },
  { 
    name: FoxholeItemCategory.HeavyAmmunition, 
    imgUrl: "https://foxhole.wiki.gg/images/thumb/HeavyAmmunitionCrateIcon.png/24px-HeavyAmmunitionCrateIcon.png?4d6911" 
  },
  { 
    name: FoxholeItemCategory.Utility, 
    imgUrl: "https://foxhole.wiki.gg/images/thumb/UtilityCrateIcon.png/24px-UtilityCrateIcon.png?51e975" 
  },
  { 
    name: FoxholeItemCategory.Medical, 
    imgUrl: "https://foxhole.wiki.gg/images/thumb/MedicalCrateIcon.png/24px-MedicalCrateIcon.png?1a94b8" 
  },
  { 
    name: FoxholeItemCategory.Resource, 
    imgUrl: "https://foxhole.wiki.gg/images/thumb/FacilitiesResourceCrateIcon.png/24px-FacilitiesResourceCrateIcon.png?e34cbd" 
  },
  { 
    name: FoxholeItemCategory.Uniforms, 
    imgUrl: "https://foxhole.wiki.gg/images/thumb/FacilitiesUniformsCrateIcon.png/24px-FacilitiesUniformsCrateIcon.png?b418f2" 
  },
  { 
    name: FoxholeItemCategory.AircraftParts, 
    imgUrl: "https://foxhole.wiki.gg/images/thumb/IconFilterAircraft.png/24px-IconFilterAircraft.png?8bb794" 
  },
  { 
    name: FoxholeItemCategory.Vehicles, 
    imgUrl: "https://foxhole.wiki.gg/images/thumb/IconFilterVehicleCrate.png/24px-IconFilterVehicleCrate.png?f85aeb" 
  },
  { 
    name: FoxholeItemCategory.VehiclesNonCrate, 
    imgUrl: "https://foxhole.wiki.gg/images/thumb/IconFilterVehicle.png/24px-IconFilterVehicle.png?73fd41" 
  },
  { 
    name: FoxholeItemCategory.ShippableStructures, 
    imgUrl: "https://foxhole.wiki.gg/images/thumb/ShippableCrateIcon.png/24px-ShippableCrateIcon.png?da37fa" 
  },
  { 
    name: FoxholeItemCategory.ShippableStructuresNonCrate, 
    imgUrl: "https://foxhole.wiki.gg/images/thumb/IconFilterShippables.png/24px-IconFilterShippables.png?d98624" 
  },
];