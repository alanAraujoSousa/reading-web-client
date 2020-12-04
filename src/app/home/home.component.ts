import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user: any = {
    name: "Alan",
    id: 0,
    login: "Alan",
    friendsCount: 50,
    reviewsCount: 100,
    booksCount: 80
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  addBook(): void {
    this.router.navigateByUrl('/add-book');
  }
}
