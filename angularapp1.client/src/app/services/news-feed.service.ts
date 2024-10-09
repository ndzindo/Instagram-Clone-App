import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {
  private apiUrl = 'http://localhost:5000/api/posts';

  constructor(private http: HttpClient) {}

  getPosts(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
  }
  likePost(likePayload: { postId: number; userId: number }): Observable<any> {
    return this.http.post('http://localhost:5000/api/like', likePayload);
  }
  

  addComment(commentData: any): Observable<any> {
    return this.http.post('http://localhost:5000/api/comment', commentData);
  }
  
  
}
