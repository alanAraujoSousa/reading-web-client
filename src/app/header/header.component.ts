import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  login: string;

  constructor(private tokenStorageService: TokenStorageService, public router: Router) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return !!this.tokenStorageService.getToken();
  }

  goToLogin(): void {
    this.router.navigateByUrl('/login');
  }

  goToSignup(): void {
    this.router.navigateByUrl('/signup');
  }

  goToHome(): void {
    this.router.navigateByUrl('/home');
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
