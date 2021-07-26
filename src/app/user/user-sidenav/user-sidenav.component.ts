import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-sidenav',
  templateUrl: './user-sidenav.component.html',
  styleUrls: ['./user-sidenav.component.scss']
})
export class UserSidenavComponent implements OnInit {

  innerWidth:number
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
   
  }
  constructor(private router:Router,private route:ActivatedRoute) { }
  ngOnInit(): void {
    this.innerWidth=window.innerWidth;
    
  }

  ondnac(){
    this.router.navigate(['dnac'],{relativeTo:this.route})
  }
  ondac(){
    this.router.navigate(['dac'],{relativeTo:this.route})
  }
  onps(){
    this.router.navigate(['ps'],{relativeTo:this.route})
  }

  
}
