import React from 'react';
import {assertNever} from "assert-never";
import { Card, CardContent, Typography} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { Entry, HealthCheckEntry, Diagnosis, HospitalEntry, OccupationalHealthcareEntry, HealthCheckRating } from '../../types';

interface entryDetail {
  diag: string;
  diagnoses: Diagnosis[];
}

const EntryDetail0 = ({diag, diagnoses}:entryDetail) =>{
  const inx:number=diagnoses.findIndex((element)=> element.code===diag);
  if (inx===-1) console.log("Couldn't find diag code:"+diag)
  return (<div>{diag} {diagnoses[inx].name}</div>)
}

export const HealthCheckDetails=({entry,diagnoses}:{ entry:HealthCheckEntry,diagnoses:Diagnosis[]})=>{

  const getHealthColor = (rating: HealthCheckRating) => {
  const green = '#66b031';
  const yellow = '#fefe32';
  const orange = '#fb9903';
  const red = '#fe2713';
  switch (rating) {
    case HealthCheckRating.Healthy: return green;
    case HealthCheckRating.LowRisk: return yellow;
    case HealthCheckRating.HighRisk: return orange;
    case HealthCheckRating.CriticalRisk: return red;
    default: return assertNever(rating);
    }
  }  

  const healthColor = getHealthColor(entry.healthCheckRating);

  return (    
    <Card variant="outlined">
      <CardContent>
         <Typography>{entry.date} <MedicalServicesIcon /></Typography>
         <Typography>{entry.description}</Typography>
         <FavoriteIcon style={{ color: healthColor }}/>
          Diagnosed by {entry.specialist}
          <ul>
            {entry.diagnosisCodes?.map(diag =>
            <li key={diag}>
              <EntryDetail0 diag={diag} diagnoses={diagnoses}/>
            </li>
              )}
          </ul>
      </CardContent>
    </Card>
  );
}

export const HospitalDetails=({entry,diagnoses}:{ entry:HospitalEntry,diagnoses:Diagnosis[]}) => {
  return(
  <Card variant="outlined">
    <CardContent>
        <Typography>{entry.date}</Typography> <MedicalInformationIcon />
        <Typography>{entry.description}</Typography>
        <Typography>Discharge criteria:{entry.discharge.criteria}</Typography>
        <Typography>Discharge date:{entry.discharge.date}</Typography>
        <Typography>Diagnosed by {entry.specialist}</Typography>
        <ul>
            {entry.diagnosisCodes?.map(diag =>
            <li key={diag}>
              <EntryDetail0 diag={diag} diagnoses={diagnoses}/>
            </li>
              )}
          </ul>
       
    </CardContent>
  </Card>
  )
}

export const OccupationalHealthcareDetails = ({entry,diagnoses}:{ entry:OccupationalHealthcareEntry,diagnoses:Diagnosis[]}) =>{
  return(
    <Card variant="outlined">
      <CardContent>
          <Typography>{entry.date}</Typography> <WorkIcon /> 
          <Typography>{entry.employerName}</Typography>
          <Typography>{entry.description}</Typography>
          {entry.sickLeave && <div>
            <Typography>Sick leave start date: {entry.sickLeave.startDate}</Typography>
            <Typography>Sick leave end date: {entry.sickLeave.endDate}</Typography> </div>}

          Diagnosed by {entry.specialist}
          <ul>
            {entry.diagnosisCodes?.map(diag =>
            <li key={diag}>
              <EntryDetail0 diag={diag} diagnoses={diagnoses}/>
            </li>
              )}
          </ul>
      </CardContent>
    </Card>
  )
}

export const EntryDetail = ({entry,diagnoses}:{ entry:Entry,diagnoses:Diagnosis[]}) =>{
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckDetails entry={entry as HealthCheckEntry} diagnoses = {diagnoses}/>
    case "Hospital":
      return <HospitalDetails entry={entry as HospitalEntry} diagnoses = {diagnoses}/>
    case "OccupationalHealthcare":
      return <OccupationalHealthcareDetails entry={entry as OccupationalHealthcareEntry} diagnoses = {diagnoses}/>
    default:
      return assertNever((entry as Entry).type as never);
  }
}