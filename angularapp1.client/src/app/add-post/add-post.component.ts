import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  postDescription: string = '';
  postPictureUrl: string = '';

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSave() {
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      const newPost = {
        description: this.postDescription,
        postPictureUrl: this.postPictureUrl,
        userId: userId
      };

      this.postService.createPost(newPost).subscribe({
        next: () => {
          this.router.navigate(['/news-feed']);
        },
        error: (error) => {
          console.error('Error creating post', error);
        }
      });
    } else {
      console.error('User ID not found');
    }
  }

  onCancel() {
    this.router.navigate(['/news-feed']);
  }
}
