import React,{useState,useEffect, useRef} from 'react'
import styled from "styled-components";

const DateListWrap = styled.div`
  width: 45%;
  position: relative;
  height: 30px;
  border-top: 1px solid #5594cb;
  border-bottom: 1px solid #5594cb;
  display: flex;
  justify-content: center;
  > .list {
      position: absolute;
      width: 100%;
    li {
          height: 30px;
          line-height: 30px;
          text-align: center;
      }
  }
`
type Props = {
    currentValue: number;
    dataSource: number[];
    setCurrentValue: (value: number) => void;
}
const DateList: React.FC<Props> = (props) => {
    const {currentValue,dataSource,setCurrentValue} = props
    const [currentTop,setCurrentTop] = useState(0)
    const startPoint = useRef(0)
    // 初始移动点
    useEffect(()=>{
        const valueIndex = dataSource.indexOf(currentValue);
        setCurrentTop(-(valueIndex * 30))
    },[currentValue,dataSource])

    const touchStart = (e: React.TouchEvent<HTMLUListElement>)=>{
        startPoint.current = e.changedTouches[0].pageY
      }

     const touchMove = (e: React.TouchEvent<HTMLUListElement>)=>{
        const limitRange = 50;
        const minTop = -(dataSource.length - 1) * 30 - limitRange;
        const maxTop = limitRange;
        let top = currentTop + (e.changedTouches[0].pageY - startPoint.current) / 10;
        top = top < minTop ? minTop : top;
        top = top > maxTop ? maxTop : top;
        setCurrentTop(top);
      }

      const touchEnd = (e: React.TouchEvent<HTMLUListElement>)=> {
        if (currentTop > 0) {
            setCurrentTop(0)
            return
        }
        let index = -Math.round(currentTop / 30);
        index >= dataSource.length && (index = dataSource.length - 1);
        setCurrentTop(-index * 30);
        setCurrentValue(dataSource[index]);
      }
    return (
        <DateListWrap>
            <ul style={{top:`${currentTop}px`}} className="list" onTouchStart={touchStart} onTouchMove={touchMove} onTouchEnd={touchEnd}>
            {dataSource.map((item)=>{
                return (<li key={item}>{item}</li>)
            })}
        </ul>
        </DateListWrap>
    )
}

export default DateList