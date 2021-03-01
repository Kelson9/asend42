export interface AppUser{
name:string;
email:string;
isAdmin:boolean;
}

export interface Roles { 
  admin?: boolean;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  roles: Roles;
}

export class UPost {
    title: string;
    desc: string;
    created_date?: Date;

    imgurl: string;
    category: string;
    subcategory?: string;
    name: string;
    privacy: string;
    likecount?: number
    uid: string
    uname: string
    comment?: string

}
export class Testimony{
sName:string;
description:string;
imgurl: string;
privacy: string;


}

export class LikeUser {
    count: number
    uid?: {
        islike: boolean,
        uid: any
    }
}

export class LikeUserDetail {
    uid: {
        islike: boolean,
        uid: any
    }
}

// export class User {
//     uid: string;
//     constructor(
//       public email: string,
//       public id: string,
//       private _token: string,
//       private _tokenExpirationDate: Date
//     ) { }
  
//     get token() {
//       if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
//         return null;
//       }
//       return this._token;
//     }
//   }
  
//   export class Profile {
  
//     desc: string;
//     email: string;
//     imgurl: string;
//     name: string;
//     uname: string;
//     isProfileSet?: boolean
//   }
  
  
  // export interface User1 {
  //   uid: string;
  //   email: string;
  //   displayName: string;
  //   photoURL: string;
  //   emailVerified: boolean;
  // }
// export class Comments {
//     comment: string;
//     comment_date: Date;
//     uid: string;
//     uname?: string;
//     name?: string
// }

