import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import { ChartSourceType } from '../../types'
import * as echarts from 'echarts';

const ChartWrap = styled.div`
.empty{
  position:absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
}
.chart {
    width: 100%;
    height: 200px;
  }}
  .detailList {
    margin-top: 30px;
  }
  .detailItem {
    border-bottom: 1px #f6e3e3 solid;
    padding: 10px 20px;
    .proportion {
      font-weight: bold;
      display: inline-block;
      width: 140px;
    }
    progress {
      -webkit-appearance: none;
    }
    progress::-webkit-progress-value {
      height: 5px;
      background-color: #5594cb;
    }
    progress::-webkit-progress-bar {
      background-color: transparent;
    }
    .amount {
      font-size: 10px;
      color: #9d9393;
    }
  }
  .empty {
    text-align: center;
    color: #c7c2c2;
    font-size: 20px;
  }
`
type Props = {
  source: ChartSourceType[]
}

const Chart: React.FC<Props> = props => {
  const { source } = props

  const chartWrap = useRef<HTMLDivElement | null>(null)

  const myChart = useRef<any>(null)

  const isEchartsInitialed = useRef<boolean>(false) 

  useEffect(() => {
    if (chartWrap.current && !isEchartsInitialed.current) {
      myChart.current = echarts.init(chartWrap.current, 'light')
      isEchartsInitialed.current = true
   }
      if (chartWrap.current) {
        if (source.length===0) {
            chartWrap.current.style.visibility="hidden"
        }else{
          chartWrap.current.style.visibility="visible"
          const option = {
            dataset: {
              source: source,
            },
            series: {
              type: "pie",
              radius: 60,
              center: "50%"
             }   
          }
          myChart.current.setOption(option)
        }
  
      }
  }, [source])


  const getValue = (value: string | null) => {
    let result = 0
    if (value) {
      result = parseFloat(value.substring(0, value.length - 1));
    }
    return result;
  }
  const UlList = () => {
    return (
      <ul className="detailList">
        {source.map(item => {
          return (
            <li className="detailItem" key={item.tagName}>
              <span className="proportion">{`${item.tagName}：${item.proportion}`}</span>
              <progress max="100" value={getValue(item.proportion)}></progress>
              <p className="amount">支出金额：{item.count}</p>
            </li>
          )
        })
        }
      </ul >
    )
  }
  return (
    <ChartWrap>
        <div className="chart" id="chart" ref={chartWrap}></div>
       { source.length ===0 ? <p className="empty">当前数据为空</p> : <UlList /> }
    </ChartWrap >
  )
}

export default Chart;