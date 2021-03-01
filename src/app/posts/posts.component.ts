import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UPost } from '../../../src/app/models/UPost'
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  isAuthenticated = false;

  isloading: boolean
  isprofileset
  isimgloading: boolean
  exampleForm: FormGroup;
  values = ['Celebrating', 'Inspiring', 'Motivating', 'Mentoring', 'Teaching', 'Studying', 'Educational', 'Excited', 'Other'];
  selected = 'Celebrating'
  imageSrc: string | ArrayBuffer;
  downloadURL: string;
  selectedFile: any;
  uploadPercent: Observable<number>;
  isloggedin: boolean = false;
  privacy: string
  username: any;
  uid: any;
  error: any;
  onChange(value) {

    this.selected = value;

  }

  validation_messages = {
    'title': [
      { type: 'required', message: 'Title is required.' }
    ],
    'desc': [
      { type: 'required', message: 'Description is required.' }
    ],
    'category': [
      { type: 'required', message: 'Category is required.' },
    ],
    'name': [
      { type: 'required', message: 'Name is required.' },
    ]
  };
 
  constructor(public authService: AuthService,private afAuth:AngularFireAuth,  private router: Router,
    private fb: FormBuilder,
    private acrud: CrudService,private postService:PostService, public auth:AuthService) {

  }
  logout(){

    this.afAuth.auth.signOut();
  }
 
  navbarOpen = false; 

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

//   save(post){
// this.postService.create(post);
// this.router.navigate(['/postform']);

//   }

  login(){
    this.auth.login();
  }


  
  detectFiles(event) {
    this.isimgloading = true
    this.selectedFile = event.target.files[0];
    if (this.selectedFile.type.split('/')[0] !== 'image') {
      return alert('Pleas select an Image file');
    }
    this.postService.getdata(this.selectedFile)
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);

    }
    this.postService.uploadFile()
    this.uploadPercent = this.postService.uploadPercent;
    this.postService.downloadurlchange.subscribe((data: string) => {
      this.downloadURL = data

      this.isimgloading = false
    },
      err => {
        this.error = err
        console.log(err.message)
      })


  }

  ngOnInit() {
    this.createForm();


}


createForm() {
  this.exampleForm = this.fb.group({
    imgurl: ['', Validators.required],
    title: ['', Validators.required],
    desc: ['', [Validators.required, Validators.minLength(5)]],
    category: [this.selected, Validators.required],
    subcategory: ['  ', Validators.required],
    name: ['ASEND', Validators.required],
    privacy: ["true"],


});
}
onSubmit(value: UPost) {

  this.isloading = true;

  if (this.exampleForm.value.privacy == "true") {
    this.postService.createUser(value)
  this.acrud.createPost(value)
  this.exampleForm.reset();
  this.isloading = false;
}
else {
  this.postService.createUser(value)
    .then(
      res => {
        this.exampleForm.reset();
      })
    .catch(err => {
      this.error = err
      console.log("err" + err)
    })
  }
}
}