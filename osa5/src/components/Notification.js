const error = {
    color: 'black',
    background: 'lightgrey',
    font_size: 20,
    border_style: 'solid',
    border_radius: 5,
    padding: 10,
    margin_bottom: 10
  }

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div style={error}>
        {message}
      </div>
    )
  }
  
  export default Notification