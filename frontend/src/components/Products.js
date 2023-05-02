import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const Products = () => {
  const [data, setData] = useState();
  const [search, setSearch] = useState("");

  const getProducts = async () => {
    const data = await fetch("http://localhost:2000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const result = await data.json();
    setData(result);
  };
  const deleteItem = async (id) => {
    const result = await fetch(`http://localhost:2000/product/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const status = await result.json();

    status.acknowledged && getProducts();
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const getSearchProducts = async () => {
    const result = await fetch(`http://localhost:2000/search/${search}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const data = await result.json();

    setData(data);
  };
  useEffect(() => {
    if (search) {
      getSearchProducts();
    } else {
      getProducts();
    }
  }, [search]);

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <div className="search-area">
        <h1 className="heading">Products Listing</h1>
        <div>
          <CiSearch />
          <input
            onChange={handleSearch}
            className={"input"}
            type="text"
            placeholder="Search product"
          />
        </div>
      </div>
      <table className={"table"}>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Company</th>
          <th>User Id</th>
          <th></th>
        </tr>
        {data?.length > 0 ? (
          data?.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <img
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                    }}
                    src={`http://localhost:2000/images/${item.image}`}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.company}</td>
                <td>{item.userId}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "align-items",
                      gap: "20px",
                    }}
                  >
                    <Link to={`/update/${item._id}`}>
                      <BiEditAlt className="delete" />
                    </Link>

                    <MdDeleteForever
                      onClick={() => deleteItem(item._id)}
                      className="delete"
                    />
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <h1 style={{ textAlign: "center", width: "100%", marginTop: "42px" }}>
            No result found
          </h1>
        )}
      </table>
    </div>
  );
};

export default Products;
