import React  from 'react';
import {
    useParams
  } from 'react-router-dom'
import { Patient, Diagnosis } from '../../types'

interface entryDetail {
  diag: string;
  diagnoses: Diagnosis[];
}

const EntryDetail = ({diag, diagnoses}:entryDetail) =>{
  const inx:number=diagnoses.findIndex((element)=> element.code===diag);
  return (<div>{diag} {diagnoses[inx].name}</div>)
}

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
          <li key={entry.id}>
            {entry.date} {entry.description} <br></br>
            <ul>
              {entry.diagnosisCodes?.map(diag =>
              <li key={diag}>
                <EntryDetail diag={diag} diagnoses={diagnoses}/>
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