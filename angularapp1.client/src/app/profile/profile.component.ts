
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {}; 
  profilePictureUrl: string = ''; 
  isDarkTheme: boolean = false;
  notificationsEnabled: boolean = false;
  lastThreePosts: any[] = [];

  constructor(private profileService: ProfileService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadLastThreePosts();
  }
  loadUserData(): void {
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.profileService.getProfile(userId).subscribe(
        (response: any) => {
          this.user = response;
          this.profilePictureUrl = this.user.profilePictureUrl;
          this.isDarkTheme = this.user.isDarkTheme;
          this.notificationsEnabled = this.user.notificationsEnabled;
        },
        (error) => {
          console.error('Failed to load profile', error);
        }
      );
    }
  }
  applyTheme(isDarkTheme: boolean): void {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }}

    updateProfile(): void {
      const userId = this.authService.getUserIdFromToken();
      if (userId) {
        const profileUpdate = {
          profilePictureUrl: this.profilePictureUrl,
          isDarkTheme: this.isDarkTheme,
          notificationsEnabled: this.notificationsEnabled
        };
        this.profileService.updateProfile(userId, profileUpdate).subscribe(() => {
          this.applyTheme(this.isDarkTheme);
        });
      }
    }
  loadLastThreePosts(): void {
    const userId = this.authService.getUserIdFromToken();

    if (userId) {
      this.profileService.getLastThreePosts(userId).subscribe(
        (posts: any[]) => {
          this.lastThreePosts = posts;
        },
        (error) => {
          console.error('Failed to load last three posts:', error);
        }
      );
    }
  }
}
