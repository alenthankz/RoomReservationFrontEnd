import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agent } from './agent.model';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  operator = new BehaviorSubject<Agent>(null);
  private tokenExpirationTimer:any
  
  handleError(errorRes: HttpErrorResponse){
    console.log(errorRes)
    let errorMessage = 'An unknown error occurred!';
    if(errorRes.error.message)errorMessage=errorRes.error.message;
    return throwError(errorMessage);
  }


  handleAuth(resData,admin){
    const expirationDate = new Date(new Date().getTime() + resData.expiresIn * 1000);
    const agent = new Agent(
      resData._id,
      resData.name,
      resData.username,
      resData.dob,
      resData.phNum,
      resData.proofType,
      resData.proofValue,
      admin,
      resData.token,
      expirationDate);

    localStorage.setItem('agentData',JSON.stringify(agent))
    this.autoLogout(resData.expiresIn * 1000,admin);
    this.operator.next(agent);
  }



  constructor(private http:HttpClient,private router:Router) { }




  autoLogin(){

    const agentData :{
      id:string,
      name:string,
      username:string,
      dob:string,
      phNum:number,
      proofType:string,
      proofValue:string,
      admin:boolean,
      _token:string,
      _tokenExpirationDate:string
    }=JSON.parse(localStorage.getItem('agentData'));

    if(!agentData){
      return;
    }
    
    const loadedAgent = new Agent(
      agentData.id,
      agentData.name,
      agentData.username,
      agentData.dob,
      agentData.phNum,
      agentData.proofType,
      agentData.proofValue,
      agentData.admin,
      agentData._token,
      new Date(agentData._tokenExpirationDate)
    );

    if (loadedAgent){
      this.operator.next(loadedAgent);
      if(loadedAgent.admin)this.router.navigate(['/admin']);
      else this.router.navigate(['/user']);
      const expirationDuration =new Date(agentData._tokenExpirationDate).getTime()-new Date().getTime();
      this.autoLogout(expirationDuration,loadedAgent.admin);
    }
   }

   autoLogout(expirationDuration:number,admin:boolean){
    this.tokenExpirationTimer=setTimeout(()=>{
      this.logout(admin)
    },expirationDuration)
  }



logout(admin:boolean){
  if(admin){
    this.http.post('http://localhost:3000/admin/logout', {}).subscribe()
  }else{
    this.http.post('http://localhost:3000/user/logout', {}).subscribe()
  }
  this.operator.next(null);
  this.router.navigate(['welcome/start']);
  localStorage.removeItem('agentData');
  if(this.tokenExpirationTimer){
    clearTimeout(this.tokenExpirationTimer);
  }
}



  userLogin(userDetails:Object){
    return this.http
      .post(
        'http://localhost:3000/user/login',
         userDetails
      )
      .pipe(
        catchError(this.handleError),
        tap((resData)=>{
          this.handleAuth(resData,false);
        })
      )
  }

  adminLogin(adminDetails:Object){
    return this.http
    .post(
      'http://localhost:3000/admin/login',
      adminDetails
    )
    .pipe(
      catchError(this.handleError),
      tap((resData)=>{
        this.handleAuth(resData,true);
      })
    )
  }

  userSignup(userSignupDetails){
    return this.http
    .post(
      'http://localhost:3000/user/signup',
      userSignupDetails
    )
    .pipe(
      catchError(this.handleError),
      tap((resData)=>{
        this.handleAuth(resData,false);
      })
    )
  }




}
