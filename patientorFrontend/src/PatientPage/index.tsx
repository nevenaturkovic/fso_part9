import React from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { setDiagnoses, setPatient, useStateValue } from "../state";
import { Patient, Diagnosis } from "../types";

import GenderIcon from "../components/GenderIcon";

const PatientPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Missing patient id.</div>;
  }

  React.useEffect(() => {
    const fetchPatient = async () => {
      const patient = patients[id];
      if (!patient || !patients.ssn) {
        try {
          const { data: PatientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(setPatient(PatientFromApi));
        } catch (e) {
          console.error(e);
        }
      }
    };
    void fetchPatient();

    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnoses(diagnosesFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnoses();
  }, [dispatch]);

  //console.log(diagnoses["M24.2"].name);
  const patient = patients[id];
  if (patient) {
    return (
      <div className="App">
        <h2>
          {patient.name} <GenderIcon gender={patient.gender} />
        </h2>
        <p>
          ssn: {patient.ssn}
          <br />
          occupation: {patient.occupation}
        </p>
        {patient.entries.length > 0 && (
          <>
            <h3>entries</h3>
            {patient.entries.map((entry) => (
              <div key={entry.id}>
                <p>
                  {entry.date} <em>{entry.description}</em>
                </p>
                {entry.diagnosisCodes && (
                  <ul>
                    {entry.diagnosisCodes.map((code) => (
                      <li key={code}>
                        {code}{" "}
                        {Object.keys(diagnoses).length > 0 && diagnoses[code].name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    );
  } else {
    return <div>Unknown patient.</div>;
  }
};

export default PatientPage;
