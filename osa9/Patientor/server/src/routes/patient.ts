import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils";
import { NonSensitivePatientEntry } from '../types';

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getEntries());
});

router.get("/:id", (req, res) => {
  const pe:NonSensitivePatientEntry|undefined=patientService.getPatientEntry(req.params.id);
  if(pe===undefined)
     res.status(400).send("Error:No such id");
  else 
    res.send(pe);
});

router.post("/",(req, res) => {
  const newPatient = toNewPatient(req.body);
  try {
    const addedEntry = patientService.addPatient(newPatient);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;