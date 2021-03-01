import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CrudService } from '../crud.service';
import { NgForm } from '@angular/forms';
import Glide, { Controls, Breakpoints } from '@glidejs/glide/dist/glide.modular.esm'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  navbarOpen = false;
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  isPorfileset: boolean = false;
  constructor(public auth: AuthService,private afAuth:AngularFireAuth) {
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


  ngOnInit() {
  
  }



  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  

  // onSubmit(form: NgForm) {
  //   if (!form.valid) {
  //     return;
  //   }
  //   const email = form.value.email;
  //   const password = form.value.password;
  //   this.isLoading = true;
  //   if (this.isLoginMode) {


  //     this.auth.SignIn(email, password)
  //       .then(d => {
  //         this.isLoading = false
  //         this.auth.LoginData.subscribe(x => {

  //           // if (x.user.emailVerified) {
  //           //   this.getProfileByUid(x.user.uid)
  //           // }
  //         })

  //       })
  //       .catch(e => {
  //         this.isLoading = false
  //         this.error = e.message
  //       })

  //   } else {

  //     this.auth.SignUp(email, password).then(d => {

  //       this.isLoading = false
  //       this.auth.logout1()
  //     })
  //       .catch(e => {
  //         this.auth.logout()
  //         this.isLoading = false
  //         this.error = e
  //       })

  //   }


  //   form.reset();
  // }

 
}

