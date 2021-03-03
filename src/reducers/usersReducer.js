import userService from '../services/users'

export const getUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({ type: 'GET_USERS', data: { users } })
  }
}

export const getOneUser = (userObj) => {
  return async (dispatch) => {
    const user = await userService.getOneUser(userObj)
    dispatch({ type: 'GET_ONE_USER', data: { user } })
  }
}

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.data.users
    case 'GET_ONE_USER':
      return action.data.user
    default:
      return state
  }
}

export default userReducer
