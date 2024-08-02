import {
  CREATE_TUTORIAL,
  RETRIEVE_TUTORIALS,
  UPDATE_TUTORIAL,
  DELETE_TUTORIAL,
  DELETE_ALL_TUTORIALS,
} from './types'

import {
  createTutorial as _createTutorial,
  getAllTutorials,
  updateTutorial as _updateTutorial,
  deleteTutorial as _deleteTutorial,
  deleteAllTutorials as _deleteAllTutorials,
  findByTitleTutorial,
} from '../services/tutorial.service'

export const createTutorial = (title, description) => async (dispatch) => {
  try {
    const res = await _createTutorial({ title, description })

    dispatch({
      type: CREATE_TUTORIAL,
      payload: res.data,
    })

    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const retrieveTutorials = () => async (dispatch) => {
  try {
    const res = await getAllTutorials()
    dispatch({
      type: RETRIEVE_TUTORIALS,
      payload: res.data,
    })
  } catch (err) {
    return Promise.reject(err)
  }
}

export const updateTutorial = (id, data) => async (dispatch) => {
  try {
    const res = await _updateTutorial(id, data)
    dispatch({
      type: UPDATE_TUTORIAL,
      payload: res.data,
    })
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteTutorial = (id) => async (dispatch) => {
  try {
    await _deleteTutorial(id)
    dispatch({
      type: DELETE_TUTORIAL,
      payload: id,
    })
    return Promise.resolve({ id })
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteAllTutorials = () => async (dispatch) => {
  try {
    const res = await _deleteAllTutorials()
    dispatch({
      type: DELETE_ALL_TUTORIALS,
    })
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const findTutorialsByTitle = (title) => async (dispatch) => {
  try {
    const res = await findByTitleTutorial(title)
    dispatch({
      type: RETRIEVE_TUTORIALS,
      payload: res.data,
    })
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}
