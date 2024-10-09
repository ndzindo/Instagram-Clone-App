import { Component, OnInit, Input } from '@angular/core';
import { NotificationService, Notification } from '../services/notification.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  //currentUserId = this.authService.getUserIdFromToken();
  notifications: Notification[] = [];
  unreadCount: number = 0;
  notificationsEnabled: boolean = false;
  showDropdown: boolean = false;
  constructor(private notificationService: NotificationService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserSettings();
  }

  loadUserSettings(): void {
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.notificationService.getUserInfo(userId).subscribe(user => {
        this.notificationsEnabled = user.notificationsEnabled;
        if (this.notificationsEnabled) {
          this.fetchNotifications();
        }
      });
    }
  }
  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown) {
      this.markNotificationsAsRead();
    }
  }
  fetchNotifications(): void {
    
    this.notificationService.getNotifications(this.authService.getUserIdFromToken()).subscribe(notifications => {
      this.notifications = notifications;
      this.unreadCount = notifications.length;
      setTimeout(() => this.unreadCount = 0, 30000); 
    });
  }

  markNotificationsAsRead(): void {
    const userId = this.authService.getUserIdFromToken();
    this.notificationService.markAsRead(this.authService.getUserIdFromToken()).subscribe(() => {
      this.unreadCount = 0;
    });
  }
}
