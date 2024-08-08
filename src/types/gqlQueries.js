import { gql } from '@apollo/client'

export const GET_TUTORIALS = gql`
  query GetTutorials {
    tutorials {
      id
      title
      description
      published
    }
  }
`

export const GET_TUTORIAL = gql`
  query GetTutorial($id: ID!) {
    tutorial(id: $id) {
      id
      title
      description
      published
    }
  }
`

export const GET_PUBLISHED_TUTORIALS = gql`
  query GetPublishedTutorials {
    tutorials(where: { published: true }) {
      id
      title
      description
      published
    }
  }
`

export const GET_BYTITLE_TUTORIALS = gql`
  query GetByTitleTutorials($title: String!) {
    tutorials(title: $title) {
      id
      title
      description
      published
    }
  }
`

export const ADD_TUTORIAL = gql`
  mutation AddTutorial(
    $title: String!
    $description: String!
    $published: Boolean
  ) {
    addTutorial(
      title: $title
      description: $description
      published: $published
    ) {
      id
      title
      description
      published
    }
  }
`

export const UPDATE_TUTORIAL = gql`
  mutation UpdateTutorial(
    $id: ID!
    $title: String
    $description: String
    $published: Boolean
  ) {
    updateTutorial(
      id: $id
      title: $title
      description: $description
      published: $published
    ) {
      id
      title
      description
      published
    }
  }
`

export const DELETE_TUTORIAL = gql`
  mutation DeleteTutorial($id: ID!) {
    deleteTutorial(id: $id) {
      id
    }
  }
`

export const DELETE_ALL_TUTORIALS = gql`
  mutation DeleteAllTutorials {
    deleteAllTutorials
  }
`
