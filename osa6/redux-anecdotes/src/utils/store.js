import { combineReducers } from '@reduxjs/toolkit'
import {legacy_createStore as createStore} from 'redux'
import anecdoteReducer from '../reducers/anecdoteReducer'
import notificationReducer from '../reducers/notificationReducer'
import filterReducer from '../reducers/filterReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filter:filterReducer
  })
  
  const store = createStore(reducer)
  
  export default store 
  