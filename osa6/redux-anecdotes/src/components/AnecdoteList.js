import { useSelector, useDispatch } from 'react-redux'
import  {addVote} from '../reducers/anecdoteReducer'
import { setNotification, resetNotification} from '../reducers/notificationReducer';

const AnecdoteList= () => {
  const anecdotes = useSelector(state => {
    if (state.filter.filter === '') 
      return state.anecdotes
    else
      return state.anecdotes.filter((anecdote) =>
         anecdote.content.toUpperCase().includes(state.filter.filter.toUpperCase())
    )
  })
  const byVotes = (a1, a2) => a2.votes - a1.votes
  
  const dispatch = useDispatch()
   
  const vote = (id) => {
    dispatch(addVote(id))
    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(
      setNotification(`You voted '${votedAnecdote.content}'` )
    );
    setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);
  }
  
  return (      
    <div>
 
      {anecdotes.sort(byVotes).map(anecdote =>
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