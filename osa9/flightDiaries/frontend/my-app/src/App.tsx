import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { NonSensitiveDiaryEntry } from './types';
import axios from 'axios';
import { stringify } from 'querystring';

function App():JSX.Element{
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [newDate, setNewDate] = useState<string>('');
  const [newVisibility, setNewVisibility] = useState<string>('');
  const [newWeather, setNewWeather] = useState<string>('');
  const [newComment, setNewComment] = useState<string>('');
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

  const addNewDiaryEntry = (event: React.SyntheticEvent) => {
    event.preventDefault()
    axios.post<NonSensitiveDiaryEntry>('http://localhost:3001/api/diaries', 
     { date: newDate, visibility: newVisibility, weather: newWeather, comment: newComment })
    .then(response => {
      setDiaries(diaries.concat({date:response.data.date,visibility:response.data.visibility,weather:response.data.weather, id:response.data.id} ))
      setErrorMessage('')
    })
    .catch(error => { if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      setErrorMessage(JSON.stringify(error.response?.data))
   
  }})
}

  const handleDateChange = (event: React.SyntheticEvent) => {
    setNewDate((event.target as HTMLInputElement).value)
  }

  const handleVisibilityChange = (event: React.SyntheticEvent) => {
    setNewVisibility((event.target as HTMLInputElement).value)
  }
  const handleWeatherChange = (event: React.SyntheticEvent) => {
    setNewWeather((event.target as HTMLInputElement).value)
  }

  const handleCommentChange = (event: React.SyntheticEvent) => {
    setNewComment((event.target as HTMLInputElement).value)
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
        date:<input value={newDate} onChange={handleDateChange}/> <br></br>
        visibility:<input value={newVisibility} onChange={handleVisibilityChange}/><br></br>
        weather:<input value={newWeather} onChange={handleWeatherChange}/><br></br>
        comment:<input value={newComment} onChange={handleCommentChange}/><br></br>
        <button type="submit">add</button>
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
