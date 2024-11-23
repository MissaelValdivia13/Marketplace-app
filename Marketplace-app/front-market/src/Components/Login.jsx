import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from './AuthContext'; // Importar useAuth
import './Login.css'; 


const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    contrasena: ''
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Enviando datos:', credentials); // Agrega un log para verificar qué datos se envían
      const response = await axios.post('http://localhost:8080/market/login', credentials);
      login(response.data);
      alert('Inicio de sesión exitoso');
      navigate('/');
    } catch (error) {
      console.error('Error en la solicitud:', error.response?.data || error.message); // Log para depurar errores
      setError('Credenciales incorrectas');
    }
  };
  
  

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-title">Iniciar Sesión</h2>

        <div className="form-body">
          <div className="form-field">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Introduce tu email"
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="contrasena"
              value={credentials.contrasena}
              onChange={handleChange}
              className="form-input"
              placeholder="Introduce tu contraseña"
              required
            />
          </div>

          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="form-button">Iniciar Sesión</button>
          <a href="/Register" className="form-register">Registrar</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
