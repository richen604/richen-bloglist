export const hideNotify = () => {
  return async (dispatch) => {
    dispatch({ type: 'HIDE_NOTIFY', data: { msg: null, color: 'danger' } })
  }
}

export const showNotify = (msg, color, type) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW_NOTIFY',
      data: {
        msg,
        color,
        type,
      },
    })
  }
}

const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'HIDE_NOTIFY':
      return action.data
    case 'SHOW_NOTIFY':
      return action.data
    default:
      return state
  }
}

export default notificationReducer
