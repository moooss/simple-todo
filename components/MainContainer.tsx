import styled from 'styled-components';
import breakpoints from '../styles/breakpoints';

const MainContainer = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  align-items: center;

  @media only screen and ${breakpoints.device.xs} {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

export default MainContainer;
