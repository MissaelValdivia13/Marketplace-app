package com.project.market.Services;

import com.project.market.Model.Products;
import com.project.market.RepositoryProduct.RepositoryProducts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductsServices {
    @Autowired
    private RepositoryProducts repositoryProducts;

    public Products addProduct(Products product){
        return repositoryProducts.save(product);
    }

    public List<Products> getAllProducts() {
        return repositoryProducts.findAll();  // Esto asume que tienes un repositorio para la entidad Products
    }

}
