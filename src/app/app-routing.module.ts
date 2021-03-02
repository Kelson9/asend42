import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { AdminTestimoniesComponent } from './admin-testimonies/admin-testimonies.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AllpostsComponent } from './allposts/allposts.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostformDetailsComponent } from './postform-details/postform-details.component';
import { PostsComponent } from './posts/posts.component';
 
const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  { 
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdmindashboardComponent
  },

  {
    path: 'adminT',
    component:AdminTestimoniesComponent
  },
  {
    path: 'allPosts',
    component:AllpostsComponent
  },
  {
    path: 'about',
    component:AboutComponent
  },
  { path: 'myposts', redirectTo: 'myposts/allpost', pathMatch: 'full'},

  { path: 'myposts/:type', component: PostFormComponent},
  { path: 'myposts', redirectTo: 'myposts/allpost', pathMatch: 'full' },
  { path: 'myposts/:type/:id', component:PostformDetailsComponent},
  { path: 'news', component:NewsletterComponent},
  { path: 'adminNews', component:AdminNewsComponent,},




]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
