import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  updateUserProfile(userId: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}`, user);
  }

  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return parseInt(decodedToken.nameid); 
      } catch (e) {
        console.error('Invalid token', e);
        return null;
      }
    }
    return null;
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }
  searchUsersByUsername(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?username=${username}`);
  }

  getUserProfile(userId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/user/${userId}`);
  }

  searchUsers(username: string): Observable<any[]> {
    const params = new HttpParams().set('username', username);
    return this.http.get<any[]>(`http://localhost:5000/api/user/search`, { params });
  }
}
