import patientData from '../../data/better-patients';
import { Patient,NonSensitivePatientEntry, NewPatientEntry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry,
NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry } from '../types';
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

const addHealthCheckEntry=(patientId:string,entry:NewHealthCheckEntry):HealthCheckEntry => {
  const newHealthCheckEntry:HealthCheckEntry = {id:uuid(),...entry};
  
  patientData.find(e => e.id===patientId)?.entries.push(newHealthCheckEntry);

  return newHealthCheckEntry
}

const addHospitalEntry=(patientId:string,entry:NewHospitalEntry):HospitalEntry => {
  const newHospitalEntry:HospitalEntry = {id:uuid(),...entry};
  
  patientData.find(e => e.id===patientId)?.entries.push(newHospitalEntry);

  return newHospitalEntry
}

const addOccupationalHealthcareEntry=(patientId:string,entry:NewOccupationalHealthcareEntry):OccupationalHealthcareEntry => {
  const newOccupationalHealthcareEntry:OccupationalHealthcareEntry = {id:uuid(),...entry};
  
  patientData.find(e => e.id===patientId)?.entries.push(newOccupationalHealthcareEntry);

  return newOccupationalHealthcareEntry
}

export default {
  getEntries, addPatient, getPatientEntry, addHealthCheckEntry, addHospitalEntry, addOccupationalHealthcareEntry
};