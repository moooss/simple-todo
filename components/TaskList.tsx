import Task from './Task';

type Props = {
  tasks: Common.Task[];
};

const TaskList = ({ tasks }: Props) => {
  return (
    <>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </>
  );
};

export default TaskList;
