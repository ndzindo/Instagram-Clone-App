import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private apiUrl = 'http://localhost:5000/api/like'; 

  constructor(private http: HttpClient) { }

  likePost(likeDto: { postId: number, userId: number }): Observable<void> {
    return this.http.post<void>(this.apiUrl, likeDto);
  }
}
