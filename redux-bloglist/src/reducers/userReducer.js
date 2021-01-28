import loginService from '../services/login'

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch({ type: 'SET_USER', data: { user } })
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    loginService.logout()
    dispatch({
      type: 'SET_USER',
      data: {
        user: null,
      },
    })
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data.user
    default:
      return state
  }
}

export default userReducer
