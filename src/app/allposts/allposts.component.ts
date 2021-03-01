import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service';
import { PostService } from '../post.service';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { CrudService } from '../crud.service';
import { BehaviorSubject } from 'rxjs';
import { UPost } from '../models/app-user';
import SwiperCore, {
  Navigation,
  Pagination,Autoplay ,
  Scrollbar,
  A11y,
} from 'swiper/core';
import { NgxSpinnerService } from "ngx-spinner";


SwiperCore.use([Navigation, Pagination, Scrollbar,Autoplay, A11y]);


@Component({
  selector: 'app-allposts',
  templateUrl: './allposts.component.html',
  styleUrls: ['./allposts.component.css'] 
})
export class AllpostsComponent implements OnInit {
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
    public auth: AuthService,private afAuth:AngularFireAuth,private spinner: NgxSpinnerService,) { }
    
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

    onSwiper(swiper) {
      console.log(swiper);
    }
    onSlideChange() {
      console.log('slide change');
    }
}
