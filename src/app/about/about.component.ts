import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  navbarOpen=false;
  constructor(public auth: AuthService,private afAuth:AngularFireAuth,  private acrud: CrudService,
    private router: Router) {
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
  

  ngOnInit(): void {
  }

}
