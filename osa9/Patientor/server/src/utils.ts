import { NewPatientEntry, Gender, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, Diagnosis, HealthCheckRating, 
  NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
  
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
  
const parseDate = (date: string): string => {
  if ( !isDate(date)) {
    throw new Error(`Incorrect date: ${date}`);
  }
  return date;
};

const isGender = (param: Gender): param is Gender => {
    return Object.values(Gender).includes(param);
  };
  
const parseGender = (gender: Gender): Gender => {
  if ( !isGender(gender)) {
    throw new Error(`Incorrect gender: ${gender}`);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument 
export const toNewPatient = (obj:any): NewPatientEntry => {
  if(!obj.name || !isString(obj.name)) throw('Name not defined');
  if(!obj.dateOfBirth|| !isString(obj.dateOfBirth)) throw('Date of birth not defined');
  if(!obj.ssn|| !isString(obj.ssn)) throw ('Ssn not defined');
  if(!obj.gender) throw ('Gender not defined');
  if (!obj.occupation|| !isString(obj.occupation)) throw ('Occupation not defined');
  if(!obj.entries) throw ('Entries not defined');

  const obj1:NewPatientEntry = obj as NewPatientEntry;

  const newEntry: NewPatientEntry = {
    name: obj1.name,
    ssn: obj1.ssn,
    dateOfBirth: parseDate(obj1.dateOfBirth),
    occupation: obj1.occupation,
    gender: parseGender(obj1.gender),
    entries: obj1.entries
  };
  return newEntry;
};

export const toHealthCheckEntry = (obj:any,diag:Array<Diagnosis['code']>): NewHealthCheckEntry =>{
  if(!obj.description || !isString(obj.description)) throw('Description not defined');
  if(!obj.date || !isString(obj.date)) throw('Date not defined');
  if(!obj.specialist || !isString(obj.specialist)) throw('Specialist not defined');

  if(obj.healthCheckRating===undefined ) throw('Health check rating not defined');
  if(obj.healthCheckRating<0 || obj.healthCheckRating>3 ) throw('Value of healthCheckRating incorrect:'+String(obj.healthCheckRating));

  const newEntry: NewHealthCheckEntry = {
    type: obj.type,
    description: obj.description,
    date: parseDate(obj.date),
    specialist: obj.specialist,
    diagnosisCodes: diag,
    healthCheckRating: obj.healthCheckRating,
  };
  return newEntry;
}

export const toHospitalEntry = (obj:any,diag:Array<Diagnosis['code']>): NewHospitalEntry => {
  if(!obj.description || !isString(obj.description)) throw('Description not defined');
  if(!obj.date || !isString(obj.date)) throw('Date not defined');
  if(!obj.specialist || !isString(obj.specialist)) throw('Specialist not defined');

  if(!obj.discharge) throw('Discharge not defined');
  if(!obj.discharge.date || !isString(obj.discharge.date) ) throw ('Invalid discharge date');
  if(!obj.discharge.criteria || !isString(obj.discharge.criteria) ) throw ('Invalid or missing discharge criteria');

  const newEntry: NewHospitalEntry = {
    type: obj.type,
    description: obj.description,
    date: parseDate(obj.date),
    specialist: obj.specialist,
    diagnosisCodes: diag,
    discharge: obj.discharge,
  };
  return newEntry;
}

export const toOccupationalHealthcareEntry = (obj:any,diag:Array<Diagnosis['code']>) : NewOccupationalHealthcareEntry => {
  if(!obj.description || !isString(obj.description)) throw('Description not defined');
  if(!obj.date || !isString(obj.date)) throw('Date not defined');
  if(!obj.specialist || !isString(obj.specialist)) throw('Specialist not defined');

  if (!obj.employerName===undefined || !isString(obj.employerName)) throw ('Employer name not a string');
  if (!obj.sickLeave===undefined || !isString(obj.startDate) || !isString(obj.endDate)) throw ('Sick leave date problem');

  const newEntry: NewOccupationalHealthcareEntry = {
    type: obj.type,
    description: obj.description,
    date: parseDate(obj.date),
    specialist: obj.specialist,
    diagnosisCodes: diag,
  };
  return newEntry;
}

export default {toNewPatient, toHealthCheckEntry,toHospitalEntry,toOccupationalHealthcareEntry};