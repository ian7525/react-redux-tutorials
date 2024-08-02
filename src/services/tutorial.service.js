import http from '../http-common'

export const getAllTutorials = async () => {
  return await http.get('/tutorials')
}

export const getTutorial = async (id) => {
  return await http.get(`/tutorials/${id}`)
}

export const createTutorial = async (data) => {
  return await http.post('/tutorials', data)
}

export const updateTutorial = async (id, data) => {
  return await http.put(`/tutorials/${id}`, data)
}

export const deleteTutorial = async (id) => {
  return await http.delete(`/tutorials/${id}`)
}

export const deleteAllTutorials = async () => {
  return await http.delete('/tutorials')
}

export const findByTitleTutorial = async (title) => {
  return await http.get(`/tutorials?title=${title}`)
}
