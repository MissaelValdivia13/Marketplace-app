import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const AddUserForm = () => {
  const [user, setUser] = useState({
    nombre: '',
    email: '',
    telefono: '',
    contrasena: '',
    id_rol: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/market', user);
      console.log('User added:', response.data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-title">Registrar Cuenta</h2>

        <div className="form-body">
          {/* Campo Nombre */}
          <div className="form-field">
            <label className="form-label">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={user.nombre}
              onChange={handleChange}
              className="form-input"
              placeholder="Nombre"
            />
          </div>

          {/* Campo Email */}
          <div className="form-field">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Email"
            />
          </div>

          {/* Campo Teléfono */}
          <div className="form-field">
            <label className="form-label">Teléfono:</label>
            <input
              type="text"
              name="telefono"
              value={user.telefono}
              onChange={handleChange}
              className="form-input"
              placeholder="Teléfono"
            />
          </div>

          {/* Campo Contraseña */}
          <div className="form-field">
            <label className="form-label">Contraseña:</label>
            <input
              type="password"
              name="contrasena"
              value={user.contrasena}
              onChange={handleChange}
              className="form-input"
              placeholder="Contraseña"
            />
          </div>

          {/* Campo ID Rol */}
          <div className="form-field">
            <label className="form-label">ID Rol:</label>
            <input
              type="number"
              name="id_rol"
              value={user.id_rol}
              onChange={handleChange}
              className="form-input"
              placeholder="ID Rol"
            />
          </div>

          {/* Botón de Submit */}
          <button type="submit" className="form-button">Agregar Usuario</button>
          
          {/* Enlace para volver al login */}
          <a href="/" className="form-login">Volver al Login</a>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
