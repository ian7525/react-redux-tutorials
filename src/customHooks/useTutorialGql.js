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
  const [getAllTutorialsGql, { loading, error, data }] = useLazyQuery(
    GET_TUTORIALS,
    {
      onCompleted: (data) => {
        console.log('onCompleted getAllTutorialsGql data=', data.tutorials)
      },
      fetchPolicy: 'network-only',
    }
  )

  return { getAllTutorialsGql, loading, error, data }
}

export function useGetTutorial() {
  const [getTutorialGql, { loading, error, data }] = useLazyQuery(
    GET_TUTORIAL,
    {
      onCompleted: (data) => {
        console.log('onCompleted getTutorialGql data=', data.tutorial)
      },
      fetchPolicy: 'network-only',
    }
  )

  async function getTutorialById(id) {
    return await getTutorialGql({ variables: { id } })
  }

  return { getTutorialById, loading, error, data }
}

export function useGetPublishedTutorials() {
  const [getPublishedTutorialsGql, { loading, error, data }] = useLazyQuery(
    GET_PUBLISHED_TUTORIALS,
    {
      onCompleted: (data) => {
        console.log(
          'onCompleted getPublishedTutorialsGql data=',
          data.tutorials
        )
      },
    }
  )

  return { getPublishedTutorialsGql, loading, error, data }
}

export function useGetTutorialByTitle() {
  const [getTutorialByTitleGql, { loading, error, data }] = useLazyQuery(
    GET_BYTITLE_TUTORIALS,
    {
      onCompleted: (data) => {
        console.log('onCompleted getTutorialByTitleGql data=', data.tutorials)
      },
    }
  )

  async function getTutorialByTitle(title) {
    return await getTutorialByTitleGql({ variables: { title } })
  }
  return { getTutorialByTitle, loading, error, data }
}

export function useAddTutorial() {
  const [addTutorialGql, { loading, error, data }] = useMutation(ADD_TUTORIAL, {
    onCompleted: (data) => {
      console.log('onCompleted addTutorialGql data=', data.addTutorial)
    },
  })

  async function addTutorial(title, description) {
    return await addTutorialGql({ variables: { title, description } })
  }

  return { addTutorial, loading, error, data }
}

export function useUpdateTutorial() {
  const [updateTutorialGql, { loading, error, data }] = useMutation(
    UPDATE_TUTORIAL,
    {
      onCompleted: (data) => {
        console.log('onCompleted updateTutorialGql data=', data.updateTutorial)
      },
    }
  )

  async function updateTutorial({ id, title, description, published }) {
    return await updateTutorialGql({
      variables: { id, title, description, published },
    })
  }

  return { updateTutorial, loading, error, data }
}

export function useDeleteTutorial() {
  const [deleteTutorialGql, { loading, error, data }] = useMutation(
    DELETE_TUTORIAL,
    {
      onCompleted: (data) => {
        console.log('onCompleted deleteTutorialGql data=', data.deleteTutorial)
      },
    }
  )

  function deleteTutorial(id) {
    deleteTutorialGql({ variables: { id } })
  }

  return { deleteTutorial, loading, error, data }
}

export function useDeleteAllTutorials() {
  const [deleteAllTutorialsGql, { loading, error, data }] = useMutation(
    DELETE_ALL_TUTORIALS,
    {
      onCompleted: (data) => {
        console.log(
          'onCompleted deleteAllTutorialsGql data=',
          data.deleteAllTutorials
        )
      },
    }
  )

  return { deleteAllTutorialsGql, loading, error, data }
}
