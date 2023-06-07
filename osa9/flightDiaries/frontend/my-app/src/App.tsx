import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { NonSensitiveDiaryEntry } from './types';
import axios from 'axios';

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  useEffect(() => {
    axios.get<NonSensitiveDiaryEntry[]>('http://localhost:3000/api/diaries').then(response => {
      setDiaries(response.data)
    })
  }, []);

  return (
    <div >
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
