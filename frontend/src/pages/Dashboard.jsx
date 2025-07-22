// src/pages/Dashboard.jsx

import { useEffect, useState } from "react";
import { getToken, getRole, clearAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", price: "", category: "", imageUrl: "" });
  const navigate = useNavigate();
  const role = getRole();
  const isAdmin = role === "ADMIN";

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
    } else {
      fetchProducts();
    }
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ ...form, price: parseFloat(form.price) }),
      });

      if (!res.ok) throw new Error("Add product failed");

      setForm({ title: "", description: "", price: "", category: "", imageUrl: "" });
      fetchProducts();
    } catch (err) {
      console.error("Error adding product", err);
    }
  };

  const logout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Dashboard</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      <p className="text-sm mb-4">Logged in as: <strong>{role}</strong></p>

      {isAdmin && (
        <form onSubmit={handleAddProduct} className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-2">Add Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="title" value={form.title} onChange={handleInputChange} placeholder="Title" className="border p-2 rounded" required />
            <input name="category" value={form.category} onChange={handleInputChange} placeholder="Category" className="border p-2 rounded" required />
            <input name="price" type="number" value={form.price} onChange={handleInputChange} placeholder="Price" className="border p-2 rounded" required />
            <input name="imageUrl" value={form.imageUrl} onChange={handleInputChange} placeholder="Image URL" className="border p-2 rounded" required />
            <textarea name="description" value={form.description} onChange={handleInputChange} placeholder="Description" className="border p-2 rounded col-span-2" required />
          </div>
          <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Product</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.length === 0 ? (
          <p className="text-gray-600 text-center col-span-full">No products available yet.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="bg-white rounded shadow p-4">
              <img src={product.imageUrl} alt={product.title} className="w-full h-40 object-cover rounded mb-2" />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-blue-600 font-bold mt-1">${product.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
