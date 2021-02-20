import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-admin-testimonies',
  templateUrl: './admin-testimonies.component.html',
  styleUrls: ['./admin-testimonies.component.css']
})
export class AdminTestimoniesComponent implements OnInit {
  navbarOpen = false;

  constructor(public authService: AuthService,private afAuth:AngularFireAuth,private postService:PostService, public auth:AuthService,private router:Router) {}

  ngOnInit(): void {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  save(post){
    this.postService.create(post);
    this.router.navigate(['/postform']);
    
      }
      logout(){

        this.afAuth.auth.signOut();
      }

}
