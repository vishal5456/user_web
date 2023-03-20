import React from "react";
import Button from "./Button";
import { cardAction } from "../../Constants";
import "../../Styles/usertab.css";

export default function Usertab(props) {
  const { user, onClick } = props;
  const { firstName, lastName, userId } = user;
  return (
    <div className="usercontainer">
      <div className="view">
        <div className="name">{firstName + " " + lastName}</div>
        {cardAction &&
          cardAction.map((action, index) => {
            const { key, title, bg } = action;
            return (
              <Button
                key={index}
                action={key}
                title={title}
                bg={bg}
                onClick={onClick}
                userId={userId}
              />
            );
          })}
      </div>
    </div>
  );
}
