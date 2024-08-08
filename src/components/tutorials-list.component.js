import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { retrieveTutorials, deleteAllTutorials } from '../actions/tutorialsGQL'

import {
  useGetAllTutorials,
  useDeleteAllTutorials,
  useGetTutorialByTitle,
} from '../customHooks/useTutorialGql'

const TutorialsList = ({
  retrieveTutorials,
  deleteAllTutorials,
  tutorials,
}) => {
  const [currentTutorial, setCurrentTutorial] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [searchTitle, setSearchTitle] = useState('')

  const { getAllTutorialsGql } = useGetAllTutorials()
  const { deleteAllTutorialsGql } = useDeleteAllTutorials()
  const { getTutorialByTitle } = useGetTutorialByTitle()

  useEffect(() => {
    async function listAllTutorials() {
      const { data } = await getAllTutorialsGql()
      retrieveTutorials(data.tutorials)
    }

    listAllTutorials()
  }, [])

  const onChangeSearchTitle = (e) => {
    setSearchTitle(e.target.value)
  }

  const refreshData = () => {
    setCurrentTutorial(null)
    setCurrentIndex(-1)
  }

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial)
    setCurrentIndex(index)
  }

  const removeAllTutorials = async () => {
    try {
      await deleteAllTutorialsGql()
      await deleteAllTutorials()
      refreshData()
    } catch (e) {
      console.log(e)
    }
  }

  const findByTitle = async () => {
    refreshData()
    const { data } = await getTutorialByTitle(searchTitle)
    retrieveTutorials(data.tutorials)
  }

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Tutorials List</h4>

        <ul className="list-group">
          {Array.isArray(tutorials) &&
            tutorials.map((tutorial, index) => (
              <li
                className={
                  'list-group-item ' + (index === currentIndex ? 'active' : '')
                }
                onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              >
                {tutorial.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentTutorial ? (
          <div>
            <h4>Tutorial</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{' '}
              {currentTutorial.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{' '}
              {currentTutorial.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{' '}
              {currentTutorial.published ? 'Published' : 'Pending'}
            </div>

            <Link
              to={'/tutorials/' + currentTutorial.id}
              className="badge text-bg-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    tutorials: state.tutorials,
  }
}

export default connect(mapStateToProps, {
  retrieveTutorials,
  deleteAllTutorials,
})(TutorialsList)
