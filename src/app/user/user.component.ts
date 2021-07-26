import { Component, OnInit } from '@angular/core';
import { UserDatastorageService } from './user-datastorage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private userService:UserDatastorageService) { }
  error=null;
  ngOnInit(): void {
    // setInterval(()=>{
    //   this.userService.fetchLastBookedNo();
    // },1000)

    // this.userService.errorFetch.subscribe( 
    //   (error)=>{
    //     this.error=error;
    //   }
    // )

  }

}
