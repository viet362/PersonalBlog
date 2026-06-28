package com.example.case_blog.Controller;

import com.example.case_blog.Model.Blog;
import com.example.case_blog.Model.Users;
import com.example.case_blog.Repository.BlogRepository;
import com.example.case_blog.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin("*")
public class BlogController {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private UsersRepository usersRepository;

    @GetMapping
    public ResponseEntity<List<Blog>> getAllBlogs() {
        return new ResponseEntity<>(blogRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable Long id) {
        Optional<Blog> blog = blogRepository.findById(id);
        if(blog.isPresent()){
            return new ResponseEntity<>(blog.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Blog> createBlog(@RequestBody Blog blog){
        Users user = usersRepository.findById(blog.getUsers().getId()).orElseThrow(() -> new RuntimeException("User not found"));
        blog.setUsers(user);
        return new ResponseEntity<>(blogRepository.save(blog), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> editBlog(@PathVariable Long id, @RequestBody Blog blog) {
        Blog oldBlog = blogRepository.findById(id).orElseThrow(() -> new RuntimeException("Blog not found"));
        oldBlog.setTitle(blog.getTitle());
        oldBlog.setContent(blog.getContent());
        return ResponseEntity.ok(blogRepository.save(oldBlog));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        blogRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search/title")
    public ResponseEntity<List<Blog>> searchTitle(@RequestParam String title) {
        return new ResponseEntity<>(blogRepository.findByTitleContaining(title), HttpStatus.OK
        );
    }

    @GetMapping("/search/content")
    public ResponseEntity<List<Blog>> searchContent(@RequestParam String content) {
        return new ResponseEntity<>(blogRepository.findByContentContaining(content), HttpStatus.OK);
    }

    @GetMapping("/search/user/{userId}")
    public ResponseEntity<List<Blog>> searchByUser(@PathVariable Long userId) {
        Optional<Users> user = usersRepository.findById(userId);
        if(user.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(blogRepository.findByUsers(user.get()), HttpStatus.OK);
    }

    @GetMapping("/search/author")
    public ResponseEntity<List<Blog>> searchAuthor(@RequestParam String name) {
        return new ResponseEntity<>(blogRepository.findByUsers_NameContaining(name), HttpStatus.OK);
    }
}