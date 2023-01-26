import { createSlice } from '@reduxjs/toolkit'
const initialState = []
const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      const content = action.payload
      return [...content]
    },
    addBlog(state,action){
      const content = action.payload  
      state.push(content)
    }
  }
})
export const { setBlogs,addBlog } = blogSlice.actions
export default blogSlice.reducer