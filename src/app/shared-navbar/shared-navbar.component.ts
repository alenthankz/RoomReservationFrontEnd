import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../welcome/auth.service';

@Component({
  selector: 'app-shared-navbar',
  templateUrl: './shared-navbar.component.html',
  styleUrls: ['./shared-navbar.component.scss']
})
export class SharedNavbarComponent implements OnInit {

  constructor(private router:Router,
    private authService:AuthService
  ) { }
  @Input() heading:string;
  @Input() typeOfUser:string;
  usedbynow:string;
  admin:boolean;
  ngOnInit(): void {
    this.authService.operator.subscribe((agent)=>{
      this.usedbynow=agent.name;
      this.admin=agent.admin;
    })
  }
  onLogout(){
    
    this.authService.logout(this.admin);
  }
}
