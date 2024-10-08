import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import {
  useGetTutorial,
  useUpdateTutorial,
  useDeleteTutorial,
} from '../customHooks/useTutorialGql'
import {
  retrieveTutorials,
  updateTutorial,
  deleteTutorial,
} from '../actions/tutorialsGQL'

function withRouter(Component) {
  return (props) => {
    const params = useParams()
    const navigate = useNavigate()
    return <Component {...props} params={params} navigate={navigate} />
  }
}

const Tutorial = ({ params, navigate }) => {
  const [currentTutorial, setCurrentTutorial] = useState(null)
  const [message, setMessage] = useState('')

  const { getTutorialById } = useGetTutorial()
  const { updateTutorial } = useUpdateTutorial()
  const { deleteTutorial } = useDeleteTutorial()

  useEffect(() => {
    const { id } = params

    retrieveTutorialById(id)
  }, [])

  const onChangeTitle = (e) => {
    const newTutorial = {
      ...currentTutorial,
      title: e.target.value,
    }
    setCurrentTutorial(newTutorial)
  }

  const onChangeDescription = (e) => {
    const newTutorial = {
      ...currentTutorial,
      description: e.target.value,
    }
    setCurrentTutorial(newTutorial)
  }

  const retrieveTutorialById = async (id) => {
    try {
      const { data } = await getTutorialById(id)
      setCurrentTutorial(data.tutorial)
    } catch (error) {
      console.log(error)
    }
  }

  const updateStatus = async (status) => {
    const { id, title, description } = currentTutorial
    try {
      const { data } = await updateTutorial({
        id,
        title,
        description,
        published: status,
      })
      setCurrentTutorial(data.updateTutorial)
      setMessage('The status was updated successfully!')
    } catch (error) {
      console.log(error)
    }
  }

  const updateContent = async () => {
    try {
      const { id, title, description } = currentTutorial
      await updateTutorial({
        id,
        title,
        description,
      })
      setMessage('The tutorial was updated successfully!')
    } catch (error) {
      console.log(error)
    }
  }

  const removeTutorial = async () => {
    try {
      await deleteTutorial(currentTutorial.id)
      navigate('/tutorials')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={currentTutorial.title}
                onChange={onChangeTitle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={currentTutorial.description}
                onChange={onChangeDescription}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? 'Published' : 'Pending'}
            </div>
          </form>

          {currentTutorial.published ? (
            <button
              className="badge text-bg-primary mr-2"
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge text-bg-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

          <button
            className="badge text-bg-danger mr-2"
            onClick={removeTutorial}
          >
            Delete
          </button>

          <button
            type="submit"
            className="badge text-bg-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  )
}

export default withRouter(
  connect(null, { retrieveTutorials, updateTutorial, deleteTutorial })(Tutorial)
)
