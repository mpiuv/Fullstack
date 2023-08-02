import React, {Component, SyntheticEvent} from  'react';
import { useState } from 'react';
import { TextField, Grid, Button, Tabs, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Diagnosis, HealthCheckFormValues, HospitalFormValues, OccupationalHealthcareFormValues } from '../../types';
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

export const AddEntryForm = ({ onCancel, onSubmitHealthCheck, onSubmitHospital, onSubmitOccupationalHealthcare, diagnoses }:
    {onCancel: () => void; 
    onSubmitHealthCheck: (values: HealthCheckFormValues) => void;
    onSubmitHospital: (values:HospitalFormValues) => void;
    onSubmitOccupationalHealthcare: (values:OccupationalHealthcareFormValues) =>void;
    diagnoses:Diagnosis[];
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
        type="date"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">Health check rating</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={healthCheckRating}
          label="Health check rating"
          onChange={({ target }) => setHealthCheckRating(Number(target.value))}
       >
          <MenuItem value={0}>Healthy</MenuItem>
          <MenuItem value={1}>Low risk</MenuItem>
          <MenuItem value={2}>High risk</MenuItem>
          <MenuItem value={3}>Critical risk</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="simple-select-label">Diagnosis codes</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={diagnosisCodes}
          multiple
          label="Diagnonsis codes"
          onChange={({ target }) => setDiagnosisCodes(target.value as string[])}
       >
         {diagnoses.map((name) => (
              <MenuItem value={name.code} key={name.code}>{name.code}</MenuItem>
            ))}
        </Select>
      </FormControl>

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
        fullWidth
        type="date"
        value={date}
        onChange={({ target }) => setDate(target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">Diagnosis codes</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={diagnosisCodes}
          multiple
          label="Diagnonsis codes"
          onChange={({ target }) => setDiagnosisCodes(target.value as string[])}
       >
         {diagnoses.map((name) => (
              <MenuItem value={name.code} key={name.code}>{name.code}</MenuItem>
            ))}
        </Select>
      </FormControl>

      <TextField
        label="Discharge date"
        type="date"
        fullWidth
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
        InputLabelProps={{
          shrink: true,
        }}
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
        type="date"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">Diagnosis codes</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={diagnosisCodes}
          multiple
          label="Diagnonsis codes"
          onChange={({ target }) => setDiagnosisCodes(target.value as string[])}
       >
         {diagnoses.map((name) => (
              <MenuItem value={name.code} key={name.code}>{name.code}</MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        label="Sickleave start date"
        type="date"
        fullWidth
        value={sickleaveStartDate}
        onChange={({ target }) => setSickleaveStartDate(target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Sickleave end date"
        type="date"
        fullWidth
        value={sickleaveEndDate}
        onChange={({ target }) => setSickleaveEndDate(target.value)}
        InputLabelProps={{
          shrink: true,
        }}
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