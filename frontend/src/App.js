import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";

import PrivateComponent from "./components/PrivateComponent";
import AddProduct from "./components/AddProduct";
import Products from "./components/Products";
import UpdateProduct from "./components/UpdateProduct";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <div className="main">
          <Routes>
            <Route
              path="/"
              element={<h1>Click on Products see list</h1>}
            ></Route>
            <Route element={<PrivateComponent />}>
              <Route path="/products" element={<Products />}></Route>
              <Route path="/add" element={<AddProduct />}></Route>
              <Route path="/update/:id" element={<UpdateProduct />}></Route>
              <Route path="/logout" element={"Product logout"}></Route>
              <Route path="/profile" element={"User profile"}></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
