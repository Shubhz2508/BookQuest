import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private http: HttpClient) { }

  searchBooks() {
    if (this.searchQuery.trim() !== '') {
      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(this.searchQuery)}&fields=key,title,author_name,editions,key,editions.title,editions.language,editions.ebook_access`;
      this.http.get<any>(url)
        .subscribe((response: any) => {
          if (response && response.docs) {
            this.searchResults = response.docs.map((doc: any) => {
              // Extract work information
              const work = {
                title: doc.title,
                author: doc.author_name ? doc.author_name.join(', ') : 'Unknown',
                editions: []
              };
  
              // Extract edition information if available
              if (doc.editions && doc.editions.docs && doc.editions.docs.length > 0) {
                work.editions = doc.editions.docs.map((edition: any) => ({
                  title: edition.title,
                  language: edition.language ? edition.language.join(', ') : 'Unknown',
                  ebook_access: edition.ebook_access || 'Unknown'
                }));
              }
  
              return work;
            });
          } else {
            this.searchResults = [];
          }
        });
    } else {
      this.searchResults = [];
    }
  }

  toggleReadStatus(book: any) {
    book.read = !book.read;
  }
}
