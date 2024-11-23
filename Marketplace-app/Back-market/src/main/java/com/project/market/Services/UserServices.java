package com.project.market.Services;

import com.project.market.Model.User;
import com.project.market.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServices {
    @Autowired
    private UserRepository userRepository;

    public User addUser(User user){
        return userRepository.save(user);
    }

    /*public Optional<User> authenticate(String email, String contrasena) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && user.get().getContrasena().equals(contrasena)) {
            return user;
        }
        return Optional.empty();
    }*/
    public Optional<User> authenticate(String email, String contrasena) {
        return userRepository.findByEmailAndContrasena(email, contrasena);
    }


}
