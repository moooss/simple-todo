import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query getTasks {
    tasks {
      id
      text
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($text: String!) {
    createTask(text: $text) {
      id
      text
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: Int!, $text: String!) {
    updateTask(id: $id, text: $text) {
      id
    }
  }
`;

export const SET_TASK_POSITION = gql`
  mutation SetTaskPosition($id: Int!, $position: Int!) {
    setTaskPosition(id: $id, position: $position) {
      id
    }
  }
`;

export const ARCHIVE_TASK = gql`
  mutation ArchiveTask($id: Int!) {
    archiveTask(id: $id) {
      id
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`;
