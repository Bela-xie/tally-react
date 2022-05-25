import React, { useState, useEffect, useCallback } from "react"
import Layout from "components/Layout";
import DateRangeTabs from "./Statistics/DateRangeTabs";
import { DateValue, AccountTypeValue, ChartSourceType } from "../types";
import styled from "styled-components";
import AccountTypeTabs from "./Statistics/AccountTypeTabs";
import Chart from "./Statistics/Chart";
import { useRecords } from "hooks/useRecords";
import { useTags } from "hooks/useTags";
import DatePanel from './Statistics/DatePanel'
import Cover from './Statistics/Cover'
import { sortByCount, computeProportion, isExistInSource } from '../lib/statistics'

const TopArea = styled.div`
width: 100%;
background-color: #fff;
padding: 20px 30px;
display: flex;
justify-content: space-between;
> .chooseTime{
    color: #5594cb;
    font-style:normal;
}
`
const BottomArea = styled.div`
> .chartTitle{
    display:flex;
    align-items:center;
    justify-content: space-around;
    margin-top: 20px;
  }
}
`

const Statistics = () => {
  const [dateRange, setDateRange] = useState<DateValue>("month")
  const [accountType, setAccountType] = useState<AccountTypeValue>('-')
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1)
  const [isShowDatePanel, setIsShowDatePanel] = useState(false)
  const [source, setSource] = useState<ChartSourceType[]>([])
  const { records } = useRecords()
  const { getName } = useTags()

  const getSource = useCallback((
    currentInterval: string,
    year: number,
    month: number,
    accoutType: string,
  ) => {
    const setSourceItem = function (
      createdYear: number,
      createdMonth: number,
      createdAccountType: string,
      fn: Function
    ) {
      if (
        currentInterval === "month" &&
        year === createdYear &&
        month === createdMonth &&
        accoutType === createdAccountType
      ) {
        fn();
      } else if (
        currentInterval === "year" &&
        year === createdYear &&
        accoutType === createdAccountType
      ) {
        fn();
      } else {
        return;
      }
    };
    let source: ChartSourceType[] = []
    for (let i = 0; i < records.length; i++) {
      const { tagIds, createdAt, category } = records[i]
      const createdYear = new Date(createdAt).getFullYear();
      const createdMonth = new Date(createdAt!).getMonth() + 1;
      const tagName = tagIds.map(id => getName(id)).join(",")
      const index = isExistInSource(tagName, source);
      if (index === -1) {
        setSourceItem(createdYear, createdMonth, category, () => {
          const obj: ChartSourceType = {
            tagName,
            count: records[i].amount,
            proportion: null,
          };
          source.push(obj);
        });
      } else {
        setSourceItem(createdYear, createdMonth, category, () => {
          source[index].count += records[i].amount;
        });
      }
    }
    return sortByCount(computeProportion(source))
  }, [records, getName])

  useEffect(() => {
    const source = getSource(dateRange, year, month, accountType)
    setSource(source)
  }, [dateRange, year, month, accountType, getSource])

  return (
    <Layout>
      <TopArea>
        <DateRangeTabs value={dateRange} onChange={setDateRange}></DateRangeTabs>
        <em className="chooseTime" onClick={() => { setIsShowDatePanel(true) }}>
          <span>{year}</span>
          <span>年</span>
          <span>{month}</span>
          <span>月</span>
          <span>▼</span>
        </em>
      </TopArea>
      <BottomArea>
        <div className="chartTitle">
          {dateRange === 'month' ? (<span>月度分析</span>) : ''}
          {dateRange === 'year' ? (<span>年度分析</span>) : ''}
          <AccountTypeTabs value={accountType} onChange={setAccountType}></AccountTypeTabs>
        </div>
        <Chart source={source} />
      </BottomArea>
      {isShowDatePanel ?
        (<DatePanel closePanel={setIsShowDatePanel} dateRange={dateRange} year={year} month={month} setYear={setYear} setMonth={setMonth} />)
        :
        ""
      }
      {isShowDatePanel ? <Cover hideCover={setIsShowDatePanel} /> : ''}
    </Layout >
  )
}

export default Statistics 