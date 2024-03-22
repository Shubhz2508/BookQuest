//JSON data which you have provided from https://openlibrary.org/people/mekBot/books/already-read.json is INVALID,
//Hence I have used dummy data for 20 books to perform our operations

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchQuery: string = '';
  books: any[] = [];
  filteredBooks: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.books = this.generateDummyBooks(20);
    this.filteredBooks = this.books; 
  }

  generateDummyBooks(count: number): any[] {
    const books = [];
    for (let i = 0; i < count; i++) {
      //we are generating random title, author and year
      const title = this.generateRandomTitle();
      const author = this.generateRandomAuthor();
      const publishedYear = this.generateRandomYear(1900, 2024); 
      const coverId = i + 1;
      const read = false;

      const book = {
        title,
        author,
        publishedYear,
        coverId,
        read
      };
      books.push(book);
    }
    return books;
  }

  generateRandomTitle(): string {
    const adjectives = ['The', 'A', 'An', 'My', 'Your', 'Our', 'His', 'Her'];
    const nouns = ['Adventure', 'Mystery', 'Journey', 'Discovery', 'Secret', 'Legacy', 'Quest', 'Escape'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective} ${randomNoun}`;
  }

  generateRandomAuthor(): string {
    const firstNames = ['John', 'Emily', 'David', 'Emma', 'Michael', 'Olivia', 'Daniel', 'Sophia'];
    const lastNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White'];
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${randomFirstName} ${randomLastName}`;
  }

  generateRandomYear(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  searchBooks() {
    if (this.searchQuery.trim() !== '') {
      this.filteredBooks = this.books.filter(book =>
        book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredBooks = this.books;
    }
  }

  toggleReadStatus(book: any) {
    book.read = !book.read;
  }
}
