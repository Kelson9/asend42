import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';

import { UPost } from '../../src/app/models/UPost';
import { finalize, catchError } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Testimony } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class PostService {
uploadPercent: Observable<number>;
downloadURL: Observable<string>;
selectedFile: any | null;
currentDate = new Date();
downloadurlchange: Subject<any> = new Subject<any>();
filepath: string
uid: any;
  constructor(private db:AngularFireDatabase, private router: Router,
    private afStorage: AngularFireStorage, private afs:AngularFirestore) { }

  create(post){
    return this.db.list("/news").push(post);
  
  }

  getAll(){
return this.db.list("/news").valueChanges();

  }


  handleError(error: any) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getdata(data) {
    this.selectedFile = data

  }


  get_public_post() {
    return this.afs.collection('normal-users').snapshotChanges().pipe(catchError(this.handleError))

  }

 
  createUser(value: UPost) {
    return this.afs.collection(`normal-users`).add({
      title: value.title,
      nameToSearch: value.title.toLowerCase(),
      desc: value.desc,
      category: value.category,
      subcategory: value.subcategory,
      name: value.name,
      created_date: this.currentDate,
      imgurl: this.downloadURL
    })

  }


  uploadFile() {
    const myTest = this.afs.collection('test').ref.doc();
    const file = this.selectedFile;


    this.filepath = "UauthUsers"

    const filePath = `${this.filepath}/${file.name}`;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().toPromise().then((url) => {
          this.downloadURL = url;
          this.downloadurlchange.next(this.downloadURL)



        }).catch(err => { console.log(err) });
      })
    )
      .subscribe()
  }

////TESTIMONY

handleError2(error: any) {
  let errorMessage = 'Unknown error!';
  if (error.error instanceof ErrorEvent) {
    // Client-side errors
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Server-side errors
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(errorMessage);
}

getdata2(data) {
  this.selectedFile = data

}


getTestimony() {
  return this.afs.collection('testimony').snapshotChanges().pipe(catchError(this.handleError))

}


createTestimony(value:Testimony) {
  return this.afs.collection(`testimony`).add({
    
    sName: value.sName,
    description:value.description,
    created_date: this.currentDate,
    imgurl: this.downloadURL
  })

}


uploadFile2() {
  const myTest = this.afs.collection('test2').ref.doc();
  const file = this.selectedFile;


  this.filepath = "testimony"

  const filePath = `${this.filepath}/${file.name}`;
  const fileRef = this.afStorage.ref(filePath);
  const task = this.afStorage.upload(filePath, file);
  this.uploadPercent = task.percentageChanges();
  task.snapshotChanges().pipe(
    finalize(() => {
      fileRef.getDownloadURL().toPromise().then((url) => {
        this.downloadURL = url;
        this.downloadurlchange.next(this.downloadURL)



      }).catch(err => { console.log(err) });
    })
  )
    .subscribe()
}


}

