import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isVerified=false;
  // @ts-ignore
  protected aFormGroup: FormGroup;
  siteKey:string;
  constructor(private userSer:UserService,private userAuthSer:UserAuthService,private router:Router){
    this.siteKey='6LejnBQlAAAAAFg0Ksw2hmEKaXG-7LVt7n6sgl3r';
  }
  ngOnInit(): void {

  }
  login(loginForm:any){
    if(this.isVerified==false){
      alert("Please verify you are not a robot");
    }else{
      
    console.log(loginForm.value);
    this.userSer.login(loginForm.value).subscribe((data:any)=>{
      //console.log(data);
      this.userAuthSer.setRoles(data.user.role);
      this.userAuthSer.setToken(data.jwtToken);

      const role=data.user.role[0].roleName;
      if(role=='Admin'){
        this.router.navigateByUrl("/admin");
      }else{
        this.router.navigateByUrl("");
      }
    },
    (error)=>{
      console.log(error);
    }
    );
  }
}
  registerUser(){
    this.router.navigate(['/register']);
  }
  handleSuccess(token:any){
    this.isVerified=true;
  }
  
}
