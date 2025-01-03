import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient:HttpClient,private userAuthSer:UserAuthService) { }

  requestHeader=new HttpHeaders(
    {"No-Auth":"true"}
  );

  public register(registerData:any){
    return this.httpclient.post("https://crafthive-backend.onrender.com/registerNewUser",registerData,{headers:this.requestHeader});
  }

  public login(loginData:any){
    return this.httpclient.post("https://crafthive-backend.onrender.com/authenticate",loginData,{headers:this.requestHeader});
  }

  public roleMatch(allowedRoles:any) : boolean{
    let isMatch=false;
    const userRoles:any=this.userAuthSer.getRoles();

    if(userRoles!=null&&userRoles){
      for(let i=0;i<userRoles.length;i++){
        for(let j=0;j<allowedRoles.length;j++){
          if(userRoles[i].roleName===allowedRoles[j]){
            isMatch=true;
            return isMatch;
          }else{
            return isMatch;
          }
        }
      }
    }
    return isMatch;
  }
}
