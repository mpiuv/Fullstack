import { createSlice } from '@reduxjs/toolkit'
const initialState = [
    'Initial state']
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      setNotification(state, action){
        return {...state,message:action.payload}
      },
      resetNotification(state,action){
        return {...state,message:null}
      }
    }
})

export const { setNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer