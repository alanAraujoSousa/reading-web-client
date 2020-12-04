import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BookService } from '../_services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  constructor(private bookService: BookService) { }

  items: MenuItem[];
  home: MenuItem;
  manualBookForm: boolean = false;

  text: string;
  results: string[];
  
  ngOnInit() {
      this.items = [
          {label: 'Meus livros'},
          {label: 'Adicionar livro'}
      ];
      
    this.home = {icon: 'pi pi-home', routerLink: '/home'};
  }

  search(event) {
      this.bookService.fetchOnGoogleBookAPI(event.query).subscribe(data => {
          data = data.map(d => d.volumeInfo.title);
          this.results = data;
      });
  }

  showManualBookForm(): boolean {
    this.manualBookForm = !this.manualBookForm;
    return this.manualBookForm;
  }

}
