import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
isOpen=false;
isOpen1=false;
slideIndex = 0;

  constructor(private afAuth:AngularFireAuth,public auth: AuthService) { 


  }

  

  ngOnInit(): void {
    
setInterval(()=>{
this.next();
},10000)
  }

slideShow(n){
  var slides = document.getElementsByClassName('slide')
  for(var i=0;i<slides.length;i++){
    slides[i].classList.remove('active')
  }
  slides[n].classList.add('active')
}

prev(){
  var slides = document.getElementsByClassName('slide');
  if(this.slideIndex==0){
    this.slideIndex = slides.length - 1;
  }
  else{
    this.slideIndex = this.slideIndex - 1
  }

  this.slideShow(this.slideIndex)

}


next(){

  var slides = document.getElementsByClassName('slide');
  if(this.slideIndex==slides.length - 1){
    this.slideIndex = 0;
  }
  else{
    this.slideIndex = this.slideIndex + 1;
  }

  this.slideShow(this.slideIndex);




}


  navbarOpen = false;


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
more(){
  this.isOpen=!this.isOpen;
}
more1(){
  this.isOpen1=!this.isOpen1;
}

login(){
  this.auth.login();
}
logout(){

  this.afAuth.auth.signOut();
}
}
