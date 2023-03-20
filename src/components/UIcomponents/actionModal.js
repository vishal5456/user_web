import React from "react";
import Button from "./Button";
import { attributes } from "../../Constants";
import useClickOutside from "../../utility/useClickOutsideHook";
import "../../Styles/actionmodal.css";

export default function ActionModal(props) {
  const {
    handleClick,
    action,
    selectedUserId = '',
    changes,
    updateChanges,
    disabled,
    errors
  } = props;
console.log(changes);
  return (
    <div className="modalContainer" >
      <div className="modalView" >
        <div className="header">
          <div className="headerText">
            {action === "update" ? "EDIT USER" : "ADD USER"}
          </div>
          <div className="close" onClick={()=>handleClick('close')}>
            X
          </div>
        </div>
        <div className="modalBody">
          {action === "delete" ? (
            <div className="deleteText">
              Are you sure you want to delete the user!!!
            </div>
          ) : (
            attributes &&
            attributes.map((attr, index) => {
              const { key, title, type, displayType } = attr;
              return (
                <div key={`${key}-${index}`} className="inputContainer">
                  {displayType === "hidden" ? (
                    <>
                      <input
                        style={{ display: "none" }}
                        name={key}
                        type={type}
                        id={key}
                        onChange={(e)=>updateChanges(e.target.name,e.target.files[0])}
                      />
                      <label>Profile Image</label>
                      <div className="fileInput">
                        <div className="fileText">
                          {changes[key]?.name || changes[key] || ''}
                        </div>
                        <label className="label" htmlFor={key}>
                          <Button
                            action={"upload"}
                            title={"Upload"}
                            bg={"blueviolet"}
                            subActionType={action}
                          />
                        </label>
                      </div>
                    </>
                  ) : (
                    <>
                      <label htmlFor={key}>{title}</label>
                      <input
                        className="input"
                        name={key}
                        type={type}
                        id={key}
                        value={changes[key]}
                        onChange={(e)=>updateChanges(e.target.name,e.target.value)}
                      />
                      {
                        errors[key] ? <span className="error">{`Please enter a valid ${key}`}</span> : null
                      }
                      
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
        <div className="buttonContainerModal">
          <Button
            action={"submit"}
            title={action === "delete" ? "Delete" : "Submit"}
            bg={action === "delete" ? "Red" : "darkgreen"}
            onClick={handleClick}
            subActionType={action}
            userId = {selectedUserId}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}
