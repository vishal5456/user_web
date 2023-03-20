import React from "react";



export default function Modal(props) {
    const {
        handleClick,
        message
      } = props;

  return (
    <div className="modalContainer" >
      <div className="modalView" >
        <div className="header">
          <div className="headerText">
           Info
          </div>
          <div className="close" onClick={()=>handleClick('close')}>
            X
          </div>
        </div>
        <div className="modalBody">
         {message || 'Something went wrong !!! Please try again'}
        </div>
      </div>
    </div>
  );
}
