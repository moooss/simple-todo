import { getTasks, createTask, setTaskPosition, updateTask, archiveTask, deleteTask } from '../db';

type CreateTaskParams = {
  text: string;
};

type UpdateTaskParams = {
  id: number;
  text: string;
};

type SetTaskPositionParams = {
  id: number;
  position: number;
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
    setTaskPosition: async (_: undefined, { id, position }: SetTaskPositionParams) => {
      return await setTaskPosition(id, position);
    },
    archiveTask: async (_: undefined, { id }: ArchiveTaskParams) => {
      return await archiveTask(id);
    },
    deleteTask: async (_: undefined, { id }: DeleteTaskParams) => {
      return await deleteTask(id);
    },
  },
};
