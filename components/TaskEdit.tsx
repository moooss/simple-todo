import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { GET_TASKS, UPDATE_TASK } from '../pages/api/queries';
import { toast } from 'react-toastify';
import Button from './Button';
import Loader from 'react-spinners/ClipLoader';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0, 0.55)',
  },
  content: {
    top: '25%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    minHeight: '180px',
    borderRadius: '10px',
  },
};

const TaskInput = styled.textarea`
  border: none;
  font-size: 1rem;
  min-height: 180px;
  width: 100%;
  resize: none;

  ::placeholder {
    color: #666;
    font-weight: bold;
  }
  :focus {
    outline: none;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  task: Common.Task;
};

const TaskEdit = ({ visible, setVisible, task }: Props) => {
  const [text, setText] = useState(task.text);

  const [updateTask, { loading }] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  useEffect(() => {
    // avoid a warning with react modal
    Modal.setAppElement('body');
  }, []);

  const handleCloseModal = () => {
    setTimeout(() => {
      setVisible(false);
    }, 10);
  };

  const handleSave = async () => {
    try {
      await updateTask({ variables: { id: task.id, text } });
      setVisible(false);
    } catch (err) {
      console.log(err);
      toast.error('Sorry, something went wrong');
    }
  };
  return (
    <Modal isOpen={visible} style={customStyles} onRequestClose={handleCloseModal} contentLabel={'Edit the task'}>
      <TaskInput
        name="editTask"
        placeholder="Task description"
        autoCorrect="off"
        autoCapitalize="none"
        autoComplete="off"
        autoFocus={true}
        onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <Actions>
        <Button primary onClick={handleSave}>
          {!loading ? 'Save' : <Loader color={'#ffffff'} loading={loading} size={10} />}
        </Button>
      </Actions>
    </Modal>
  );
};

export default TaskEdit;
