package com.project.market.Controller;

import com.project.market.Modelh2.Ventas;
import com.project.market.Services.VentasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ventas")
public class VentasController {

    @Autowired
    private VentasService ventasService;

    // Crear una nueva venta
    @PostMapping
    public ResponseEntity<Ventas> createVenta(@RequestBody Ventas venta) {

        if (venta.getUsuario() == 0 || venta.getTotal() == 0) {
            return ResponseEntity.badRequest().build();
        }

        Ventas savedVenta = ventasService.addVenta(venta);
        return ResponseEntity.ok(savedVenta);
    }

    // Obtener todas las ventas
    @GetMapping
    public ResponseEntity<List<Ventas>> getAllVentas() {
        List<Ventas> ventas = ventasService.getAllVentas();
        return ResponseEntity.ok(ventas);
    }
}
