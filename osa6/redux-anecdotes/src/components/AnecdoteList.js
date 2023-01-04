import { useSelector, useDispatch } from 'react-redux'
import  {increaseVote} from '../reducers/anecdoteReducer'
import { setNotification, resetNotification} from '../reducers/notificationReducer';


const AnecdoteList= () => {
  let anecdotes = useSelector(state => {
    if (state.filter.filter === '') 
      return state.anecdotes
    else
      return state.anecdotes.filter((anecdote) =>
         anecdote.content.toUpperCase().includes(state.filter.filter.toUpperCase())
    )
  })
  console.log(anecdotes)
  const byVotes = (a1, a2) => a2.votes - a1.votes
  
  const dispatch = useDispatch()
   
  const vote = (id) => {
    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(increaseVote(votedAnecdote))
    dispatch(
      setNotification(`You voted '${votedAnecdote.content}'`,5 )
    )
    
   }
  
  return (      
    <div>
 
      {anecdotes.slice().sort(byVotes).map(anecdote =>
       <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
      </div>
      )}
    </div>
  )
}
export default AnecdoteList