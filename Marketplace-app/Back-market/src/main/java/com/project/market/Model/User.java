package com.project.market.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Usuarios")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String  nombre;
    private String email;
    private String telefono;
    private String contrasena;
    private int id_rol;
}
