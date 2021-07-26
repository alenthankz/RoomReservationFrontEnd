import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDatastorageService } from '../admin-datastorage.service';
import { Booking } from '../booking.model';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  heading ="Booking Records";
  typeOfUser="Admin"
  bookings:Booking[];
  prop:string
  size:number;
  nonZero=true;
  checkForm:FormGroup

  availableOptions=['All','email','fromDate','toDate','bookingid','totalCost','typeOfRoom'];

  constructor(private route:ActivatedRoute,private router:Router ,
    private adminService:AdminDatastorageService
  ) { }
  
  onCustomerDetails(i){
    this.prop='../'+'customer-details/'+this.bookings[i]._id
    this.router.navigate([this.prop],{relativeTo:this.route})
  }

  onSubmit(){
    let formValue=this.checkForm.value;
    let condition={};
    if(formValue.optionChoosed=='All')
      condition={};
    else if(formValue.optionChoosed=='bookingid' || formValue.optionChoosed=='totalCost')
      condition[formValue.optionChoosed]=Number(formValue.value);
    else if(formValue.optionChoosed=='email') 
      condition['username']=formValue.value;
    else
      condition[formValue.optionChoosed]=formValue.value;

    // console.log(condition);
    this.adminService.condition=condition;
    // console.log(this.adminService.condition)

  }

  
  
  ngOnInit(): void {
    this.initForm()
    this.adminService.condition={}
    this.adminService.bookingsChanged.subscribe(
      (bookings:Booking[])=>{
        this.bookings=bookings;
        if(bookings.length==0){
          this.nonZero=false;
        }
        else {
          this.nonZero=true;
          this.size=this.bookings.length;
        }
      }
    );

  }


  // forms

  private initForm(){
    let optionChoosed="All"
    let value;

    this.checkForm= new FormGroup({
      optionChoosed: new FormControl(optionChoosed),
      value:new FormControl(value),
    })
  }

}
