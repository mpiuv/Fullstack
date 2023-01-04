import React from 'react'
import  {useDispatch}  from 'react-redux'
import { setNotification, resetNotification} from '../reducers/notificationReducer';
import {createAnecdote} from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) =>{
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(
      setNotification(`Anecdote added successfully`,5)
    );
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
