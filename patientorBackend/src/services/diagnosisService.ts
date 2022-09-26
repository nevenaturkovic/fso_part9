import diagnosisData from "../../data/diagnoses.json";

import { Diagnosis } from "../types";

const diagnoses: Array<Diagnosis> = diagnosisData;

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoses;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnosis,
};
