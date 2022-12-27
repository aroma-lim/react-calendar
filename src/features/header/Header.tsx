import styled from "styled-components";

const HeaderWrapper = styled.div`
  height: 64px;
  width: 100vw;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #a0a096;
`;

const Header = () => {
  return <HeaderWrapper>React Calendar</HeaderWrapper>;
};

export default Header;
