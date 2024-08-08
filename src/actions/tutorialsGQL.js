import {
  CREATE_TUTORIAL,
  RETRIEVE_TUTORIALS,
  UPDATE_TUTORIAL,
  DELETE_TUTORIAL,
  DELETE_ALL_TUTORIALS,
} from './types'

export const retrieveTutorials = (data) => async (dispatch) => {
  try {
    dispatch({
      type: RETRIEVE_TUTORIALS,
      payload: data,
    })
    return Promise.resolve(data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const createTutorial = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_TUTORIAL,
      payload: data,
    })
    return Promise.resolve(data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const updateTutorial = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_TUTORIAL,
      payload: data,
    })
    return Promise.resolve(data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteTutorial = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_TUTORIAL,
      payload: id,
    })
    return Promise.resolve(id)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteAllTutorials = () => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ALL_TUTORIALS,
    })
    return Promise.resolve()
  } catch (err) {
    return Promise.reject(err)
  }
}
