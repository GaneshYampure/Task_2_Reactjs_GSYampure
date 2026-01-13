import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductCrud = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);

  const apiUrl = "http://localhost:3001/products";

  // READ
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(apiUrl);
    setProducts(res.data);
  };

  // CREATE & UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId === null) {
      // CREATE
      await axios.post(apiUrl, {
        name,
        quantity,
        price,
      });
    } else {
      // UPDATE
      await axios.put(`${apiUrl}/${editId}`, {
        id: editId,
        name,
        quantity,
        price,
      });
      setEditId(null);
    }

    setName("");
    setQuantity("");
    setPrice("");
    fetchProducts();
  };

  // DELETE
  const handleDelete = async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    fetchProducts();
  };

  // EDIT
  const handleEdit = (product) => {
    setEditId(product.id);
    setName(product.name);
    setQuantity(product.quantity);
    setPrice(product.price);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product CRUD (Axios)</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <hr />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.quantity}</td>
              <td>{p.price}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCrud;
