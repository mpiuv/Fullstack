import React  from 'react';
import {
    useParams
  } from 'react-router-dom'
import { Patient } from '../../types'

interface patientPage {
  patients: Patient[];
}

export const PatientPage = ({ patients }:patientPage) => {
  const id = useParams().id
  const patient:Patient = patients.find(n => n.id === id) as Patient 
  return (
    <div>
      <h2>{patient.name}</h2>
      <div>occupation:{patient.occupation}</div>
      <div>gender:{patient.gender}</div>
      <div>ssn:{patient.ssn===undefined?null:patient.ssn}</div>
      <div>dateOfBirth:{patient.dateOfBirth===undefined?null:patient.dateOfBirth}</div>
      <h1>entries</h1>
      <ul>
        {patient.entries.map(entry => 
          <li key={entry.id}>
            {entry.date} {entry.description} <br></br>
            <ul>
              {entry.diagnosisCodes?.map(diag =>
              <li>
                {diag}
              </li>
                )}
            </ul>
          </li>
        )}
      </ul>
 
    </div>
  )
}
  
export default PatientPage;