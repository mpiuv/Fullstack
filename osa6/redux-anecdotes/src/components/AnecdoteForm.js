import  {newAnecdote} from '../reducers/anecdoteReducer'
import React from 'react'
import  {useDispatch}  from 'react-redux'
import { setNotification, resetNotification} from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) =>{
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(newAnecdote(anecdote))
    dispatch(
      setNotification(`Anecdote added successfully`)
    );
    setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);  
  }

  return(<div>
   <h2>create new</h2>
   <form onSubmit={addAnecdote}>
      <div><input name="anecdote"/></div>
      <button>create</button>
   </form>
   </div>)
}

export default AnecdoteForm
