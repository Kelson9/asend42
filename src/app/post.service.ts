import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private db:AngularFireDatabase) { }

  create(post){
    return this.db.list("/posts").push(post);
  }

  getAll(){
return this.db.list("/posts").valueChanges();

  }
}
