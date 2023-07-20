import axios from "axios";
import { HealthCheckEntry, HealthCheckFormValues, Patient, PatientFormValues } from "../types";

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

export default {
  getAll, create, createHealthCheck
};

