import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetail();
  }, []);

  const getProductDetail = async () => {
    const result = await fetch(`http://localhost:2000/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const data = await result.json();
    setName(data.name);
    setCategory(data.category);
    setCompany(data.company);
    setPrice(data.price);
  };
  const updateProduct = async () => {
    const result = await fetch(`http://localhost:2000/update/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, category, price, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const data = await result.json();

    data.acknowledged && navigate("/products");
  };
  return (
    <div className={"form"}>
      <h1>Update Product</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={"input"}
        type="text"
        placeholder="Enter product name"
      />
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className={"input"}
        type="text"
        placeholder="Enter product price"
      />

      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={"input"}
        type="text"
        placeholder="Enter product category"
      />

      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className={"input"}
        type="text"
        placeholder="Enter product company"
      />

      <button onClick={updateProduct} className="button">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
