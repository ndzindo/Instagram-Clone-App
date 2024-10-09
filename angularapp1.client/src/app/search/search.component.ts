import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'; 

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  users: any[] = [];
  searchQuery: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.userService.searchUsers(this.searchQuery).subscribe(
        (data: any[]) => {
          this.users = data;
        },
        (error) => {
          console.error('Error searching users', error);
        }
      );
    }}

  viewUserProfile(userId: number): void {
    this.router.navigate(['/user-profile', userId]);
  }
}
