import axios from "axios";
import { HealthCheckEntry, HealthCheckFormValues, HospitalEntry, HospitalFormValues, HospitalInterface, OccupationalHealthcareEntry, OccupationalHealthcareFormValues, OccupationalHealthcareInterface, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createHealthCheck = async (patientId:string, object:HealthCheckFormValues) => {
  const type = "HealthCheck";
  const {data} = await axios.post<HealthCheckEntry>(
    `${apiBaseUrl}/patients/:{patientId}/entries`,
     {type, ...object }
  );
  return data;
}

const createHospital = async (patientId:string, object:HospitalFormValues) => {
  const type = "Hospital";
  const discharge:HospitalInterface = {date:object.dischargeDate,criteria:object.dischargeCriteria}
  const {data} = await axios.post<HospitalEntry>(
    `${apiBaseUrl}/patients/:{patientId}/entries`,
     {type, discharge, description:object.description,  date:object.date, specialist:object.specialist,
      diagnosisCodes:object.diagnosisCodes }
  );
  return data;
}

const createOccupationalHealthcare = async (patientId:string, object:OccupationalHealthcareFormValues) => {
  const type = "OccupationalHealthcare";
  const sickLeave:OccupationalHealthcareInterface = {startDate:object.sickleaveStartDate as string, endDate:object.sickleaveEndDate as string}
  const {data} = await axios.post<OccupationalHealthcareEntry>(
    `${apiBaseUrl}/patients/:{patientId}/entries`,
     {type, description:object.description,
      date:object.date,
      specialist:object.specialist,
      diagnosisCodes:object.diagnosisCodes,
      sickLeave,
      employerName:object.employername }
  );
  return data;
}

export default {
  getAll, create, createHealthCheck, createHospital, createOccupationalHealthcare
};

