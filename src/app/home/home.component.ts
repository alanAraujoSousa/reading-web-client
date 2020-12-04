import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user: any = {
    name: "",
    reviewsCount: "",
    friendsCount: "",
    booksCount: "",
    books: []
  };

  public booksReading: any = [];
  public booksReaded: any = [];
  public booksToRead: any = [];


  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      data => {
        this.user = data;
        if (data.books) {
          this.user.booksCount = data.books.length;

          let friendsCount = 0;
          let reviewsCount = 0;

          data.books.forEach(b => {
            friendsCount += (b.readers - 1);
            if (b.reviewContent) {
              reviewsCount++;
            }

            if (b.currentPage) {
              b.progress = ((b.currentPage * 100)/b.pages)  
            }

            if (b.endReadingDate) {
              this.booksReaded.push(b);
            } else {
              if (b.startReadingDate) {
                this.booksReading.push(b);
              } else {
                this.booksToRead.push(b);
              }
            }

          });
          this.user.friendsCount = friendsCount;
          this.user.reviewsCount = reviewsCount;
        }

      },
      err => {
        
      }
    );
  }

  addBook(): void {
    this.router.navigateByUrl('/add-book');
  }

  criarResenha(book): void {

  }
}
