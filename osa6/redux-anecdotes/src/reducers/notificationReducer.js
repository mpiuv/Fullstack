import { createSlice } from '@reduxjs/toolkit'
const initialState = [
    'Initial state']
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      showNotification(state, action){
        return state[0]
      }
    }
})

export const { showNotification } = notificationSlice.actions
export default notificationSlice.reducer