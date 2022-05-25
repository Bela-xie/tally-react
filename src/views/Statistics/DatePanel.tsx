import React from 'react'
import styled from "styled-components";
import { DateValue } from "../../types";
import DateList from './DateList'
import {Years,Months} from '../../lib/date'

const PanelWrap = styled.div`
    width: 100%;
    max-width: 500px;
    background-color: white;
    position: absolute;
    z-index: 1;
    bottom: 0px;
    > .top {
      display: flex;
      justify-content: space-between;
      padding: 15px 20px;
      > .now {
        color: #ee6b8c;
      }
      > .chosen {
        font-size: 18px;
      }
      > .ok {
        color: #5594cb;
      }
    }
    > .main {
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      overflow: hidden;
      max-width: 100%;
  }
`
type Props = {
  dateRange: DateValue;
  year:number;
  setYear:(value:number)=>void;
  month:number;
  setMonth:(value:number)=>void;
  closePanel:(value:boolean)=>void;
}

const DatePanel: React.FC<Props> = props => {
  const { dateRange,year,setYear,month,setMonth,closePanel } = props
  const now=()=> {
    setYear(new Date().getFullYear())
    setMonth(new Date().getMonth() + 1)
  }
  return (
    <PanelWrap>
      <div className="top">
        <span className="now" onClick={()=>{now()}}>当前</span>
        <em className="chosen">
          {dateRange === 'year' ? (<span>{year}</span>) : (<span>{`${year} - ${month}`}</span>)}
        </em>
        <span className="ok" onClick={()=>closePanel(false)}>确定</span>
      </div>
      <div className="main">
        <DateList currentValue={year} setCurrentValue={setYear} dataSource={Years} />
        {dateRange==='month'? <DateList currentValue={month} setCurrentValue={setMonth} dataSource={Months} />:''}
         </div>
    </PanelWrap>
  )
}

export default DatePanel