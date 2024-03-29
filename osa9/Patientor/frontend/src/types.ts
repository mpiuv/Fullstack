export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export interface BaseEntry {
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
  type: "HealthCheck",
  healthCheckRating: HealthCheckRating;
}

export interface HealthCheckFormValues {
  description:string,
  date:string,
  specialist:string,
  healthCheckRating:number,
  diagnosisCodes:string[]
}


export interface HospitalInterface {date:string, criteria: string}

export interface HospitalEntry extends BaseEntry{
  type: "Hospital",
  discharge: HospitalInterface
}

export interface HospitalFormValues {
  description:string,
  date:string,
  specialist:string,
  diagnosisCodes:string[],
  dischargeDate: string,
  dischargeCriteria: string
}

export interface OccupationalHealthcareInterface {startDate:string, endDate:string}

export interface OccupationalHealthcareEntry extends BaseEntry{
  type: "OccupationalHealthcare";
  sickLeave?: OccupationalHealthcareInterface;
  employerName?: string
}

export interface OccupationalHealthcareFormValues{
  description:string,
  date:string,
  specialist:string,
  diagnosisCodes:string[],
  sickleaveStartDate?:string,
  sickleaveEndDate?:string,
  employername?:string
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;