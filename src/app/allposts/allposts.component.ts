import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-allposts',
  templateUrl: './allposts.component.html',
  styleUrls: ['./allposts.component.css']
})
export class AllpostsComponent implements OnInit {
  posts$;
   navbarOpen = false;
   constructor(public auth: AuthService,private afAuth:AngularFireAuth,private post:PostService) {
    this.posts$=this.post.getAll();
      }
  ngOnInit(): void {
  }
  login(){
    this.auth.login();
  }
  logout(){

    this.afAuth.auth.signOut();
  }
  
  
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
