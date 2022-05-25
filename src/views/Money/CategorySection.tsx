import styled from "styled-components";
import React, { useState } from "react";

const Wrapper = styled.section`
  font-size: 24px;
  > ul {
    display: flex;
    > li {
      width: 50%;
      text-align: center;
      padding: 16px 0;
      position: relative;
      cursor:default;
      &.selected::after {
        content: "";
        display: block;
        height: 3px;
        background: #5594cb;
        position: absolute;
        bottom: 0;
        width: 100%;
        left: 0;
      }
    }
  }
`;
type Props = {
  value: "-" | "+";
  onChange: (value: "-" | "+") => void;
};
const CategorySection: React.FC<Props> = (props) => {
  const categoryMap = {
    "-": "支出",
    "+": "收入",
  };
  type CategoryType = keyof typeof categoryMap;
  const [categoryList] = useState<CategoryType[]>(["-", "+"]);
  const category = props.value;
  return (
    <Wrapper>
      <ul>
        {categoryList.map((c) => (
          <li className={category === c ? "selected" : ""} key={c} onClick={() => props.onChange(c)}>
            {categoryMap[c]}
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};
export { CategorySection };
