import { useSelector, useDispatch } from 'react-redux'
import reducer from './reducers/anecdoteReducer'
import ReactDOM from 'react-dom/client'
import React from 'react';


const App = () => {
  const anecdotes = useSelector(state => state)
  const byVotes = (a1, a2) => a2.votes - a1.votes

  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch( {type: 'VOTE', data:id})
   }

  const addAnecdote = (event) =>{
    event.preventDefault()
    console.log('addAnecdote')
    const getId = () => (100000 * Math.random()).toFixed(0)
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content:anecdote,
        id: getId(),
        votes: 0
      }
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(byVotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </div>
  )
}


export default App