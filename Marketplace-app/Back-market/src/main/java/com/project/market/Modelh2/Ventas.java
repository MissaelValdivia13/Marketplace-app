package com.project.market.Modelh2;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Ventas") // Asegúrate de que el nombre coincide exactamente
public class Ventas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idVenta; // Corrige el tipo a `Long` para consistencia

    private int usuario;

    @Column(nullable = false)
    private String fecha;

    @Column(nullable = false)
    private double total;
}
