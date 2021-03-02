import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service';

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';
import { BehaviorSubject } from 'rxjs';
import { Testimony, UPost } from '../models/app-user';
import { CrudService } from '../crud.service';
import { TestimonyService } from '../testimony.service';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
isOpen=false;
isOpen1=false; 
slides = [ {'image': '../../assets/1.jpg'},{'image': '../../assets/team1.jpg'}, {'image': '../../assets/youths1.jpg'}, {'image': '../../assets/youths2.jpg'},{'image':'../../assets/2.jpg'}, {'image':'../../assets/3.jpg'}, {'image':'../../assets/4.jpg'},   ];
navbarOpen=false;
  
    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    allpost: Testimony[];
    isFetching = true;
    isAll = false;

    url
    href: string
    error: string
    count_all: number = 0;
    searchText;

  constructor(private afAuth:AngularFireAuth,public auth: AuthService,private acrud:TestimonyService) { 


  }

  

  ngOnInit(): void {

 this.acrud.getDemo1();
    this.acrud.getDemo2();
    
    this.getAllTestimony()
         

  }
  getAllTestimony() {
    this.isLoading$.next(true);
    this.isFetching = true
    this.isAll = true;
    this.acrud.getAllData2()
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

onSwiper(swiper) {
  console.log(swiper);
}
onSlideChange() {
  console.log('slide change');
}
}
