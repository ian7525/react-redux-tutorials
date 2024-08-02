import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  retrieveTutorials as _retrieveTutorials,
  findTutorialsByTitle,
  deleteAllTutorials,
} from '../actions/tutorials'
import { Link } from 'react-router-dom'

const TutorialsList = ({
  retrieveTutorials,
  deleteAllTutorials,
  findTutorialsByTitle,
  tutorials,
}) => {
  const [currentTutorial, setCurrentTutorial] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [searchTitle, setSearchTitle] = useState('')

  useEffect(() => {
    retrieveTutorials()
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
      await deleteAllTutorials()
      refreshData()
    } catch (e) {
      console.log(e)
    }
  }

  const findByTitle = () => {
    refreshData()
    findTutorialsByTitle(searchTitle)
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
          {tutorials &&
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
  retrieveTutorials: _retrieveTutorials,
  findTutorialsByTitle,
  deleteAllTutorials,
})(TutorialsList)
