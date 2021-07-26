import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,
  private authService:AuthService
  ) { }
  usedby="User";
  loginForm:FormGroup;
  error = null;


  onSubmit(){
    if(this.usedby=="User"){
      this.authService.userLogin(this.loginForm.value).subscribe(
        (res)=>{
            this.router.navigate(['/user']);
        },
        (errorMessage)=>{
          this.error=errorMessage;
        }
      );
    }else{
      this.authService.adminLogin(this.loginForm.value).subscribe(
        (res)=>{
            this.error=null;
            this.router.navigate(['/admin']);
        },
        (errorMessage)=>{
          this.error=errorMessage;
        }
      );
    }
    this.loginForm.reset();
  }


  onHandleError(){
    this.error=null;
  }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.usedby=(params['id']=="admin"?"Admin":"User");
        this.initForm();
      }
    )
  }

  private initForm(){
    let username;
    let password;
    let usedby=this.usedby;

    this.loginForm= new FormGroup({
      username: new FormControl(username,[Validators.required,Validators.email]),
      password:new FormControl(password,[Validators.required,Validators.minLength(8)]),
      usedby:new FormControl(usedby),
    })
  }

}
