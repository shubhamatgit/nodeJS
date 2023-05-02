import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const collectData = async () => {
    let result = await fetch("http://localhost:2000/register", {
      method: "post",
      body: JSON.stringify({ email, name, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result.data));
    localStorage.setItem("token", JSON.stringify(result.auth));
    result.auth && navigate("/products");
  };

  return (
    <div className={"form"}>
      <h1>Sign Up</h1>
      <input
        onChange={(e) => setName(e.target.value)}
        className={"input"}
        type="text"
        placeholder="Enter name"
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        className={"input"}
        type="text"
        placeholder="Enter email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        className={"input"}
        type="password"
        placeholder="Enter password"
      />
      <button onClick={collectData} className="button">
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
