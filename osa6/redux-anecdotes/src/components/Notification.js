import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications)[0]
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification