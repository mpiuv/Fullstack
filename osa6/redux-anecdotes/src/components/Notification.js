import { connect } from 'react-redux'

const Notification = (props) => {
  let notification
  if(props.notifications===undefined) 
    notification = null
  else 
    notification = props.notifications.message
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
  <>
    {notification  &&
      <div style={style}>
        {notification}
      </div>
    }
  </>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
    filter: state.filter,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
