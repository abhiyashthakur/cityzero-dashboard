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
    currentTons: 1860,
    targetTons: 2500,
    changePct: 4.2,
    contaminationRate: 5.1
  },
  {
    stream: 'compost',
    currentTons: 1375,
    targetTons: 1800,
    changePct: 6.4,
    contaminationRate: 1.2
  },
  {
    stream: 'landfill',
    currentTons: 890,
    targetTons: 700,
    changePct: -3.1,
    contaminationRate: 0
  }
];

export const diversionTrend: DiversionPoint[] = [
  { date: 'Apr', recycling: 280, compost: 190, landfill: 210 },
  { date: 'May', recycling: 295, compost: 205, landfill: 205 },
  { date: 'Jun', recycling: 305, compost: 215, landfill: 198 },
  { date: 'Jul', recycling: 312, compost: 220, landfill: 192 },
  { date: 'Aug', recycling: 325, compost: 228, landfill: 185 },
  { date: 'Sep', recycling: 337, compost: 236, landfill: 177 }
];

export const districtLeaderboard: DistrictScore[] = [
  { district: 'North Point', score: 92, participationRate: 78, households: 18500 },
  { district: 'Harborview', score: 88, participationRate: 74, households: 16400 },
  { district: 'Mission Flats', score: 85, participationRate: 71, households: 15250 },
  { district: 'Innovation Row', score: 82, participationRate: 69, households: 13900 },
  { district: 'Civic Center', score: 79, participationRate: 65, households: 12140 }
];

export const neighborhoodChallenges: Challenge[] = [
  {
    id: 'curbside-caddies',
    title: 'Kitchen caddy signups',
    households: 8200,
    status: 'active',
    impactTons: 42
  },
  {
    id: 'glass-loop',
    title: 'Glass loop pilot',
    households: 4100,
    status: 'active',
    impactTons: 27
  },
  {
    id: 'multifamily-hubs',
    title: 'Multifamily drop-off hubs',
    households: 5600,
    status: 'upcoming',
    impactTons: 18
  },
  {
    id: 'brown-bin-refresh',
    title: 'Brown bin refresh',
    households: 10100,
    status: 'completed',
    impactTons: 64
  }
];

export const citizenChampions: ResidentChampion[] = [
  { name: 'Amelia Chen', badge: 'Zero Waste Zone Captain', actions: 148 },
  { name: 'Marco Alvarez', badge: 'Community Compost Coach', actions: 123 },
  { name: 'Priya Singh', badge: 'Repair Café Host', actions: 109 },
  { name: 'Caleb Ortiz', badge: 'School Sorting Lead', actions: 98 }
];
