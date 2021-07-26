import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminDatastorageService } from '../admin-datastorage.service';
import { Booking } from '../booking.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  typeOfUser="Admin"
  heading="Customer Details"
  error=null;
  constructor(private adminService:AdminDatastorageService,private route:ActivatedRoute,private router:Router ) { }
  customer
//   ={
//     noBeds: 5,
//     _id: "60f5d8052cc16a3ca4c4776c",
//     fromDate: "12/07/2021",
//     toDate: "14/07/2021",
//     totalCost: 4400,
//     typeOfRoom: "Deluxe Non-AC",
//     bookingid: 1,
//     name: "Not me orginal",
//     username: "alen@gmail.com",
//     dob: "DD/MM/YYYY",
//     phNum: 52363657262564240,
//     proofType: "Aadhar card",
//     proofValue: "264234623464263"
// }
  ngOnInit(): void {
    

    this.route.params.subscribe(
    (params:Params)=>{
     let id=params['idx'] ;
     this.adminService.fetchOneBooking(id).subscribe((booking)=>{
       this.error=null;
       this.customer=booking;
     }),
     (errorRes)=>{
       this.error=errorRes.error.message;
     }
    }
  );

  }

  onBack(){
    this.router.navigate(['../../'],{relativeTo:this.route})
  }
}
