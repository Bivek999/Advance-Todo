import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./user.css";

function User() {
  const emailRef = useRef();
  const passRef = useRef();
  const nameRef = useRef();
  const ngt = useNavigate();

  function handleUser(e) {
    e.preventDefault();
    const obj = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      pass: passRef.current.value,
    };
    console.log(obj);
    async function storeIntoServer() {
      await fetch(
        "https://todo-c6ac9-default-rtdb.firebaseio.com/UsersDataBase.json",
        {
          method: "POST",
          body: JSON.stringify(obj),
        }
      );
    }
    storeIntoServer();
    ngt("/");
  }

  return (
    <div className="user-form">
      <h1>Sign Up</h1>
      <hr />
      <form onSubmit={handleUser}>
        <input type="text" placeholder="User Name" ref={nameRef} />
        <input type="text" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passRef} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default User;
