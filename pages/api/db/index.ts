import { PrismaClient } from '@prisma/client';
import { reorderTasks } from '../../../lib/utils';

const prisma = new PrismaClient();

export const getTasks = async () => {
  return await prisma.task.findMany({
    where: { archivedAt: null, deletedAt: null },
    orderBy: { position: 'asc' },
  });
};

export const createTask = async (text: string) => {
  const tasks = await getTasks();
  return await prisma.task.create({
    data: {
      text,
      position: tasks.length,
    },
  });
};

export const updateTask = async (id: number, text: string) => {
  return await prisma.task.update({
    where: {
      id,
    },
    data: {
      text,
    },
  });
};

export const archiveTask = async (id: number) => {
  return await prisma.task.update({
    where: {
      id,
    },
    data: {
      archivedAt: new Date(),
      position: null,
    },
  });
};

export const deleteTask = async (id: number) => {
  return await prisma.task.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
      position: null,
    },
  });
};

export const setTaskPosition = async (id: number, position: number) => {
  const tasks = await getTasks();
  const sortedTasks = reorderTasks(tasks, id, position);

  await Promise.all(
    sortedTasks.map((task) =>
      prisma.task.update({
        where: {
          id: task.id,
        },
        data: {
          position: task.position,
        },
      }),
    ),
  );
  return { id };
};
