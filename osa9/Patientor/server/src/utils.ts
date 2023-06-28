import { NewPatientEntry, Gender } from './types';

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
const toNewPatient = (obj:any): NewPatientEntry => {
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

export default toNewPatient;