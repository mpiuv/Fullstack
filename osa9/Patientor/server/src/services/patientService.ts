import patientData from '../../data/better-patients';
import { Patient,NonSensitivePatientEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = () :NonSensitivePatientEntry [] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries, ssn})=>
  ({ id, name, dateOfBirth, gender, occupation, entries, ssn}));
};

const getPatientEntry = (id:string) :NonSensitivePatientEntry | undefined  => {
  const pd:Patient|undefined =patientData.find( element => element.id === id);
  if (pd===undefined)
    return undefined;
  else 
    return { id:pd.id, name:pd.name, dateOfBirth:pd.dateOfBirth, gender:pd.gender, occupation:pd.occupation,entries:pd.entries,ssn:pd.ssn};
};

const addPatient=(entry:NewPatientEntry):Patient => {
  const newPatientEntry = {
    id: uuid(), ...entry
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries, addPatient, getPatientEntry
};