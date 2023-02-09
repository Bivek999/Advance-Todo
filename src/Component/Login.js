import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //   const [users, setUsers] = useState({});
  const [tkn, setToken] = useState({});
  const ngt = useNavigate();
  const myHeaders = new Headers();
  const [signup, setSignUp] = useState(false);

  myHeaders.append("Content-type", "application/json");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      ngt("/todo");
    }
  }, []);

  useEffect(() => {
    if (signup) {
      setSignUp(false);
      ngt("/user");
    }
  }, [signup]);

  function handleUser(e) {
    setUserName(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function loginUser(e) {
    e.preventDefault();
    setError("");
    if (!userName || !password) {
      alert("All fields are Required");
      if (!userName) {
        setError("Use Valid User Name");
      } else {
        setError("Password Input is Wrong");
      }
    } else {
      const storedUserData = async () => {
        const response = await fetch(
          "https://todo-c6ac9-default-rtdb.firebaseio.com/UsersDataBase.json"
        );
        const responseJson = await response.json();
        //   console.log("response json", responseJson);
        const getDatafromServer = [];
        for (const key in responseJson) {
          getDatafromServer.push(responseJson[key]);
        }
        if (
          getDatafromServer.find((e) => {
            return e.name === userName && e.pass === password;
          })
        ) {
          // const success='Valid'+userName;
          const name = userName;
          setToken(name);
          console.log(tkn, " = ", name);
          localStorage.setItem("token", name);
          ngt("/todo");
        } else {
          console.log(userName);
          setError(
            "User Id Password are incorrect! please try again with Correct One..."
          );
        }
        //   console.log(getDatafromServer);
        // setTodos(getDatafromServer);
      };
      storedUserData();

      //Internal Storege technique
      // fetch("https://fakestoreapi.com/auth/login", {
      //   method: "POST",
      //   headers: myHeaders,
      //   body: JSON.stringify({
      //     username: userName,
      //     password: password,
      //   }),
      // })
      // .then((response) => response.json())
      // .then((e) => setToken(e));
      // if (tkn) {
      //   const str = tkn;
      //   localStorage.setItem("tokn", str);
      //   ngt("/todo");
      // } else {
      //   setError("Wrong Input");
      // }
    }
  }

  return (
    <div className="login-form">
      <h1>Login Form</h1>
      <hr />
      <form method="" onSubmit={loginUser}>
        <p>User Name</p>
        <input
          type="text"
          name="user"
          placeholder="User Name"
          onChange={handleUser}
        />
        <p>Password</p>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handlePassword}
        />
        <button type="submit">Login</button>&nbsp;&nbsp;&nbsp;
        <button onClick={() => setSignUp(true)}>SignUp</button>
      </form>
      {<div>{error}</div>}
    </div>
  );
}

export default Login;
