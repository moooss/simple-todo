import styled from 'styled-components';
import type { ButtonHTMLAttributes } from 'react';

const StyledButton = styled.button<{ primary: boolean }>`
  background-color: ${(props) => (props.primary ? '#e44232' : '#fff')};
  color: ${(props) => (props.primary ? '#fff' : '#111')};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  :hover {
    background-color: ${(props) => (props.primary ? '#ab2416' : '#efefef')};
  }
`;

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean;
};

const Header = ({ primary = false, ...rest }: Props) => {
  return <StyledButton primary={primary} {...rest} />;
};

export default Header;
