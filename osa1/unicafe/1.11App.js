import { useState } from 'react'

const StatisticLine = ({text,value}) =>{
  return (
    <><td>{text}</td><td>{value}</td></>
  )

}

const Statistics = ({good,neutral,bad}) => {
  if  (good+neutral+bad===0)
    return(<div><p>no feedback given</p></div>)

  return (
    <div>
  <h1>statistics</h1>
  <table>
      <tbody>
  <tr><StatisticLine text="good" value ={good} /></tr>
  <tr><StatisticLine text="neutral" value ={neutral} /></tr>
  <tr><StatisticLine text="bad" value ={bad} /></tr>
  <tr><StatisticLine text="average" value ={(good-bad)/(good+neutral+bad)} /></tr>
  <tr><StatisticLine text="positive" value ={good/(good+neutral+bad)*100+"%"} /></tr>
   </tbody> 
   </table> 
   </div>
)
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


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
      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Button handleClick={handleBad} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
      </>
  )
}

export default App;
