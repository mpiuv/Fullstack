import { createSlice } from '@reduxjs/toolkit'
const initialState = {filter:''}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      const filter_ = action.payload
      return {filter:filter_}
    }
  }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer