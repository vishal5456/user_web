import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../UIcomponents/Button";
import UserTab from "../UIcomponents/Usertab.js";
import "../../Styles/home.css";
import UserModal from "../UIcomponents/actionModal";
import config from "../../config/index";


export default function Home() {
  const navigate = useNavigate();

  const initialState = {};
  const [users, setUsers] = useState([]);
  const [userModal, setUserModal] = useState(false);
  const [action, setAction] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState();
  const [changes, setChanges] = useState(initialState);
  const [error , setError] = useState(initialState)

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios({
        method: "get",
        url: config.baseUrl + "/user/allUser",
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.status === 200) {
        setUsers([...response.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addUser = async () => {
    try {
      if(!validate()){
        const formData = new FormData();
        Object.keys(changes).forEach((item)=>{
            formData.append(item , changes[item])
        })
      const response = await axios({
        method: "post",
        url: config.baseUrl + "/user/create",
        headers: {
          "content-type": "multipart/form-data",
        },
        data: formData,
      });
      if (response.status === 201) {
        await getUsers();
      }
    }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (selecteduserId) => {
    try {
      if(!validate()){
        const formData = new FormData();
        Object.keys(changes).forEach((item)=>{
            formData.append(item , changes[item])
        })
        const response = await axios({
          method: "patch",
          url: `${config.baseUrl}/user/${selecteduserId}`,
          headers: {
            "content-type": "multipart/form-data",
          },
          data: formData,
        });
        if (response.status === 200) {
          await getUsers();
        }
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (selecteduserId) => {
    try {
      const response = await axios({
        method: "delete",
        url: `${config.baseUrl}/user/${selecteduserId}`,
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.status === 200) {
        await getUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validate = ()=>{
    let error = {}
    Object.keys(changes).forEach((key)=>{
        if(key==='firstName' || key==='lastName'){
          if(!(new RegExp('[A-Za-z]').test(changes[key]))){
              error[key] = true
          }
        }
        if(key==='email' && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(changes[key]))){
              error[key] = true
        }
        if(key==='mobile' && (!(new RegExp('[0-9]').test(changes[key])) || changes[key].toString().length !== 10)){
          console.log(new RegExp('[0-9]').test(changes[key]));
          console.log(changes[key].length);
          error[key] = true
        }
    })
    setError({...error})
    return Object.keys(error).length > 0
  } 

  const apicallMap = {
    addUser: addUser,
    update: updateUser,
    delete: deleteUser,
  };

  const hasChanges = ()=>{
    if(Object.keys(changes).length===5){
      return true
    }
    return false
  }

  const onClick = (action, id = "", subActionType = "") => {
    if (action === "view") navigate(`/view/${id}`);
    if (["addUser", "update", "delete"].includes(action)) {
      getSelectedUser(id);
      setUserModal(true);
      setAction(action);
    }
    if (action === "submit") {
      if(hasChanges() && !validate()){
        apicallMap[subActionType](id);
        setSelectedUserId('');
        setUserModal(false);
        setChanges(initialState);
        setError(initialState)
      } 
    }
    if (action === "close") {
      setSelectedUserId('');
      setUserModal(false);
      setChanges(initialState);
      setError(initialState)
    }
   
  };

  const handleChange = (source, value) => {
    let data = {};
    let errors = {...error}
    if (typeof value === "object") {
      data[source] = value;
    } else {
      data[source] = value;
      delete errors[source]
    }
    console.log(data);
    console.log(changes);
    setChanges({ ...changes, ...data });
    setError({...errors})
  };

  const getSelectedUser = (key) => {
    const user = users.filter((user) => user.userId === key);
    if (user.length > 0) {
      const { firstName, lastName, email, mobile, profileImage , userId} = user[0];
      let data = {
        firstName,
        lastName,
        email,
        mobile,
        profileImage
      }
      setSelectedUserId(userId);
      setChanges({...data})
    }
  };

  return (
    <>
      <div className="container">
        <div className="cardContainer">
          {users && users.length>0 ?
            users.map((user) => (
              <UserTab key={user.userId} user={user} onClick={onClick} />
            ))
          :
          <div className="message">
            No Users Added !!!  Please click Add user to add an user.
          </div>
          }
          <div className="button">
            <Button
              action={"addUser"}
              title={"Add user"}
              bg="blueviolet"
              onClick={onClick}
            />
          </div>
        </div>
      </div>
      {userModal && (
        <UserModal
          handleClick={onClick}
          action={action}
          selectedUserId={selectedUserId}
          updateChanges={handleChange}
          changes={changes}
          setUserModal={setUserModal}
          disabled = {!hasChanges()}
          errors={error}
        />
      )}
    </>
  );
}
