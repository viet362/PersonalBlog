package com.example.case_blog.Repository;

import com.example.case_blog.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsersRepository extends JpaRepository<Users, Long> {
    List<Users> findByNameContaining(String name);
    Users findByUsername(String username);

}
