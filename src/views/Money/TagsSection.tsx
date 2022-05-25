import styled from "styled-components";
import React from "react";
import { useTags } from "hooks/useTags";
import { NavLink } from "react-router-dom";
import Icon from "components/Icon";

const Wrapper = styled.section`
  background: #ffffff;
  padding: 12px 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  > ol {
    margin: 0 -12px;
    > li {
      background: #e2eaf1;
      border-radius: 18px;
      display: inline-block;
      padding: 3px 18px;
      font-size: 14px;
      margin: 8px 12px;
      &.selected {
        background: #456c8f;
        color: white;
        .icon {
          fill: white;
        }
      }
      >.icon{
        margin-right:6px;
      }
    }
  }
   button {
    font-size: 12px;
    background: none;
    border: none;
    padding: 2px 4px;
    border-bottom: 1px solid #333;
    color: #666;
    margin-top: 8px;
  }
`;

type Props = {
  value: number[];
  onChange: (value: number[]) => void;
};
const TagsSection: React.FC<Props> = (props) => {
  const { tags } = useTags();
  const selectedTagIds = props.value;

  const getClass = (tagId: number) => (selectedTagIds.indexOf(tagId) >= 0 ? "selected" : "");
  const onToggleSelected = (tagId: number) => {
    if (selectedTagIds.indexOf(tagId) >= 0) {
      props.onChange(selectedTagIds.filter((t) => t !== tagId));
    } else {
      props.onChange([...selectedTagIds, tagId]);
    }
  };
  return (
    <Wrapper>
      <ol>
        {tags.map((tag) => (
          <li key={tag.id} className={getClass(tag.id)} onClick={() => onToggleSelected(tag.id)}>
            <Icon name="small-label"></Icon>
            {tag.name}
          </li>
        ))}
      </ol>
      <NavLink to="/tags">
        <button>管理标签</button>
      </NavLink>
    </Wrapper>
  );
};

export { TagsSection };
