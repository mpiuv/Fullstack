import { useSelector, useDispatch } from 'react-redux'
import  {addVote} from './reducers/anecdoteReducer'
import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'


const App = () => {
  const anecdotes = useSelector(state => state)
  const byVotes = (a1, a2) => a2.votes - a1.votes

  const dispatch = useDispatch()
 
  const vote = (id) => {
    dispatch(addVote(id))
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
      <AnecdoteForm></AnecdoteForm>
    </div>
  )
}


export default App