import { useState } from 'react';
import styled from 'styled-components';
import breakpoints from '../styles/breakpoints';
import { useMutation } from '@apollo/client';
import { ARCHIVE_TASK, GET_TASKS, DELETE_TASK } from '../pages/api/queries';
import { Check, Trash } from 'react-feather';
import { toast } from 'react-toastify';
import TaskEdit from './TaskEdit';
import { Draggable } from 'react-beautiful-dnd';

const Checkbox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ccc;
  margin-right: 1rem;
  margin-top: 0.15rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: #e44232;
  }
`;

const Actions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0;
  cursor: pointer;
`;

const Box = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 500px;
  min-height: 40px;
  margin: 0.4rem 0;
  padding: 0.5rem 1rem;
  align-items: flex-start;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #dddddd;
  white-space: pre-wrap;
  position: relative;
  cursor: default;

  @media only screen and ${breakpoints.device.xs} {
    width: 100%;
  }

  :hover {
    -webkit-box-shadow: 0 1px 2px 0 rgb(60 64 67 / 10%), 0 2px 6px 2px rgb(60 64 67 / 5%);
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 10%), 0 2px 6px 2px rgb(60 64 67 / 5%);
  }
  &:hover ${Actions} {
    opacity: 1;
    transition: all 1s;
  }
`;

const ColRight = styled.div``;
const Description = styled.div<{ strike: boolean }>`
  display: flex;
  align-self: center;
  text-decoration: ${(props) => (props.strike ? 'line-through' : 'none')};
`;

type Props = {
  task: Common.Task;
  index: number;
};

const Task = ({ task, index }: Props) => {
  const [editVisible, setEditVisible] = useState(false);
  const [strikeText, setStrikeText] = useState(false);

  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  const [archiveTask] = useMutation(ARCHIVE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  const handleDelete = (event: any) => {
    event.stopPropagation();
    try {
      deleteTask({ variables: { id: task.id } });
    } catch (err) {
      console.log(err);
      toast.error('Sorry, something went wrong');
    }
  };

  const handleArchive = (event: any) => {
    event.stopPropagation();
    setStrikeText(true);
    setTimeout(() => {
      try {
        archiveTask({ variables: { id: task.id } });
      } catch (err) {
        console.log(err);
        toast.error('Sorry, something went wrong');
      }
    }, 400);
  };

  const handleEdit = () => {
    setEditVisible(true);
  };

  return (
    <Draggable draggableId={`${task.id}`} index={index}>
      {(provided) => (
        <Box onClick={handleEdit} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <ColRight>
            <Checkbox>
              <Check color={'#fff'} size={12} role="button" aria-label="Finish Task" onClick={handleArchive} />
            </Checkbox>
          </ColRight>
          <Description strike={strikeText}>{task.text}</Description>
          <Actions>
            <Trash color={'#333'} size={16} role="button" aria-label="Delete Task" onClick={handleDelete} />
          </Actions>
          <TaskEdit visible={editVisible} setVisible={setEditVisible} task={task} />
        </Box>
      )}
    </Draggable>
  );
};

export default Task;
