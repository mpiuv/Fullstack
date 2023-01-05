import { connect } from 'react-redux'
import React from 'react'
import { setNotification, resetNotification} from '../reducers/notificationReducer';
import {createAnecdote} from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) =>{
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`Anecdote added successfully`,5)
  }

  return(<div>
   <h2>create new</h2>
   <form onSubmit={addAnecdote}>
      <div><input name="anecdote"/></div>
      <button>create</button>
   </form>
   </div>)
}

const mapDispatchToProps = {
  createAnecdote, setNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm  

