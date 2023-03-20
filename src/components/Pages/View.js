import React, { useState, useEffect } from "react";
import { useParams ,useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../UIcomponents/Button";
import UserTab from "../UIcomponents/Usertab.js";
import "../../Styles/view.css";


import config from "../../config/index";

export default function View() {
  const navigate = useNavigate()
  const { id } = useParams();

  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${config.baseUrl}/user/${id}`,
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.status === 200) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = ()=>{
    navigate('/')
  }


  return (
    <div className="viewContainer">
      <div className="imageContainer">
        <img className="image" src={user.profilePicPath} crossOrigin='true'  alt="profileImage" />
      </div>
      <div className="profileContainer">
        <div className="profileView">
        <div className="head">My Profile</div>
        <div className="infoContainer">
          <div className="info">{user.firstName+ ' '+ user.lastName}</div>
          <div className="info">{user.email}</div>
          <div className="info">{user.mobile}</div>
        </div>
        <Button action={"redirect"} title={"Home"} bg={"blueviolet"} onClick={handleClick}/>
        </div>
      </div>
    </div>
  );
}
