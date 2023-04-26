import patientData from '../../data/patients';
import { Patient,NonSensitivePatientEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

const getEntries = () :NonSensitivePatientEntry [] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation})=>({ id, name, dateOfBirth, gender, occupation}));
};

const addPatient=(entry:NewPatientEntry):Patient => {
  const newPatientEntry = {
    id: uuid(), ...entry
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
}

export default {
  getEntries, addPatient
};