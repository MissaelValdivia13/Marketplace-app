package com.project.market.RepositoryProduct;

import com.project.market.Model.Carrito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RepositoryCarrito extends JpaRepository<Carrito, Long> {

    @Query("SELECT c.id_carrito, c.cantidad, p.nombre, p.ruta, p.precio, (c.cantidad * p.precio) AS subtotal " +
            "FROM Carrito c " +
            "JOIN c.producto p " +
            "WHERE c.id_usuario = :idUsuario")
    List<Object[]> findCarritoDetailsByUser(@Param("idUsuario") int idUsuario);
}

