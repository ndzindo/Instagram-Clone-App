import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode'; 
import { LoginResponse } from '../models/login-response.model';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; 
  private tokenKey = 'authToken';
  private storageKey = 'loggedInUserId';

  constructor(private http: HttpClient, private router: Router) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }


  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: LoginResponse) => {
        if (response && response.token) {
          this.setToken(response.token);
        }
      })
    );
  }
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.exp > Date.now() / 1000;
      } catch (e) {
        return false;
      }
    }
    return false;
  }


  getUserIdFromToken(): number  {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return parseInt(decodedToken.nameid); 
      } catch (e) {
        console.error('Invalid token', e);
        return 0;
      }
    }
    return 0;
  }

  getLoggedInUserId(): number {
    const storedUserId = localStorage.getItem(this.storageKey);
    if (storedUserId) {
      return parseInt(storedUserId, 10);
    } else {
      return 1;
    }
  }

  getUsernameById(userId: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/username/${userId}`);
  }
  
}
