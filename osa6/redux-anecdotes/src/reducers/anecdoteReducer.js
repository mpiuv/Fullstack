import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVote(state, action) {
      const id = action.payload
      const a1 = state.filter(anec => anec.id!==id)
      const anecdote= state.filter(anec => anec.id===id )[0]
      const anecdote2={...anecdote,votes:anecdote.votes+1}
      return a1.concat(anecdote2)
    },
    newAnecdote(state,action){
       const anecdote=action.payload
       const data= {...anecdote, votes: 0 }
       return  [...state, data]
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addVote, newAnecdote, setAnecdotes, appendAnecdote} = anecdoteSlice.actions
export default anecdoteSlice.reducer