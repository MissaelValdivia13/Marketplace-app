import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';
import './Menu.css';

const Menu = () => {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // Para redirigir al login si el usuario no está autenticado

  // Cargar productos y carrito del usuario al inicio
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Hubo un error al obtener los productos', error);
      }
    };

    const fetchCart = async () => {
      try {
        // Verificar que el usuario está autenticado antes de intentar obtener su carrito
        if (user && user.id) {
          const response = await axios.get(`http://localhost:8080/api/carrito/user/${user.id}`);
          setCart(
            response.data.map((item) => ({
              ...item,
              quantity: item.cantidad,
            }))
          );
        } else {
          console.error('El usuario no está autenticado. No se puede cargar el carrito.');
        }
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
      }
    };

    fetchProducts();
    fetchCart();
  }, [user]); // Dependencia en 'user' para cargar productos y carrito cuando el usuario cambie

  // Agregar productos al carrito
  const addToCart = async (product) => {
    try {
      // Verificar si el usuario está autenticado
      if (!user || !user.id) {
        console.error('Usuario no autenticado. No se puede agregar al carrito.');
        // Redirigir al usuario al login
        navigate('/login');
        return;
      }

      // Verificar si el producto tiene id_producto
      if (!product.id_producto) {
        console.error('Producto sin ID, no se puede agregar al carrito');
        return;
      }

      // Mostrar mensaje con los ids
      alert(`Producto ID: ${product.id_producto}, Usuario ID: ${user.id}`);
      console.log(`Producto ID: ${product.id_producto}, Usuario ID: ${user.id}`);

      const newCartItem = {
        id_usuario: user.id, // Asegurarnos de usar el campo correcto para el ID del usuario
        id_producto: product.id_producto,
        cantidad: 1,
      };

      // Verificar si el ID del producto está definido antes de enviarlo
      if (!newCartItem.id_producto) {
        console.error('ID del producto no válido');
        return;
      }

      // Verificar si el producto ya está en el carrito
      const existingProduct = cart.find((item) => item.id_producto === product.id_producto);
      
      if (existingProduct) {
        // Incrementar la cantidad en el backend
        const updatedCartItem = {
          ...existingProduct,
          cantidad: existingProduct.quantity + 1,
        };
        await axios.put(`http://localhost:8080/api/carrito/${existingProduct.id_carrito}`, updatedCartItem);
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id_producto === product.id_producto
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        // Agregar nuevo producto al backend
        const response = await axios.post('http://localhost:8080/api/carrito', newCartItem);
        setCart((prevCart) => [
          ...prevCart,
          { ...product, id_carrito: response.data.id_carrito, quantity: 1 },
        ]);
      }
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
  };

  // Calcular el total de productos en el carrito
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className="header">
        <div className="header-center">
          <input
            type="text"
            className="search-bar"
            placeholder="Buscar productos, marcas y más..."
          />
          <button className="search-button">Buscar</button>
        </div>
        <div className="header-right">
          {!user ? (
            <>
              <Link to="/register" className="nav-link">
                Crea tu cuenta
              </Link>
              <Link to="/login" className="nav-link">
                Ingresa
              </Link>
            </>
          ) : (
            <>
              <span className="nav-link">Hola, {user.nombre}</span>
              <Link to="/purchases" className="nav-link">
                Mis compras
              </Link>
              <Link to="/products" className="nav-link">
                Vender
              </Link>
              <Link to="/cart" className="nav-link">
                <i className="fa fa-shopping-cart"></i> Ver Carrito ({totalItemsInCart})
              </Link>
              <button onClick={logout} className="nav-link">
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </header>

      <main className="product-cards-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id_producto} className="product-card">
              <Link to={`/product/${product.id_producto}`} className="product-card-link">
                <img
                  src={`http://localhost:8080/products/images/${product.ruta}`}
                  alt={product.nombre}
                  className="product-image"
                />
              </Link>
              <div className="product-info">
                <h4>{product.nombre}</h4>
                <p className="price">${product.precio}</p>
                <div className="product-extra">
                  <span className="free-shipping">
                    {product.envioGratis ? 'Envío Gratis' : ''}
                  </span>
                  <span className="rating">{'⭐'.repeat(product.calificacion || 0)}</span>
                </div>
                <button
                  className="add-to-cart-button"
                  onClick={() => addToCart(product)}
                >
                  <i className="fa fa-cart-plus"></i> Agregar al carrito
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </main>
    </>
  );
};

export default Menu;
