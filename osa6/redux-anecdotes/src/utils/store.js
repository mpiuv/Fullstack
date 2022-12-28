import { combineReducers } from '@reduxjs/toolkit'
import {legacy_createStore as createStore} from 'redux'
import anecdoteReducer from '../reducers/anecdoteReducer'
import notificationReducer from '../reducers/notificationReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer
  })
  
  const store = createStore(reducer)
  
  export default store 
  