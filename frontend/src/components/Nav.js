import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <nav>
      <Link to={"/"}>
        <h2>E-Com</h2>
      </Link>

      <ul className="nav-ul">
        {!auth ? (
          <>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
              <Link to={"/signup"}>Signup</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={"/products"}>Products</Link>
            </li>
            <li>
              <Link to={"/add"}>Add Product</Link>
            </li>

            <li>
              <Link onClick={logout} to={"/signup"}>
                Logout ({JSON.parse(auth).name})
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
