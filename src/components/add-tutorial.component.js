import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createTutorial } from '../actions/tutorials'

const AddTutorial = ({ createTutorial }) => {
  const [, setId] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [, setPublished] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const onChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  const saveTutorial = async () => {
    const data = await createTutorial(title, description)
    setId(data.id)
    setTitle(data.title)
    setDescription(data.description)
    setPublished(data.published)
    setSubmitted(true)
  }

  const newTutorial = () => {
    setId(null)
    setTitle('')
    setDescription('')
    setPublished(false)
    setSubmitted(false)
  }

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={title}
              onChange={onChangeTitle}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={description}
              onChange={onChangeDescription}
              name="description"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  )
}

export default connect(null, { createTutorial })(AddTutorial)
