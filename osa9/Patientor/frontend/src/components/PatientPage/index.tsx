import React  from 'react';
import {
    useParams
  } from 'react-router-dom'
import { Patient, Diagnosis } from '../../types'
import { EntryDetail } from './EntryDetail';

interface patientPage {
  patients: Patient[];
  diagnoses: Diagnosis[];
}

export const PatientPage = ({ patients, diagnoses }:patientPage) => {
  const id = useParams().id
  const patient:Patient = patients.find(n => n.id === id) as Patient 
  return (
    <div>
      <h2>{patient.name}</h2>
      <div>occupation:{patient.occupation}</div>
      <div>gender:{patient.gender}</div>
      <div>ssn:{patient.ssn===undefined?null:patient.ssn}</div>
      <div>date of birth:{patient.dateOfBirth===undefined?null:patient.dateOfBirth}</div>
      <h1>entries</h1>
      <ul>
        {patient.entries.map(entry => 
          // eslint-disable-next-line react/jsx-key
          <EntryDetail entry={entry}/>)}
      </ul>
 
    </div>
  )
}
  
export default PatientPage;