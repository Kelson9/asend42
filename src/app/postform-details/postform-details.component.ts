import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CrudService } from '../../app/crud.service';
import { UPost, LikeUser } from '../models/UPost';

import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { PostService } from '../post.service';


@Component({
  selector: 'app-postform-details',
  templateUrl: './postform-details.component.html',
  styleUrls: ['./postform-details.component.css']
})
export class PostformDetailsComponent implements OnInit {

  
  CommentForm: FormGroup;

  id: number;
  unauthpostss: UPost[];

  private userSub: Subscription;
  post_userid: string

  count: number = 0
  SinglePost: any
  private puSub: Subscription;
  private prSub: Subscription
  private allSub: Subscription;

  allPost: UPost[];
  public_post: UPost[]
  private_post: UPost[];
  isFetching = false;
  isAll = true;
  isPublic = false;
  isPrivate = false;
  isUnauth = false
  error: string
  errorkey: string


  href
  xyz
  LikeData: any;
  isAuthenticated: boolean;
  currentUserId: string;
  likeStatus: any;
  postype: any;
  Comment_Data: any[];
  unauthpost: UPost;
  postDate: any;
  ProfileImgUrl: string
  isImgLoaded: boolean = false;
  username: string;
  profileuname: any;
  publicpostOfSingleUser: any;
  isPublicPostOfSingleUser: boolean;
  posttitle: string;
  postdesc: string;
  showComment: boolean = false


  /*   LikeData: {count:number,uid:{islike:boolean,uid:string}}; */
  constructor(private route: ActivatedRoute,
    private router: Router,
    private cd: PostService,
    public acrud: CrudService,
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }


  ngOnInit() {




    this.href = this.router.url;
    this.xyz = this.href.split("/")
    this.id = this.xyz[2]
    this.route.params
      .subscribe(
        (params: Params) => {

          this.id = +params['id'];

          this.postype = params['type']


          if (this.xyz[1] == "myposts") {
            this.getAllPost();
            this.showComment = true
          }

          if (this.xyz[1] == "featured") {
            this.getFeaturedPost()
            this.showComment = true
          }
          if (this.postype === 'allpost') {
            this.getAllPost();

          }

          if (this.postype === 'public') {
            this.acrud.getDemo2()
            this.showComment = true
          }

          if (this.postype === 'private') {
            this.acrud.getDemo1();
            this.showComment = false
          }
          if (this.xyz[3] === 'publicposts') {
            this.profileuname = this.xyz[2]
            this.showComment = true
          }
        })


    this.userSub = this.authService.user.subscribe(user => {
      if (user) {
        this.currentUserId = user.uid
      }
      this.isAuthenticated = !!user;
    })


    this.getLikeCountandStatus()
  }

  
  getLikeCountandStatus() {
    this.acrud.PostDataForLikeCount.subscribe(d => {
      if (d) {
        this.count = d

      }


    })
    this.acrud.PostDataForLikedByUser.subscribe(d => {
      let x = this.acrud.seprate(d)

      for (const i in x) {
        if ((x[i].uid) == this.currentUserId) {
          this.likeStatus = x[i].islike

        }
      }

    })
  }


  getFeaturedPost() {
    this.isFetching = true


    this.acrud.getFeaturedPost().then((d: any) => {


      this.publicpostOfSingleUser = d[this.id]
        d => {
          let x = this.acrud.seprate(d)
          this.ProfileImgUrl = x[0]?.imgurl

        }
    
      let id = this.id
      this.posttitle = this.publicpostOfSingleUser.title
      this.postdesc = this.publicpostOfSingleUser.desc
      this.post_userid = this.publicpostOfSingleUser.uid
      this.acrud.getPostDetailForLike(this.post_userid, this.posttitle, this.postdesc)

      this.isFetching = false
    })
  }

  getAllPost() {
    this.isUnauth = true
    this.isFetching = true;
    this.acrud.getAllPost().then((x: any) => {
      this.isFetching = false


      this.unauthpost = x[this.id]




        this.posttitle = this.unauthpost?.title
        this.postdesc = this.unauthpost?.desc

        // this.postDate = this.unauthpost.created_date

        this.acrud.getPostDetailForLike(this.post_userid, this.posttitle, this.postdesc)
      })



  }


  sortDesecendingByDate(data) {
    return data.sort((a: any, b: any) =>
      <any>new Date(b.created_date) - <any>new Date(a.created_date)
    )
  }

  

  }


   
  
          