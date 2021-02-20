import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
posts$;
  constructor(private post:PostService,private router:Router) {
     this.posts$=this.post.getAll();

   }

  ngOnInit(): void {

  }



}
