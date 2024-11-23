package com.project.market.Services;

import com.project.market.Model.Carrito;
import com.project.market.RepositoryProduct.RepositoryCarrito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarritoService {

    @Autowired
    private RepositoryCarrito carritoRepository;


    public List<Carrito> getAllCarritos() {
        return carritoRepository.findAll();
    }

    public Optional<Carrito> getCarritoById(Long id) {
        return carritoRepository.findById(id);
    }


    public Carrito addCarrito(Carrito carrito) {
        return carritoRepository.save(carrito);
    }

    public void deleteCarrito(Long id) {
        carritoRepository.deleteById(id);
    }


    public List<Object[]> obtenerDetallesCarritoPorUsuario(int idUsuario) {
        return carritoRepository.findCarritoDetailsByUser(idUsuario);
    }


}
