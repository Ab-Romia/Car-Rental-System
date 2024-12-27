import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiService) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.api.post('auth/login', credentials);
  }

  register(userDetails: any): Observable<any> {
    return this.api.post('auth/register', userDetails);
  }
}
