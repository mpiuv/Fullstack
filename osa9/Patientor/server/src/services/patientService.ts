import patientData from '../../data/patients';
import { Patient,NonSensitivePatientEntry } from '../types';

const patients: Patient[] = patientData;

const getEntries = () :NonSensitivePatientEntry [] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation})=>({ id, name, dateOfBirth, gender, occupation}));
};

export default {
  getEntries
};