import React, {Component, SyntheticEvent} from  'react';
import { useState } from 'react';
import { TextField, Grid, Button, Tabs } from '@mui/material';
import { HealthCheckFormValues, HospitalFormValues, OccupationalHealthcareFormValues } from '../../types';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const AddEntryForm = ({ onCancel, onSubmitHealthCheck, onSubmitHospital, onSubmitOccupationalHealthcare }:
    {onCancel: () => void; 
    onSubmitHealthCheck: (values: HealthCheckFormValues) => void;
    onSubmitHospital: (values:HospitalFormValues) => void;
    onSubmitOccupationalHealthcare: (values:OccupationalHealthcareFormValues) =>void;
  }):JSX.Element => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [value, setValue] = useState<number>(0);
  const [dischargeDate,setDischargeDate] = useState<string>('');
  const [dischargeCriteria,setDischargeCriteria] = useState<string>('');
  const [sickleaveStartDate,setSickleaveStartDate] = useState<string>('');
  const [sickleaveEndDate,setSickleaveEndDate] = useState<string>('');
  const [employername,setEmployername] = useState<string>('');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const addHealthCheckEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmitHealthCheck({
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes
    });
  };

  const addHospitalEntry = (event:SyntheticEvent) => {
    event.preventDefault();
    onSubmitHospital({
      description,
      date,
      specialist,
      diagnosisCodes,
      dischargeDate,
      dischargeCriteria
    });
  }

const addOccupationalHealthcareEntry = (event:SyntheticEvent) => {
  event.preventDefault();
  onSubmitOccupationalHealthcare({
    description,
    date,
    specialist,
    diagnosisCodes,
    sickleaveStartDate,
    sickleaveEndDate,
    employername
  });

}

return (
<div>
  <Box sx={{ width: '100%' }}>
  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <Tabs value={value} onChange={handleChange} aria-label="Patientor tabs">
      <Tab label="Health check" {...a11yProps(0)} />
      <Tab label="Hospital" {...a11yProps(1)} />
      <Tab label="Occupational healthcare" {...a11yProps(2)} />
    </Tabs>
  </Box>
  <CustomTabPanel value={value} index={0}>
    <div>
  <h1>New health check entry</h1>
    <form onSubmit={addHealthCheckEntry}>
      <TextField
        label="Description"
        fullWidth 
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextField
        label="Date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <TextField
        label="Health check rating"
        fullWidth
        value={healthCheckRating}
        onChange={({ target }) => setHealthCheckRating(Number(target.value))}
      />
      <TextField
        label="Diagnosis codes"
        fullWidth
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(target.value.split(","))}
      />

      <Grid>
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            style={{ float: "left" }}
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{
              float: "right",
            }}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
 </div>
  </CustomTabPanel>
  <CustomTabPanel value={value} index={1}>
    <div>
  <h1>New hospital check entry</h1>
    <form onSubmit={addHospitalEntry}>
      <TextField
        label="Description"
        fullWidth 
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextField
        label="Date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <TextField
        label="Diagnosis codes"
        fullWidth
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(target.value.split(","))}
      />
      <TextField
        label="Discharge date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
      />
      <TextField
        label="Discharge criteria"
        fullWidth
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
      />
      <Grid>
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            style={{ float: "left" }}
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{
              float: "right",
            }}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
    </div>
  </CustomTabPanel>
  <CustomTabPanel value={value} index={2}>
    <div>
  <h1>New occupational healthcare entry</h1>
    <form onSubmit={addOccupationalHealthcareEntry}>
      <TextField
        label="Description"
        fullWidth 
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextField
        label="Date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <TextField
        label="Diagnosis codes"
        fullWidth
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(target.value.split(","))}
      />
      <TextField
        label="Sickleave start date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={sickleaveStartDate}
        onChange={({ target }) => setSickleaveStartDate(target.value)}
      />
      <TextField
        label="Sickleave end date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={sickleaveEndDate}
        onChange={({ target }) => setSickleaveEndDate(target.value)}
      />
      <TextField
        label="Employer"
        fullWidth
        value={employername}
        onChange={({ target }) => setEmployername(target.value)}
      />

      <Grid>
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            style={{ float: "left" }}
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{
              float: "right",
            }}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
    </div>
  </CustomTabPanel>
  </Box>

</div>
  );
}