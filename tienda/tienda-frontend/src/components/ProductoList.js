import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8085/api/productos";

function ProductoList() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ id: null, nombre: "", precio: "", stock: "" });

  const cargarProductos = async () => {
    const res = await axios.get(API_URL);
    setProductos(res.data);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await axios.put(`${API_URL}/${form.id}`, form);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ id: null, nombre: "", precio: "", stock: "" });
    cargarProductos();
  };

  const handleEdit = (producto) => setForm(producto);

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    cargarProductos();
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio (Q)</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.precio}</td>
              <td>{p.stock}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(p)}>Editar</button>
                <button className="delete" onClick={() => handleDelete(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit}>
        <h3>{form.id ? "Editar Producto" : "Agregar Producto"}</h3>
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          name="precio"
          type="number"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          required
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit">
          {form.id ? "Actualizar" : "Agregar"}
        </button>
      </form>
    </>
  );
}

export default ProductoList;
