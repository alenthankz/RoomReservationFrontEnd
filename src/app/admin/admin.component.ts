import { Component, OnInit } from '@angular/core';
import { AdminDatastorageService } from './admin-datastorage.service';
import { Booking } from './booking.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  constructor(
    private adminService:AdminDatastorageService
  ) { }
  error=null;
  heading ="Booking Records";
  typeOfUser="Admin"
  ngOnInit(): void {
    setInterval(()=>{
      this.adminService.fetchBookings().subscribe(
        (bookings:Booking[])=>{
          this.error=null;
        },
        (errorRes)=>{
          console.log(errorRes)
          this.error=errorRes.error.message;
          ;
        }
      );
    },1000)

  }

}
