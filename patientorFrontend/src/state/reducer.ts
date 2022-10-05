import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";
import { assertNever } from "../utils";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: { entry: Entry; patientId: Patient["id"] };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.patientId]: {
            ...state.patients[action.payload.patientId],
            entries: state.patients[action.payload.patientId].entries.concat(
              action.payload.entry
            ),
          },
        },
      };
    default:
      assertNever(action);
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const setPatient = (patient: Patient): Action => {
  return {
    type: "SET_PATIENT",
    payload: patient,
  };
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses,
  };
};

export const addEntry = (patientId: Patient["id"], entry: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: { entry, patientId },
  };
};
