import React from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { addEntry, setDiagnoses, setPatient, useStateValue } from "../state";
import {
  Patient,
  Diagnosis,
  Entry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HospitalEntry,
  NewEntry,
} from "../types";

import GenderIcon from "../components/GenderIcon";
import { assertNever } from "../utils";
import { Button, Card } from "@material-ui/core";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HealthRatingHeart from "../components/HealthRatingHeart";
import AddEntryModal from "../AddEntryModal";

const CommonEntryComponent = ({
  entry,
  children,
  header,
}: {
  entry: Entry;
  children?: React.ReactNode;
  header: React.ReactNode;
}) => {
  const [{ diagnoses }, dispatch] = useStateValue();
  React.useEffect(() => {
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
  return (
    <Card variant="outlined" style={{ marginBottom: "1em" }}>
      <div key={entry.id}>
        <p>
          {entry.date} {header} <br /> <em>{entry.description}</em>
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
        {children}
        <p>diagnose by {entry.specialist}</p>
      </div>
    </Card>
  );
};

const HospitalEntryComponent = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <CommonEntryComponent
      entry={entry}
      header={<LocalHospitalIcon />}
    ></CommonEntryComponent>
  );
};

const OccupationalHealthcareComponent = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <CommonEntryComponent
      entry={entry}
      header={
        <span>
          <WorkIcon /> {entry.employerName}
        </span>
      }
    ></CommonEntryComponent>
  );
};

const HealthCheckComponent = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <CommonEntryComponent entry={entry} header={<MedicalServicesIcon />}>
      <HealthRatingHeart rating={entry.healthCheckRating} />
    </CommonEntryComponent>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryComponent entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareComponent entry={entry} />;
    case "HealthCheck":
      return <HealthCheckComponent entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  if (!id) {
    return <div>Missing Entry id.</div>;
  }

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
              <EntryDetails entry={entry} key={entry.id} />
            ))}
          </>
        )}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
        </Button>
      </div>
    );
  } else {
    return <div>Unknown patient.</div>;
  }
};

export default PatientPage;
