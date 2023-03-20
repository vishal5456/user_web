import React from "react";
import "../../Styles/button.css"

export default function Button(props) {
  const { title , bg , action , userId, onClick ,subActionType='', disabled} = props;

const handleClick = ()=>{
  if(onClick) onClick(action, userId , subActionType)
}

const handleDisable = ()=>{
  if(action === 'submit' && disabled ) return {opacity:'0.5', cursor:'not-allowed'}
  return {}
}
  return (
    <div className="buttonContainer" style={{backgroundColor:bg , ...handleDisable()}} onClick={handleClick}>
      <div className="titleConatiner">
        <span className="buttonText">{title}</span>
      </div>
    </div>
  );
}
