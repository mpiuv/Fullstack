import React, {Component, SyntheticEvent} from  'react';
import { useState } from 'react';
import { TextField, Grid, Button } from '@mui/material';
import { HealthCheckFormValues } from '../../types';

export const AddEntryForm = ({ onCancel, onSubmit }:
  {onCancel: () => void; onSubmit: (values: HealthCheckFormValues) => void;}):JSX.Element => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes
    });
  };

return (
  <div>
    <h1>New health check entry</h1>
    <form onSubmit={addEntry}>
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
  );
}

