import type { Patient } from "./types";
import type { SimulationParameters } from "./types";
import { Disease, defaultSimulationParameters, diseases } from "./types";

export const createPopulation = (size = 1600) => {
  const population: Patient[] = [];
  const sideSize = Math.sqrt(size);
  for (let i = 0; i < size; i++) {
    population.push({
      id: i,
      x: (100 * (i % sideSize)) / sideSize, // X-coordinate within 100 units
      y: (100 * Math.floor(i / sideSize)) / sideSize, // Y-coordinate scaled similarly
      infected: false,
      daysInfected: 0,
      alive: true,
      immuneRemain: 0,
      vaccinated: false,
    });
  }
  // Infect patient zero...
  let patientZero = population[Math.floor(Math.random() * size)];
  patientZero.infected = true;
  return population;
};

const ebola = new Disease("Ebola", 50, 44, 10);
const covid = new Disease("Covid-19", 63, 1, 10);
const flu = new Disease("Influenza", 38, 3, 14);

defaultSimulationParameters.infectionChance = diseases[0].infectionChance;
defaultSimulationParameters.deathChance = diseases[0].deathChance;

const updatePatient = (
  patient: Patient,
  population: Patient[],
  params: SimulationParameters
): Patient => {
  let updatedPatient = { ...patient };
  // IF we are NOT sick, see if our neighbors are sick...
  // choose a partner
  if (patient.alive) {
    const partner = population[Math.floor(Math.random() * population.length)];
    if (
      partner.infected &&
      100 * Math.random() < params.infectionChance &&
      partner.alive &&
      patient.immuneRemain == 0
    ) {
      updatedPatient = { ...patient, infected: true };
    }
    if (patient.infected == true) {
      let newDays = patient.daysInfected + 1;
      let deathNum = Math.random() * 100;
      updatedPatient = { ...patient, daysInfected: newDays };
      if (deathNum < params.deathChance && patient.daysInfected == 6) {
        updatedPatient = { ...patient, alive: false };
      }
      if (patient.daysInfected == 7) {
        updatedPatient = {
          ...patient,
          infected: false,
          daysInfected: 0,
          immuneRemain: 15,
        };
      }
    }
    if (patient.immuneRemain > 0) {
      let newRemain = patient.immuneRemain - 1;
      updatedPatient = { ...patient, immuneRemain: newRemain };
    }
  }
  return updatedPatient;
};

export const updatePopulation = (
  population: Patient[],
  params: SimulationParameters
): Patient[] => {
  // Run updatePatient once per patient to create *new* patients for new round.
  return population.map((patient) =>
    updatePatient(patient, population, params)
  );
};
