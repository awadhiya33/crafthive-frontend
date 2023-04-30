import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userAuthSer:UserAuthService,private router:Router,private userSer:UserService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.userAuthSer.getToken()!==null){
      const role=route.data["roles"] as Array<string>;

      if(role){
        console.log(role);
       const match= this.userSer.roleMatch(role);
       if(match) return true;
       else{
        this.router.navigateByUrl("/forbidden");
        return false;
       }
      }
    }
    this.router.navigateByUrl("/login");
    return false;
  }
  
}
