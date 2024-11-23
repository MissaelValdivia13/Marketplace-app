package com.project.market.Services;

import com.project.market.Model.Carrito2;
import com.project.market.RepositoryProduct.Carrito2Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Carrito2Service {

    @Autowired
    private Carrito2Repository carrito2Repository;

    public Carrito2 addCarrito(Carrito2 carrito2){
        return carrito2Repository.save(carrito2);
    }
}
