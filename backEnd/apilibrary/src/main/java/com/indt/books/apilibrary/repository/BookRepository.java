package com.indt.books.apilibrary.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.indt.books.apilibrary.models.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
	
	Book findById(long id);
	
	@Query(value = "select * from tb_book item" + 
			" where item.name like %:name%" +
			" order by item.name asc", nativeQuery = true)
	public List<Book> findAllBooksQuery(@Param("name") String name);
}
