package com.example.case_blog.Repository;

import com.example.case_blog.Model.Blog;
import com.example.case_blog.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findByTitleContaining(String title);
    List<Blog> findByContentContaining(String content);
    List<Blog> findByUsers(Users users);
    List<Blog> findByUsers_NameContaining(String name);

}
