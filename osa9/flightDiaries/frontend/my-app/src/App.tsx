import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { NonSensitiveDiaryEntry } from './types';
import axios from 'axios';

function App():JSX.Element{
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    axios.get<NonSensitiveDiaryEntry[]>('http://localhost:3001/api/diaries').then(response => {
      setDiaries(response.data)
    })
  }, []);

  interface ValidationError {
    message: string;
    errors: Record<string, string[]>
  }

  const addNewDiaryEntry = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    axios.post<NonSensitiveDiaryEntry>('http://localhost:3001/api/diaries', 
     { date: event.currentTarget.date.value , 
       visibility: event.currentTarget.visibility.value, 
       weather: event.currentTarget.weather.value, 
       comment: event.currentTarget.comment.value })
    .then(response => {
      setDiaries(diaries.concat({date:response.data.date,visibility:response.data.visibility,weather:response.data.weather, id:response.data.id} ))
      setErrorMessage('')
    })
    .catch(error => { if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      setErrorMessage(JSON.stringify(error.response?.data))
  }})
}

  type NotificationProps = {
    message: string
  }

  const Notification = ({ message }:NotificationProps):JSX.Element|null => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error" style={{ color: 'red' }}>
        {message}
      </div>
    )
  }

  return (
    <div >
      <h1>Add new entry</h1>
      <Notification  message={ errorMessage }/>
      <form onSubmit={addNewDiaryEntry}>
      <label htmlFor='date'>date:</label>
      <input name='date' id='date' type='date' />
      <br></br>
      <fieldset>
          <legend>Visibility:</legend>
          <input type='radio' id='great' name='visibility' value='great' />
          <label htmlFor='great'>great</label>
          <input type='radio' id='good' name='visibility' value='good'/>
          <label htmlFor='good'>good</label>
          <input type='radio' id='ok' name='visibility' value='ok' defaultChecked/>
          <label htmlFor='ok'>OK</label>
          <input type='radio' id='poor' name='visibility' value='poor'/>
          <label htmlFor='poor'>poor</label>
        </fieldset>

        <fieldset>
          <legend>Weather:</legend>
          <input type='radio' id='sunny' name='weather' value='sunny' />
          <label htmlFor='sunny'>sunny</label>
          <input type='radio' id='rainy' name='weather' value='rainy' defaultChecked/>
          <label htmlFor='rainy'>rainy</label>
          <input type='radio' id='cloudy' name='weather' value='cloudy'/>
          <label htmlFor='cloudy'>cloudy</label>
          <input type='radio' id='stormy' name='weather' value='stormy'/>
          <label htmlFor='stormy'>stormy</label>
          <input type='radio' id='windy' name='weather' value='windy'/>
          <label htmlFor='windy'>windy</label>
        </fieldset>

        <div>
          <label htmlFor='comment'>Comment</label>
          <input name='comment' id='comment' type='text' />
        </div>
        <button type='submit'>Add</button>
      </form>   

      <h1>Diary entries</h1>
      {diaries.map(entry =><div>
        <p><strong>{entry.date}</strong></p>
        <p>visibility:{entry.visibility}</p>
        <p>weather:{entry.weather}</p>
        </div>
      )}
    </div>
  );
}

export default App;
