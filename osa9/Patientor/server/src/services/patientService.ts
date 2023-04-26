import patientData from '../../data/patients';
import { Patient,NonSensitivePatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

const getEntries = () :NonSensitivePatientEntry [] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation})=>({ id, name, dateOfBirth, gender, occupation}));
};

const addPatient=(name:string, dateOfBirth:string, ssn:string, gender:string, occupation:string):Patient => {
  const newPatientEntry = {
    id: uuid(), name:name, dateOfBirth:dateOfBirth, ssn:ssn, gender:gender, occupation:occupation
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
}

export default {
  getEntries, addPatient
};