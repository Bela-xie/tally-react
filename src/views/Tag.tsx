import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useTags } from "hooks/useTags";
import Layout from "components/Layout";
import Icon from "components/Icon";
import { Button } from "components/Button";
import { Input } from "components/Input";
import styled from "styled-components";
import { Center } from "components/Center";
import { Space } from "components/Space";
import { Topbar } from "components/Topbar";

const InputWrapper = styled.div`
  background: white;
  padding: 0 16px;
`;
type Params = {
  id: string;
};
const Tag = () => {
  const { id: idString } = useParams<Params>(); //获取url中的hash参数
  const { findTag, updateTag, deleteTag } = useTags();
  const tag = findTag(parseInt(idString));
  const history = useHistory();
  const onClickBack = () => {
    history.goBack();
  };
  const deleteTagOnClick = (id: number) => {
    deleteTag(id)
    setTimeout(() => {
      history.push("/tags")
    })
  }
  const tagContent = (tag: { id: number; name: string }) => {
    return (
      <div>
        <InputWrapper>
          <Input label="标签名" value={tag.name} onChange={(e) => updateTag(tag.id, { name: e.target.value })} />
        </InputWrapper>
        <div>
          <Center>
            <Space />
            <Space />
            <Button onClick={() => deleteTagOnClick(tag.id)}>删除标签</Button>
          </Center>
        </div>
      </div>
    );
  };
  return (
    <Layout>
      <Topbar title="编辑标签">
        <Icon name="left" onClick={onClickBack} />
      </Topbar>
      {tag ? (
        tagContent(tag)
      ) : (
        <Center>
          <Space />
          <Space />
          <div>标签不存在</div>
        </Center>
      )}
    </Layout>
  );
};

export { Tag };
