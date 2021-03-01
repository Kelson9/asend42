import { Component, OnInit } from '@angular/core';
import { UPost } from '../models/UPost';
import { CrudService } from '../crud.service';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit{
  navbarOpen=false;
  
    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    allpost: UPost[];
    isFetching = true;
    isAll = false;

    url
    href: string
    error: string
    count_all: number = 0;
    searchText;
  
    constructor(public acrud: CrudService,
      public auth: AuthService,private afAuth:AngularFireAuth,private spinner:NgxSpinnerService) { }
      
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
  
      this.spinner.show();
 
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
   this.acrud.getDemo1();
      this.acrud.getDemo2();
      
      this.getAllPosts()
           
  
    }
    getAllPosts() {
      this.isLoading$.next(true);
      this.isFetching = true
      this.isAll = true;
      this.acrud.getAllData()
        .subscribe(data => {
          let x1 = data[0]
          let x2 = data[1]
          let x3 = []
          x3 = this.acrud.seprate(x1)
          let x4 = this.acrud.seprate(x2)
          this.allpost = x3.concat(x4)
          this.sortDesecendingByDate(this.allpost)
          this.count_all = this.allpost.length
          this.isLoading$.next(false);
          this.isFetching = false
  
  
        },
  
          err => {
            this.error = err
          })
    }
  
    sortDesecendingByDate(data) {
      return data.sort((a: any, b: any) =>
        <any>new Date(b.created_date) - <any>new Date(a.created_date)
      )
    }
  }
  