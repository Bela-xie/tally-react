import styled from "styled-components";
import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "components/Icon";

const NavWrapper = styled.nav`
  background:white;
  line-height: 24px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  > ul {
    display: flex;
    > li {
      width: 33.3333%;
      text-align: center;
      a {
        padding: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 4px 0;
        justify-content: center;
        > .icon {
          width: 24px;
          height: 24px;
        }
        &.selected {
          color: #5594cb;
          > .icon {
            fill: #5594cb;
          }
        }
      }
    }
  }
`;
const Nav = () => {
  return (
    <NavWrapper>
      <ul>
        <li>
          {/* <NavLink to="/tags" activeClassName="selected">
            <Icon name="tag"></Icon>
            标签
          </NavLink> */}
          <NavLink to="/details" activeClassName="selected">
            <Icon name="details"></Icon>
            明细
          </NavLink>
        </li>
        <li>
          <NavLink to="/money" activeClassName="selected">
            <Icon name="money"></Icon>
            记一笔
          </NavLink>
        </li>
        <li>
          <NavLink to="/statistics" activeClassName="selected">
            <Icon name="statistics"></Icon>
            统计
          </NavLink>
        </li>
      </ul>
    </NavWrapper>
  );
};
export default Nav;
