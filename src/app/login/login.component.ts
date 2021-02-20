import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  navbarOpen = false;
  constructor(public auth: AuthService,private afAuth:AngularFireAuth) {
     }
  
    ngOnInit() {

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


