import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:5000/api/comment';

  constructor(private http: HttpClient) {}

  postComment(comment: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, comment);
  }

  getCommentsByPostId(postId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/post/${postId}`);
  }
}
