import { FoxholeItemCategory } from "./category";

export type FoxholeItem = {
  name: string;
  wikiUrl: string;
  imgUrl: string;
  inCrate?: number;
  category: FoxholeItemCategory;
};

export const FOXHOLE_ITEMS: FoxholeItem[] = [
  {
    name: '“Dusk” ce.III', wikiUrl: 'https://foxhole.wiki.gg/wiki/%E2%80%9CDusk%E2%80%9D_ce.III', imgUrl: 'https://foxhole.wiki.gg/images/AssaultRifleHeavyCItemIcon.png?6655c8',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 20
  },
  {
    name: 'Booker Storm Rifle Model 838', wikiUrl: 'https://foxhole.wiki.gg/wiki/Booker_Storm_Rifle_Model_838', imgUrl: 'https://foxhole.wiki.gg/images/AssaultRifleHeavyWItemIcon.png?e70de5',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 20
  },
  {
    name: 'Aalto Storm Rifle 24', wikiUrl: 'https://foxhole.wiki.gg/wiki/Aalto_Storm_Rifle_24', imgUrl: 'https://foxhole.wiki.gg/images/AssaultRifleItemIcon.png?732100',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 20
  },
  {
    name: '7.92mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/7.92mm', imgUrl: 'https://foxhole.wiki.gg/images/AssaultRifleAmmoItemIcon.png?e79005',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 30
  },
  {
    name: 'Catara mo.II', wikiUrl: 'https://foxhole.wiki.gg/wiki/Catara_mo.II', imgUrl: 'https://foxhole.wiki.gg/images/LightMachineGunIcon.png?7de463',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 20
  },
  {
    name: 'KRN886-127 Gast Machine Gun', wikiUrl: 'https://foxhole.wiki.gg/wiki/KRN886-127_Gast_Machine_Gun', imgUrl: 'https://foxhole.wiki.gg/images/thumb/MGCItemIcon.png/100px-MGCItemIcon.png?a5481f',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 5
  },
  {
    name: 'Malone MK.2', wikiUrl: 'https://foxhole.wiki.gg/wiki/Malone_MK.2', imgUrl: 'https://foxhole.wiki.gg/images/MGWItemIcon.png?1529e1',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 5
  },
  {
    name: 'Bomastone Grenade', wikiUrl: 'https://foxhole.wiki.gg/wiki/Bomastone_Grenade', imgUrl: 'https://foxhole.wiki.gg/images/thumb/GrenadeCItemIcon.png/100px-GrenadeCItemIcon.png?42b939',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 25
  },
  {
    name: 'A3 Harpa Fragmentation Grenade', wikiUrl: 'https://foxhole.wiki.gg/wiki/A3_Harpa_Fragmentation_Grenade', imgUrl: 'https://foxhole.wiki.gg/images/GrenadeItemIcon.png?39b76d',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 20
  },
  {
    name: 'Ferro 879', wikiUrl: 'https://foxhole.wiki.gg/wiki/Ferro_879', imgUrl: 'https://foxhole.wiki.gg/images/PistolItemIcon.png?26eb4b',
    category: FoxholeItemCategory.SmallArms
  },
  {
    name: 'Cascadier 873', wikiUrl: 'https://foxhole.wiki.gg/wiki/Cascadier_873', imgUrl: 'https://foxhole.wiki.gg/images/PistolLightWItemIcon.png?87f946',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 40
  },
  {
    name: 'Ahti Model 2', wikiUrl: 'https://foxhole.wiki.gg/wiki/Ahti_Model_2', imgUrl: 'https://foxhole.wiki.gg/images/PistolWItemIcon.png?35b6dd',
    category: FoxholeItemCategory.SmallArms
  },
  {
    name: '8mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/8mm', imgUrl: 'https://foxhole.wiki.gg/images/PistolAmmoItemIcon.png?e45fcc',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 40
  },
  {
    name: 'Cometa T2-9', wikiUrl: 'https://foxhole.wiki.gg/wiki/Cometa_T2-9', imgUrl: 'https://foxhole.wiki.gg/images/RevolverItemIcon.png?977458',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 30
  },
  {
    name: 'The Hangman 757', wikiUrl: 'https://foxhole.wiki.gg/wiki/The_Hangman_757', imgUrl: 'https://foxhole.wiki.gg/images/RevolvingRifleWItemIcon.png?411f7f',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 20
  },
  {
    name: '.44', wikiUrl: 'https://foxhole.wiki.gg/wiki/.44', imgUrl: 'https://foxhole.wiki.gg/images/RevolverAmmoItemIcon.png?b190ce',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 40
  },
  {
    name: 'Catena rt.IV Auto-Rifle', wikiUrl: 'https://foxhole.wiki.gg/wiki/Catena_rt.IV_Auto-Rifle', imgUrl: 'https://foxhole.wiki.gg/images/thumb/RifleAutomaticCIcon.png/100px-RifleAutomaticCIcon.png?35190a',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 15
  },
  {
    name: 'Sampo Auto-Rifle 77', wikiUrl: 'https://foxhole.wiki.gg/wiki/Sampo_Auto-Rifle_77', imgUrl: 'https://foxhole.wiki.gg/images/thumb/RifleAutomaticW.png/100px-RifleAutomaticW.png?126d74',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 20
  },
  {
    name: 'Argenti r.II Rifle', wikiUrl: 'https://foxhole.wiki.gg/wiki/Argenti_r.II_Rifle', imgUrl: 'https://foxhole.wiki.gg/images/thumb/RifleCItemIcon.png/100px-RifleCItemIcon.png?72bbf1',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 20
  },
  {
    name: 'Volta r.I Repeater', wikiUrl: 'https://foxhole.wiki.gg/wiki/Volta_r.I_Repeater', imgUrl: 'https://foxhole.wiki.gg/images/RifleHeavyCItemIcon.png?fa98dc',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 15
  },
  {
    name: 'Fuscina pi.I', wikiUrl: 'https://foxhole.wiki.gg/wiki/Fuscina_pi.I', imgUrl: 'https://foxhole.wiki.gg/images/thumb/RifleLightCItemIcon.png/100px-RifleLightCItemIcon.png?ef8350',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 20
  },
  {
    name: 'Blakerow 871', wikiUrl: 'https://foxhole.wiki.gg/wiki/Blakerow_871', imgUrl: 'https://foxhole.wiki.gg/images/CarbineItemIcon.png?d343a2',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 20
  },
  {
    name: 'KRR2-790 Omen', wikiUrl: 'https://foxhole.wiki.gg/wiki/KRR2-790_Omen', imgUrl: 'https://foxhole.wiki.gg/images/thumb/RifleLongC.png/100px-RifleLongC.png?638ba1',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 15
  },
  {
    name: 'Clancy Cinder M3', wikiUrl: 'https://foxhole.wiki.gg/wiki/Clancy_Cinder_M3', imgUrl: 'https://foxhole.wiki.gg/images/thumb/RifleLongW.png/100px-RifleLongW.png?1a4b01',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 15
  },
  {
    name: 'No.2B Hawthorne', wikiUrl: 'https://foxhole.wiki.gg/wiki/No.2B_Hawthorne', imgUrl: 'https://foxhole.wiki.gg/images/thumb/RifleShortWIcon.png/100px-RifleShortWIcon.png?7c0d03',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 15
  },
  {
    name: 'No.2 Loughcaster', wikiUrl: 'https://foxhole.wiki.gg/wiki/No.2_Loughcaster', imgUrl: 'https://foxhole.wiki.gg/images/thumb/RifleW.png/100px-RifleW.png?771bf6',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 20
  },
  {
    name: 'KRR3-792 Auger', wikiUrl: 'https://foxhole.wiki.gg/wiki/KRR3-792_Auger', imgUrl: 'https://foxhole.wiki.gg/images/SniperRifleCItemIcon.png?17b090',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 5
  },
  {
    name: 'Clancy-Raca M4', wikiUrl: 'https://foxhole.wiki.gg/wiki/Clancy-Raca_M4', imgUrl: 'https://foxhole.wiki.gg/images/SniperRifleItemIcon.png?3a4c7d',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 3
  },
  {
    name: '7.62mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/7.62mm', imgUrl: 'https://foxhole.wiki.gg/images/RifleAmmoItemIcon.png?6e2a55',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 40
  },
  {
    name: 'KRF1-750 Dragonfly', wikiUrl: 'https://foxhole.wiki.gg/wiki/KRF1-750_Dragonfly', imgUrl: 'https://foxhole.wiki.gg/images/thumb/ShotgunCItemIcon.png/100px-ShotgunCItemIcon.png?c5661b',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 15
  },
  {
    name: 'No.4 The Pillory Scattergun', wikiUrl: 'https://foxhole.wiki.gg/wiki/No.4_The_Pillory_Scattergun', imgUrl: 'https://foxhole.wiki.gg/images/thumb/ShotgunWItemIcon.png/100px-ShotgunWItemIcon.png?be8c44',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 15
  },
  {
    name: 'Buckshot', wikiUrl: 'https://foxhole.wiki.gg/wiki/Buckshot', imgUrl: 'https://foxhole.wiki.gg/images/ShotgunAmmoItemIcon.png?c082cc',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 40
  },
  {
    name: '“The Pitch Gun” mc.V', wikiUrl: 'https://foxhole.wiki.gg/wiki/%E2%80%9CThe_Pitch_Gun%E2%80%9D_mc.V', imgUrl: 'https://foxhole.wiki.gg/images/thumb/SMGCItemIcon.png/100px-SMGCItemIcon.png?a9b9ab',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 20
  },
  {
    name: '“Lionclaw” mc.VIII', wikiUrl: 'https://foxhole.wiki.gg/wiki/%E2%80%9CLionclaw%E2%80%9D_mc.VIII', imgUrl: 'https://foxhole.wiki.gg/images/SMGHeavyCItemIcon.png?7e9698',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 20
  },
  {
    name: 'No.1 “The Liar” Submachinegun', wikiUrl: 'https://foxhole.wiki.gg/wiki/No.1_%E2%80%9CThe_Liar%E2%80%9D_Submachine_Gun', imgUrl: 'https://foxhole.wiki.gg/images/SMGHeavyWItemIcon.png?b32528',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 20
  },
  {
    name: 'Fiddler Submachine Gun Model 868', wikiUrl: 'https://foxhole.wiki.gg/wiki/Fiddler_Submachine_Gun_Model_868', imgUrl: 'https://foxhole.wiki.gg/images/thumb/SubMachineGunIcon.png/100px-SubMachineGunIcon.png?2748f2',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 20
  },
  {
    name: '9mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/9mm', imgUrl: 'https://foxhole.wiki.gg/images/SubMachineGunAmmoIcon.png?823243',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 40
  },
  {
    name: '228 Satterley Heavy Storm Rifle', wikiUrl: 'https://foxhole.wiki.gg/wiki/228_Satterley_Heavy_Storm_Rifle', imgUrl: 'https://foxhole.wiki.gg/images/ATRifleAssaultWIcontga.png?8f2968',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 5
  },
  {
    name: 'Booker Greyhound Model 910', wikiUrl: 'https://foxhole.wiki.gg/wiki/Booker_Greyhound_Model_910', imgUrl: 'https://foxhole.wiki.gg/images/ATRifleAutomaticWItemIcon.png?1da780',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 3
  },
  {
    name: '“Dawn” Ve.II', wikiUrl: 'https://foxhole.wiki.gg/wiki/%E2%80%9CDawn%E2%80%9D_Ve.II', imgUrl: 'https://foxhole.wiki.gg/images/ATRifleLightCIcon.png?fb320c',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 3
  },
  {
    name: '“Quickhatch” Rt.I', wikiUrl: 'https://foxhole.wiki.gg/wiki/%E2%80%9CQuickhatch%E2%80%9D_Rt.I', imgUrl: 'https://foxhole.wiki.gg/images/ATRifleSniperCIcontga.png?689394',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 3
  },
  {
    name: '“Typhon” ra.XII', wikiUrl: 'https://foxhole.wiki.gg/wiki/%E2%80%9CTyphon%E2%80%9D_ra.XII', imgUrl: 'https://foxhole.wiki.gg/images/thumb/ATRifleTCIcon.png/100px-ATRifleTCIcon.png?b9c954',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 5
  },
  {
    name: 'Neville Anti-Tank Rifle', wikiUrl: 'https://foxhole.wiki.gg/wiki/Neville_Anti-Tank_Rifle', imgUrl: 'https://foxhole.wiki.gg/images/ATRifleItemIcon.png?58ec0d',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 3
  },
  {
    name: '14.5mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/14.5mm', imgUrl: 'https://foxhole.wiki.gg/images/ATRifleAmmoItemIcon.png?48a8d6',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 10
  },
  {
    name: 'Venom c.II 35', wikiUrl: 'https://foxhole.wiki.gg/wiki/Venom_c.II_35', imgUrl: 'https://foxhole.wiki.gg/images/thumb/ATRPGCItemIcon.png/100px-ATRPGCItemIcon.png?d1e77c',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 5
  },
  {
    name: 'Bane 45', wikiUrl: 'https://foxhole.wiki.gg/wiki/Bane_45', imgUrl: 'https://foxhole.wiki.gg/images/ATRpgItemIcon.png?d35704',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 5
  },
  {
    name: 'Carnyx Anti-Tank Rocket Launcher', wikiUrl: 'https://foxhole.wiki.gg/wiki/Carnyx_Anti-Tank_Rocket_Launcher', imgUrl: 'https://foxhole.wiki.gg/images/ATRPGHeavyWIcon.png?1c5289',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 5
  },
  {
    name: 'AP/RPG', wikiUrl: 'https://foxhole.wiki.gg/wiki/AP/RPG', imgUrl: 'https://foxhole.wiki.gg/images/ATRpgAmmoItemIcon.png?7e0381',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 15
  },
  {
    name: 'Mounted Bonesaw MK.3', wikiUrl: 'https://foxhole.wiki.gg/wiki/Mounted_Bonesaw_MK.3', imgUrl: 'https://foxhole.wiki.gg/images/thumb/ATMortarWTripodItemIcon.png/100px-ATMortarWTripodItemIcon.png?49cb62',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 5
  },
  {
    name: 'Bonesaw MK.3', wikiUrl: 'https://foxhole.wiki.gg/wiki/Bonesaw_MK.3', imgUrl: 'https://foxhole.wiki.gg/images/ATMortarItemIcon.png?2b41ad',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 5
  },
  {
    name: 'ARC/RPG', wikiUrl: 'https://foxhole.wiki.gg/wiki/ARC/RPG', imgUrl: 'https://foxhole.wiki.gg/images/ATMortarAmmoItemIcon.png?fa7398',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 15
  },
  {
    name: '“Molten Wind” v.II Flame Torch', wikiUrl: 'https://foxhole.wiki.gg/wiki/%E2%80%9CMolten_Wind%E2%80%9D_v.II_Flame_Torch', imgUrl: 'https://foxhole.wiki.gg/images/thumb/FlamegunCICon.png/100px-FlamegunCICon.png?7fc955',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 10
  },
  {
    name: 'Willow’s Bane Model 845', wikiUrl: 'https://foxhole.wiki.gg/wiki/Willow%E2%80%99s_Bane_Model_845', imgUrl: 'https://foxhole.wiki.gg/images/thumb/FlamegunWICon.png/100px-FlamegunWICon.png?ef2f59',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 10
  },
  {
    name: 'KLG901-2 Lunaire F', wikiUrl: 'https://foxhole.wiki.gg/wiki/KLG901-2_Lunaire_F', imgUrl: 'https://foxhole.wiki.gg/images/thumb/GrenadeLauncherCItemIcon.png/100px-GrenadeLauncherCItemIcon.png?7660c7',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 5
  },
  {
    name: 'Mounted Fissura gd.I', wikiUrl: 'https://foxhole.wiki.gg/wiki/Mounted_Fissura_gd.I', imgUrl: 'https://foxhole.wiki.gg/images/thumb/GrenadeLauncherTCIcon.png/100px-GrenadeLauncherTCIcon.png?d398e7',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 5
  },
  {
    name: 'Tremola Grenade GPb-1', wikiUrl: 'https://foxhole.wiki.gg/wiki/Tremola_Grenade_GPb-1', imgUrl: 'https://foxhole.wiki.gg/images/thumb/HELaunchedGrenadeItemIcon.png/100px-HELaunchedGrenadeItemIcon.png?3aa138',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 20
  },
  {
    name: 'PT-815 Smoke Grenade', wikiUrl: 'https://foxhole.wiki.gg/wiki/PT-815_Smoke_Grenade', imgUrl: 'https://foxhole.wiki.gg/images/Smokegrenadeicon1.png?d837dc',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 15
  },
  {
    name: 'Green Ash Grenade', wikiUrl: 'https://foxhole.wiki.gg/wiki/Green_Ash_Grenade', imgUrl: 'https://foxhole.wiki.gg/images/thumb/DeadlyGas01Icon.png/100px-DeadlyGas01Icon.png?ac61eb',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 10
  },
  {
    name: 'Lamentum mm.IV', wikiUrl: 'https://foxhole.wiki.gg/wiki/Lamentum_mm.IV', imgUrl: 'https://foxhole.wiki.gg/images/thumb/HeavyMachineGunIcon.png/100px-HeavyMachineGunIcon.png?888142',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 5
  },
  {
    name: 'Malone Ratcatcher MK.1', wikiUrl: 'https://foxhole.wiki.gg/wiki/Malone_Ratcatcher_MK.1', imgUrl: 'https://foxhole.wiki.gg/images/thumb/MGHeavyTWItemIcon.png/100px-MGHeavyTWItemIcon.png?6db3a9',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 5
  },
  {
    name: '12.7mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/12.7mm', imgUrl: 'https://foxhole.wiki.gg/images/MachineGunAmmoIcon.png?e151f7',
    category: FoxholeItemCategory.SmallArms,
    inCrate: 20
  },
  {
    name: 'Daucus isg.III', wikiUrl: 'https://foxhole.wiki.gg/wiki/Daucus_isg.III', imgUrl: 'https://foxhole.wiki.gg/images/InfantrySupportGunItemIcon.png?e19c0a',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 5
  },
  {
    name: '30mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/30mm', imgUrl: 'https://foxhole.wiki.gg/images/MiniTankAmmoItemIcon.png?9e6416',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 20
  },
  {
    name: 'Cremari Mortar', wikiUrl: 'https://foxhole.wiki.gg/wiki/Cremari_Mortar', imgUrl: 'https://foxhole.wiki.gg/images/MortarItemIcon.png?76316a',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 5
  },
  {
    name: 'Incendiary Mortar Shell', wikiUrl: 'https://foxhole.wiki.gg/wiki/Incendiary_Mortar_Shell', imgUrl: 'https://foxhole.wiki.gg/images/MortarAmmoIconFlame.png?c4727b',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 15
  },
  {
    name: 'Flare Mortar Shell', wikiUrl: 'https://foxhole.wiki.gg/wiki/Flare_Mortar_Shell', imgUrl: 'https://foxhole.wiki.gg/images/MortarAmmoIconFlare.png?f47f7e',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 15
  },
  {
    name: 'Shrapnel Mortar Shell', wikiUrl: 'https://foxhole.wiki.gg/wiki/Shrapnel_Mortar_Shell', imgUrl: 'https://foxhole.wiki.gg/images/MortarAmmoIconShrapnel.png?4a6a36',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 15
  },
  {
    name: 'Mortar Shell', wikiUrl: 'https://foxhole.wiki.gg/wiki/Mortar_Shell', imgUrl: 'https://foxhole.wiki.gg/images/MortarAmmoIcon.png?683a3e',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 15
  },
  {
    name: 'BF5 White Ash Flask Grenade', wikiUrl: 'https://foxhole.wiki.gg/wiki/BF5_White_Ash_Flask_Grenade', imgUrl: 'https://foxhole.wiki.gg/images/ATGrenadeWIcon.png?656e1c',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 10
  },
  {
    name: 'B2 Varsi Anti-Tank Grenade', wikiUrl: 'https://foxhole.wiki.gg/wiki/B2_Varsi_Anti-Tank_Grenade', imgUrl: 'https://foxhole.wiki.gg/images/ATLaunchedGrenadeWIcon.png?82d65f',
    category: FoxholeItemCategory.HeavyArms,
    inCrate:20
  },
  {
    name: 'Ignifist 30', wikiUrl: 'https://foxhole.wiki.gg/wiki/Ignifist_30', imgUrl: 'https://foxhole.wiki.gg/images/thumb/ATRPGLightCItemIcon.png/100px-ATRPGLightCItemIcon.png?3307d3',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 10
  },
  {
    name: 'Mammon 91-b', wikiUrl: 'https://foxhole.wiki.gg/wiki/Mammon_91-b', imgUrl: 'https://foxhole.wiki.gg/images/HEGrenadeItemIcon.png?a22b79',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 20
  },
  {
    name: 'Anti-Tank Sticky Bomb', wikiUrl: 'https://foxhole.wiki.gg/wiki/Anti-Tank_Sticky_Bomb', imgUrl: 'https://foxhole.wiki.gg/images/StickyBombIcon.png?af5c47',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 10
  },
  {
    name: 'Cutler Foebreaker', wikiUrl: 'https://foxhole.wiki.gg/wiki/Cutler_Foebreaker', imgUrl: 'https://foxhole.wiki.gg/images/thumb/ATRPGTWIcon.png/100px-ATRPGTWIcon.png?1fed2f',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 5
  },
  {
    name: 'Cutler Launcher 4', wikiUrl: 'https://foxhole.wiki.gg/wiki/Cutler_Launcher_4', imgUrl: 'https://foxhole.wiki.gg/images/RpgItemIcon.png?d7d19d',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 5
  },
  {
    name: 'RPG', wikiUrl: 'https://foxhole.wiki.gg/wiki/RPG', imgUrl: 'https://foxhole.wiki.gg/images/RpgAmmoItemIcon.png?fbe568',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 15
  },
  {
    name: '950-70b Anti-Aircraft Shell', wikiUrl: 'https://foxhole.wiki.gg/wiki/950-70b_Anti-Aircraft_Shell', imgUrl: 'https://foxhole.wiki.gg/images/thumb/AAAmmoIcon.png/100px-AAAmmoIcon.png?ba1e25',
    category: FoxholeItemCategory.HeavyAmmunition,
    inCrate: 5
  },
  {
    name: '20mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/20mm', imgUrl: 'https://foxhole.wiki.gg/images/thumb/AircraftAmmoIcon.png/100px-AircraftAmmoIcon.png?e750fb',
    category: FoxholeItemCategory.HeavyAmmunition,
    inCrate: 5
  },
  {
    name: '94.5mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/94.5mm', imgUrl: 'https://foxhole.wiki.gg/images/ATLargeAmmoIcon.png?53ed83',
    category: FoxholeItemCategory.HeavyAmmunition,
    inCrate: 1
  },
  {
    name: '75mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/75mm', imgUrl: 'https://foxhole.wiki.gg/images/BattleTankAmmoItemIcon.png?e87a58',
    category: FoxholeItemCategory.HeavyAmmunition,
    inCrate: 1
  },
  {
    name: 'Mark II Raidbreaker', wikiUrl: 'https://foxhole.wiki.gg/wiki/Mark_II_Raidbreaker', imgUrl: 'https://foxhole.wiki.gg/images/thumb/AerialBombsIcon.png/100px-AerialBombsIcon.png?d72886',
    category: FoxholeItemCategory.HeavyAmmunition,
    inCrate: 5
  },
  {
    name: 'Shatter Missile', wikiUrl: 'https://foxhole.wiki.gg/wiki/Shatter_Missile', imgUrl: 'https://foxhole.wiki.gg/images/thumb/DemolitionRocketAmmoIcon.png/100px-DemolitionRocketAmmoIcon.png?f2c4e2',
    category: FoxholeItemCategory.HeavyAmmunition,
    inCrate: 5
  },
  {
    name: 'Model-7 “Evie”', wikiUrl: 'https://foxhole.wiki.gg/wiki/Model-7_%E2%80%9CEvie%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/DepthChargeIcon.png?50e9f3',
    category: FoxholeItemCategory.HeavyAmmunition,
    inCrate: 1
  },
  {
    name: '912 Shrike Rounds', wikiUrl: 'https://foxhole.wiki.gg/wiki/912_Shrike_Rounds', imgUrl: 'https://foxhole.wiki.gg/images/thumb/DiveBomberAmmoIcon.png/100px-DiveBomberAmmoIcon.png?546924',
    category: FoxholeItemCategory.HeavyAmmunition,
    inCrate: 5
  },
  {
    name: '4C-Fire Rocket', wikiUrl: 'https://foxhole.wiki.gg/wiki/4C-Fire_Rocket', imgUrl: 'https://foxhole.wiki.gg/images/thumb/FlameRocketAmmoIcon.png/100px-FlameRocketAmmoIcon.png?935eac',
    category: FoxholeItemCategory.HeavyAmmunition,
    inCrate: 1
  },
  {
    name: 'Flame Ammo', wikiUrl: 'https://foxhole.wiki.gg/wiki/Flame_Ammo', imgUrl: 'https://foxhole.wiki.gg/images/FlameAmmoIcon.png?eb71d1',
    category: FoxholeItemCategory.HeavyAmmunition,
    inCrate: 1
  },
  {
    name: '150mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/150mm', imgUrl: 'https://foxhole.wiki.gg/images/HeavyArtilleryAmmoItemIcon.png?4552df',
    category: FoxholeItemCategory.HeavyAmmunition,
    inCrate: 5
  },
  {
    name: '3C-High Explosive Rocket', wikiUrl: 'https://foxhole.wiki.gg/wiki/3C-High_Explosive_Rocket', imgUrl: 'https://foxhole.wiki.gg/images/thumb/HERocketAmmoIcon.png/100px-HERocketAmmoIcon.png?463901',
    category: FoxholeItemCategory.HeavyAmmunition,
    inCrate: 1
  },
  {
    name: 'Absol Anti-Aircraft Rounds', wikiUrl: 'https://foxhole.wiki.gg/wiki/Absol_Anti-Aircraft_Rounds', imgUrl: '',
    category: FoxholeItemCategory.HeavyAmmunition
  },
  {
    name: '120mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/120mm', imgUrl: 'https://foxhole.wiki.gg/images/LightArtilleryAmmoItemIcon.png?c00707',
    category: FoxholeItemCategory.HeavyAmmunition,
    inCrate: 5
  },
  {
    name: '300mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/300mm', imgUrl: 'https://foxhole.wiki.gg/images/LRArtilleryAmmoItemIcon.png?3cadc1',
    category: FoxholeItemCategory.HeavyAmmunition,
    inCrate: 1
  },
  {
    name: 'Quillback Torpedo', wikiUrl: 'https://foxhole.wiki.gg/wiki/Quillback_Torpedo', imgUrl: 'https://foxhole.wiki.gg/images/thumb/MiniTorpedoAmmoIcon.png/100px-MiniTorpedoAmmoIcon.png?a2023e',
    category: FoxholeItemCategory.HeavyAmmunition,
    inCrate: 5
  },
  {
    name: '250mm "Purity" Shell', wikiUrl: 'https://foxhole.wiki.gg/wiki/250mm_%E2%80%9CPurity%E2%80%9D_Shell', imgUrl: 'https://foxhole.wiki.gg/images/MortarTankIcon.png?b9d9a6',
    category: FoxholeItemCategory.HeavyAmmunition,
    inCrate: 5
  },
  {
    name: '250mm "Fury" Shell', wikiUrl: 'https://foxhole.wiki.gg/wiki/250mm_%E2%80%9CFury%E2%80%9D_Shell', imgUrl: 'https://foxhole.wiki.gg/images/thumb/MortarTankAmmoBRIcon.png/100px-MortarTankAmmoBRIcon.png?b17356',
    category: FoxholeItemCategory.HeavyAmmunition,
    inCrate: 5
  },
  {
    name: 'E681-B Hullbreaker Mine', wikiUrl: 'https://foxhole.wiki.gg/wiki/E681-B_Hullbreaker_Mine', imgUrl: 'https://foxhole.wiki.gg/images/thumb/SurfaceMineIcon.png/100px-SurfaceMineIcon.png?7eae64',
    category: FoxholeItemCategory.HeavyAmmunition,
    inCrate: 5
  },
  {
    name: '68mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/68mm', imgUrl: 'https://foxhole.wiki.gg/images/ATAmmoIcon.png?996336',
    category: FoxholeItemCategory.HeavyAmmunition,
    inCrate: 20
  },
  {
    name: '40mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/40mm', imgUrl: 'https://foxhole.wiki.gg/images/LightTankAmmoItemIcon.png?88a2c5',
    category: FoxholeItemCategory.HeavyAmmunition,
    inCrate: 20
  },
  {
    name: 'Legion Vexillum', wikiUrl: 'https://foxhole.wiki.gg/wiki/Legion_Vexillum', imgUrl: 'https://foxhole.wiki.gg/images/thumb/BannerTCItemIcon.png/100px-BannerTCItemIcon.png?d673b6',
    category: FoxholeItemCategory.Utility,
    inCrate: 5
  },
  {
    name: 'War Ensign', wikiUrl: 'https://foxhole.wiki.gg/wiki/War_Ensign', imgUrl: 'https://foxhole.wiki.gg/images/thumb/BannerTWItemIcon.png/100px-BannerTWItemIcon.png?d84fa7',
    category: FoxholeItemCategory.Utility,
    inCrate: 5
  },
  {
    name: 'Barbed Wire', wikiUrl: 'https://foxhole.wiki.gg/wiki/Barbed_Wire_(Material)', imgUrl: 'https://foxhole.wiki.gg/images/BarbedWireMaterialItemIcon.png?98fe9d',
    category: FoxholeItemCategory.Utility,
    inCrate: 5
  },
  {
    name: 'Buckhorn CCQ-18', wikiUrl: 'https://foxhole.wiki.gg/wiki/Buckhorn_CCQ-18', imgUrl: 'https://foxhole.wiki.gg/images/BayonetIcon.png?63a155',
    category: FoxholeItemCategory.Utility,
    inCrate: 20
  },
  {
    name: 'Binoculars', wikiUrl: 'https://foxhole.wiki.gg/wiki/Binoculars', imgUrl: 'https://foxhole.wiki.gg/images/BinocularsItemIcon.png?a7e8fd',
    category: FoxholeItemCategory.Utility,
    inCrate: 5
  },
  {
    name: 'Hydra’s Whisper', wikiUrl: 'https://foxhole.wiki.gg/wiki/Hydra%27s_Whisper', imgUrl: 'https://foxhole.wiki.gg/images/BangaloreItemIcon.png?26b1fe',
    category: FoxholeItemCategory.Utility,
    inCrate: 5
  },
  {
    name: 'Havoc Charge', wikiUrl: 'https://foxhole.wiki.gg/wiki/Havoc_Charge', imgUrl: 'https://foxhole.wiki.gg/images/thumb/ExplosiveTripodIcon.png/100px-ExplosiveTripodIcon.png?1756d4',
    category: FoxholeItemCategory.Utility,
    inCrate: 5
  },
  {
    name: '“Molten Wind” v.II Ammo', wikiUrl: 'https://foxhole.wiki.gg/wiki/%E2%80%9CMolten_Wind%E2%80%9D_v.II_Ammo', imgUrl: 'https://foxhole.wiki.gg/images/thumb/FlamePackCIcon.png/100px-FlamePackCIcon.png?108df5',
    category: FoxholeItemCategory.Utility,
    inCrate: 10
  },
  {
    name: 'Willow', wikiUrl: 'https://foxhole.wiki.gg/wiki/Willow', imgUrl: 'https://foxhole.wiki.gg/images/thumb/FlamegunWICon.png/100px-FlamegunWICon.png?ef2f59',
    category: FoxholeItemCategory.HeavyArms,
    inCrate: 10
  },
  {
    name: 'Crow’s Foot Mine', wikiUrl: 'https://foxhole.wiki.gg/wiki/Crow%E2%80%99s_Foot_Mine', imgUrl: 'https://foxhole.wiki.gg/images/thumb/InfantryMineIcon.png/100px-InfantryMineIcon.png?5d4414',
    category: FoxholeItemCategory.Utility,
    inCrate: 10
  },
  {
    name: 'Listening Kit', wikiUrl: 'https://foxhole.wiki.gg/wiki/Listening_Kit', imgUrl: 'https://foxhole.wiki.gg/images/thumb/ListeningKitIcon.png/100px-ListeningKitIcon.png?914257',
    category: FoxholeItemCategory.Utility,
    inCrate: 5
  },
  {
    name: 'Falias Raiding Club', wikiUrl: 'https://foxhole.wiki.gg/wiki/Falias_Raiding_Club', imgUrl: 'https://foxhole.wiki.gg/images/thumb/TrenchMaceWIcon.png/100px-TrenchMaceWIcon.png?6557d6',
    category: FoxholeItemCategory.Utility,
    inCrate: 10
  },
  {
    name: 'Metal Beam', wikiUrl: 'https://foxhole.wiki.gg/wiki/Metal_Beam', imgUrl: 'https://foxhole.wiki.gg/images/MetalBeamMaterialItemIcon.png?67ca32',
    category: FoxholeItemCategory.Utility,
    inCrate: 5
  },
  {
    name: 'Paratrooper’s Ruck', wikiUrl: 'https://foxhole.wiki.gg/wiki/Paratrooper%E2%80%99s_Ruck', imgUrl: 'https://foxhole.wiki.gg/images/thumb/ParatrooperBackpackItemIcon.png/100px-ParatrooperBackpackItemIcon.png?2b7e48',
    category: FoxholeItemCategory.Utility,
    inCrate: 10
  },
  {
    name: 'Radio Backpack', wikiUrl: 'https://foxhole.wiki.gg/wiki/Radio_Backpack', imgUrl: 'https://foxhole.wiki.gg/images/thumb/RadioBackpackItemIcon.png/100px-RadioBackpackItemIcon.png?500f17',
    category: FoxholeItemCategory.Utility,
    inCrate: 5
  },
  {
    name: 'Sandbag', wikiUrl: 'https://foxhole.wiki.gg/wiki/Sandbag', imgUrl: 'https://foxhole.wiki.gg/images/SandbagMaterialItemIcon.png?b6368b',
    category: FoxholeItemCategory.Utility,
    inCrate: 5
  },
  {
    name: 'Havoc Charge Detonator', wikiUrl: 'https://foxhole.wiki.gg/wiki/Havoc_Charge#Charge_Detonator-0', imgUrl: 'https://foxhole.wiki.gg/images/thumb/SatchelChargeTIcon.png/100px-SatchelChargeTIcon.png?52fd9c',
    category: FoxholeItemCategory.Utility,
    inCrate: 5
  },
  {
    name: 'Alligator Charge', wikiUrl: 'https://foxhole.wiki.gg/wiki/Alligator_Charge', imgUrl: 'https://foxhole.wiki.gg/images/SatchelCharge.png?3fa682',
    category: FoxholeItemCategory.Utility,
    inCrate: 5
  },
  {
    name: 'Shovel', wikiUrl: 'https://foxhole.wiki.gg/wiki/Shovel', imgUrl: 'https://foxhole.wiki.gg/images/ShovelIcon.png?a9b229',
    category: FoxholeItemCategory.Utility,
    inCrate: 10
  },
  {
    name: 'Sledge Hammer', wikiUrl: 'https://foxhole.wiki.gg/wiki/Sledge_Hammer', imgUrl: 'https://foxhole.wiki.gg/images/SledgeHammerItemIcon.png?a27ee2',
    category: FoxholeItemCategory.Utility,
    inCrate: 10
  },
  {
    name: 'Eleos Infantry Dagger', wikiUrl: 'https://foxhole.wiki.gg/wiki/Eleos_Infantry_Dagger', imgUrl: 'https://foxhole.wiki.gg/images/thumb/StilSwordCIcon.png/100px-StilSwordCIcon.png?fa1111',
    category: FoxholeItemCategory.Utility,
    inCrate: 10
  },
  {
    name: 'Abisme AT-99 Mine', wikiUrl: 'https://foxhole.wiki.gg/wiki/Abisme_AT-99', imgUrl: 'https://foxhole.wiki.gg/images/thumb/AntiTankMineItemIcon.png/100px-AntiTankMineItemIcon.png?2c9f3b',
    category: FoxholeItemCategory.Utility,
    inCrate: 10
  },
  {
    name: 'Tripod', wikiUrl: 'https://foxhole.wiki.gg/wiki/Tripod', imgUrl: 'https://foxhole.wiki.gg/images/DeployableTripodItemIcon.png?d38754',
    category: FoxholeItemCategory.Utility,
    inCrate: 5
  },
  {
    name: 'E680-S Rudder Lock', wikiUrl: 'https://foxhole.wiki.gg/wiki/E680-S_Rudder_Lock', imgUrl: 'https://foxhole.wiki.gg/images/SeaMineIcon.png?a23df3',
    category: FoxholeItemCategory.Utility,
    inCrate: 1
  },
  {
    name: 'Wind Sock', wikiUrl: 'https://foxhole.wiki.gg/wiki/Wind_Sock', imgUrl: 'https://foxhole.wiki.gg/images/thumb/WindsockItemIcon.png/100px-WindsockItemIcon.png?cb4dc0',
    category: FoxholeItemCategory.Utility,
    inCrate: 5
  },
  {
    name: 'Hammer', wikiUrl: 'https://foxhole.wiki.gg/wiki/Hammer', imgUrl: 'https://foxhole.wiki.gg/images/HammerIcon.png?f169bc',
    category: FoxholeItemCategory.Utility
  },
  {
    name: 'Wrench', wikiUrl: 'https://foxhole.wiki.gg/wiki/Wrench', imgUrl: 'https://foxhole.wiki.gg/images/WorkWrench.png?3c724b',
    category: FoxholeItemCategory.Utility,
    inCrate: 5
  },
  {
    name: 'Water Bucket', wikiUrl: 'https://foxhole.wiki.gg/wiki/Water_Bucket', imgUrl: 'https://foxhole.wiki.gg/images/thumb/LoreBucket.png/100px-LoreBucket.png?2b4a97',
    category: FoxholeItemCategory.Utility,
    inCrate: 50
  },
  {
    name: 'Water', wikiUrl: 'https://foxhole.wiki.gg/wiki/Water', imgUrl: 'https://foxhole.wiki.gg/images/WaterIcon.png?17ecd7',
    category: FoxholeItemCategory.Resource,
    inCrate: 1
  },
  {
    name: 'Gas Mask', wikiUrl: 'https://foxhole.wiki.gg/wiki/Gas_Mask', imgUrl: 'https://foxhole.wiki.gg/images/thumb/GasmaskIcon.png/100px-GasmaskIcon.png?ea70f3',
    category: FoxholeItemCategory.Utility,
    inCrate: 20
  },
  {
    name: 'Gas Mask Filter', wikiUrl: 'https://foxhole.wiki.gg/wiki/Gas_Mask_Filter', imgUrl: 'https://foxhole.wiki.gg/images/GasMaskFilterIcon.png?e2e59f',
    category: FoxholeItemCategory.Utility,
    inCrate: 20
  },
  {
    name: 'The Ospreay', wikiUrl: 'https://foxhole.wiki.gg/wiki/The_Ospreay', imgUrl: 'https://foxhole.wiki.gg/images/GrenadeAdapterIcon.png?f49f4f',
    category: FoxholeItemCategory.Utility,
    inCrate: 20
  },
  {
    name: 'Radio', wikiUrl: 'https://foxhole.wiki.gg/wiki/Radio', imgUrl: 'https://foxhole.wiki.gg/images/RadioItemIcon.png?8a6cee',
    category: FoxholeItemCategory.Utility,
    inCrate: 5
  },
  {
    name: 'Liaison Transmitter', wikiUrl: 'https://foxhole.wiki.gg/wiki/Liaison_Transmitter', imgUrl: 'https://foxhole.wiki.gg/images/RadioAircraftItemIcon.png?624df4',
    category: FoxholeItemCategory.Utility,
    inCrate: 5
  },
  {
    name: 'Bandages', wikiUrl: 'https://foxhole.wiki.gg/wiki/Bandages', imgUrl: 'https://foxhole.wiki.gg/images/BandagesItemIcon.png?e356da',
    category: FoxholeItemCategory.Medical,
    inCrate: 50
  },
  {
    name: 'First Aid Kit', wikiUrl: 'https://foxhole.wiki.gg/wiki/First_Aid_Kit', imgUrl: 'https://foxhole.wiki.gg/images/thumb/FirstAidKitItem.png/100px-FirstAidKitItem.png?d7f02e',
    category: FoxholeItemCategory.Medical,
    inCrate: 10
  },
  {
    name: 'Trauma Kit', wikiUrl: 'https://foxhole.wiki.gg/wiki/Trauma_Kit', imgUrl: 'https://foxhole.wiki.gg/images/TraumaKitItemIcon.png?c81ea0',
    category: FoxholeItemCategory.Medical,
    inCrate: 10
  },
  {
    name: 'Blood Plasma', wikiUrl: 'https://foxhole.wiki.gg/wiki/Blood_Plasma', imgUrl: 'https://foxhole.wiki.gg/images/BloodPlasmaItemIcon.png?3f8716',
    category: FoxholeItemCategory.Medical,
    inCrate: 50
  },
  {
    name: 'Soldier Supplies', wikiUrl: 'https://foxhole.wiki.gg/wiki/Soldier_Supplies', imgUrl: 'https://foxhole.wiki.gg/images/thumb/ClothItemIcon.png/100px-ClothItemIcon.png?e85f2a',
    category: FoxholeItemCategory.Medical,
    inCrate: 10
  },
  {
    name: 'Diesel', wikiUrl: 'https://foxhole.wiki.gg/wiki/Diesel', imgUrl: 'https://foxhole.wiki.gg/images/ResourceFuelIcon.png?a1fe12',
    category: FoxholeItemCategory.Resource,
    inCrate: 1
  },
  {
    name: 'Unstable Substances', wikiUrl: 'https://foxhole.wiki.gg/wiki/Unstable_Substances', imgUrl: 'https://foxhole.wiki.gg/images/FacilityMaterials10Icon.png?308d3c',
    category: FoxholeItemCategory.Resource,
    inCrate: 1
  },
  {
    name: 'Thermal Shielding', wikiUrl: 'https://foxhole.wiki.gg/wiki/Thermal_Shielding', imgUrl: 'https://foxhole.wiki.gg/images/FacilityMaterials11Icon.png?4303a7',
    category: FoxholeItemCategory.Resource,
    inCrate: 1
  },
  {
    name: 'Processed Construction Materials', wikiUrl: 'https://foxhole.wiki.gg/wiki/Processed_Construction_Materials', imgUrl: 'https://foxhole.wiki.gg/images/ProcessedConstructionMaterialsIcon.png?eea77f',
    category: FoxholeItemCategory.Resource,
    inCrate: 1
  },
  {
    name: 'Steel Construction Materials', wikiUrl: 'https://foxhole.wiki.gg/wiki/Steel_Construction_Materials', imgUrl: 'https://foxhole.wiki.gg/images/SteelConstructionMaterialsIcon.png?79894c',
    category: FoxholeItemCategory.Resource,
    inCrate: 1
  },
  {
    name: 'Assembly Materials I', wikiUrl: 'https://foxhole.wiki.gg/wiki/Assembly_Materials_I', imgUrl: 'https://foxhole.wiki.gg/images/AssemblyMaterials1Icon.png?d9f547',
    category: FoxholeItemCategory.Resource,
    inCrate: 1
  },
  {
    name: 'Assembly Materials II', wikiUrl: 'https://foxhole.wiki.gg/wiki/Assembly_Materials_II', imgUrl: 'https://foxhole.wiki.gg/images/AssemblyMaterials2Icon.png?dbb2da',
    category: FoxholeItemCategory.Resource,
    inCrate: 1
  },
  {
    name: 'Assembly Materials III', wikiUrl: 'https://foxhole.wiki.gg/wiki/Assembly_Materials_III', imgUrl: 'https://foxhole.wiki.gg/images/AssemblyMaterials3Icon.png?6f1a56',
    category: FoxholeItemCategory.Resource,
    inCrate: 1
  },
  {
    name: 'Assembly Materials IV', wikiUrl: 'https://foxhole.wiki.gg/wiki/Assembly_Materials_IV', imgUrl: 'https://foxhole.wiki.gg/images/AssemblyMaterials4Icon.png?37281f',
    category: FoxholeItemCategory.Resource,
    inCrate: 1
  },
  {
    name: 'Assembly Materials V', wikiUrl: 'https://foxhole.wiki.gg/wiki/Assembly_Materials_V', imgUrl: 'https://foxhole.wiki.gg/images/AssemblyMaterials5Icon.png?98d3d7',
    category: FoxholeItemCategory.Resource,
    inCrate: 1
  },
  {
    name: 'Rare Alloys', wikiUrl: 'https://foxhole.wiki.gg/wiki/Rare_Alloys', imgUrl: 'https://foxhole.wiki.gg/images/FacilityMaterials09Icon.png?8e2b3e',
    category: FoxholeItemCategory.Resource,
    inCrate: 1
  },
  {
    name: 'Heavy Oil', wikiUrl: 'https://foxhole.wiki.gg/wiki/Heavy_Oil', imgUrl: 'https://foxhole.wiki.gg/images/FacilityOil1Icon.png?f356a3',
    category: FoxholeItemCategory.Resource,
    inCrate: 1
  },
  {
    name: 'Enriched Oil', wikiUrl: 'https://foxhole.wiki.gg/wiki/Enriched_Oil', imgUrl: 'https://foxhole.wiki.gg/images/FacilityOil2Icon.png?4dd33e',
    category: FoxholeItemCategory.Resource,
    inCrate: 1
  },
  {
    name: 'Oil', wikiUrl: 'https://foxhole.wiki.gg/wiki/Oil', imgUrl: 'https://foxhole.wiki.gg/images/OilIcon.png?33397b',
    category: FoxholeItemCategory.Resource,
    inCrate: 1
  },
  {
    name: 'Petrol', wikiUrl: 'https://foxhole.wiki.gg/wiki/Petrol', imgUrl: 'https://foxhole.wiki.gg/images/thumb/RefinedFuelIcon.png/100px-RefinedFuelIcon.png?415c90',
    category: FoxholeItemCategory.Resource,
    inCrate: 1
  },
  {
    name: 'Pipe', wikiUrl: 'https://foxhole.wiki.gg/wiki/Pipe', imgUrl: 'https://foxhole.wiki.gg/images/thumb/EngineRoomPipeIcon.png/100px-EngineRoomPipeIcon.png?5b5cea',
    category: FoxholeItemCategory.Resource,
    inCrate: 2
  },
  {
    name: 'Aluminum Alloy', wikiUrl: 'https://foxhole.wiki.gg/wiki/Aluminum_Alloy', imgUrl: 'https://foxhole.wiki.gg/images/thumb/ResouceAluminumRefinedIcon.png/100px-ResouceAluminumRefinedIcon.png?ac6736',
    category: FoxholeItemCategory.Resource,
    inCrate: 20
  },
  {
    name: 'Basic Materials', wikiUrl: 'https://foxhole.wiki.gg/wiki/Basic_Materials', imgUrl: 'https://foxhole.wiki.gg/images/thumb/BasicMaterialsIcon.png/100px-BasicMaterialsIcon.png?b246f1',
    category: FoxholeItemCategory.Resource,
    inCrate: 100
  },
  {
    name: 'Copper Alloy', wikiUrl: 'https://foxhole.wiki.gg/wiki/Copper_Alloy', imgUrl: 'https://foxhole.wiki.gg/images/thumb/ResourceCopperRefinedIcon.png/100px-ResourceCopperRefinedIcon.png?823a5c',
    category: FoxholeItemCategory.Resource,
    inCrate: 20
  },
  {
    name: 'Explosive Powder', wikiUrl: 'https://foxhole.wiki.gg/wiki/Explosive_Powder', imgUrl: 'https://foxhole.wiki.gg/images/thumb/ExplosiveMaterialIcon.png/100px-ExplosiveMaterialIcon.png?2de2ce',
    category: FoxholeItemCategory.Resource,
    inCrate: 40
  },
  {
    name: 'Construction Materials', wikiUrl: 'https://foxhole.wiki.gg/wiki/Construction_Materials', imgUrl: 'https://foxhole.wiki.gg/images/ConstructionMaterialsIcon.png?571daa',
    category: FoxholeItemCategory.Resource,
    inCrate: 20
  },
  {
    name: 'Rare Materials', wikiUrl: 'https://foxhole.wiki.gg/wiki/Rare_Materials', imgUrl: 'https://foxhole.wiki.gg/images/MetalBeamPlatformItemIcon.png?34dbf9',
    category: FoxholeItemCategory.Resource,
  },
  {
    name: 'Gravel', wikiUrl: 'https://foxhole.wiki.gg/wiki/Gravel', imgUrl: 'https://foxhole.wiki.gg/images/thumb/GroundMaterialsIcon.png/100px-GroundMaterialsIcon.png?13bc03',
    category: FoxholeItemCategory.Resource,
    inCrate: 20
  },
  {
    name: 'Heavy Explosive Powder', wikiUrl: 'https://foxhole.wiki.gg/wiki/Heavy_Explosive_Powder', imgUrl: 'https://foxhole.wiki.gg/images/thumb/HeavyExplosiveMaterialsIcon.png/100px-HeavyExplosiveMaterialsIcon.png?f93996',
    category: FoxholeItemCategory.Resource,
    inCrate: 30
  },
  {
    name: 'Iron Alloy', wikiUrl: 'https://foxhole.wiki.gg/wiki/Iron_Alloy', imgUrl: 'https://foxhole.wiki.gg/images/thumb/ResouceIronRefinedIcon.png/100px-ResouceIronRefinedIcon.png?9630b7',
    category: FoxholeItemCategory.Resource,
    inCrate: 20
  },
  {
    name: 'Maintenance Supplies', wikiUrl: 'https://foxhole.wiki.gg/wiki/Maintenance_Supplies', imgUrl: 'https://foxhole.wiki.gg/images/thumb/MaintenanceSuppliesIcon.png/100px-MaintenanceSuppliesIcon.png?2e3f5c',
    category: FoxholeItemCategory.Resource,
    inCrate: 100
  },
  {
    name: 'Relic Materials', wikiUrl: 'https://foxhole.wiki.gg/wiki/Relic_Materials', imgUrl: 'https://foxhole.wiki.gg/images/thumb/RelicMaterialItemIcon.png/100px-RelicMaterialItemIcon.png?3e0244',
    category: FoxholeItemCategory.Resource,
    inCrate: 20
  },
  {
    name: 'Refined Materials', wikiUrl: 'https://foxhole.wiki.gg/wiki/Refined_Materials', imgUrl: 'https://foxhole.wiki.gg/images/thumb/RefinedMaterialsIcon.png/100px-RefinedMaterialsIcon.png?9656f0',
    category: FoxholeItemCategory.Resource,
    inCrate: 20
  },
  {
    name: 'Specialist’s Overcoat', wikiUrl: 'https://foxhole.wiki.gg/wiki/Heavy_Ammo_Uniform', imgUrl: 'https://foxhole.wiki.gg/images/thumb/AmmoUniformWIcon.png/100px-AmmoUniformWIcon.png?16c0b5',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 15
  },
  {
    name: 'Velian Flak Vest', wikiUrl: 'https://foxhole.wiki.gg/wiki/Velian_Flak_Vest', imgUrl: 'https://foxhole.wiki.gg/images/thumb/ArmourUniformC.png/100px-ArmourUniformC.png?347b74',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 10
  },
  {
    name: 'Gunner’s Breastplate', wikiUrl: 'https://foxhole.wiki.gg/wiki/Gunner%27s_Breastplate', imgUrl: 'https://foxhole.wiki.gg/images/thumb/ArmourUniformW.png/100px-ArmourUniformW.png?d249dc',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 5
  },
  {
    name: 'Fabri Rucksack', wikiUrl: 'https://foxhole.wiki.gg/wiki/Fabri_Rucksack', imgUrl: 'https://foxhole.wiki.gg/images/thumb/EngineerUniformCIcon.png/100px-EngineerUniformCIcon.png?3c4789',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 15
  },
  {
    name: 'Sapper Gear', wikiUrl: 'https://foxhole.wiki.gg/wiki/Sapper_Gear', imgUrl: 'https://foxhole.wiki.gg/images/thumb/EngineerUniformWIcon.png/100px-EngineerUniformWIcon.png?f9f2ce',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 15
  },
  {
    name: 'Grenadier’s Baldric', wikiUrl: 'https://foxhole.wiki.gg/wiki/Grenade_Uniform', imgUrl: 'https://foxhole.wiki.gg/images/thumb/GrenadeUniformCIcon.png/100px-GrenadeUniformCIcon.png?36cd4e',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 15
  },
  {
    name: 'Medic Fatigues', wikiUrl: 'https://foxhole.wiki.gg/wiki/Medic_Fatigues', imgUrl: 'https://foxhole.wiki.gg/images/thumb/MedicUniformCIcon.png/100px-MedicUniformCIcon.png?6822ce',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 15
  },
  {
    name: 'Physician’s Jacket', wikiUrl: 'https://foxhole.wiki.gg/wiki/Physician%27s_Jacket', imgUrl: 'https://foxhole.wiki.gg/images/thumb/MedicUniformWIcon.png/100px-MedicUniformWIcon.png?d20d82',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 15
  },
  {
    name: 'Remex Garb', wikiUrl: 'https://foxhole.wiki.gg/wiki/Remex_Garb', imgUrl: 'https://foxhole.wiki.gg/images/thumb/NavalUniformC.png/100px-NavalUniformC.png?ef28cd',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 15
  },
  {
    name: 'Gentleman’s Peacoat', wikiUrl: 'https://foxhole.wiki.gg/wiki/Gentleman%27s_Peacoat', imgUrl: 'https://foxhole.wiki.gg/images/thumb/NavalUniformW.png/100px-NavalUniformW.png?28a5e3',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 15
  },
  {
    name: 'Officialis’ Attire', wikiUrl: 'https://foxhole.wiki.gg/wiki/Officialis%27_Attire', imgUrl: 'https://foxhole.wiki.gg/images/thumb/OfficerUniformCIcon.png/100px-OfficerUniformCIcon.png?3cd953',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 3
  },
  {
    name: 'Officer’s Regalia', wikiUrl: 'https://foxhole.wiki.gg/wiki/Officer%27s_Regalia', imgUrl: 'https://foxhole.wiki.gg/images/thumb/OfficerUniformWIcon.png/100px-OfficerUniformWIcon.png?e001c6',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 3
  },
  {
    name: 'Auster’s Harness', wikiUrl: 'https://foxhole.wiki.gg/wiki/Auster%E2%80%99s_Harness', imgUrl: 'https://foxhole.wiki.gg/images/thumb/ParatrooperUniformCIcon.png/100px-ParatrooperUniformCIcon.png?fcee2f',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 15
  },
  {
    name: 'Cloudrunner’s Vesture', wikiUrl: 'https://foxhole.wiki.gg/wiki/Cloudrunner%E2%80%99s_Vesture', imgUrl: 'https://foxhole.wiki.gg/images/thumb/ParatrooperUniformWIcon.png/100px-ParatrooperUniformWIcon.png?81ea76',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 15
  },
  {
    name: 'Lodesman’s Lorica', wikiUrl: 'https://foxhole.wiki.gg/wiki/Lodesman%E2%80%99s_Lorica', imgUrl: 'https://foxhole.wiki.gg/images/thumb/PilotUniformCIcon.png/100px-PilotUniformCIcon.png?6d58a0',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 1
  },
  {
    name: 'Aviator’s Raiment', wikiUrl: 'https://foxhole.wiki.gg/wiki/Aviator%E2%80%99s_Raiment', imgUrl: 'https://foxhole.wiki.gg/images/thumb/PilotUniformWIcon.png/100px-PilotUniformWIcon.png?d81ad9',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 1
  },
  {
    name: 'Legionary’s Oilcoat', wikiUrl: 'https://foxhole.wiki.gg/wiki/Rain_Uniform', imgUrl: 'https://foxhole.wiki.gg/images/thumb/RainUniformCIcon.png/100px-RainUniformCIcon.png?dc83fb',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 15
  },
  {
    name: 'Recon Camo', wikiUrl: 'https://foxhole.wiki.gg/wiki/Recon_Camo', imgUrl: 'https://foxhole.wiki.gg/images/thumb/ScoutUniformCIcon.png/100px-ScoutUniformCIcon.png?bdf7ec',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 15
  },
  {
    name: 'Outrider’s Mantle', wikiUrl: 'https://foxhole.wiki.gg/wiki/Outrider%27s_Mantle', imgUrl: 'https://foxhole.wiki.gg/images/thumb/ScoutUniformWIcon.png/100px-ScoutUniformWIcon.png?de8fc6',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 15
  },
  {
    name: 'Heavy Topcoat', wikiUrl: 'https://foxhole.wiki.gg/wiki/Heavy_Topcoat', imgUrl: 'https://foxhole.wiki.gg/images/thumb/SnowUniformCIcon.png/100px-SnowUniformCIcon.png?55b958',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 15
  },
  {
    name: 'Caoivish Parka', wikiUrl: 'https://foxhole.wiki.gg/wiki/Caoivish_Parka', imgUrl: 'https://foxhole.wiki.gg/images/thumb/SnowUniformWIcon.png/100px-SnowUniformWIcon.png?479b41',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 15
  },
  {
    name: 'Legionary Fatigues', wikiUrl: 'https://foxhole.wiki.gg/wiki/Legionary_Fatigues', imgUrl: 'https://foxhole.wiki.gg/images/thumb/SoldierUniformCIcon.png/100px-SoldierUniformCIcon.png?272be9',
    category: FoxholeItemCategory.Uniforms
  },
  {
    name: 'Infantry Battledress', wikiUrl: 'https://foxhole.wiki.gg/wiki/Infantry_Battledress', imgUrl: 'https://foxhole.wiki.gg/images/thumb/SoldierUniformWIcon.png/100px-SoldierUniformWIcon.png?66c9de',
    category: FoxholeItemCategory.Uniforms
  },
  {
    name: 'Tankman’s Coveralls', wikiUrl: 'https://foxhole.wiki.gg/wiki/Tankman%27s_Coveralls', imgUrl: 'https://foxhole.wiki.gg/images/thumb/TankUniformCIcon.png/100px-TankUniformCIcon.png?ffe013',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 15
  },
  {
    name: 'Padded Boiler Suit', wikiUrl: 'https://foxhole.wiki.gg/wiki/Padded_Boiler_Suit', imgUrl: 'https://foxhole.wiki.gg/images/thumb/TankUniformWIcon.png/100px-TankUniformWIcon.png?aebe3c',
    category: FoxholeItemCategory.Uniforms,
    inCrate: 15
  },
  {
    name: 'Colonial Aircraft Engine (Small)', wikiUrl: 'https://foxhole.wiki.gg/wiki/Colonial_Aircraft_Engine_(Small)', imgUrl: 'https://foxhole.wiki.gg/images/thumb/AircraftPartSmallEngineCIcon.png/100px-AircraftPartSmallEngineCIcon.png?d22a99',
    category: FoxholeItemCategory.AircraftParts
  },
  {
    name: 'Warden Aircraft Engine (Small)', wikiUrl: 'https://foxhole.wiki.gg/wiki/Warden_Aircraft_Engine_(Small)', imgUrl: 'https://foxhole.wiki.gg/images/thumb/AircraftSmallEngineWIcon.png/100px-AircraftSmallEngineWIcon.png?84590e',
    category: FoxholeItemCategory.AircraftParts
  },
  {
    name: 'Damaged Colonial Aircraft Engine (Small)', wikiUrl: 'https://foxhole.wiki.gg/wiki/Damaged_Colonial_Aircraft_Engine_(Small)', imgUrl: 'https://foxhole.wiki.gg/images/thumb/DamagedAircraftPartSmallEngineCIcon.png/100px-DamagedAircraftPartSmallEngineCIcon.png?81b2e8',
    category: FoxholeItemCategory.AircraftParts
  },
  {
    name: 'Damaged Warden Aircraft Engine (Small)', wikiUrl: 'https://foxhole.wiki.gg/wiki/Damaged_Warden_Aircraft_Engine_(Small)', imgUrl: 'https://foxhole.wiki.gg/images/thumb/DamagedAircraftSmallEngineWIcon.png/100px-DamagedAircraftSmallEngineWIcon.png?43a5eb',
    category: FoxholeItemCategory.AircraftParts
  },
  {
    name: 'Colonial Aircraft Mechanical Parts (Small)', wikiUrl: 'https://foxhole.wiki.gg/wiki/Colonial_Aircraft_Mechanical_Parts_(Small)', imgUrl: 'https://foxhole.wiki.gg/images/thumb/AircraftPartSmallMechanicalCIcon.png/100px-AircraftPartSmallMechanicalCIcon.png?cb417c',
    category: FoxholeItemCategory.AircraftParts
  },
  {
    name: 'Warden Aircraft Mechanical Parts (Small)', wikiUrl: 'https://foxhole.wiki.gg/wiki/Warden_Aircraft_Mechanical_Parts_(Small)', imgUrl: 'https://foxhole.wiki.gg/images/thumb/AircraftWingsIcon.png/100px-AircraftWingsIcon.png?8c9512',
    category: FoxholeItemCategory.AircraftParts
  },
  {
    name: 'Damaged Colonial Aircraft Mechanical Parts (Small)', wikiUrl: 'https://foxhole.wiki.gg/wiki/Damaged_Colonial_Aircraft_Mechanical_Parts_(Small)', imgUrl: 'https://foxhole.wiki.gg/images/thumb/DamagedAircraftPartSmallMechanicalCIcon.png/100px-DamagedAircraftPartSmallMechanicalCIcon.png?31285e',
    category: FoxholeItemCategory.AircraftParts
  },
  {
    name: 'Damaged Warden Aircraft Mechanical Parts (Small)', wikiUrl: 'https://foxhole.wiki.gg/wiki/Damaged_Warden_Aircraft_Mechanical_Parts_(Small)', imgUrl: 'https://foxhole.wiki.gg/images/thumb/DamagedAircraftWingsIcon.png/100px-DamagedAircraftWingsIcon.png?662312',
    category: FoxholeItemCategory.AircraftParts
  },
  {
    name: 'R-12 - “Salus” Ambulance', wikiUrl: 'https://foxhole.wiki.gg/wiki/R-12_-_%E2%80%9CSalus%E2%80%9D_Ambulance', imgUrl: 'https://foxhole.wiki.gg/images/Ambulance.png?f99cc6',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'R-12b - “Salva” Flame Truck', wikiUrl: 'https://foxhole.wiki.gg/wiki/R-12b_-_%E2%80%9CSalva%E2%80%9D_Flame_Truck', imgUrl: 'https://foxhole.wiki.gg/images/AmbulanceFlameC.png?b35874',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Dunne Dousing Engine 3r', wikiUrl: 'https://foxhole.wiki.gg/wiki/Dunne_Dousing_Engine_3r', imgUrl: 'https://foxhole.wiki.gg/images/AmbulanceFlameW.png?825657',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Dunne Responder 3e', wikiUrl: 'https://foxhole.wiki.gg/wiki/Dunne_Responder_3e', imgUrl: 'https://foxhole.wiki.gg/images/AmbulanceWar.png?26fcfa',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'O’Brien V.101 Freeman', wikiUrl: 'https://foxhole.wiki.gg/wiki/O%E2%80%99Brien_V.101_Freeman', imgUrl: 'https://foxhole.wiki.gg/images/ArmoredCarOffensiveWVehicleIcon.png?68c7e3',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'O’Brien v.200 Squire', wikiUrl: 'https://foxhole.wiki.gg/wiki/O%27Brien_V.200_Squire', imgUrl: 'https://foxhole.wiki.gg/images/ArmoredCar2MultiWIcon.png?a1f572',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'O’Brien V.190 Knave', wikiUrl: 'https://foxhole.wiki.gg/wiki/O%E2%80%99Brien_V.190_Knave', imgUrl: 'https://foxhole.wiki.gg/images/ArmoredCarTwinWIcon.png?babc40',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'O’Brien V.113 Gravekeeper', wikiUrl: 'https://foxhole.wiki.gg/wiki/O%E2%80%99Brien_V.113_Gravekeeper', imgUrl: 'https://foxhole.wiki.gg/images/ArmoredCarATWVehicleIcon.png?1d7e7c',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'T3 “Xiphos”', wikiUrl: 'https://foxhole.wiki.gg/wiki/T3_%E2%80%9CXiphos%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/ArmoredCarVehicleIcon.png?308725',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'O’Brien V.130 Wild Jack', wikiUrl: 'https://foxhole.wiki.gg/wiki/O%E2%80%99Brien_V.130_Wild_Jack', imgUrl: 'https://foxhole.wiki.gg/images/ArmoredCarFlameWarVehicleIcon.png?97e970',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'O’Brien V.121 Highlander', wikiUrl: 'https://foxhole.wiki.gg/wiki/O%E2%80%99Brien_V.121_Highlander', imgUrl: 'https://foxhole.wiki.gg/images/ArmoredCarMobilityWarVehicleIcon.png?2097a1',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'T5 “Percutio”', wikiUrl: 'https://foxhole.wiki.gg/wiki/T5_%E2%80%9CPercutio%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/ArmoredCarOffensiveCVehicleIcon.png?16e573',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'T8 “Gemini”', wikiUrl: 'https://foxhole.wiki.gg/wiki/T8_%E2%80%9CGemini%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/ArmoredCarTwinCItemIcon.png?d31847',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'O’Brien V.110', wikiUrl: 'https://foxhole.wiki.gg/wiki/O%E2%80%99Brien_V.110', imgUrl: 'https://foxhole.wiki.gg/images/ArmoredCarWarVehicleIcon.png?4d72dc',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'R-15 - “Chariot”', wikiUrl: 'https://foxhole.wiki.gg/wiki/R-15_-_%E2%80%9CChariot%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/BusIcon.png?2ba2eb',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Dunne Caravaner 2f', wikiUrl: 'https://foxhole.wiki.gg/wiki/Dunne_Caravaner_2f', imgUrl: 'https://foxhole.wiki.gg/images/BusWarIcon.png?46403f',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'BMS - Universal Assembly Rig', wikiUrl: 'https://foxhole.wiki.gg/wiki/BMS_-_Universal_Assembly_Rig', imgUrl: 'https://foxhole.wiki.gg/images/ConstructionVehicleIcon.png?17ea46',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'BMS - Fabricator', wikiUrl: 'https://foxhole.wiki.gg/wiki/BMS_-_Fabricator', imgUrl: 'https://foxhole.wiki.gg/images/AdvancedConstructionVehicleIcon.png?2af6b2',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'BMS - Class 2 Mobile Auto-Crane', wikiUrl: 'https://foxhole.wiki.gg/wiki/BMS_-_Class_2_Mobile_Auto-Crane', imgUrl: 'https://foxhole.wiki.gg/images/CraneVehicleIcon.png?b08a43',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Noble Firebrand Mk. XVII', wikiUrl: 'https://foxhole.wiki.gg/wiki/Noble_Firebrand_Mk._XVII', imgUrl: 'https://foxhole.wiki.gg/images/DestroyerTankFlameWIcon.png?2d66aa',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Noble Widow MK. XIV', wikiUrl: 'https://foxhole.wiki.gg/wiki/Noble_Widow_MK._XIV', imgUrl: 'https://foxhole.wiki.gg/images/DestroyerTankWVehicleIcon.png?3fb853',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'GA6 “Cestus”', wikiUrl: 'https://foxhole.wiki.gg/wiki/GA6_%E2%80%9CCestus%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/FieldAT2CIcon.png?d06efd',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Duncan’s Coin 14.5mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/Duncan%27s_Coin_14.5mm', imgUrl: 'https://foxhole.wiki.gg/images/FieldAT2WIcon.png?99fa32',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'AA-2 "Battering Ram"', wikiUrl: 'https://foxhole.wiki.gg/wiki/AA-2_%22Battering_Ram%22', imgUrl: 'https://foxhole.wiki.gg/images/FieldAntiTankColVehicleIcon.png?6448f9',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Balfour Rampart 68mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/Balfour_Rampart_68mm', imgUrl: 'https://foxhole.wiki.gg/images/FieldCannonOffensiveWIcon.png?430b0d',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Collins Cannon 68mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/Collins_Cannon_68mm', imgUrl: 'https://foxhole.wiki.gg/images/FieldAntiTankWarVehicleIcon.png?a945d3',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: '40-45 “Smelter”', wikiUrl: 'https://foxhole.wiki.gg/wiki/40-45_%E2%80%9CSmelter%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/FieldATOffensiveCIcon.png?90fc43',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Balfour Wolfhound 40mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/Balfour_Wolfhound_40mm', imgUrl: 'https://foxhole.wiki.gg/images/FieldCannonWVehicleIcon.png?fd561f',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'G40 “Sagittarii”', wikiUrl: 'https://foxhole.wiki.gg/wiki/G40_%E2%80%9CSagittarii%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/FieldMachineGun.png?81becc',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Swallowtail 988/127-2', wikiUrl: 'https://foxhole.wiki.gg/wiki/Swallowtail_988/127-2', imgUrl: 'https://foxhole.wiki.gg/images/FieldMachineGunWar.png?a729cf',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: '30-250 “Tisiphone” Field Cannon', wikiUrl: 'https://foxhole.wiki.gg/wiki/30-250_%E2%80%9CTisiphone%E2%80%9D_Field_Cannon', imgUrl: 'https://foxhole.wiki.gg/images/FieldMortarCIcon.png?d24698',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Balfour Falconer 250mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/Balfour_Falconer_250mm', imgUrl: 'https://foxhole.wiki.gg/images/FieldMortarWIcon.png?56a820',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'BMS - Packmule Flatbed', wikiUrl: 'https://foxhole.wiki.gg/wiki/BMS_-_Packmule_Flatbed', imgUrl: 'https://foxhole.wiki.gg/images/FlatbedTruckVehicleIcon.png?d7c701',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'BMS - Ironship', wikiUrl: 'https://foxhole.wiki.gg/wiki/BMS_-_Ironship', imgUrl: 'https://foxhole.wiki.gg/images/Freighter02ItemIcon.png?4e066a',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Das Krokodil by VAC', wikiUrl: 'https://foxhole.wiki.gg/wiki/Das_Krokodil_by_VAC', imgUrl: 'https://foxhole.wiki.gg/images/LightFreighterVehicleIcon.png?9b7e4e',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Type B - “Lucian”', wikiUrl: 'https://foxhole.wiki.gg/wiki/Type_B_-_%E2%80%9CLucian%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/GunBoat2CVehicleIcon.png?94f6b9',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: '81f-f Ronan Blackguard', wikiUrl: 'https://foxhole.wiki.gg/wiki/81f-f_Ronan_Blackguard', imgUrl: 'https://foxhole.wiki.gg/images/Gunboat2WIcon.png?2bd262',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Type C - “Charon”', wikiUrl: 'https://foxhole.wiki.gg/wiki/Type_C_-_%E2%80%9CCharon%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/GunBoatCHullIcon.png?82c0e7',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: '74b-1 Ronan Gunship', wikiUrl: 'https://foxhole.wiki.gg/wiki/74b-1_Ronan_Gunship', imgUrl: 'https://foxhole.wiki.gg/images/GunboatWIcon.png?6f03f7',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'HH-d “Peltast”', wikiUrl: 'https://foxhole.wiki.gg/wiki/HH-d_%E2%80%9CPeltast%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/HalfTrackArtilleryCIcon.png?308055',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'HH-a “Javelin”', wikiUrl: 'https://foxhole.wiki.gg/wiki/HH-a_%E2%80%9CJavelin%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/HalfTrackColVehicleIcon.png?b33db4',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'HH-b “Hoplite”', wikiUrl: 'https://foxhole.wiki.gg/wiki/HH-b_%E2%80%9CHoplite%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/HalfTrackColHeavyArmorVehicleIcon.png?64dcd6',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Niska-Rycker Mk. IX Skycaller', wikiUrl: 'https://foxhole.wiki.gg/wiki/Niska-Rycker_Mk._IX_Skycaller', imgUrl: 'https://foxhole.wiki.gg/images/HalftrackMultiWIcon.png?aefe37',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Niska Mk. II Blinder', wikiUrl: 'https://foxhole.wiki.gg/wiki/Niska_Mk._II_Blinder', imgUrl: 'https://foxhole.wiki.gg/images/HalfTrackOffensiveWarVehicleIcon.png?2dc541',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Niska Mk. III Scar Twin', wikiUrl: 'https://foxhole.wiki.gg/wiki/Niska_Mk._III_Scar_Twin', imgUrl: 'https://foxhole.wiki.gg/images/HalftrackTwinW.png?134c12',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Niska Mk. I Gun Motor Carriage', wikiUrl: 'https://foxhole.wiki.gg/wiki/Niska_Mk._I_Gun_Motor_Carriage', imgUrl: 'https://foxhole.wiki.gg/images/HalfTrackWarVehicleIcon.png?4c5a24',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'BMS - Scrap Hauler', wikiUrl: 'https://foxhole.wiki.gg/wiki/BMS_-_Scrap_Hauler', imgUrl: 'https://foxhole.wiki.gg/images/Harvester.png?47e415',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'AU-A150 Taurine Rigger', wikiUrl: 'https://foxhole.wiki.gg/wiki/AU-A150_Taurine_Rigger', imgUrl: 'https://foxhole.wiki.gg/images/HeavyTruckCVehicleIcon.png?c24873',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Cnute Cliffwrest', wikiUrl: 'https://foxhole.wiki.gg/wiki/Cnute_Cliffwrest', imgUrl: 'https://foxhole.wiki.gg/images/HeavyTruckWItemIcon_copy.png?74521e',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'AB-8 “Acheron”', wikiUrl: 'https://foxhole.wiki.gg/wiki/AB-8_%E2%80%9CAcheron%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/LandingCraftVehicleIcon.png?9d1a75',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'AB-11 “Doru”', wikiUrl: 'https://foxhole.wiki.gg/wiki/AB-11_%E2%80%9CDoru%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/LandingCraftOffensiveVehicleIcon.png?ef3f7a',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Mulloy LPC', wikiUrl: 'https://foxhole.wiki.gg/wiki/Mulloy_LPC', imgUrl: 'https://foxhole.wiki.gg/images/LandingCraftWarVehicleIcon.png?3ebfb5',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: '945g “Stygian Bolt”', wikiUrl: 'https://foxhole.wiki.gg/wiki/945g_%E2%80%9CStygian_Bolt%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/FieldATHeavyCIcon.png?3c9db2',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Balfour Stockade 75mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/Balfour_Stockade_75mm', imgUrl: 'https://foxhole.wiki.gg/images/FieldCannonHeavyWIcon.png?2d4ad5',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: '120-68 “Koronides” Field Gun', wikiUrl: 'https://foxhole.wiki.gg/wiki/120-68_%E2%80%9CKoronides%E2%80%9D_Field_Gun', imgUrl: 'https://foxhole.wiki.gg/images/FieldArtilleryColVehicleIcon.png?fc3da1',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: '40-250 “Alekto” Heavy Cannon', wikiUrl: 'https://foxhole.wiki.gg/wiki/40-250_%E2%80%9CAlekto%E2%80%9D_Heavy_Cannon', imgUrl: 'https://foxhole.wiki.gg/images/LargeFieldMortarCIcon.png?fbe6ac',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Rycker 4/3-F Wasp Nest', wikiUrl: 'https://foxhole.wiki.gg/wiki/Rycker_4/3-F_Wasp_Nest', imgUrl: 'https://foxhole.wiki.gg/images/FieldMultiWItemIcon.png?ab32ea',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'K-81e “Sombre”', wikiUrl: 'https://foxhole.wiki.gg/wiki/K-81e_%E2%80%9CSombre%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/LightBoatInfantryCIcon.png?a30257',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: '68A-4 Ronan Fathomer', wikiUrl: 'https://foxhole.wiki.gg/wiki/68A-4_Ronan_Fathomer', imgUrl: 'https://foxhole.wiki.gg/images/LightBoatInfantryWVehicleIcon.png?cb1db8',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'HC-2 “Scorpion”', wikiUrl: 'https://foxhole.wiki.gg/wiki/HC-2_%E2%80%9CScorpion%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/LightTank2InfantryCVehicleIcon.png?b9105d',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'HA-1 “Sagaris”', wikiUrl: 'https://foxhole.wiki.gg/wiki/HA-1_%E2%80%9CSagaris%E2%80%9D', imgUrl: '',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Sharkey-Devitt Birdeater Mk. I', wikiUrl: 'https://foxhole.wiki.gg/wiki/Sharkey-Devitt_Birdeater_Mk._I', imgUrl: '',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Devitt-Caine Mk. IV MMR', wikiUrl: 'https://foxhole.wiki.gg/wiki/Devitt-Caine_Mk._IV_MMR', imgUrl: 'https://foxhole.wiki.gg/images/LightTankArtilleryWar.png?d9f92d',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'H-5 "Hatchet"', wikiUrl: 'https://foxhole.wiki.gg/wiki/H-5_%E2%80%9CHatchet%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/LightTankColVehicleIcon.png?33670a',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Devitt Ironhide Mk. IV', wikiUrl: 'https://foxhole.wiki.gg/wiki/Devitt_Ironhide_Mk._IV', imgUrl: 'https://foxhole.wiki.gg/images/LightTankWarDefensiveVehicleIcon.png?a6ee34',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'H-19 “Vulcan”', wikiUrl: 'https://foxhole.wiki.gg/wiki/H-19_%E2%80%9CVulcan%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/LightTankFlameCIcon.png?ba524c',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'H-8 “Kranesca”', wikiUrl: 'https://foxhole.wiki.gg/wiki/H-8_%E2%80%9CKranesca%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/LightTankColMobilityVehicleIcon.png?2a274c',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'H-10 “Pelekys”', wikiUrl: 'https://foxhole.wiki.gg/wiki/H-10_%E2%80%9CPelekys%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/LightTankOffensiveCVehicleIcon.png?1427df',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Devitt Mk. III', wikiUrl: 'https://foxhole.wiki.gg/wiki/Devitt_Mk._III', imgUrl: 'https://foxhole.wiki.gg/images/LightTankWarVehicleIcon.png?6e7889',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Strider', wikiUrl: 'https://foxhole.wiki.gg/wiki/Strider', imgUrl: 'https://foxhole.wiki.gg/images/MediumBoatCIcon.png?46e9d9',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Rinnspeir Ornitier-Class Gunship', wikiUrl: 'https://foxhole.wiki.gg/wiki/Rinnspeir_Ornitier-Class_Gunship', imgUrl: 'https://foxhole.wiki.gg/images/MediumBoatWVehicleIcon.png?d80364',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: '86K-a “Bardiche”', wikiUrl: 'https://foxhole.wiki.gg/wiki/86K-a_%E2%80%9CBardiche%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/thumb/MediumTank2CIcon.png/256px-MediumTank2CIcon.png?2161df',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Gallagher Thornfall Mk. VI', wikiUrl: 'https://foxhole.wiki.gg/wiki/Gallagher_Thornfall_Mk._VI', imgUrl: 'https://foxhole.wiki.gg/images/thumb/MediumTank2IndirectWIcon.png/256px-MediumTank2IndirectWIcon.png?a66136',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Gallagher Highwayman Mk. III', wikiUrl: 'https://foxhole.wiki.gg/wiki/Gallagher_Highwayman_Mk._III', imgUrl: 'https://foxhole.wiki.gg/images/MediumTank2MultiWIcon.png?8c3462',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Gallagher Outlaw Mk. II', wikiUrl: 'https://foxhole.wiki.gg/wiki/Gallagher_Outlaw_Mk._II', imgUrl: 'https://foxhole.wiki.gg/images/thumb/MediumTank2RangeWIcon.png/256px-MediumTank2RangeWIcon.png?cfc25c',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: '86K-c “Ranseur”', wikiUrl: 'https://foxhole.wiki.gg/wiki/86K-c_%E2%80%9CRanseur%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/MediumTank2TwinCVehicleIcon.png?e175d6',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Gallagher Brigand Mk. I', wikiUrl: 'https://foxhole.wiki.gg/wiki/Gallagher_Brigand_Mk._I', imgUrl: 'https://foxhole.wiki.gg/images/MediumTank2WIcon.png?914f8b',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: '90T-v “Nemesis”', wikiUrl: 'https://foxhole.wiki.gg/wiki/90T-v_%E2%80%9CNemesis%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/MediumTank3CItemIcon.png?ddf976',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Silverhand Lordscar - Mk. X', wikiUrl: 'https://foxhole.wiki.gg/wiki/Silverhand_Lordscar_-_Mk._X', imgUrl: 'https://foxhole.wiki.gg/images/MediumTankATWIcon.png?90b740',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: '85K-b “Falchion”', wikiUrl: 'https://foxhole.wiki.gg/wiki/85K-b_%E2%80%9CFalchion%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/ColonialMediumTankIcon.png?5b6e6f',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: '85V-g "Talos"', wikiUrl: 'https://foxhole.wiki.gg/wiki/85V-g_%22Talos%22', imgUrl: 'https://foxhole.wiki.gg/images/thumb/MediumTankLargeCIcon.png/256px-MediumTankLargeCIcon.png?984cfe',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: '85K-a “Spatha”', wikiUrl: 'https://foxhole.wiki.gg/wiki/85K-a_%E2%80%9CSpatha%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/ColonialMediumTankOffensive.png?fc149a',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Silverhand Chieftain - Mk. VI', wikiUrl: 'https://foxhole.wiki.gg/wiki/Silverhand_Chieftain_-_Mk._VI', imgUrl: 'https://foxhole.wiki.gg/images/MediumTankSiegeWVehicleIcon.png?f510b9',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Silverhand - Mk. IV', wikiUrl: 'https://foxhole.wiki.gg/wiki/Silverhand_-_Mk._IV', imgUrl: 'https://foxhole.wiki.gg/images/WardenMediumTankIcon.png?d7ef24',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Bellweather by VAC', wikiUrl: 'https://foxhole.wiki.gg/wiki/Bellweather_by_VAC', imgUrl: 'https://foxhole.wiki.gg/images/MineboatIcon.png?6f61d6',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'HC-7 "Ballista"', wikiUrl: 'https://foxhole.wiki.gg/wiki/HC-7_%22Ballista%22', imgUrl: 'https://foxhole.wiki.gg/images/MortarTankVehicleIcon.png?c8328f',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: '03MM “Caster”', wikiUrl: 'https://foxhole.wiki.gg/wiki/03MM_%E2%80%9CCaster%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/MotorcycleVehicleIcon.png?c4e3e3',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: '00MS “Stinger”', wikiUrl: 'https://foxhole.wiki.gg/wiki/00MS_%E2%80%9CStinger%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/MotorcycleOffensiveVehicleIcon.png?d856a2',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Kivela Power Wheel 80-1', wikiUrl: 'https://foxhole.wiki.gg/wiki/Kivela_Power_Wheel_80-1', imgUrl: 'https://foxhole.wiki.gg/images/MotorcycleWIcon.png?9a7e7d',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'King Jester Mk. I-1', wikiUrl: 'https://foxhole.wiki.gg/wiki/King_Jester_Mk._I-1', imgUrl: 'https://foxhole.wiki.gg/images/ScoutTankMultiWIcon.png?94d0e6',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'King Gallant Mk. II', wikiUrl: 'https://foxhole.wiki.gg/wiki/King_Gallant_Mk._II', imgUrl: 'https://foxhole.wiki.gg/images/ScoutTankOffensiveWIcon.png?c1cbc2',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'King Spire Mk. I', wikiUrl: 'https://foxhole.wiki.gg/wiki/King_Spire_Mk._I', imgUrl: 'https://foxhole.wiki.gg/images/ScoutTankWIcon.png?a4ceb8',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'UV-05a “Argonaut”', wikiUrl: 'https://foxhole.wiki.gg/wiki/UV-05a_%E2%80%9CArgonaut%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/ScoutVehicleMobilityVehicleIcon.png?cd6401',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'UV-24 “Icarus”', wikiUrl: 'https://foxhole.wiki.gg/wiki/UV-24_%E2%80%9CIcarus%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/ScoutVehicleOffensiveVehicleIcon.png?907747',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Drummond Spitfire 100d', wikiUrl: 'https://foxhole.wiki.gg/wiki/Drummond_Spitfire_100d', imgUrl: 'https://foxhole.wiki.gg/images/ScoutVehicleOffensiveWarVehicleIcon.png?51f5b1',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'UV-5c “Odyssey”', wikiUrl: 'https://foxhole.wiki.gg/wiki/UV-5c_%E2%80%9COdyssey%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/ScoutVehicleUtilityCVehicleIcon.png?fab541',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Drummond Loscann 55c', wikiUrl: 'https://foxhole.wiki.gg/wiki/Drummond_Loscann_55c', imgUrl: 'https://foxhole.wiki.gg/images/ScoutVehicleAmphibiousWarVehicleIcon.png?643287',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Drummond 100a', wikiUrl: 'https://foxhole.wiki.gg/wiki/Drummond_100a', imgUrl: 'https://foxhole.wiki.gg/images/ScoutVehicleWarVehicleIcon.png?5f1e9b',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'T12 “Actaeon” Tankette', wikiUrl: 'https://foxhole.wiki.gg/wiki/T12_%E2%80%9CActaeon%E2%80%9D_Tankette', imgUrl: 'https://foxhole.wiki.gg/images/TanketteCVehicleIcon.png?788760',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'T14 “Vesta” Tankette', wikiUrl: 'https://foxhole.wiki.gg/wiki/T14_%E2%80%9CVesta%E2%80%9D_Tankette', imgUrl: 'https://foxhole.wiki.gg/images/TanketteFlameCIcon.png?65db14',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'T13 “Deioneus” Rocket Battery', wikiUrl: 'https://foxhole.wiki.gg/wiki/T13_%E2%80%9CDeioneus%E2%80%9D_Rocket_Battery', imgUrl: 'https://foxhole.wiki.gg/images/TanketteMultiCIcon.png?341c9d',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'T20 “Ixion” Tankette', wikiUrl: 'https://foxhole.wiki.gg/wiki/T20_%E2%80%9CIxion%E2%80%9D_Tankette', imgUrl: 'https://foxhole.wiki.gg/images/TanketteOffensiveCVehicleIcon.png?d9a7f7',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Rooster - Lamploader', wikiUrl: 'https://foxhole.wiki.gg/wiki/Rooster_-_Lamploader', imgUrl: 'https://foxhole.wiki.gg/images/FuelTrailerIcon.png?aa3c7c',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Rooster - Tumblebox', wikiUrl: 'https://foxhole.wiki.gg/wiki/Rooster_-_Tumblebox', imgUrl: 'https://foxhole.wiki.gg/images/MaterialTrailerIcon.png?d81465',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Rooster - Junkwagon', wikiUrl: 'https://foxhole.wiki.gg/wiki/Rooster_-_Junkwagon', imgUrl: 'https://foxhole.wiki.gg/images/ResourceTrailerIcon.png?e7ea99',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'R-1 Hauler', wikiUrl: 'https://foxhole.wiki.gg/wiki/R-1_Hauler', imgUrl: 'https://foxhole.wiki.gg/images/TruckVehicleIcon.png?bdbe71',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Dunne Leatherback 2a', wikiUrl: 'https://foxhole.wiki.gg/wiki/Dunne_Leatherback_2a', imgUrl: 'https://foxhole.wiki.gg/images/TruckDefensiveWIcon.png?f54211',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'RR-3 “Stolon” Tanker', wikiUrl: 'https://foxhole.wiki.gg/wiki/RR-3_%E2%80%9CStolon%E2%80%9D_Tanker', imgUrl: 'https://foxhole.wiki.gg/images/OilTankerIcon.png?1e5797',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Dunne Fuelrunner 2d', wikiUrl: 'https://foxhole.wiki.gg/wiki/Dunne_Fuelrunner_2d', imgUrl: 'https://foxhole.wiki.gg/images/OilTankerWarIcon.png?e85e98',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'R-5b “Sisyphus” Hauler', wikiUrl: 'https://foxhole.wiki.gg/wiki/R-5b_%E2%80%9CSisyphus%E2%80%9D_Hauler', imgUrl: 'https://foxhole.wiki.gg/images/TruckMobilityCVehicleIcon.png?bb5537',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'Dunne Landrunner 12c', wikiUrl: 'https://foxhole.wiki.gg/wiki/Dunne_Landrunner_12c', imgUrl: 'https://foxhole.wiki.gg/images/TruckMobilityWarVehicleIcon.png?a1f8b5',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'R-17 “Retiarius” Skirmisher', wikiUrl: 'https://foxhole.wiki.gg/wiki/R-17_%E2%80%9CRetiarius%E2%80%9D_Skirmisher', imgUrl: 'https://foxhole.wiki.gg/images/TruckMultiCIcon.png?4c2772',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'R-9 “Speartip” Escort', wikiUrl: 'https://foxhole.wiki.gg/wiki/R-9_%E2%80%9CSpeartip%E2%80%9D_Escort', imgUrl: 'https://foxhole.wiki.gg/images/TruckOffensiveVehicleIcon.png?4e6408',
    category: FoxholeItemCategory.VehiclesNonCrate
  },
  {
    name: 'R-5 “Atlas” Hauler', wikiUrl: 'https://foxhole.wiki.gg/wiki/R-5_%E2%80%9CAtlas%E2%80%9D_Hauler', imgUrl: 'https://foxhole.wiki.gg/images/TruckUtilityVehicleIcon.png?b3a828',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Dunne Loadlugger 3c', wikiUrl: 'https://foxhole.wiki.gg/wiki/Dunne_Loadlugger_3c', imgUrl: 'https://foxhole.wiki.gg/images/TruckUtilityWarVehicleIcon.png?956603',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Dunne Transport', wikiUrl: 'https://foxhole.wiki.gg/wiki/Dunne_Transport', imgUrl: 'https://foxhole.wiki.gg/images/TruckWarVehicleIcon.png?9f870b',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'V-1 Tzykalia', wikiUrl: 'https://foxhole.wiki.gg/wiki/V-1_Tzykalia', imgUrl: 'https://foxhole.wiki.gg/images/AircraftBomberCIcon.png?7e132f',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Tulka P4 Welkinrive', wikiUrl: 'https://foxhole.wiki.gg/wiki/Tulka_P4_Welkinrive', imgUrl: 'https://foxhole.wiki.gg/images/AircraftBomberWIcon.png?724f51',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Mergo-4 “Myrmidon”', wikiUrl: 'https://foxhole.wiki.gg/wiki/Mergo-4_%E2%80%9CMyrmidon%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/AircraftDiveCIcon_copy.png?dff524',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Toxot-902 “Blind Silver”', wikiUrl: 'https://foxhole.wiki.gg/wiki/Toxot-902_%E2%80%9CBlind_Silver%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/AircraftFigtherCIcon.png?b66e7a',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Luminary Mk. II Harbinger', wikiUrl: 'https://foxhole.wiki.gg/wiki/Luminary_Mk._II_Harbinger', imgUrl: 'https://foxhole.wiki.gg/images/AircraftFighterWIcon.png?30793d',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'V-5b Pegasus', wikiUrl: 'https://foxhole.wiki.gg/wiki/V-5b_Pegasus', imgUrl: 'https://foxhole.wiki.gg/images/AircraftParatrooperCIcon.png?15d8cc',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Rinnspeir Mk. I Zealot', wikiUrl: 'https://foxhole.wiki.gg/wiki/Rinnspeir_Mk._I_Zealot', imgUrl: 'https://foxhole.wiki.gg/images/AircraftParatrooperWIcon.png?22e60c',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'A51 Venti “Daedalus”', wikiUrl: 'https://foxhole.wiki.gg/wiki/A51_Venti_%E2%80%9CDaedalus%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/AircraftScoutCIcon.png?cd009a',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Luminary Mk. IV Herald', wikiUrl: 'https://foxhole.wiki.gg/wiki/Luminary_Mk._IV_Herald', imgUrl: 'https://foxhole.wiki.gg/images/AircraftScoutWIcon.png?bef9f3',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'M925 Austringer Man-O-War', wikiUrl: 'https://foxhole.wiki.gg/wiki/M925_Austringer_Man-O-War', imgUrl: 'https://foxhole.wiki.gg/images/AircraftTorpedoWIcon.png?2e5802',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Tulka I1.9 White Raven', wikiUrl: 'https://foxhole.wiki.gg/wiki/Tulka_I1.9_White_Raven', imgUrl: 'https://foxhole.wiki.gg/images/AircraftWaterWIcon.png?192fb2',
    category: FoxholeItemCategory.Vehicles
  },
  {
    name: 'Concrete Mixer', wikiUrl: 'https://foxhole.wiki.gg/wiki/Concrete_Mixer', imgUrl: 'https://foxhole.wiki.gg/images/ConcreteMixerIcon.png?2f97ee',
    category: FoxholeItemCategory.ShippableStructures
  },
  {
    name: 'Construction Equipment', wikiUrl: 'https://foxhole.wiki.gg/wiki/Construction_Equipment', imgUrl: 'https://foxhole.wiki.gg/images/ConstructionEquipment.png?8a1295',
    category: FoxholeItemCategory.ShippableStructures
  },
  {
    name: 'DAE 5b “Zeal”', wikiUrl: 'https://foxhole.wiki.gg/wiki/DAE_5b_%E2%80%9CZeal%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/EmplacedAircraftCIcon.png?a9993d',
    category: FoxholeItemCategory.ShippableStructures
  },
  {
    name: 'Leary AA-70 Bolas', wikiUrl: 'https://foxhole.wiki.gg/wiki/Leary_AA-70_Bolas', imgUrl: 'https://foxhole.wiki.gg/images/EmplacedAircraftWIcon.png?53eaea',
    category: FoxholeItemCategory.ShippableStructures
  },
  {
    name: 'Huber Starbreaker 94.5mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/Huber_Starbreaker_94.5mm', imgUrl: 'https://foxhole.wiki.gg/images/EmplacedATLargeWIcon.png?d1b02c',
    category: FoxholeItemCategory.ShippableStructuresNonCrate
  },
  {
    name: 'Leary Shellbore 68mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/Leary_Shellbore_68mm', imgUrl: 'https://foxhole.wiki.gg/images/EmplacedATIcon.png?94922d',
    category: FoxholeItemCategory.ShippableStructures
  },
  {
    name: 'DAE 2a-1 “Ruptura”', wikiUrl: 'https://foxhole.wiki.gg/wiki/DAE_2a-1_%E2%80%9CRuptura%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/EmplacedCannonLargeC.png?ce3cf9',
    category: FoxholeItemCategory.ShippableStructuresNonCrate
  },
  {
    name: '50-500 “Thunderbolt” Cannon', wikiUrl: 'https://foxhole.wiki.gg/wiki/50-500_%E2%80%9CThunderbolt%E2%80%9D_Cannon', imgUrl: 'https://foxhole.wiki.gg/images/HeavyArtilleryCIcon.png?3a8f49',
    category: FoxholeItemCategory.ShippableStructures
  },
  {
    name: 'Huber Exalt 150mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/Huber_Exalt_150mm', imgUrl: 'https://foxhole.wiki.gg/images/HeavyArtilleryW.png?271619',
    category: FoxholeItemCategory.ShippableStructures
  },
  {
    name: 'DAE 1o-3 “Polybolos”', wikiUrl: 'https://foxhole.wiki.gg/wiki/DAE_1o-3_%E2%80%9CPolybolos%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/EmplacedIndirectCIcon.png?9c0e32',
    category: FoxholeItemCategory.ShippableStructures
  },
  {
    name: 'DAE 1b-2 “Serra”', wikiUrl: 'https://foxhole.wiki.gg/wiki/DAE_1b-2_%E2%80%9CSerra%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/EmplacedInfantryCIcon.png?46c5c2',
    category: FoxholeItemCategory.ShippableStructures
  },
  {
    name: 'Leary Snare Trap 20', wikiUrl: 'https://foxhole.wiki.gg/wiki/Leary_Snare_Trap_20', imgUrl: 'https://foxhole.wiki.gg/images/EmplacedMGIcon.png?770fca',
    category: FoxholeItemCategory.ShippableStructures
  },
  {
    name: 'Huber Lariat 120mm', wikiUrl: 'https://foxhole.wiki.gg/wiki/Huber_Lariat_120mm', imgUrl: 'https://foxhole.wiki.gg/images/EmplacedHowitzerIcon.png?f0c9cc',
    category: FoxholeItemCategory.ShippableStructures
  },
  {
    name: 'DAE 3b-2 “Hades’ Net”', wikiUrl: 'https://foxhole.wiki.gg/wiki/DAE_3b-2_%E2%80%9CHades%E2%80%99_Net%E2%80%9D', imgUrl: 'https://foxhole.wiki.gg/images/EmplacedMultiCStructureIcon.png?9f2fe2',
    category: FoxholeItemCategory.ShippableStructuresNonCrate
  },
  {
    name: 'Construction Parts', wikiUrl: 'https://foxhole.wiki.gg/wiki/Construction_Parts', imgUrl: 'https://foxhole.wiki.gg/images/ConstructionPartsShippableIcon.png?876d60',
    category: FoxholeItemCategory.ShippableStructuresNonCrate
  },
  {
    name: 'Underground Fortress Parts', wikiUrl: 'https://foxhole.wiki.gg/wiki/Underground_Fortress_Parts', imgUrl: 'https://foxhole.wiki.gg/images/FortGarrisonStationIcon.png?7811a6',
    category: FoxholeItemCategory.ShippableStructuresNonCrate
  },
  {
    name: 'Intelligence Center Parts', wikiUrl: 'https://foxhole.wiki.gg/wiki/Intelligence_Center_Parts', imgUrl: 'https://foxhole.wiki.gg/images/IntelCenterShippableIcon.png?51f3d4',
    category: FoxholeItemCategory.ShippableStructuresNonCrate
  },
  {
    name: 'Aircraft Radar Parts', wikiUrl: 'https://foxhole.wiki.gg/wiki/Aircraft_Radar_Parts', imgUrl: 'https://foxhole.wiki.gg/images/FortLargeRadarShippbleIcon.png?6d4047',
    category: FoxholeItemCategory.ShippableStructuresNonCrate
  },
  {
    name: 'Storm Cannon Parts', wikiUrl: 'https://foxhole.wiki.gg/wiki/Storm_Cannon_Parts', imgUrl: 'https://foxhole.wiki.gg/images/StormCannonShippableIcon.png?8fa93a',
    category: FoxholeItemCategory.ShippableStructuresNonCrate
  },
  {
    name: 'Structure Parts', wikiUrl: 'https://foxhole.wiki.gg/wiki/Structure_Parts', imgUrl: 'https://foxhole.wiki.gg/images/StructureEquipmentShippableIcon.png?d8b26b',
    category: FoxholeItemCategory.ShippableStructuresNonCrate
  },
  {
    name: 'Weather Station Parts', wikiUrl: 'https://foxhole.wiki.gg/wiki/Weather_Station_Parts', imgUrl: 'https://foxhole.wiki.gg/images/WeatherStationShippableIcon.png?c63892',
    category: FoxholeItemCategory.ShippableStructuresNonCrate
  },
  {
    name: 'Liquid Container', wikiUrl: 'https://foxhole.wiki.gg/wiki/Liquid_Container', imgUrl: 'https://foxhole.wiki.gg/images/FuelTankIcon.png?ef063c',
    category: FoxholeItemCategory.ShippableStructures
  },
  {
    name: 'Material Pallet', wikiUrl: 'https://foxhole.wiki.gg/wiki/Material_Pallet', imgUrl: 'https://foxhole.wiki.gg/images/MaterialPlatformItemIcon.png?7b0b70',
    category: FoxholeItemCategory.ShippableStructures
  },
  {
    name: 'Resource Container', wikiUrl: 'https://foxhole.wiki.gg/wiki/Resource_Container', imgUrl: 'https://foxhole.wiki.gg/images/ResourceContainerIcon.png?b76182',
    category: FoxholeItemCategory.ShippableStructures
  },
  {
    name: 'A0E-9 Rocket Booster', wikiUrl: 'https://foxhole.wiki.gg/wiki/A0E-9_Rocket_Booster', imgUrl: 'https://foxhole.wiki.gg/images/RocketPartBottomIcon.png?180318',
    category: FoxholeItemCategory.ShippableStructuresNonCrate
  },
  {
    name: 'A0E-9 Rocket Body', wikiUrl: 'https://foxhole.wiki.gg/wiki/A0E-9_Rocket_Body', imgUrl: 'https://foxhole.wiki.gg/images/RocketPartCenterIcon.png?854260',
    category: FoxholeItemCategory.ShippableStructuresNonCrate
  },
  {
    name: 'A0E-9 Rocket Warhead', wikiUrl: 'https://foxhole.wiki.gg/wiki/A0E-9_Rocket_Warhead', imgUrl: 'https://foxhole.wiki.gg/images/RocketPartTopIcon.png?9c907a',
    category: FoxholeItemCategory.ShippableStructuresNonCrate
  },
  {
    name: 'Naval Hull Segments', wikiUrl: 'https://foxhole.wiki.gg/wiki/Naval_Hull_Segments', imgUrl: 'https://foxhole.wiki.gg/images/ShipPart1.png?7e4881',
    category: FoxholeItemCategory.ShippableStructuresNonCrate
  },
  {
    name: 'Naval Shell Plating', wikiUrl: 'https://foxhole.wiki.gg/wiki/Naval_Shell_Plating', imgUrl: 'https://foxhole.wiki.gg/images/ShipPart2.png?5ff1f5',
    category: FoxholeItemCategory.ShippableStructuresNonCrate
  },
  {
    name: 'Naval Turbine Components', wikiUrl: 'https://foxhole.wiki.gg/wiki/Naval_Turbine_Components', imgUrl: 'https://foxhole.wiki.gg/images/ShipPart3.png?7d0832',
    category: FoxholeItemCategory.ShippableStructuresNonCrate
  },
  {
    name: 'Shipping Container', wikiUrl: 'https://foxhole.wiki.gg/wiki/Shipping_Container', imgUrl: 'https://foxhole.wiki.gg/images/ShippingContainerStructureIcon.png?284fa2',
    category: FoxholeItemCategory.ShippableStructures 
  },
];