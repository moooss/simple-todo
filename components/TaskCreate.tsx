import { useState, useRef } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { GET_TASKS, CREATE_TASK } from '../pages/api/queries';
import Button from './Button';
import Loader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import breakpoints from '../styles/breakpoints';

const Box = styled.div<{ opened: boolean }>`
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  background-color: #fff;
  height: 45px;
  height: ${(props) => (props.opened ? '100px' : '45px')};
  width: 500px;
  margin: 2rem 0;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  position: relative;

  @media only screen and ${breakpoints.device.xs} {
    width: 100%;
  }
`;

const PreviewInput = styled.textarea<{ opened: boolean }>`
  border: none;
  font-size: 1rem;
  height: ${(props) => (props.opened ? '80px' : '25px')};
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
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const StyledButton = styled(Button)`
  margin-left: 0.5rem;
`;

const TaskCreate = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  const inputRef = useRef(null);

  const [createTask, { loading }] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_TASKS }, 'GetTasks'],
  });

  const handleOnFocus = () => {
    setOpen(true);
  };

  const handleSave = async () => {
    setOpen(true);

    if (text.trim().length === 0) {
      return;
    }

    try {
      await createTask({ variables: { text } });
      handleClose();
    } catch (err) {
      console.log(err);
      toast.error('Sorry, something went wrong');
    }
  };

  const handleClose = () => {
    setText('');
    setOpen(false);
  };

  return (
    <Box opened={open}>
      <PreviewInput
        ref={inputRef}
        name="newTask"
        placeholder="Add a task"
        autoCorrect="off"
        autoCapitalize="none"
        autoComplete="off"
        onFocus={handleOnFocus}
        opened={open}
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      {open && (
        <Actions>
          <StyledButton onClick={handleClose}>Close</StyledButton>
          <StyledButton primary onClick={handleSave}>
            {!loading ? 'Save' : <Loader color={'#ffffff'} loading={loading} size={10} />}
          </StyledButton>
        </Actions>
      )}
    </Box>
  );
};

export default TaskCreate;
