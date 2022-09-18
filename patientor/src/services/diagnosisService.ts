import diagnosisData from "../../data/diagnoses.json";

import { Diagnose } from "../types";

const diagnoses: Array<Diagnose> = diagnosisData;

const getDiagnosis = (): Array<Diagnose> => {
  return diagnoses;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnosis,
  addDiagnosis,
};
