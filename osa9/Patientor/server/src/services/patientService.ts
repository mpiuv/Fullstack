import patientData from '../../data/patients';
import { Patient,NonSensitivePatientEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

const getEntries = () :NonSensitivePatientEntry [] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation})=>({ id, name, dateOfBirth, gender, occupation}));
};

const getPatientEntry = (id:string) :NonSensitivePatientEntry | undefined  => {
  const pd:Patient|undefined =patientData.find( element => element.id === id)
  if (pd===undefined)
    return undefined
  else 
    return { id:pd.id, name:pd.name, dateOfBirth:pd.dateOfBirth, gender:pd.gender, occupation:pd.occupation}
}

const addPatient=(entry:NewPatientEntry):Patient => {
  const newPatientEntry = {
    id: uuid(), ...entry
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
}

export default {
  getEntries, addPatient, getPatientEntry
};