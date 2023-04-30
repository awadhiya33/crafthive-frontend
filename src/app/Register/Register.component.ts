import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_model/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User={
    userName:'',
    userFirstName:'',
    userLastName:'',
    userPassword:'',
    userEmail:'',
    userContactnumber:''
  };
  myForm:any;
  constructor(private userService:UserService,private router:Router) { }
 
  ngOnInit() {
    this.myForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),});
      }
      public myError = (controlName: string, errorName: string) =>{
      return this.myForm.controls[controlName].hasError(errorName);
  }

  register(registerForm:any){
    console.log(registerForm.value);
    
    this.userService.register(this.user).subscribe((data:any)=>{
      this.router.navigate(['/login']);
        console.log(data);

      },
      (error)=>{
        console.log(error);
      }
    );
  }

}
