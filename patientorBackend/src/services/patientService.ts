import patientData from "../../data/patients";
import { PublicPatient, Patient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((d) => d.id === id);
  return patient;
};

const getNonSensitivePatients = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
  getNonSensitivePatients,
  findById,
};
