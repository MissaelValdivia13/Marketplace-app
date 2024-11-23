package com.project.market.Controller;

import com.project.market.Model.User;
import com.project.market.Services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/market")
@CrossOrigin(origins = "http://localhost:3000") // Permitir solicitudes desde localhost:3000
public class UserControler {
    @Autowired
    private UserServices userServices;

    @PostMapping
    private User addUser(@RequestBody User user) {
        return userServices.addUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> authenticatedUser = userServices.authenticate(user.getEmail(), user.getContrasena());
        if (authenticatedUser.isPresent()) {
            return ResponseEntity.ok(authenticatedUser.get()); // Devuelve el usuario completo
        }
        return ResponseEntity.status(401).body("Credenciales incorrectas");
    }

}
