import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
//   const [users, setUsers] = useState({});
  const [tkn, setToken] = useState();
  const ngt = useNavigate();
  const myHeaders = new Headers();
  myHeaders.append("Content-type", "application/json");

  useEffect(() => {
    const token = localStorage.getItem("tokn");
    if (token) {
      ngt("/todo");
    }
  }, []);
  function handleUser(e) {
    setUserName(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function loginUser(e) {
    if (!userName || !password) {
      alert("All fields are Required");
    } else {
      fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((e) => setToken(e));
      if (tkn.token) {
        const str = tkn.token;
        localStorage.setItem("tokn", str);
        ngt("/todo");
      } else {
        setError("Wrong Input");
      }
    }
  }

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: "2rem",
        justifyContent: "center",
        alignItems: "center",
        margin: "5rem",
        height: "200px",
        width: "300px",
        backgroundColor: 'pink'
      }}
    >
      <input type="text" placeholder="User Name" onChange={handleUser} />
      <input type="password" placeholder="Password" onChange={handlePassword} />
      {<div>{error}</div>}
      <button type="submit" onClick={loginUser}>
        Login
      </button>
    </div>
  );
}

export default Login;
