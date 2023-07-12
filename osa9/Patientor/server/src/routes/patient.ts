import express from "express";
import patientService from "../services/patientService";
import {toNewPatient, toHealthCheckEntry, toHospitalEntry, toOccupationalHealthcareEntry} from "../utils";
import { NonSensitivePatientEntry, Diagnosis } from '../types';
import assertNever from "assert-never";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getEntries());
});

router.get("/:id", (req, res) => {
  const pe:NonSensitivePatientEntry|undefined =patientService.getPatientEntry(req.params.id);
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

router.post("/:id/entries",(req, res) => {
  const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
  };

  const obj = req.body;
  if (!obj || typeof obj !== 'object' || !('type' in obj)) { 
    return res.status(400).send("Entry type is undefined");
  }

  switch (obj.type){
    case 'HealthCheck': res.json(patientService.addHealthCheckEntry(req.params.id,toHealthCheckEntry(obj,parseDiagnosisCodes(obj)))); return; 
    case 'Hospital': res.json(patientService.addHospitalEntry(req.params.id,toHospitalEntry(obj,parseDiagnosisCodes(obj)))); return; 
    case 'OccupationalHealthcare': 
      res.json(patientService.addOccupationalHealthcareEntry(req.params.id,toOccupationalHealthcareEntry(obj,parseDiagnosisCodes(obj)))); return; 
    default: assertNever(obj.type as never);
  }

});

export default router;