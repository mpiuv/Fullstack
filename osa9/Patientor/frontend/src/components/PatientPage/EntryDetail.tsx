import React from 'react';
import {assertNever} from "assert-never";
import { Card, CardContent, Typography} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { Entry, HealthCheckEntry, Diagnosis, HospitalEntry, OccupationalHealthcareEntry, HealthCheckRating } from '../../types';

export const HealthCheckDetails=({entry}:{ entry:HealthCheckEntry})=>{
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
      </CardContent>
    </Card>
  );
}

export const HospitalDetails=({entry}:{ entry:HospitalEntry}) => {
  return(
  <Card variant="outlined">
    <CardContent>
        <Typography>{entry.date}</Typography> <MedicalInformationIcon />
        <Typography>{entry.description}</Typography>
        <Typography>Diagnosed by {entry.specialist}</Typography>
    </CardContent>
  </Card>
  )
}

export const OccupationalHealthcareDetails = ({entry}:{ entry:OccupationalHealthcareEntry}) =>{
  return(
    <Card variant="outlined">
      <CardContent>
          <Typography>{entry.date}</Typography> <WorkIcon /> 
          <Typography>{entry.employerName}</Typography>
          <Typography>{entry.description}</Typography>
          Diagnosed by {entry.specialist}
      </CardContent>
    </Card>
  )
}

export const EntryDetail = ({entry}:{ entry:Entry}) =>{
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckDetails entry={entry as HealthCheckEntry} />
    case "Hospital":
      return <HospitalDetails entry={entry as HospitalEntry} />
    case "OccupationalHealthcare":
      return <OccupationalHealthcareDetails entry={entry as OccupationalHealthcareEntry} />
    default:
      return assertNever((entry as Entry).type as never);
  }
}

interface entryDetail {
    diag: string;
    diagnoses: Diagnosis[];
  }

export const EntryDetail0 = ({diag, diagnoses}:entryDetail) =>{
    const inx:number=diagnoses.findIndex((element)=> element.code===diag);
    return (<div>{diag} {diagnoses[inx].name}</div>)
  }

