package com.project.market.Services;

import com.project.market.Modelh2.Ventas;
import com.project.market.RepositoryVentas.VentasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class VentasService {

    @Autowired
    private VentasRepository ventasRepository;

    public Ventas addVenta(Ventas venta){
        return ventasRepository.save(venta);
    }

    public List<Ventas> getAllVentas(){
        return ventasRepository.findAll();
    }


}
