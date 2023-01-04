import  {newAnecdote} from '../reducers/anecdoteReducer'
import React from 'react'
import  {useDispatch}  from 'react-redux'
import { setNotification, resetNotification} from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) =>{
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote_ = await anecdoteService.createNew(content)
    dispatch(newAnecdote(newAnecdote_))
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
