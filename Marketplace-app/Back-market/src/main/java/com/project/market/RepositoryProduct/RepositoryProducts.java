package com.project.market.RepositoryProduct;

import com.project.market.Model.Products;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryProducts extends JpaRepository <Products, Long> {
}
