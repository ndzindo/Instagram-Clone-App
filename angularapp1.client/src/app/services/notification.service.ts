import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Notification {
  message: string;
  createdAt: Date;
  isRead: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:5000/api/notification';

  constructor(private http: HttpClient) {}

  getNotifications(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/${userId}`);
  }

  markAsRead(userId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${userId}/mark-as-read`, {});
  }

  getUserInfo(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/user/info/${id}`);
  }
}
