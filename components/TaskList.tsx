import { useEffect, useState } from 'react';
import styled from 'styled-components';
import breakpoints from '../styles/breakpoints';
import Task from './Task';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useMutation } from '@apollo/client';
import { GET_TASKS, SET_TASK_POSITION } from '../pages/api/queries';
import { reorderTasks } from '../lib/utils';

const List = styled.div`
  @media only screen and ${breakpoints.device.xs} {
    width: 100%;
  }
`;

type Props = {
  tasks: Common.Task[];
};

const TaskList = ({ tasks }: Props) => {
  // Reordering tasks requires that we work on a local state to avoid glitches
  const [localTasks, setLocalTasks] = useState(tasks);

  const [setTaskPosition] = useMutation(SET_TASK_POSITION, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  const handleOnDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const id = parseInt(draggableId, 10);
    const position = destination.index;
    setLocalTasks(reorderTasks(tasks, id, position));
    await setTaskPosition({
      variables: {
        id: parseInt(draggableId, 10),
        position: destination.index,
      },
    });
  };

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId={'0'}>
        {(provided) => (
          <List ref={provided.innerRef} {...provided.droppableProps}>
            {localTasks.map((task, index) => (
              <Task key={task.id} index={index} task={task} />
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
