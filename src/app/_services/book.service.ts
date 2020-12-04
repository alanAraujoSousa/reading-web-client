import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../_models/book';

const API_URL = 'http://localhost:8089/api/v1/book/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  register(book: Book): Observable<any> {
    return this.http.post(API_URL, {
      book
    }, httpOptions);
  }

  fetchOnGoogleBookAPI(title: string): Observable<any> {
    return this.http.get("https://www.googleapis.com/books/v1/volumes?q=title=" + title 
      + "&key=AIzaSyCHYlie7a7R1YvXJ1MXsJzfUBsXzJPPsuE");
  }

}
