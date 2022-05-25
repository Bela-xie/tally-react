import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";

const clientWidth = document.documentElement.clientWidth;
if (clientWidth > 762) {
  window.alert("为确保使用效果，建议在手机上浏览使用");
}
ReactDOM.render(
  //React.StrictMode没有实际效果，会给一些警告，帮助我们更好的写代码,还会出现很多不必要的渲染
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
