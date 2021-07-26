import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Booking } from './booking.model';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdminDatastorageService {
  bookings:Booking[];
  bookingsChanged=new Subject<Booking[]>();
  condition={};
  constructor(private http:HttpClient) { }

  // fetch cross product of user and booking  in adminservice
  
  fetchBookings(){
    console.log(this.condition)
    return this.http
    .post(
       'http://localhost:3000/admin/allbookings',
        this.condition
    )
    .pipe(
      tap((bookings:Booking[])=>{
        this.bookings=bookings.reverse();
        this.bookingsChanged.next(this.bookings.slice())
      })
    );
  //important we tap here just to take value and will use subscribe where we need error display
  }
  fetchOneBooking(id){
    return this.http
    .post(
       'http://localhost:3000/admin/booking',
        {id:id}
    )
  }

}
