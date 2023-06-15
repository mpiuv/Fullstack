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

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };
  
  const parseGender = (gender: unknown): Gender => {
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
    if(!obj.gender) throw ('Gender not defined')
    if (!obj.occupation|| !isString(obj.occupation)) throw ('Occupation not defined')

    const newEntry: NewPatientEntry = {
      name: obj.name,
      ssn: obj.ssn,
      dateOfBirth: parseDate(obj.dateOfBirth),
      occupation: obj.occupation,
      gender: parseGender(obj.gender),
      entries: []
    };
    return newEntry;
  };

  export default toNewPatient;