const notificationReducer = (state = [null], action) => {
  switch(action.type) {
    case 'NEW_NOTIFICATION':
      return [{message:action.data.notification}]
    case 'RESET_NOTIFICATION':
        return [null]
    default:
      return state
    }
  }

  export const createNotification = ({message,type}) => {
    console.log(message)
    return {
      type: 'NEW_NOTIFICATION',
      data: {
        notification:message
      }
    }
  }

  export const resetNotification = () => {
    return {
      type: 'RESET_NOTIFICATION',
      data: {
        notification: null
      }
    }
  }
  
  export default notificationReducer