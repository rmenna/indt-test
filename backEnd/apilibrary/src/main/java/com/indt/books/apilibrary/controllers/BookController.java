package com.indt.books.apilibrary.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.indt.books.apilibrary.models.Book;
import com.indt.books.apilibrary.repository.BookRepository;


@RestController
@RequestMapping(value="/api")
public class BookController {
	
	@Autowired
	BookRepository bookRepository;
	
	@GetMapping("/books")
	public List<Book> allBooks(){
		return bookRepository.findAll();
	}
	
	@GetMapping("/book/{id}")
	public ResponseEntity<?> findOneBook(@PathVariable(value="id")long id){
		Book book = bookRepository.findById(id);
		return book != null ? ResponseEntity.ok(book):ResponseEntity.notFound().build();
	}

	@PostMapping("/book")
	public ResponseEntity<Book> createdBook(@RequestBody Book book){
		Book bookCreate = bookRepository.save(book);
		return ResponseEntity.status(HttpStatus.CREATED).body(bookCreate);
	}
	
	@DeleteMapping("/book/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deletedBook(@PathVariable(value="id") long id){
		bookRepository.deleteById(id);
	}
	
	@PutMapping("/book")
	public ResponseEntity<Book> updatedBook(@RequestBody Book book){
		try {
			Book bookUpdate = bookRepository.save(book);
			return ResponseEntity.status(HttpStatus.OK).body(bookUpdate); 
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping("/book/search")
	public ResponseEntity<List<Book>> findBookByName(@RequestParam(required = false, defaultValue = "%") String name){
		List<Book> book = bookRepository.findAllBooksQuery(name);
		return ResponseEntity.status(HttpStatus.OK).body(book); 
	}
	
	@PatchMapping("/book/valid/{id}")
	public Book updateBookValid(@PathVariable(value="id") long id){
		Book book = bookRepository.findById(id);
		book.setValid(!book.isValid());
		bookRepository.save(book);
		return book;
	}
}