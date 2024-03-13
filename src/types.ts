export type Patient = {
  id: number;
  x: number;
  y: number;
  infected: boolean;
  daysInfected: number;
  vaccinated: boolean;
};

export type SimulationParameters = {  
  infectionChance: number;
  deathChance: number;
};

export const defaultSimulationParameters: SimulationParameters = {
  distanceThreshold: 5,
  movement: 5,
  infectionChance: 5,
};

export type Disease = {
  name:string;
  infectionChance: number;
  deathChance: number;
  recoveryTime: number;
}

export let diseases = []