import { Component, OnInit } from '@angular/core';
import { NewsFeedService } from '../services/news-feed.service';
import { CommentService } from '../services/comment.service';
import { LikeService } from '../services/like.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  posts: any[] = [];
  currentPage: number = 1;
  pageSize: number = 3; 
  totalPosts: number = 0;
  newComment: string = '';
  private storageKey = 'loggedInUserId';
  constructor(
    private newsFeedService: NewsFeedService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadPosts(this.currentPage, this.pageSize);
  }

  loadPosts(page: number, pageSize: number): void {
    this.newsFeedService.getPosts(page, pageSize).subscribe(data => {
      this.posts = data.posts;
      this.totalPosts = data.totalPosts;
    });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPosts(this.currentPage, this.pageSize);
    }
  }

  nextPage(): void {
    if (this.currentPage * this.pageSize < this.totalPosts) {
      this.currentPage++;
      this.loadPosts(this.currentPage, this.pageSize);
    }
  }

  
getLoggedInUserId(): number {
  const storedUserId = localStorage.getItem(this.storageKey);
  if (storedUserId) {
    return parseInt(storedUserId, 10);
  } else {
    return 1;
  }
}

setLoggedInUserId(userId: number): void {
  localStorage.setItem(this.storageKey, String(userId));
}

removeLoggedInUserId(): void {
  localStorage.removeItem(this.storageKey);
}

likePost(postId: number): void {
  const userId = this.authService.getUserIdFromToken();
  if (userId) {
    this.newsFeedService.likePost({ postId, userId }).subscribe(response => {
      
      const post = this.posts.find(p => p.id === postId);
      if (post) {
        post.numberOfLikes = response.numberOfLikes; 
      }
      console.log('Post liked successfully', response);
    });
  } else {
    console.error('User ID not found');
  }
}


addComment(postId: number): void {
  const userId = this.authService.getUserIdFromToken();

  if (userId && this.newComment) {
    
    this.authService.getUsernameById(userId).subscribe(username => {
      const commentData = {
        postId,
        userId,
        content: this.newComment,
        username 
      };

      this.newsFeedService.addComment(commentData).subscribe(response => {
        console.log('Comment added successfully', response);
        this.newComment = ''; 
      }, error => {
        console.error('Failed to add comment', error);
      });
    });
  } else {
    console.error('User ID not found or comment is empty');
  }
}

}
