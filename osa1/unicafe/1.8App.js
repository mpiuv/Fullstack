import { useState } from 'react'

const Statistics = ({good,neutral,bad}) => { 
  return (
  <div>
  <h1>statistics</h1>
  <p>good {good}</p>
  <p>neutral {neutral}</p>
  <p>bad {bad}</p>
  <p>average {(good-bad)/(good+neutral+bad)}</p>
  <p>positive {good/(good+neutral+bad)*100} %</p>
  </div>  
)
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good+1)
  }

  const handleNeutral = () => {
    setNeutral(neutral+1)
  }

  const handleBad = () => {
    setBad(bad+1)
  }

  return (
    <>
      <div>
        <h1>give feedback</h1>
      </div>
      <div>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
      </>
  )
}

export default App;
