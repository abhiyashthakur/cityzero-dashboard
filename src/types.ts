export type WasteStream = 'recycling' | 'compost' | 'landfill';

export interface WasteMetric {
  stream: WasteStream;
  currentTons: number;
  targetTons: number;
  changePct: number;
  contaminationRate: number;
}

export interface DiversionPoint {
  date: string;
  recycling: number;
  compost: number;
  landfill: number;
}

export interface DistrictScore {
  district: string;
  score: number;
  participationRate: number;
  households: number;
}

export interface Challenge {
  id: string;
  title: string;
  households: number;
  status: 'active' | 'upcoming' | 'completed';
  impactTons: number;
}

export interface ResidentChampion {
  name: string;
  badge: string;
  actions: number;
}
