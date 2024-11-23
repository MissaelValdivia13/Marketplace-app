package com.project.market.Controller;

import com.project.market.Model.Products;
import com.project.market.Services.ProductsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductsController {

    @Autowired
    private ProductsServices productService;

    // Ruta base donde se guardarán las imágenes
    private final String UPLOAD_DIR = "C:/uploads/products/"; // Cambia esta ruta según tu sistema operativo

    // Endpoint para agregar un nuevo producto con imagen
    @PostMapping
    public ResponseEntity<Products> addProduct(
            @RequestParam("nombre") String nombre,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("precio") double precio,
            @RequestParam("stock") long stock,
            @RequestParam("vendedor") int vendedor,
            @RequestParam("ruta") MultipartFile ruta) throws IOException {  // El campo debe ser "ruta"

        // Crear el directorio si no existe
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdirs();  // Crear el directorio
        }

        // Obtener el nombre original del archivo
        String fileName = ruta.getOriginalFilename();

        // Crear la ruta completa del archivo donde se guardará
        Path filePath = Paths.get(UPLOAD_DIR + fileName);

        // Guardar el archivo en el directorio
        ruta.transferTo(filePath.toFile());  // Transferir el archivo a la ruta especificada

        // Guardar el nombre del archivo (o la ruta relativa si es necesario) en la base de datos
        Products product = new Products();
        product.setNombre(nombre);
        product.setDescripcion(descripcion);
        product.setPrecio(precio);
        product.setStock(stock);
        product.setVendedor(vendedor);
        product.setRuta(fileName);  // Guardar la ruta completa del archivo

        // Guardar el producto usando el servicio
        Products savedProduct = productService.addProduct(product);

        return ResponseEntity.ok(savedProduct);
    }

    @GetMapping("/images/{fileName:.+}")
    public ResponseEntity<byte[]> getImage(@PathVariable String fileName) throws IOException {
        Path filePath = Paths.get(UPLOAD_DIR, fileName);
        if (!Files.exists(filePath)) {
            return ResponseEntity.notFound().build();
        }

        byte[] image = Files.readAllBytes(filePath);
        String contentType = Files.probeContentType(filePath);

        return ResponseEntity.ok()
                .header("Content-Type", contentType)
                .body(image);
    }


    @GetMapping
    public ResponseEntity<List<Products>> getAllProducts() {
        List<Products> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }


}
