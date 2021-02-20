import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(public authService: AuthService,private afAuth:AngularFireAuth,private postService:PostService, public auth:AuthService,private router:Router) {
    afAuth.authState.subscribe(x=>console.log(x));

  }
  logout(){

    this.afAuth.auth.signOut();
  }
  ngOnInit(): void {
  }
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  save(post){
this.postService.create(post);
this.router.navigate(['/postform']);

  }

  login(){
    this.auth.login();
  }
}
