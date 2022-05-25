import styled from "styled-components";
import React, { useRef } from "react";
import Nav from "components/Nav";
import { useEffect } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Main = styled.div`
  flex-grow: 1;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
type Props = {
  scrollTop?: number;
  className?: string;
};
const Layout: React.FC<Props> = (props) => {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      if (divRef.current) {
        divRef.current.scrollTop = props.scrollTop!;
      }
    }, 0);
  }, [props.scrollTop]);
  return (
    <Wrapper>
      <Main ref={divRef} className={props.className}>
        {props.children}
      </Main>
      <Nav />
    </Wrapper>
  );
};
//给 Layout 的 props 设置默认值
Layout.defaultProps = {
  scrollTop: 0,
};
export default Layout;
