import Layout from "components/Layout";
import React, { useState, ReactNode } from "react";
import { CategorySection } from "views/Money/CategorySection";
import styled from "styled-components";
import { useRecords, RecordsItem } from "../hooks/useRecords";
import { useTags } from "hooks/useTags";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  background: white;
  font-size: 18px;
  line-height: 20px;
  padding: 10px 16px;
  > .note {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
`;
const CategoryWrapper = styled.div`
  background: white;
  li {
    &.selected {
      background: #5594cb;
    }
  }
`;
const Header = styled.h3`
  font-size: 18px;
  line-height: 20px;
  padding: 10px 16px;
`;
const Tip = styled.p`
  font-size: 14px;
  color: rgba(24, 22, 22, 0.41);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  > a {
    font-size: 18px;
    color: #5594cb;
  }
`;
function Details() {
  const [category, setCategory] = useState<"-" | "+">("-");
  const { getName } = useTags();
  const { records } = useRecords();
  const selectedRecords = records.filter((r) => r.category === category);
  let hash: { [date: string]: RecordsItem[] } = {};
  selectedRecords.forEach((r) => {
    const key = dayjs(r.createdAt).format("YYYY年MM月DD日");
    if (!(key in hash)) {
      hash[key] = [];
    }
    hash[key].push(r);
  });

  //将 hash 中的内容变成一个数组并降序排序
  const arrayHash = Object.entries(hash).sort((a, b) => {
    return a[0] >= b[0] ? -1 : 1;
  });

  const ContentList = () => {
    return (
      <>
        {arrayHash.map(([date, records]) => (<div key={date}>
          <Header>{date}</Header>
          <div>
            {records.map((r) => {
              return (
                <Item key={r.createdAt}>
                  <div className="tags">{r.tagIds.map((tagId) => <span key={tagId}>{getName(tagId)}</span>).reduce((result, span, index, array) => result.concat(index < array.length - 1 ? [span, "，"] : [span]), [] as ReactNode[])}</div>
                  {r.note && <div className="note">{r.note}</div>}
                  <div className="amount">￥{r.amount}</div>
                </Item>
              );
            })}
          </div>
        </div>
        ))}
      </>
    )
  }
  return (
    <Layout>
      <CategoryWrapper>
        <CategorySection value={category} onChange={(category) => setCategory(category)} />
      </CategoryWrapper>
      {arrayHash.length === 0 ? <Tip>当前没有记录，快去<NavLink to="/money">记一笔</NavLink>吧</Tip> : <ContentList />}
    </Layout>
  );
}
export default Details;
