import React, { useState } from 'react'
import { connect } from 'react-redux'

import { useAddTutorial } from '../customHooks/useTutorialGql'

import { createTutorial } from '../actions/tutorialsGQL'

const AddTutorial = ({ createTutorial }) => {
  const [, setId] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [, setPublished] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const { addTutorial } = useAddTutorial()

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const onChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  const saveTutorial = async () => {
    const { data } = await addTutorial(title, description)
    setId(data.addTutorial.id)
    setTitle(data.addTutorial.title)
    setDescription(data.addTutorial.description)
    setPublished(data.addTutorial.published)
    setSubmitted(true)
    createTutorial(data.addTutorial)
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
