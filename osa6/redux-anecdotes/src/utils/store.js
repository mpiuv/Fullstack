import { combineReducers } from '@reduxjs/toolkit'
import {legacy_createStore as createStore} from 'redux'
import anecdoteService from '../services/anecdotes'
import anecdoteReducer, { setAnecdotes } from '../reducers/anecdoteReducer'
import notificationReducer from '../reducers/notificationReducer'
import filterReducer from '../reducers/filterReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filter:filterReducer
  })
  
  const store = createStore(reducer)

  anecdoteService.getAll().then(anecdotes =>
    store.dispatch(setAnecdotes(anecdotes))
  )
  
  export default store 
  