import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    'Initial state']
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      setNotification_(state, action){
        return {...state,message:action.payload}
      },
      resetNotification(state,action){
        return {...state,message:null}
      }
    }
})

let timeoutId = null

export const setNotification= (message, time ) =>{
  if (timeoutId !== null) { clearTimeout(timeoutId)}
  return async dispatch => {
  dispatch (setNotification_(message)) 
  timeoutId=setTimeout(() => {
    dispatch(resetNotification());
  }, time*1000);
  }
}

export const { setNotification_, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer