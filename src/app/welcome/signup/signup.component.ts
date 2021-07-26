import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,
  private authService:AuthService,
  ) { }

  signupForm:FormGroup
  error=null;
  today=new Date().toJSON().split('T')[0]
  onSubmit(){
   
    this.authService.userSignup(this.signupForm.value).subscribe(
      (resData)=>{
        this.error=null;
        this.router.navigate(['/user']);
      },
      (errorMessage)=>{
          this.error=errorMessage;
      }
    )
    this.signupForm.reset();
  }

  onHandleError(){
    this.error=null;
  }

  ngOnInit(): void {
    this.initForm();
  }
  proofDefaultvalue="Aadhar card"
  availableOptions=["PAN card", "Voter Id","Passport", "Driving License", "Aadhar card"]

  private initForm(){
    let name;
    let username;
    let password;
    let dob="DD/MM/YYYY";
    let phNum;  
    let proofType=this.proofDefaultvalue;  
    let proofValue;  

    this.signupForm= new FormGroup({
      name: new FormControl(name,[Validators.required,Validators.pattern('[a-zA-Z ]*')]), 
      username: new FormControl(username,[Validators.required,Validators.email]), 
      password:new FormControl(password,[Validators.required,Validators.minLength(8)]),
      dob:new FormControl(dob,[Validators.required]),
      phNum:new FormControl(phNum,[Validators.required,Validators.minLength(10),Validators.pattern('[- +()0-9]+')]),
      proofType:new FormControl(this.proofDefaultvalue),
      proofValue:new FormControl(proofValue,[Validators.required,Validators.minLength(3)]),
    })
  }

 }
