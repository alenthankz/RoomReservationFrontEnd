import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/welcome/auth.service';
import { UserDatastorageService } from '../user-datastorage.service';

@Component({
  selector: 'app-user-rooms',
  templateUrl: './user-rooms.component.html',
  styleUrls: ['./user-rooms.component.scss']
})
export class UserRoomsComponent implements OnInit {
  img1;
  img2;
  img3;
  constructor(private route:ActivatedRoute, private userService:UserDatastorageService,
    private authService:AuthService) { }

  @ViewChild('f')bookForm:FormGroup
  typeOfRoom:string;
  typeOfUser:string="User";
  totalCost:number=-1;
  today;
  cost:number;
  booked=false;
  valid=false;
  error=null;


  ngOnInit(): void {
    this.today = new Date().toJSON().split('T')[0]
    //IMPORTANT
    console.log(this.today );


    this.route.params.subscribe(
      (params:Params)=>{
        let typeRoom=params['roomtype'];
        switch(typeRoom){
          case "dnac": {this.typeOfRoom="Deluxe Non-AC";this.cost=700;break;}
          case "dac": {this.typeOfRoom="Deluxe AC";this.cost=1000;break;}
          case "ps": {this.typeOfRoom="Premier Suite";this.cost=3800;break;}
        }
        switch(this.typeOfRoom){
          case "Deluxe Non-AC" :{this.img1="../../assets/dnac1.png";
                                this.img2="../../assets/dnac2.png";
                                this.img3="../../assets/dnac3.png";
                                break;}
          case "Deluxe AC"     :{this.img1="../../assets/dac1.png";
                                this.img2="../../assets/dac2.png";
                                this.img3="../../assets/dac3.png";
                                break;}
          case "Premier Suite" :{this.img1="../../assets/ps1.png";
                                this.img2="../../assets/ps2.png";
                                this.img3="../../assets/ps3.png";
                                break;}
        }
      }
    );
   
  

    this.authService.operator.subscribe((agent)=>{
      this.typeOfUser=agent.name;
    })


   
  }


  onCalculate(){

    let val = this.bookForm.value;
    console.log(val.fromDate,typeof(val.fromDate))
    let from=val.fromDate.split('-');
    let to=val.toDate.split('-');
    let totalDays=(to[0]-from[0])*365+(to[1]-from[1])*30+(to[2]-from[2])*1;
    this.totalCost=totalDays*(val.noBeds*300+this.cost);
    if(this.totalCost>0)
      this.valid=true;
    else this.valid=false;
  }

  onHandleError(){
    this.error=null;
  }

  onHandleSuccess(){
    this.booked=false;
  }
  
  onClear(){
    this.bookForm.reset();
    this.totalCost=-1;
    this.valid=false;
    this.error=null;
    this.booked=false;
  }

  onSubmit(){
    this.bookForm.value.totalCost=this.totalCost;
    this.bookForm.value.typeOfRoom=this.typeOfRoom;
    console.log(this.bookForm.value)
    
    this.userService.registerBooking(this.bookForm.value).subscribe(
      (obj:Object)=>{
        this.onClear();
        this.booked=true;
      },
      (errorMessage)=>{
          this.error=errorMessage
      }
    )

  }

}
