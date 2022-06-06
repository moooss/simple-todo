import { getTasks, createTask, updateTask, archiveTask, deleteTask } from '../db';

type CreateTaskParams = {
  text: string;
};

type UpdateTaskParams = {
  id: number;
  text: string;
};

type ArchiveTaskParams = {
  id: number;
};

type DeleteTaskParams = {
  id: number;
};

export const resolvers = {
  Query: {
    tasks: async () => {
      return await getTasks();
    },
  },
  Mutation: {
    createTask: async (_: undefined, { text }: CreateTaskParams) => {
      return await createTask(text);
    },
    updateTask: async (_: undefined, { id, text }: UpdateTaskParams) => {
      return await updateTask(id, text);
    },
    archiveTask: async (_: undefined, { id }: ArchiveTaskParams) => {
      return await archiveTask(id);
    },
    deleteTask: async (_: undefined, { id }: DeleteTaskParams) => {
      return await deleteTask(id);
    },
  },
};
