import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Task {
    id: Int!
    createdAt: String!
    updatedAt: String!
    archivedAt: String
    deletedAt: String
    text: String!
    porition: Int
  }

  type Query {
    tasks: [Task]
  }

  type Mutation {
    createTask(text: String!): Task
    updateTask(id: Int!, text: String!): Task
    setTaskPosition(id: Int!, position: Int!): Task
    archiveTask(id: Int!): Task
    deleteTask(id: Int!): Task
  }
`;
