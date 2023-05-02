import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState();

  console.log(image);
  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(!error);
      return false;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("company", company);
    formData.append("userId", userId);
    formData.append("image", image);

    let result = await fetch("http://localhost:2000/add-product", {
      method: "post",
      body: formData,
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.text();
    console.log(formData);
    result && navigate("/products");
  };
  return (
    <div className={"form"}>
      <h1>Add Product</h1>
      <input
        onChange={(e) => setName(e.target.value)}
        className={"input"}
        type="text"
        placeholder="Enter product name"
      />
      {error && !name && <span className="message">Please fill the field</span>}
      <input
        onChange={(e) => setPrice(e.target.value)}
        className={"input"}
        type="text"
        placeholder="Enter product price"
      />
      {error && !price && (
        <span className="message">Please fill the field</span>
      )}

      <input
        onChange={(e) => setCategory(e.target.value)}
        className={"input"}
        type="text"
        placeholder="Enter product category"
      />
      {error && !category && (
        <span className="message">Please fill the field</span>
      )}

      <input
        onChange={(e) => setCompany(e.target.value)}
        className={"input"}
        type="text"
        placeholder="Enter product company"
      />
      {error && !company && (
        <span className="message">Please fill the field</span>
      )}
      <input
        onChange={(e) => setImage(e.target.files[0])}
        className={"input"}
        type="file"
        name="image"
        placeholder="Enter product company"
      />
      {error && !company && (
        <span className="message">Please fill the field</span>
      )}

      <button onClick={addProduct} className="button">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
