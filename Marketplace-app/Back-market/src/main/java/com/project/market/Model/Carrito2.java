package com.project.market.Model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Data
@Table(name = "carrito")
public class Carrito2 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_carrito;

    private int id_usuario;
    private int id_producto;
    private int cantidad;
}
