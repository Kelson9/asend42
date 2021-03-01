import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from '../auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.css']
})
export class AdminNewsComponent implements OnInit {
navbarOpen=false;
  posts$;
  constructor(private post:PostService,private auth:AuthService,private afAuth:AngularFireAuth,private router:Router,private spinner:NgxSpinnerService) {
     this.posts$=this.post.getAll();

   }
  ngOnInit() {
    this.spinner.show();
 
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  login(){
    this.auth.login();
  }
  logout(){

    this.afAuth.auth.signOut();
  }

}
