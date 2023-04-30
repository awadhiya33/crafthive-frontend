import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private userAuthSer:UserAuthService,private router:Router,private userSer:UserService){

  }
  ngOnInit(): void {

  }
  public isLoggedIn(){
    return this.userAuthSer.isLoggedIn();
  }
  public logout(){
    this.userAuthSer.clear();
    this.router.navigateByUrl("/");
  }
  public rolMatch(s:any){
     return this.userSer.roleMatch(s);
  }
  public isAdmin(){
    return this.userAuthSer.isAdmin();
  }
  public isUser(){
    return this.userAuthSer.isUser();
  }
}
