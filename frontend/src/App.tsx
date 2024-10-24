import { useEffect, useState } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const f = async () => {
      const { data } = await axios.get("http://localhost:5000/user", {
        withCredentials: true,
      });
      setId(data.id);
    };
    f();
  }, []);

  const loginHandler = async () => {
    const { data } = await axios.post(
      "http://localhost:5000/sign-in",
      {
        email,
        password: pass,
      },
      {
        withCredentials: true,
      }
    );
    if (data.message) alert(data.message);
  };

  const logoutHandler = async () => {
    const { data } = await axios.get("http://localhost:5000/logout", {
      withCredentials: true,
    });

    if (data.message) alert(data.message);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="password"
        onChange={(e) => setPass(e.target.value)}
      />
      <br />
      <br />
      <button onClick={loginHandler}>login</button>

      <br />
      <br />
      <button onClick={logoutHandler}>logout</button>

      <br />
      <br />
      <div>User id is {id}</div>
    </div>
  );
}

export default App;
