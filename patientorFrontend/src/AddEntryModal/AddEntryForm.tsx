import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import {
  TextField,
  EntryTypeOption,
  SelectField,
  DiagnosisSelection,
  NumberField,
} from "./FormField";
import { useStateValue } from "../state";
import {
  // Diagnosis,
  // Discharge,
  // HealthCheckRating,
  NewEntry,
  // SickLeave,
} from "../types";

// export type EntryFormValues = {
//   description: string;
//   date: string;
//   specialist: string;
//   type: string;
//   diagnosisCodes?: Array<Diagnosis["code"]>;
//   healthCheckRating?: HealthCheckRating;
//   discharge?: Discharge;
//   employerName?: string;
//   sickLeave?: SickLeave;
// };

export type EntryFormValues = NewEntry;

const entryTypeOptions: EntryTypeOption[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "OccupationalHealthcare" },
  { value: "HealthCheck", label: "HealthCheck" },
];

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}
export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: "Hospital",
        diagnosisCodes: [],
        discharge: { date: "", criteria: "" },
        // healthCheckRating: HealthCheckRating.Healthy,
        // employerName: "",
        // sickLeave: { startDate: "", endDate: "" },
      }}
      onSubmit={(values: NewEntry) => {
        if (
          values.type === "OccupationalHealthcare" &&
          values.sickLeave?.startDate === "" &&
          values.sickLeave?.endDate === ""
        ) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { sickLeave, ...valuesWithoutSickLeave } = values;
          onSubmit(valuesWithoutSickLeave);
        }
        onSubmit(values);
      }}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        switch (values.type) {
          case "Hospital":
            if (!values.discharge.date) {
              errors.discharge = requiredError;
            }
            if (!values.discharge.criteria) {
              errors.discharge = requiredError;
            }
            break;
          case "HealthCheck":
            if (!values.healthCheckRating) {
              errors.healthCheckRating = requiredError;
            }
            break;
          case "OccupationalHealthcare":
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            if (
              Boolean(values.sickLeave?.startDate) !=
              Boolean(values.sickLeave?.endDate)
            ) {
              errors.discharge =
                "Either provide both start and end date or neither.";
            }
            break;
        }
        // console.log("errors", errors);
        // console.log("values", values);
        return errors;
      }}
    >
      {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField
              label="Entry Type"
              name="type"
              options={entryTypeOptions}
            />
            {values.type === "Hospital" && (
              <div>
                <Field
                  label="Discharge date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Criteria"
                  placeholder="Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </div>
            )}
            {values.type === "HealthCheck" && (
              <div>
                <Field
                  label="Health Rating"
                  min={0}
                  max={3}
                  name="healthCheckRating"
                  start={3}
                  component={NumberField}
                />
              </div>
            )}
            {values.type === "OccupationalHealthcare" && (
              <div>
                <Field
                  label="Employer name"
                  placeholder="Employer name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick leave start date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick leave end date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </div>
            )}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
