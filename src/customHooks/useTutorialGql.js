import { useLazyQuery, useMutation } from '@apollo/client'
import {
  GET_TUTORIALS,
  GET_TUTORIAL,
  GET_PUBLISHED_TUTORIALS,
  GET_BYTITLE_TUTORIALS,
  ADD_TUTORIAL,
  UPDATE_TUTORIAL,
  DELETE_TUTORIAL,
  DELETE_ALL_TUTORIALS,
} from '../types/gqlQueries'

export function useGetAllTutorials() {
  const [getAllTutorials, { loading, error, data }] = useLazyQuery(
    GET_TUTORIALS,
    {
      onCompleted: (data) => {
        console.log('onCompleted data=', data.tutorials)
      },
    }
  )

  return { getAllTutorials, loading, error, data }
}

export function useGetTutorial() {
  const [getTutorial, { loading, error, data }] = useLazyQuery(GET_TUTORIAL, {
    onCompleted: (data) => {
      console.log('onCompleted data=', data.tutorial)
    },
  })

  function getTutorialById(id) {
    getTutorial({ variables: { id } })
  }

  return { getTutorialById, loading, error, data }
}

export function useGetPublishedTutorials() {
  const [getPublishedTutorials, { loading, error, data }] = useLazyQuery(
    GET_PUBLISHED_TUTORIALS,
    {
      onCompleted: (data) => {
        console.log('onCompleted data=', data.tutorials)
      },
    }
  )

  return { getPublishedTutorials, loading, error, data }
}

export function useGetTutorialByTitle() {
  const [_getTutorialByTitle, { loading, error, data }] = useLazyQuery(
    GET_BYTITLE_TUTORIALS,
    {
      onCompleted: (data) => {
        console.log('onCompleted _getTutorialByTitle data=', data.tutorials)
      },
    }
  )

  async function getTutorialByTitle(title) {
    console.log('title=', title)
    return await _getTutorialByTitle({ variables: { title } })
  }
  return { getTutorialByTitle, loading, error, data }
}

export function useAddTutorial() {
  const [_addTutorial, { loading, error, data }] = useMutation(ADD_TUTORIAL, {
    onCompleted: (data) => {
      console.log('onCompleted data=', data.addTutorial)
    },
  })

  function addTutorial(title, description) {
    _addTutorial({ variables: { title, description } })
  }

  return { addTutorial, loading, error, data }
}

export function useUpdateTutorial() {
  const [_updateTutorial, { loading, error, data }] = useMutation(
    UPDATE_TUTORIAL,
    {
      onCompleted: (data) => {
        console.log('onCompleted data=', data.updateTutorial)
      },
    }
  )

  function updateTutorial({ id, title, description, published }) {
    _updateTutorial({ variables: { id, title, description, published } })
  }

  return { updateTutorial, loading, error, data }
}

export function useDeleteTutorial() {
  const [_deleteTutorial, { loading, error, data }] = useMutation(
    DELETE_TUTORIAL,
    {
      onCompleted: (data) => {
        console.log('onCompleted data=', data.deleteTutorial)
      },
    }
  )

  function deleteTutorial(id) {
    _deleteTutorial({ variables: { id } })
  }

  return { deleteTutorial, loading, error, data }
}

export function useDeleteAllTutorials() {
  const [deleteAllTutorials, { loading, error, data }] = useMutation(
    DELETE_ALL_TUTORIALS,
    {
      onCompleted: (data) => {
        console.log('onCompleted data=', data.deleteAllTutorials)
      },
    }
  )

  return { deleteAllTutorials, loading, error, data }
}
