// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '/home/mohab/Desktop/Term7/DB/DB Finale/Car-Rental-System/car-rental-frontend/src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => console.log('Login successful', response),
      error: (err) => console.error('Login failed', err),
    });
  }
}
