package com.project.market.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "carrito")
public class Carrito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_carrito;

    private int id_usuario;

    @ManyToOne
    @JoinColumn(name = "id_producto", referencedColumnName = "id_producto")
    private Products producto;

    private int cantidad;
}
