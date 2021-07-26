import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminDatastorageService } from '../admin-datastorage.service';
import { Booking } from '../booking.model';

@Component({
  selector: 'app-customers-details',
  templateUrl: './customers-details.component.html',
  styleUrls: ['./customers-details.component.scss']
})
export class CustomersDetailsComponent implements OnInit {
  heading ="Customer Details";
  typeOfUser="Admin"
  bookings:Booking[];

  index:number;
  customer:Booking;

  constructor(private route:ActivatedRoute,private router:Router ,
    private adminService:AdminDatastorageService
  ) { }

  ngOnInit(): void {
    console.log('helo')
    this.adminService.bookingsChanged.subscribe(
      (bookings:Booking[])=>{
        this.bookings=bookings;
        console.log('helo',bookings)
      }
    );

  }

  // this.route.params.subscribe(
  //   (params:Params)=>{
  //    this.index=params['idx'];
  //    this.customer=this.bookings[this.index];
  //   }
  // );

  onBack(){
    this.router.navigate(['../../'],{relativeTo:this.route})
  }

}
