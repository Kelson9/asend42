import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { PostsComponent } from './posts/posts.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthGuard as AuthGuard } from './auth/auth-guard.service';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { UserService } from './user.service';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { AdminAuthGuard as AdminAuthGuard } from './admin-auth-guard.service';
import { PostService } from './post.service';
import { PostFormComponent } from './post-form/post-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminTestimoniesComponent } from './admin-testimonies/admin-testimonies.component';
import { AllpostsComponent } from './allposts/allposts.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PostsComponent,
    HomeComponent,
    LoginComponent,
    AdmindashboardComponent,
    PostFormComponent,
    AdminTestimoniesComponent,
    AllpostsComponent,
  
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
  
  ],
  providers: [AuthService,AuthGuard,UserService,AdminAuthGuard,PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
