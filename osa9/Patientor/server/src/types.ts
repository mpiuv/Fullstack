export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalInterface {date:string, criteria: string}

export interface HospitalEntry extends BaseEntry{
  type: "Hospital";
  discharge: HospitalInterface
}

interface OccupationalHealthcareInterface {startDate:string, endDate:string}

export interface OccupationalHealthcareEntry extends BaseEntry{
  type: "OccupationalHealthcare";
  sickLeave?: OccupationalHealthcareInterface;
  employerName?: string
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[]
}

export type NewPatientEntry = Omit<Patient, 'id'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry,'id'>;
export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;
export type NewHospitalEntry = Omit<HospitalEntry,'id'>;

export type NonSensitivePatientEntry = Patient;