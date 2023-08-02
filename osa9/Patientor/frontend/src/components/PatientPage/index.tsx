import React  from 'react';
import {
    useParams
  } from 'react-router-dom'
import { Patient, Diagnosis, HealthCheckFormValues, HealthCheckEntry, HospitalFormValues, HospitalEntry, OccupationalHealthcareFormValues, OccupationalHealthcareEntry } from '../../types'
import { EntryDetail } from './EntryDetail';
import { AddEntryForm } from './AddEntryForm'
import { useState } from 'react';
import axios from 'axios';
import patientService from "../../services/patients";

interface patientPage {
  patients: Patient[];
  diagnoses: Diagnosis[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

export const PatientPage = ({ patients, diagnoses, setPatients }:patientPage) => {
  const [error, setError]=useState<string|undefined>(undefined);
  const [, forceRerender]=useState({})

  function close(): void {
    setError(undefined);
  }
  
  const id:string|undefined = useParams().id
  const patient:Patient = patients.find(n => n.id === id) as Patient 

  const submitNewHealthCheck = async (values: HealthCheckFormValues) => {
    try {
      const hse:HealthCheckEntry = await patientService.createHealthCheck(id as string,values);
      patient.entries.push(hse);
      setPatients(patients);
      forceRerender({});
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const submitNewHospital = async (values: HospitalFormValues) => {
    try {
      const hse:HospitalEntry = await patientService.createHospital(id as string,values);
      patient.entries.push(hse);
      setPatients(patients);
      forceRerender({});
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const submitNewOccupationalHealthcare = async (values: OccupationalHealthcareFormValues) => {
    try {
      const hse:OccupationalHealthcareEntry = await patientService.createOccupationalHealthcare(id as string,values);
      patient.entries.push(hse);
      setPatients(patients);
      forceRerender({});
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const style:React.CSSProperties={color: 'red',
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10}

  const Notification = ({message}:{message:string|undefined}) => {
    if (message === undefined) {
      return null
    }
  
    return (
      <div style={style} >
        {message}
      </div>
    )
  }  

  return (
    <div>
      <h2>{patient.name}</h2>
      <div>occupation:{patient.occupation}</div>
      <div>gender:{patient.gender}</div>
      <div>ssn:{patient.ssn===undefined?null:patient.ssn}</div>
      <div>date of birth:{patient.dateOfBirth===undefined?null:patient.dateOfBirth}</div>
      <Notification message={error} />
      <AddEntryForm onCancel={close} onSubmitHealthCheck={submitNewHealthCheck} 
        onSubmitHospital={submitNewHospital} onSubmitOccupationalHealthcare={submitNewOccupationalHealthcare}
        diagnoses={diagnoses}/>
      <br></br>
      <br></br>
      <h1>entries</h1>
      <ul>
        {patient.entries.map(entry => 
          // eslint-disable-next-line react/jsx-key
          <EntryDetail entry={entry} diagnoses={diagnoses}/>)}
      </ul>
 
    </div>
  )
}

export default PatientPage;