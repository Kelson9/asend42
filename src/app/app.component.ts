import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private route:Router,private userService:UserService,private auth:AuthService)
  {
auth.user$.subscribe(user=>{
  if(user){
    userService.save(user);
    let returnUrl=localStorage.getItem('returnUrl');
    route.navigateByUrl(returnUrl);

}});

}
}
