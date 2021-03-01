import { Injectable } from '@angular/core';
import { UPost, LikeUser} from 'src/app/models/UPost';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../../src/app/post.service';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Testimony } from './models/app-user';


@Injectable({
  providedIn: 'root'
})
export class TestimonyService {

    postdata = {}
    uid: string
  
    d1 = []
    d2 = []
    d3 = []
    d4 = []
  
  url: string
    post_id
  
    list: any
    OthersUid = new BehaviorSubject<string>(null);
    pu = new BehaviorSubject<any>(null);
    pr = new BehaviorSubject<any>('');
    all = new BehaviorSubject<any>(this.d3);
    all3 = new BehaviorSubject<any>(this.d3);
    username = new BehaviorSubject<string>("");
    PostDataForLikeCount = new BehaviorSubject<number>(null);
    PostDataForLikedByUser = new BehaviorSubject<any>(null);
    db_key: string;
    firestorekey: string;
    x: Observable<{ sName: string; description: string;  imgurl: string;  privacy: string; }[]>;
    uname: any;
    id: any;
    commentData: { comment: string; commentOn: Date; commentByUserId: string; };
    acrud: any;
    featuredPost: any;
    featuredPostsorted: any[];
  
  
  
  
    constructor(private http: HttpClient,
  
      private ucrud: PostService,
      private afs: AngularFirestore,
      private router: Router, private toastr: ToastrService
     ) {
  
  
    }
   
    sortDesecending(Post) {
  
  
      Post.sort((a: any, b: any) =>
        b.created_date - a.created_date
      )
   
  
      return Post
    }
  
  
  
  
    createTestimony(value:Testimony) {
      this.postdata = {
       sName:value.sName,
       description:value.description,
        imgurl: this.ucrud.downloadURL,
        privacy: value.privacy,
  
      }
      if (value.privacy == "true") {
          this.http.post(
            `https://asend-185ba-default-rtdb.firebaseio.com/testimony/public.json`,
            this.postdata
          )
            .subscribe(responseData => {
  
            }
              , err => {
  
              });
  
  
      }
      else {
  
        this.http.post(
          `https://asend-185ba-default-rtdb.firebaseio.com/testimony/private.json`,
          this.postdata
        )
          .subscribe(responseData => {
  
            this.router.navigate(['/admin']);
          });
      }
    }
    getPublicTestimony(): Observable<Testimony[]> {
      return this.http.get<Testimony[]>(`https://asend-185ba-default-rtdb.firebaseio.com/testimony/public.json`)
  
    }
  
   
  
    getPrivateTestimony(): Observable<Testimony[]> {
      return this.http.get<Testimony[]>(`https://asend-185ba-default-rtdb.firebaseio.com/testimony/private.json`)
  
    }
  
    getAllData2() {
      let x = this.http.get<Testimony[]>(`https://asend-185ba-default-rtdb.firebaseio.com/testimony/public.json`)
      let y = this.http.get<Testimony[]>(`https://asend-185ba-default-rtdb.firebaseio.com/testimony/private.json`)
      return forkJoin(x, y)
  
  
    }
    seprate(x1) {
      let x3 = []
      for (const key in x1) {
  
        if (x1.hasOwnProperty(key)) {
          x3.push({ ...x1[key] });
        }
      }
      return x3
  
    }
  
    getDemo1() {
      this.http.get<Testimony[]>(`https://asend-185ba-default-rtdb.firebaseio.com/testimony/private.json`)
        .pipe(
          map(responseData => {
            const postsArray: Testimony[] = [];
            for (const key in responseData) {
  
              if (responseData.hasOwnProperty(key)) {
                postsArray.push({ ...responseData[key] });
              }
            }
            return postsArray;
          })
        )
        .subscribe(posts => {
          this.d1 = posts
  
          this.pr.next(posts)
          this.combine()
  
          return this.d1;
        });
    }
  
    getDemo2() {
      this.http.get<Testimony[]>(`https://asend-185ba-default-rtdb.firebaseio.com/testimony/public.json`)
        .pipe(
          map(responseData => {
            const postsArray: Testimony[] = [];
            for (const key in responseData) {
  
              if (responseData.hasOwnProperty(key)) {
                postsArray.push({ ...responseData[key] });
              }
            }
            return postsArray;
          })
        )
        .subscribe(posts => {
          this.pu.next(posts)
          this.d2 = posts
  
          this.combine()
  
          return this.d2;
        });
    }
  
    combine() {
      this.d3 = this.d2.concat(this.d1)
      this.all.next(this.d3)
    }
  
  
    update(id, value, formvalue, imgurl) {
  
  
      this.postdata = {
        title: formvalue.title,
        nameToSearch: formvalue.title.toLowerCase(),
        desc: formvalue.desc,
        category: formvalue.category,
        subcategory: formvalue.subcategory,
        name: formvalue.name,
        imgurl: imgurl,
        privacy: formvalue.privacy,
       
  
      }
  
    //   this.Comare_In_FireStore(value, formvalue)
  
    //   if (value.privacy == "true") {
    //     if (formvalue.privacy == "true") {
  
    //       let c = this.pb(id, value)
    //       this.Edit_Public_Post(this.postdata, c)
    //       this.EditInFireStore(this.postdata, value)
  
    //     }
    //     else {
  
    //       this.Create_Private_Post(this.postdata)
    //       let c = this.pb(id, value)
    //       this.deletePublicPost(this.postdata, c)
    //       this.deleteFromFireStore(value)
  
    //     }
    //   }
    //   else {
    //     if (formvalue.privacy == "false") {
    //       let c = this.getpr(value)
    //       this.Edit_Private_Post(this.postdata, c)
    //     }
    //     else {
    //       this.Create_Public_Post(this.postdata)
    //       let c = this.getpr(value)
    //       this.deletePrivatePost(this.postdata, c)
    //       this.CreateInFireStore(this.postdata)
  
    //     }
  
    //   }
    // }
  
    // EditInFireStore(postdata: {}, value) {
  
    //   this.x.subscribe((querySnapshot) => {
  
    //     for (const key in querySnapshot) {
  
    //       if (querySnapshot[key].title == value.title && querySnapshot[key].name == value.name) {
    //         this.firestorekey = querySnapshot[key].id
    //         this.afs.collection("normal-users").doc(this.firestorekey).update(postdata)
    //       }
  
    //     }
  
  
    //   });
  
    // }
    // CreateInFireStore(postdata: {}) {
    //   this.afs.collection("normal-users").add(postdata).then(
    //     r => {
  
    //     }).catch(e => {
    //     })
  
    // }
  
  
    // deleteFromFireStore(value) {
    //   this.x.subscribe((querySnapshot) => {
  
    //     for (const key in querySnapshot) {
  
    //       if (querySnapshot[key].title == value.title && querySnapshot[key].name == value.name) {
    //         this.firestorekey = querySnapshot[key].id
    //         this.afs.collection("normal-users").doc(this.firestorekey).delete()
    //       }
  
    //     }
    //   });
  
    // }
    // deletePublicPost(postdata: {}, c: Observable<void>) {
    //   c.subscribe(x => {
    //     this.http.delete(
    //       `https://asend-185ba-default-rtdb.firebaseio.com/post/public/${this.db_key}.json`)
    //       .subscribe(d => {
    //         this.router.navigate(['myposts']);
    //       })
    //   })
    // }
  
    // deletePrivatePost(postdata: {}, c: Observable<void>) {
    //   c.subscribe(x => {
    //     this.http.delete(
    //       `https://asend-185ba-default-rtdb.firebaseio.com/post/private/${this.db_key}.json`)
    //       .subscribe(d => {
  
    //         this.router.navigate(['myposts']);
    //       })
    //   })
    // }
  
    // Edit_Private_Post(postdata: {}, c) {
    //   c.subscribe(x => {
    //     this.http.patch(
    //       `https://asend-185ba-default-rtdb.firebaseio.com/post/private/${this.db_key}.json`, postdata)
    //       .subscribe(d => {
    //         this.router.navigate([`myposts/${this.url}/${this.post_id}`]);
    //         this.showSuccessEdit()
    //       })
    //   })
    // }
    // Edit_Public_Post(postdata: {}, c) {
    //   c.subscribe(x => {
    //     this.http.patch(
    //       `https://asend-185ba-default-rtdb.firebaseio.com/post/public/${this.db_key}.json`, postdata)
    //       .subscribe(d => {
    //         this.router.navigate([`myposts/${this.url}/${this.post_id}`]);
    //         this.showSuccessEdit()
    //       })
    //   })
  
    // }
    // Create_Private_Post(postdata: {}) {
    //   this.http.post(
    //     `https://asend-185ba-default-rtdb.firebaseio.com/post/private.json`,
    //     this.postdata
    //   )
    //     .subscribe(responseData => {
  
  
    //     });
    // }
  
    // Create_Public_Post(postdata: {}) {
    //   this.http.post(
    //     `https://asend-185ba-default-rtdb.firebaseio.com/post/public.json`,
    //     postdata
    //   )
    //     .subscribe(responseData => {
  
    //     });
    // }
  
    // Comare_In_FireStore(value, formvalue) {
    //   this.x = this.afs.collection("normal-users").snapshotChanges().pipe(map(actions => {
    //     return actions.map(a => {
    //       const data = a.payload.doc.data() as {};
    //       const id = a.payload.doc.id;
    //       return { id, ...data as UPost };
    //     });
    //   }))
    // }
  
    // pb(id, value) {
    //   return this.http.get<Testimony[]>(`https://asend-185ba-default-rtdb.firebaseio.com/post/public.json`)
    //     .pipe(
    //       map(responseData => {
  
    //         for (const key in responseData) {
    //           if (responseData[key].title == value.title) {
    //             this.db_key = key
  
    //           }
    //           else {
    //             console.log("no data  ")
    //           }
  
    //         }
  
    //       })
    //     )
    // }
  
    // getpr(value) {
    //   return this.http.get<Testimony[]>(`https://asend-185ba-default-rtdb.firebaseio.com/post/private.json`)
    //     .pipe(
    //       map(responseData => {
  
    //         for (const key in responseData) {
    //           if (responseData[key].title == value.title) {
    //             this.db_key = key
  
    //           }
    //           else {
    //             console.log("no data  ")
    //           }
  
    //         }
  
    //       })
    //     )
    // }
  
    // passParams(url: string, id: number) {
    //   this.url = url;
    //   this.post_id = id;
    // }
   
  
   
  
  
  
  
  
    // CreateLikeEntry(likecount, likestatus, postuserid, title, desc) {
    //   let likedata: LikeUser = {
    //     count: likecount
    //   }
  
    //   let userdata = {
  
    //     islike: likestatus,
    //     uid: this.uid,
    //   }
  
    //   let postid
    //   let x = this.getPostId(postuserid, title, desc)
    //   x.subscribe(post => {
  
  
    //     for (const key in post) {
    //       if ((post[key].title == title) && (post[key].desc == desc)) {
    //         postid = key
  
    //       }
    //     }
  
    //     this.http.patch(
    //       `https://asend-185ba-default-rtdb.firebaseio.com/post/${postuserid}/public/${postid}/likestatus.json`,
    //       likedata)
  
    //       .subscribe(responseData => {
    //       });
  
    //     this.PostDataForLikedByUser.subscribe(d => {
    //       let userlikedetailkey
    //       let allusrid = []
    //       // 
    //       for (const key in d) {
    //         if (d[key].uid == this.uid) {
    //           userlikedetailkey = key
    //           allusrid = allusrid.concat(d[key].uid)
    //         }
    //       }
    //       const found = allusrid.some(el => el === this.uid);
    //       if (found) {
    //         this.http.put(
    //           `https://asend-185ba-default-rtdb.firebaseio.com/post/${postuserid}/public/${postid}/likestatus/uid/${userlikedetailkey}.json`,
    //           userdata
    //         ).subscribe(d => {
  
    //         })
    //       }
  
    //       if (!found) {
    //         this.http.post(
    //           `https://asend-185ba-default-rtdb.firebaseio.com/post/${postuserid}/public/${postid}/likestatus/uid.json`,
    //           userdata
    //         ).subscribe(d => {
  
    //         })
    //       }
    //       let x = this.seprate(d)
  
    //     })
  
  
    //   })
    // }
  
    // getLike(postuserid, title, desc) {
    //   let dbkey
    //   this.http.get(
    //     `https://asend-185ba-default-rtdb.firebaseio.com/post/${postuserid}/public.json`)
    //     .subscribe(post => {
    //       for (const key in post) {
    //         if ((post[key].title == title) && (post[key].desc == desc)) {
    //           dbkey = key
    //         }
    //       }
  
    //       return this.http.get(
    //         `https://asend-185ba-default-rtdb.firebaseio.com/post/${postuserid}/public/${dbkey}/likestatus.json`)
    //     })
    // }
  
    // getPostId(postuserid, title, desc) {
    //   return this.http.get(
    //     `https://asend-185ba-default-rtdb.firebaseio.com/post/${postuserid}/public.json`)
    // }
  
    // getPostDetailForLike(postid, title, desc) {
  
    //   let x = this.getPostId(postid, title, desc)
    //   let dbkey 
    //   x.subscribe(post => {
  
  
    //     for (const key in post) {
  
    //       if ((post[key].title == title) && (post[key].desc == desc)) {
    //         dbkey = key
  
    //       }
    //     } 
    //     if (dbkey) {
    //       this.http.get(`https://asend-185ba-default-rtdb.firebaseio.com/post/${postid}/public/${dbkey}.json`)
    //         .subscribe((data: any) => {
  
    //           this.PostDataForLikeCount.next(data.likestatus?.count)
    //           this.PostDataForLikedByUser.next(data.likestatus?.uid)
    //         })
    //     }
    //   })
    // }
  
  
    // CreateComment(value, currentUserId, post_userid, title, desc) {
    //   return new Promise(res => {
  
    //     this.uid = currentUserId
  
    //     this.commentData = {
    //       comment: value.comment,
    //       commentOn: this.ucrud.currentDate,
    //       commentByUserId: currentUserId
    //     }
    //     let dbkey
    //     this.getCommentKey(post_userid, title, desc).
    //       then(d => {
    //         dbkey = d
    //         this.http.post(`https://asend-185ba-default-rtdb.firebaseio.com/post/${post_userid}/public/${dbkey}/commentData.json`, this.commentData)
    //           .subscribe((data: any) => {
    //             this.getCommentDataFromKey(post_userid, dbkey)
    //             res(true)
    //           })
    //       })
  
    //   })
    // }
  
    // getCommentDataFromKey(post_userid, dbkey) {
    //   return this.http.get(`https://asend-185ba-default-rtdb.firebaseio.com/post/${post_userid}/public/${dbkey}/commentData.json`)
    // }
    // getCommentKey(post_userid: any, title: any, desc: any) {
    //   return new Promise(resolve => {
  
    //     let x = this.getPostId(post_userid, title, desc)
    //     let dbkey
    //     x.subscribe(post => {
  
    //       for (const key in post) {
  
    //         if ((post[key].title == title) && (post[key].desc == desc)) {
    //           dbkey = key
    //         }
    //       }
  
    //       resolve(dbkey)
  
    //     })
    //   })
  
    // }
  
    // deletPostEvent(value, id): any {
    //   return new Promise(res => {
    //     if (value.privacy == "true") {
  
    //       let c = this.pb(id, value)
    //       this.Comare_In_FireStore(value, c)
    //       this.deleteFromFireStore(value)
    //       res(this.deletePublicPost(value, c))
  
    //     }
    //     if (value.privacy == "false") {
    //       let c = this.getpr(value)
    //       res(this.deletePrivatePost(value, c))
    //     }
  
    //   })
  
    // }
  
    // getFeaturedPost() {
    //   return new Promise(resolve => {
    //     this.http.get(
    //       `https://asend-185ba-default-rtdb.firebaseio.com/post.json`).subscribe(d => {
    //         let x = this.seprate(d)
  
    //         let z = []
    //         for (let i in x) {
  
    //           let featured = x[i].public
  
    //           z = z.concat(this.seprate(featured))
  
    //           this.featuredPost = z
    //           let s = []
    //           for (let a in this.featuredPost) {
  
    //             if (this.featuredPost[a].likestatus?.count > 10) {
    //               s = s.concat(this.featuredPost[a])
    //               this.featuredPostsorted = s
    //             }
  
    //           }
    //         }
    //         resolve(this.featuredPostsorted)
  
  
    //       })
  
    //   })
  
  
    }
  
    getAllTestimony() {
      return new Promise(resolve => {
        this.http.get(
          `https://asend-185ba-default-rtdb.firebaseio.com/post.json`).subscribe(d => {
            let x = this.seprate(d)
  
            let z = []
            for (let i in x) {
  
              let featured = x[i].public
  
              z = z.concat(this.seprate(featured))
            }
            resolve(z)
  
          })
      })
    }
  
  
    // showSuccess() {
    //   this.toastr.success('Post Added Successfully', 'Success', {
    //     timeOut: 20000
    //   });
    // }
  
  
    // showSuccessDelete() {
    //   this.toastr.success('Post Deleted Successfully', 'Success', {
    //     timeOut: 20000
    //   });
    // }
  
    // showSuccessEdit() {
    //   this.toastr.success('Post Edited Successfully', 'Success', {
    //     timeOut: 20000
    //   });
    // }
  
    // showSuccessCreateProfile() {
    //   this.toastr.success('Profile Created Successfully', 'Success', {
    //     timeOut: 20000
    //   });
    // }
    // showSuccessEditProfile() {
    //   this.toastr.success('Profile Edited Successfully', 'Success', {
    //     timeOut: 20000
    //   });
    // }
  
    // showWarningForProfileSet() {
    //   this.toastr.warning('Please set your Profile', 'Warning', {
    //     timeOut: 20000
    //   });
    // }
  
  }
  
