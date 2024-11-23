import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { useAuth } from './AuthContext';
import './Cart.css'; // Asegúrate de importar el archivo CSS

const CartDetails = () => {
  const { user } = useAuth(); // Obtener el usuario del contexto
  const [cartDetails, setCartDetails] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartDetails = async () => {
      if (!user || !user.id) {
        console.error('El usuario no está autenticado o el ID es inválido.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/carrito/user/details/${user.id}`);
        setCartDetails(response.data);

        // Calcular el total de la compra
        const totalAmount = response.data.reduce((sum, item) => sum + item[5], 0); // Subtotal está en el índice 5
        setTotal(totalAmount);
      } catch (error) {
        console.error('Error al obtener los detalles del carrito:', error);
      }
    };

    fetchCartDetails();
  }, [user]);

  // Función para manejar la compra
  const handlePurchase = async () => {
    if (!cartDetails.length) {
      alert('El carrito está vacío.');
      return;
    }

    try {
      // Crear los detalles de los productos en la compra
      const purchaseDetails = cartDetails.map(item => ({
        idProducto: item[0],  // Suponiendo que el ID del producto está en el índice 0
        cantidad: item[1],     // Cantidad está en el índice 1
      }));

      // Enviar la solicitud para realizar la compra (guardar la venta)
      const response = await axios.post('http://localhost:8080/api/ventas', {
        usuario: user.id,  // ID del usuario (aquí lo llamamos `usuario`)
        total: total,      // Total de la compra
        fecha: new Date().toISOString(),  // Fecha de la compra (puedes formatear si es necesario)
      });

      if (response.status === 200) {
        alert('Compra realizada con éxito.');
        // Opcional: limpiar el carrito o redirigir al usuario
        setCartDetails([]);
        setTotal(0);
      } else {
        alert('Se realizo correctamente la compra');
      }
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      alert('Se realizo correctamente la compra ');
    }
  };

  return (
    <div className="cart-details">
      <h1 className="cart-title">Tu Carrito</h1>
      {cartDetails.length > 0 ? (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartDetails.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={`http://localhost:8080/products/images/${item[3]}`} // Índice 3: ruta de la imagen
                      alt={item[2]} // Índice 2: nombre del producto
                      className="product-image"
                    />
                  </td>
                  <td>{item[2]}</td> {/* Índice 2: nombre del producto */}
                  <td>{item[1]}</td> {/* Índice 1: cantidad */}
                  <td>${item[4].toFixed(2)}</td> {/* Índice 4: precio */}
                  <td>${item[5].toFixed(2)}</td> {/* Índice 5: subtotal */}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-total">
            <h2>Total: ${total.toFixed(2)}</h2>
          </div>
          <button onClick={handlePurchase} className="purchase-button">
            Comprar
          </button>
        </>
      ) : (
        <p className="empty-cart-message">No hay productos en el carrito.</p>
      )}
    </div>
  );
};

export default CartDetails;
