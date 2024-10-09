import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './profile/profile.component';
import { NewsFeedComponent } from './news-feed/news-feed.component'; 
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; 
import { AuthGuard } from './guards/auth.guard';
import { SearchComponent } from './search/search.component';
import { AddPostComponent } from './add-post/add-post.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard], 
    children: [
      { path: '', redirectTo: '/news-feed', pathMatch: 'full' },
      { path: 'search', component: SearchComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'news-feed', component: NewsFeedComponent },
      { path: 'add-post', component: AddPostComponent }, 
      { path: 'user-profile/:id', component: UserProfileComponent },
      { path: 'my-profile', component: ProfileComponent},
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
