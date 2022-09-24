import React from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";
import GenderIcon from "../components/GenderIcon";

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
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
          dispatch({ type: "SET_PATIENT", payload: PatientFromApi });
        } catch (e) {
          console.error(e);
        }
      }
    };
    void fetchPatient();
  }, [dispatch]);

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
      </div>
    );
  } else {
    return <div>Unknown patient.</div>;
  }
};

export default PatientPage;
