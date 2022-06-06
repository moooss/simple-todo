import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Task {
    id: ID
    createdAt: String!
    updatedAt: String!
    archivedAt: String!
    text: String!
  }

  type Query {
    tasks: [Task]
  }

  type Mutation {
    createTask(text: String!): [Task]
    updateTask(id: Int!, text: String!): [Task]
    archiveTask(id: Int!): [Task]
    deleteTask(id: Int!): [Task]
  }
`;
