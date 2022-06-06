import styled from 'styled-components';
import Image from 'next/image';

const Container = styled.div`
  position: fixed;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // border-bottom: 1px solid #dcdcdc;
  padding: 3rem;
  background-color: #f0f0f0;
`;

const Header = () => {
  return (
    <Container>
      <Image src="/logo.svg" height={50} width={200} />
    </Container>
  );
};

export default Header;
