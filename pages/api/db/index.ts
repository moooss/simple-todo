import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTasks = async () => {
  return await prisma.task.findMany({
    where: { archivedAt: null, deletedAt: null },
  });
};

export const createTask = async (text: string) => {
  await prisma.task.create({
    data: {
      text,
    },
  });
  return await getTasks();
};

export const updateTask = async (id: number, text: string) => {
  await prisma.task.update({
    where: {
      id,
    },
    data: {
      text,
    },
  });
  return await getTasks();
};

export const archiveTask = async (id: number) => {
  await prisma.task.update({
    where: {
      id,
    },
    data: {
      archivedAt: new Date(),
    },
  });
  return await getTasks();
};

export const deleteTask = async (id: number) => {
  await prisma.task.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
  return await getTasks();
};
