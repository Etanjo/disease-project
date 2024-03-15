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
  deathChance: 0,
};

export class Disease  {
  name:string;
  infectionChance: number;
  deathChance: number;
  recoveryTime: number;
  constructor(n:string,i:number,d:number,r:number){
    this.name = n
    this. infectionChance = i
    this.recoveryTime = r
    this.deathChance = d
    //@ts-ignore
    diseases.push(this)

  }
}

export let diseases = []