import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  private books: any[] = []; // Replace with actual database model

  create(createBookDto: CreateBookDto) {
    const newBook = { id: Date.now().toString(), ...createBookDto };
    this.books.push(newBook);
    return newBook;
  }

  findAll() {
    return this.books;
  }

  findOne(id: string) {
    const book = this.books.find(book => book.id === id);
    if (!book) {
      throw new NotFoundException(`Book with ID "${id}" not found`);
    }
    return book;
  }

  update(id: string, updateBookDto: CreateBookDto) {
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID "${id}" not found`);
    }
    this.books[bookIndex] = { ...this.books[bookIndex], ...updateBookDto };
    return this.books[bookIndex];
  }

  remove(id: string) {
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID "${id}" not found`);
    }
    this.books.splice(bookIndex, 1);
    return { message: 'Book successfully deleted' };
  }
}
