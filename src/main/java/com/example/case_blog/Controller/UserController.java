package com.example.case_blog.Controller;

import com.example.case_blog.Model.Users;
import com.example.case_blog.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UsersRepository usersRepository;

    @GetMapping
    public ResponseEntity<List<Users>> getAllUsers() {
        return new ResponseEntity<>(usersRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Users>> getUserById(@PathVariable Long id) {
        return new ResponseEntity<>(usersRepository.findById(id), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<Users> register(@RequestBody Users user){
        return new ResponseEntity<>(usersRepository.save(user), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Users> login(@RequestBody Users user){
        Users foundUser = usersRepository.findByUsername(user.getUsername());
        if(foundUser != null && foundUser.getPassword().equals(user.getPassword())){
            return new ResponseEntity<>(foundUser, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Users> editUser(@PathVariable Long id, @RequestBody Users user) {
        Users oldUser = usersRepository.findById(id).orElseThrow();
        oldUser.setUsername(user.getUsername());
        oldUser.setName(user.getName());
        oldUser.setPassword(user.getPassword());
        return ResponseEntity.ok(usersRepository.save(oldUser));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        usersRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
