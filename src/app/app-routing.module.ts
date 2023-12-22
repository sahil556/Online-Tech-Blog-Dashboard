import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'', component:DashboardComponent, canActivate: [authGuard]},
  {path:'category', component:CategoryComponent, canActivate: [authGuard]},
  {path: 'posts', component:AllPostComponent, canActivate: [authGuard]}, 
  {path: 'posts/new', component:NewPostComponent, canActivate: [authGuard]},
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
