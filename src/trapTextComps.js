// text components for trapped water solver

import React from "react";


const Title = (props) => {
  return (
    <div className="title">{props.text}</div>
  )  
}

const WaterCount = (props) => {
  return (
    <div className="info">{props.text}: {props.count}</div>
  )  
}

const Instructions = (props) => {
  return (
    <div className="info topMargin">{props.text}</div>
  )  
}

export { Title, WaterCount, Instructions };
