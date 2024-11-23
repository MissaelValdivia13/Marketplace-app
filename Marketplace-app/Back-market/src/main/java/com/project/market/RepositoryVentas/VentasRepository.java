package com.project.market.RepositoryVentas;

import com.project.market.Modelh2.Ventas;
import org.hibernate.annotations.SecondaryRow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VentasRepository extends JpaRepository<Ventas, Long> {
}
