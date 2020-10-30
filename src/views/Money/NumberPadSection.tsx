import React, { useState } from "react";
import { Wrapper } from "./NumberPadSection/Wrapper";

const NumberPadSection: React.FC = () => {
  const [output, setOutput] = useState("0");
  const onClickButtonWrapper = (e: React.MouseEvent) => {
    const text = (e.target as HTMLButtonElement).textContent;
    if (text === null) {
      return;
    }
    switch (text) {
      case ".":
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9": {
        if (output === "0") {
          setOutput(text);
        } else {
          setOutput(output + text);
        }
        break;
      }
      case "删除": {
        console.log("删除");
        break;
      }
      case "清空": {
        console.log("清空");
        break;
      }
      case "OK": {
        console.log("ok");
        break;
      }
    }
  };
  return (
    <Wrapper>
      <div className="output">{output}</div>
      <div className="pad clearfix" onClick={(e) => onClickButtonWrapper(e)}>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>删除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>清空</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button className="ok">OK</button>
        <button className="zero">0</button>
        <button className="dot">.</button>
      </div>
    </Wrapper>
  );
};
export { NumberPadSection };
