/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientService from "../services/patientService";
import { NewEntry } from "../types";
import toNewPatient, { toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.findById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  const newPatient = toNewPatient(req.body);
  const addedPatient = patientService.addPatient(newPatient);
  res.json(addedPatient);
});

router.post("/:id/entries", (req, res) => {
  console.log("req", req.body);
  const newEntry: NewEntry = toNewEntry(req.body);
  const addedEntry = patientService.addEntry(req.params.id, newEntry);
  res.json(addedEntry);
});

export default router;
