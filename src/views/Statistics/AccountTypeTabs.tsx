import React from "react";
import { AccountTypeValue, AccountType } from '../../types'
import styled from 'styled-components'

const UlWrap = styled.ul`
height: 20px;
display: flex;
> li{
    display: flex;
    justify-content: center;
    align-items: center;
    color:#999;
    margin-right: 10px;
    > button{
        width: 40px;
        height:100%;       
        border:none;
        margin-right:10px;
        border-radius: 5%;
        background: #fff;
    }
    &.selected{
        color:#89b8e0;
        button{
            background: #89b8e0;
        }
    }
}
`

type Props = {
    value: AccountTypeValue;
    onChange: (value: AccountTypeValue) => void;
}

const dataSource: AccountType[] = [
    { value: '-', text: "支出" },
    { value: '+', text: "收入" },
]
const AccountTypeTabs: React.FC<Props> = props => {

    const { value, onChange } = props

    const clickCallback = (value: AccountTypeValue) => {
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
                        <button></button>
                        <span>{item.text}</span>
                    </li>
                )
            })}
        </UlWrap>
    )
}

export default AccountTypeTabs