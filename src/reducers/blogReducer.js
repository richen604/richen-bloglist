import blogService from '../services/blogs'

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({ type: 'INIT_BLOGS', data: { blogs } })
  }
}

export const createBlog = (blogObj) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObj)
    const blogs = await blogService.getAll()
    const thisBlog = blogs.find((blog) => blog.id === newBlog.id)
    dispatch({
      type: 'NEW_BLOG',
      data: {
        blog: thisBlog,
      },
    })
  }
}

export const updateBlog = (blogObj) => {
  return async (dispatch) => {
    await blogService.update(blogObj.id, blogObj)
    dispatch({
      type: 'UPDATE_BLOG',
      data: {
        blog: blogObj,
      },
    })
  }
}

export const removeBlog = (blogObj, userToken) => {
  return async (dispatch) => {
    await blogService.remove(blogObj.id, userToken)
    dispatch({
      type: 'REMOVE_BLOG',
      data: {
        blog: blogObj,
      },
    })
  }
}

export const commentBlog = (blogObj, comment) => {
  return async (dispatch) => {
    const newBlog = await blogService.comment(blogObj.id, comment)
    dispatch({
      type: 'UPDATE_BLOG',
      data: {
        blog: newBlog,
      },
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data.blogs
    case 'NEW_BLOG':
      return state.concat(action.data.blog)
    case 'UPDATE_BLOG': {
      const newState = state.filter((blog) => blog.id !== action.data.blog.id)
      return newState.concat(action.data.blog)
    }
    case 'REMOVE_BLOG': {
      return state.filter((blog) => blog.id !== action.data.blog.id)
    }
    default:
      return state
  }
}

export default blogReducer
