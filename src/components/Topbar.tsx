import styled from "styled-components";
import React from "react";

const TopbarStyle = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 20px;
  padding: 14px;
  background: white;
  margin-bottom:8px;
  position:relative;
  > .returnLink{
      position:absolute;
      left:16px;
  }
`;
type Props = {
    title: string;
}
const Topbar: React.FC<Props> = props => {
    const { title, children } = props
    return <TopbarStyle>
        <div className="returnLink">{children}</div>
        <span>{title}</span>
        <div></div>
    </TopbarStyle>
}

export { Topbar }