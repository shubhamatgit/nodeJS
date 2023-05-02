import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const login = async () => {
    let result = await fetch("http://localhost:2000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/products");
    } else {
      alert("Please enter correct details");
    }
  };

  return (
    <div className={"form"}>
      <h1>Log In</h1>

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
      <button onClick={login} className="button">
        Log In
      </button>
    </div>
  );
};

export default Signup;
