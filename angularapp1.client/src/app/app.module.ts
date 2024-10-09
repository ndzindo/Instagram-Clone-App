import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { ProfileComponent } from './profile/profile.component';
import { LayoutComponent } from './layout/layout.component';
import { SearchComponent } from './search/search.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { NewsFeedService } from './services/news-feed.service';
import { CommentService } from './services/comment.service';
import { LikeService } from './services/like.service';
import { AddPostComponent } from './add-post/add-post.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NewsFeedComponent,
    ProfileComponent,
    LayoutComponent,
    SearchComponent,
    CommentFormComponent,
    CommentListComponent,
    AddPostComponent,
    UserProfileComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,FormsModule,
    AppRoutingModule,ReactiveFormsModule
  ],
  providers: [provideHttpClient(), provideAnimationsAsync('noop'), NewsFeedService, CommentService, LikeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
