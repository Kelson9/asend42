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
// import { UserService } from './user.service';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { AdminAuthGuard as AdminAuthGuard } from './admin-auth-guard.service';
import { PostService } from './post.service';
import { PostFormComponent } from './post-form/post-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminTestimoniesComponent } from './admin-testimonies/admin-testimonies.component';
import { AllpostsComponent } from './allposts/allposts.component';
import { AngularFireStorageModule} from "@angular/fire/storage";
import { CrudService } from './crud.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PostformDetailsComponent } from './postform-details/postform-details.component';
import { NgxGlideModule } from 'ngx-glide';
import { AboutComponent } from './about/about.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { SwiperModule } from 'swiper/angular';
import { SpinnerComponent } from './spinner/spinner.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';



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
    PostformDetailsComponent,
    AboutComponent,
    SpinnerComponent,
    NewsletterComponent,
    AdminNewsComponent,
  
    
    
  ],
  imports: [
    BrowserModule,
    CommonModule, 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxGlideModule,
    MatCarouselModule.forRoot(),
    NgxSpinnerModule,
    ToastrModule.forRoot()
  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthService,AuthGuard,PostService,UserService,CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
