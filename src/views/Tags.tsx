import Layout from "components/Layout";
import React from "react";
import { useTags } from "hooks/useTags";
import styled from "styled-components";
import Icon from "components/Icon";
import { Link } from "react-router-dom";
import { Button } from "components/Button";
import { Center } from "components/Center";
import { Space } from "components/Space";
import { Topbar } from "components/Topbar";


const ReturnMoney = styled.div`
     font-size:14px;
     color:#89b8e0;
`
const TagList = styled.ol`
  font-size: 16px;
  background: white;
  > li {
    border-bottom: 1px solid #d5d5d9;
    line-height: 20px;
    margin: 0px 16px 0px 16px;
    &:last-child{
      border-bottom:none
    }
    > a {
      padding: 12px 0 12px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

function Tags() {
  const { tags, addTag } = useTags();
  return (
    <Layout>
      <Topbar title="标签列表">
        <ReturnMoney><Link to={"/money"}>记一笔</Link></ReturnMoney>
      </Topbar>
      <TagList>
        {tags.map((tag) => (
          <li key={tag.id}>
            <Link to={"/tags/" + tag.id}>
              <span className="oneLine">{tag.name}</span>
              <Icon name="right" />
            </Link>
          </li>
        ))}
      </TagList>
      <Center>
        <Space />
        <Space />
        <Button onClick={addTag}>新增标签</Button>
      </Center>
    </Layout>
  );
}

export default Tags;
