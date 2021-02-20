import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { AdminTestimoniesComponent } from './admin-testimonies/admin-testimonies.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AllpostsComponent } from './allposts/allposts.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostsComponent } from './posts/posts.component';
 
const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  { 
    path: 'posts',
    component: PostsComponent,canActivate:[AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdmindashboardComponent,canActivate:[AuthGuard]
  },
  {
    path: 'postform',
    component: PostFormComponent
  },
  {
    path: 'adminT',
    component:AdminTestimoniesComponent
  },
  {
    path: 'allPosts',
    component:AllpostsComponent
  },



]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
