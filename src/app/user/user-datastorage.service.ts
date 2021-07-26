import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDatastorageService {

  constructor(private http :HttpClient) { }


  handleError(errorRes: HttpErrorResponse){
    console.log(errorRes)
    let errorMessage = 'An unknown error occurred!';
    if(errorRes.error.message)errorMessage=errorRes.error.message;
    return throwError(errorMessage);
  }

  registerBooking(obj:Object){
    return this.http
    .post(
       'http://localhost:3000/user/booking',
       obj
    ).pipe(
      catchError(this.handleError)
    )
  }



}
