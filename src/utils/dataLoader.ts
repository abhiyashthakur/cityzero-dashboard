import Papa from 'papaparse';
import type { Challenge, DistrictScore, DiversionPoint, ResidentChampion, WasteMetric, WasteStream } from '../types';

interface WasteDataRow {
  month: string;
  year: string;
  recycling_tons: string;
  compost_tons: string;
  landfill_tons: string;
  contamination_recycling: string;
  contamination_compost: string;
  district: string;
  participation_rate: string;
  households: string;
}

interface ChampionRow {
  name: string;
  badge: string;
  actions: string;
  district: string;
}

interface ChallengeRow {
  id: string;
  title: string;
  households: string;
  status: string;
  impact_tons: string;
  district: string;
}

function parseCSV<T>(url: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<T>(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error)
    });
  });
}

function calculateMetrics(data: WasteDataRow[]): WasteMetric[] {
  const latest = data.slice(-5); // Last 5 districts (most recent month)
  const previous = data.slice(-10, -5); // Previous 5 districts

  const streams: WasteStream[] = ['recycling', 'compost', 'landfill'];
  
  return streams.map((stream) => {
    const currentTons = latest.reduce((sum, row) => sum + parseFloat(row[`${stream}_tons` as keyof WasteDataRow] as string), 0);
    const previousTons = previous.reduce((sum, row) => sum + parseFloat(row[`${stream}_tons` as keyof WasteDataRow] as string), 0);
    
    const changePct = previousTons > 0 ? ((currentTons - previousTons) / previousTons) * 100 : 0;
    
    // Set targets based on stream type
    const targetMultiplier = stream === 'landfill' ? 0.7 : 1.3;
    const targetTons = Math.round(currentTons * targetMultiplier);
    
    const contaminationKey = `contamination_${stream}` as keyof WasteDataRow;
    const contaminationRate = stream !== 'landfill' 
      ? latest.reduce((sum, row) => sum + parseFloat(row[contaminationKey] as string || '0'), 0) / latest.length
      : 0;

    return {
      stream,
      currentTons: Math.round(currentTons),
      targetTons,
      changePct: parseFloat(changePct.toFixed(1)),
      contaminationRate: parseFloat(contaminationRate.toFixed(1))
    };
  });
}

function calculateDiversionTrend(data: WasteDataRow[]): DiversionPoint[] {
  const monthlyData = new Map<string, { recycling: number; compost: number; landfill: number; count: number }>();

  data.forEach((row) => {
    const key = row.month;
    if (!monthlyData.has(key)) {
      monthlyData.set(key, { recycling: 0, compost: 0, landfill: 0, count: 0 });
    }
    const entry = monthlyData.get(key)!;
    entry.recycling += parseFloat(row.recycling_tons);
    entry.compost += parseFloat(row.compost_tons);
    entry.landfill += parseFloat(row.landfill_tons);
    entry.count += 1;
  });

  return Array.from(monthlyData.entries())
    .slice(-6) // Last 6 months
    .map(([date, totals]) => ({
      date,
      recycling: Math.round(totals.recycling / totals.count),
      compost: Math.round(totals.compost / totals.count),
      landfill: Math.round(totals.landfill / totals.count)
    }));
}

function calculateLeaderboard(data: WasteDataRow[]): DistrictScore[] {
  const latest = data.slice(-5); // Most recent month, all districts
  
  const districtScores = latest.map((row) => {
    const recycling = parseFloat(row.recycling_tons);
    const compost = parseFloat(row.compost_tons);
    const landfill = parseFloat(row.landfill_tons);
    const total = recycling + compost + landfill;
    const diversionRate = ((recycling + compost) / total) * 100;
    
    // Score based on diversion rate and participation
    const score = Math.round(diversionRate * 0.7 + parseFloat(row.participation_rate) * 0.3);

    return {
      district: row.district,
      score,
      participationRate: parseFloat(row.participation_rate),
      households: parseInt(row.households)
    };
  });

  return districtScores.sort((a, b) => b.score - a.score);
}

export async function loadWasteData(): Promise<{
  wasteMetrics: WasteMetric[];
  diversionTrend: DiversionPoint[];
  districtLeaderboard: DistrictScore[];
}> {
  const data = await parseCSV<WasteDataRow>('/data/waste-data.csv');
  
  return {
    wasteMetrics: calculateMetrics(data),
    diversionTrend: calculateDiversionTrend(data),
    districtLeaderboard: calculateLeaderboard(data)
  };
}

export async function loadChampions(): Promise<ResidentChampion[]> {
  const data = await parseCSV<ChampionRow>('/data/champions.csv');
  return data.map((row) => ({
    name: row.name,
    badge: row.badge,
    actions: parseInt(row.actions)
  }));
}

export async function loadChallenges(): Promise<Challenge[]> {
  const data = await parseCSV<ChallengeRow>('/data/challenges.csv');
  return data.map((row) => ({
    id: row.id,
    title: row.title,
    households: parseInt(row.households),
    status: row.status as 'active' | 'upcoming' | 'completed',
    impactTons: parseFloat(row.impact_tons)
  }));
}
