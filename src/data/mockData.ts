import type {
  Challenge,
  DistrictScore,
  DiversionPoint,
  ResidentChampion,
  WasteMetric
} from '../types';

export const wasteMetrics: WasteMetric[] = [
  {
    stream: 'recycling',
    currentTons: 1280,
    targetTons: 1500,
    changePct: 8.4,
    contaminationRate: 5.2
  },
  {
    stream: 'compost',
    currentTons: 940,
    targetTons: 1100,
    changePct: 11.1,
    contaminationRate: 2.9
  },
  {
    stream: 'landfill',
    currentTons: 1020,
    targetTons: 800,
    changePct: -6.3,
    contaminationRate: 0
  }
];

export const diversionTrend: DiversionPoint[] = [
  { date: 'May', recycling: 960, compost: 720, landfill: 1300 },
  { date: 'Jun', recycling: 1010, compost: 780, landfill: 1250 },
  { date: 'Jul', recycling: 1100, compost: 820, landfill: 1200 },
  { date: 'Aug', recycling: 1180, compost: 870, landfill: 1150 },
  { date: 'Sep', recycling: 1230, compost: 890, landfill: 1100 },
  { date: 'Oct', recycling: 1280, compost: 940, landfill: 1020 }
];

export const districtLeaderboard: DistrictScore[] = [
  { district: 'North Loop', score: 94, participationRate: 72, households: 18400 },
  { district: 'Riverfront', score: 91, participationRate: 69, households: 15250 },
  { district: 'Midtown', score: 88, participationRate: 64, households: 13110 },
  { district: 'Harborview', score: 84, participationRate: 59, households: 9800 },
  { district: 'Cedar Grove', score: 80, participationRate: 55, households: 7600 }
];

export const neighborhoodChallenges: Challenge[] = [
  {
    id: 'CH-101',
    title: 'Green Blocks Compost Sprint',
    households: 4200,
    status: 'active',
    impactTons: 38
  },
  {
    id: 'CH-093',
    title: 'Glass-Only Recycling Nights',
    households: 3100,
    status: 'active',
    impactTons: 24
  },
  {
    id: 'CH-087',
    title: 'Zero-Landfill Schools Pilot',
    households: 1600,
    status: 'upcoming',
    impactTons: 15
  }
];

export const citizenChampions: ResidentChampion[] = [
  { name: 'Ava Flores', badge: 'Circularity Captain', actions: 182 },
  { name: 'Mason Li', badge: 'Compost Steward', actions: 163 },
  { name: 'Priya Patel', badge: 'Zero-Waste Coach', actions: 150 },
  { name: 'Jordan Reed', badge: 'Share Shed Host', actions: 138 }
];
