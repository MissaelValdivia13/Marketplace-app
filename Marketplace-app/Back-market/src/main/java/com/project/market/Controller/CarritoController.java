package com.project.market.Controller;

import com.project.market.Model.Carrito;
import com.project.market.Model.Carrito2;
import com.project.market.Services.Carrito2Service;
import com.project.market.Services.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carrito")
public class CarritoController {

    @Autowired
    private CarritoService carritoService;

    @Autowired
    Carrito2Service carrito2Service;

    // Obtener todos los registros del carrito
    @GetMapping
    public ResponseEntity<List<Carrito>> getAllCarritos() {
        List<Carrito> carritos = carritoService.getAllCarritos();
        return ResponseEntity.ok(carritos);
    }



    // Obtener un carrito por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Carrito> getCarritoById(@PathVariable Long id) {
        return carritoService.getCarritoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear un nuevo carrito
    // En el controlador de carrito, valida que el id_producto no sea null antes de guardar
    @PostMapping
    public ResponseEntity<Carrito2> createCarrito(@RequestBody Carrito2 carrito) {
        // Asegúrate de que estos campos son correctos y están siendo mapeados correctamente
        System.out.println("Recibiendo carrito: " + carrito);
        Carrito2 savedCarrito = carrito2Service.addCarrito(carrito);
        return ResponseEntity.ok(savedCarrito);
    }


    @GetMapping("/user/details/{idUsuario}")
    public List<Object[]> obtenerDetallesCarrito(@PathVariable int idUsuario) {
        return carritoService.obtenerDetallesCarritoPorUsuario(idUsuario);
    }




    // Actualizar un carrito existente
    @PutMapping("/{id}")
    public ResponseEntity<Carrito> updateCarrito(@PathVariable Long id, @RequestBody Carrito carritoDetails) {
        return carritoService.getCarritoById(id)
                .map(carrito -> {
                    carrito.setId_usuario(carritoDetails.getId_usuario());
                    carrito.setProducto(carritoDetails.getProducto());
                    carrito.setCantidad(carritoDetails.getCantidad());
                    Carrito updatedCarrito = carritoService.addCarrito(carrito);
                    return ResponseEntity.ok(updatedCarrito);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Eliminar un carrito por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteCarrito(@PathVariable Long id) {
        return carritoService.getCarritoById(id)
                .map(carrito -> {
                    carritoService.deleteCarrito(id);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
