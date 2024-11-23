import React, { useState } from "react";
import axios from "axios";
import "./Register.css"; // Asegúrate de que el archivo CSS esté en el mismo directorio

const AddProductForm = () => {
  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    vendedor: "",
    ruta: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "ruta") {
      setProduct({
        ...product,
        ruta: e.target.files[0],
      });
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.ruta) {
      alert("Por favor, selecciona una imagen.");
      return;
    }

    const formData = new FormData();
    formData.append("ruta", product.ruta);
    formData.append("nombre", product.nombre);
    formData.append("descripcion", product.descripcion);
    formData.append("precio", product.precio);
    formData.append("stock", product.stock);
    formData.append("vendedor", product.vendedor);

    try {
      const response = await axios.post("http://localhost:8080/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Producto agregado exitosamente");
      console.log(response.data);
    } catch (error) {
      console.error("Hubo un error al agregar el producto", error);
      alert("Hubo un error al agregar el producto");
    }
  };

  return (
    <div className="form">
      <h2 className="form-title">Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={product.nombre}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-field">
          <label className="form-label">Descripción</label>
          <input
            type="text"
            name="descripcion"
            value={product.descripcion}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-field">
          <label className="form-label">Precio</label>
          <input
            type="number"
            name="precio"
            value={product.precio}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-field">
          <label className="form-label">Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-field">
          <label className="form-label">ID del Vendedor</label>
          <input
            type="number"
            name="vendedor"
            value={product.vendedor}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-field">
          <label className="form-label">Imagen del Producto</label>
          <input
            type="file"
            name="ruta"
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="form-button">Agregar Producto</button>
      </form>
    </div>
  );
};

export default AddProductForm;
