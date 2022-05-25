import React from 'react'
import styled from "styled-components";

const Wrapper = styled.div`
    background-color: black;
    filter: opacity(50%);
    position: absolute;
    height: 100%;
    width: 100%;
    max-width: 500px;
    top: 0;
`
type Props = {
    hideCover:(value:boolean)=>void
}
const Cover:React.FC<Props> = props=>{
    const {hideCover} = props
    return (
        <Wrapper onClick={()=>{hideCover(false)}}></Wrapper>
    )
}

export default Cover