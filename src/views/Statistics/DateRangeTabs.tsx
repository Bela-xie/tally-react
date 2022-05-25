import React from "react";
import { DateType, DateValue } from '../../types'
import styled from 'styled-components'

const UlWrap = styled.ul`
background: #f5f5f5;
height: 24px;
display: flex;
> li{
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.selected{
        background: #89b8e0;
    }
}
`

type Props = {
    value: DateValue;
    onChange: (value: DateValue) => void;
}

const dataSource: DateType[] = [
    { value: 'month', text: "月" },
    { value: 'year', text: "年" },
]
const DateRangeTabs: React.FC<Props> = props => {

    const { value, onChange } = props

    const clickCallback = (value: DateValue) => {
        onChange(value);
    }
    return (
        <UlWrap>
            {dataSource.length && dataSource.map(item => {
                return (
                    <li key={item.value}
                        className={`${value === item.value ? 'selected' : ''}`}
                        onClick={() => { clickCallback(item.value) }}
                    >
                        {item.text}
                    </li>
                )
            })}
        </UlWrap>
    )
}

export default DateRangeTabs