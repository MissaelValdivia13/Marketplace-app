package com.project.market.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "productos")
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id_producto;

    private String nombre;
    private String descripcion;
    private double precio;
    private long stock;
    private int vendedor;
    private String ruta;  // Ruta del archivo (nombre del archivo)
}
