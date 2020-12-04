import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BookService } from '../_services/book.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  createBookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    pages: new FormControl('', Validators.required),
    startReadingDate: new FormControl(''),
    endReadingDate: new FormControl(''),
    currentPage: new FormControl(''),
    currentRating: new FormControl(''),
    finalRating: new FormControl(''),
    reviewTitle: new FormControl(''),
    reviewContent: new FormControl('')
  });

  ler: boolean;
  lendo: boolean;
  lido: boolean = true;

  constructor(private bookService: BookService, public router: Router) { }

  items: MenuItem[];
  home: MenuItem;
  manualBookForm: boolean = false;

  book: any;
  bookSelected: any;

  results: string[];
  
  ngOnInit() {
      this.items = [
          {label: 'Meus livros'},
          {label: 'Adicionar livro'}
      ];
      
    this.home = {icon: 'pi pi-home', routerLink: '/home'};
  }

  selectBook(event) {
    console.log(event);
    this.bookSelected = event;
  }

  // go horse on
  setLido() {
    this.lido = true;
    this.lendo = false;
    this.ler = false;
  }

  setLendo() {
    this.lido = false;
    this.lendo = true;
    this.ler = false;
  }

  setParaLer() {
    this.lido = false;
    this.lendo = false;
    this.ler = true;
  }

  search(event) {
      this.bookService.fetchOnGoogleBookAPI(event.query).subscribe(data => {
          this.results = data.items.map(d => {
            let info = d.volumeInfo;
            let pages = 1;
            if (info.pageCount) {
              pages = info.pageCount;
            }
            let img = null;
            if (info.imageLinks) {
              img = info.imageLinks.thumbnail;
            }
            let author = "Unknown author";
            if (info.authors) {
              author = info.authors.join(", ");
            }
            let year = "";
            let publishedDate = d.volumeInfo.publishedDate;
            if (publishedDate && publishedDate.length > 3) {
              year = d.volumeInfo.publishedDate.substring(0,4);
            }
            
            return { title: info.title, author: author, year: year, img: img, pages: pages };
          });
      });
  }

  showManualBookForm(): boolean {
    this.manualBookForm = !this.manualBookForm;
    return this.manualBookForm;
  }

  criarLivroAutomatico(event): void {
    this.bookService.register(this.bookSelected).subscribe(
      data => {
        this.router.navigateByUrl('/home');
      },
      err => {
      }
    );
  }

}
