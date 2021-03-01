import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { CrudService } from '../crud.service';
import { Testimony } from '../models/app-user';
import { PostService } from '../post.service';
import { TestimonyService } from '../testimony.service';

@Component({
  selector: 'app-admin-testimonies',
  templateUrl: './admin-testimonies.component.html',
  styleUrls: ['./admin-testimonies.component.css']
})
export class AdminTestimoniesComponent implements OnInit {
 
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
    'sName': [
      { type: 'required', message: 'Title is required.' }
    ],
    'description': [
      { type: 'required', message: 'Description is required.' }
    ],
  
  };
 
  constructor(public authService: AuthService,private afAuth:AngularFireAuth,  private router: Router,
    private fb: FormBuilder,
    private acrud:TestimonyService,private postService:PostService, public auth:AuthService) {

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
    this.postService.getdata2(this.selectedFile)
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);

    }
    this.postService.uploadFile2()
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
    description: ['', [Validators.required, Validators.minLength(5)]],
    sName: ['', Validators.required],
    privacy: ["true"],


});
}
onSubmit(value: Testimony) {

  this.isloading = true;

  if (this.exampleForm.value.privacy == "true") {
    this.postService.createTestimony(value)
  this.acrud.createTestimony(value)
  this.exampleForm.reset();
  this.isloading = false;
}
else {
  this.postService.createTestimony(value)
    .then(
      res => {
        this.exampleForm.reset();
      })
    .catch(err => {
      this.error = err
      console.log("err" + err)
    })
  }
}}

