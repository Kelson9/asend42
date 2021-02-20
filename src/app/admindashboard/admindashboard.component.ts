import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
navbarOpen=false;
  constructor(public auth:AuthService,private afAuth:AngularFireAuth) { }

  ngOnInit(): void {
  }

 

  logout(){

    this.afAuth.auth.signOut();
  }

}
