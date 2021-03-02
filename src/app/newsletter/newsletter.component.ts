import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {
  navbarOpen = false;
  constructor(public authService: AuthService,private afAuth:AngularFireAuth,private postService:PostService, public auth:AuthService,private router:Router) {}

  ngOnInit() {
 
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  save(post:NgForm){
   
    this.postService.create(post);
    post.reset();
    
      }
      logout(){

        this.afAuth.auth.signOut();
      }


}
