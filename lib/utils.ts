/**
 * Reorder task list when one task is moved
 */
export const reorderTasks = (tasks: Common.Task[], id: number, position: number) => {
  const itemTask = tasks.find((task) => task.id === id);
  if (!itemTask) {
    throw new Error(`Task with id ${id} not found`);
  }
  const newTasks = tasks.filter((task) => task.id !== id);
  newTasks.splice(position, 0, { ...itemTask, position });
  const sortedTasks = newTasks.map((task, index) => {
    return { ...task, position: index };
  });
  return sortedTasks;
};
