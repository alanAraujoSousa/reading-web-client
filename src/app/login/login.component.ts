import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    password: new FormControl('', Validators.required),
    login: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit(): void {
    
    const login = this.loginForm.value['login'];
    const password = this.loginForm.value['password'];
    
    this.authService.login(login, password).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser({login: login});
        this.router.navigateByUrl('/home');
      },
      err => {
        
      }
    );
  }

}
