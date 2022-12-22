export const addVote = (id) => {
  return {type: 'VOTE', data:id}
}

export const newAnecdote = (anecdote) => {
  const getId = () => (100000 * Math.random()).toFixed(0)
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content:anecdote,
      id: getId(),
      votes: 0
    }
  }
}

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
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

const reducer = (state = initialState, action) => {
  switch (action.type){
    case 'VOTE': 
      const a1 = state.filter(anec => anec.id!==action.data)
      const anecdote= state.filter(anec => anec.id===action.data )[0]
      const anecdote2={...anecdote,votes:anecdote.votes+1}
      return a1.concat(anecdote2)
    case 'NEW_ANECDOTE':
      let res1 = state.filter(state => true)
      return  [...res1, action.data]
      //console.log(res)
      //return res
    default:
    return state
  }
}

export default reducer