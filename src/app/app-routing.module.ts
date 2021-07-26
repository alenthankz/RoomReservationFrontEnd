import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CustomersDetailsComponent } from './admin/customers-details/customers-details.component';
import { CustomersListComponent } from './admin/customers-list/customers-list.component';
import { DetailsComponent } from './admin/details/details.component';
import { UserRoomsComponent } from './user/user-rooms/user-rooms.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './welcome/auth.guard.service';
import { LoginComponent } from './welcome/login/login.component';
import { SignupComponent } from './welcome/signup/signup.component';
import { StartComponent } from './welcome/start/start.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  { path: '', redirectTo: '/welcome/start', pathMatch: 'full' },
  { path: 'welcome', 
    component:WelcomeComponent,
    children:[
      {path:'',redirectTo:'start',pathMatch:'full'},
      {path:'start',component:StartComponent},
      {path:':id/login',component:LoginComponent},
      {path:'signup',component:SignupComponent}
    ] 
  },
  { path: 'user', 
    component:UserComponent,
    canActivate:[AuthGuard],
    children:[
      {path:'',redirectTo:'dnac',pathMatch:'full'},
      {path:':roomtype',component:UserRoomsComponent}
    ]
  },
  { path: 'admin', 
    component:AdminComponent,
    canActivate:[AuthGuard],
    children:[
      {path:'',redirectTo:'bookings',pathMatch:'full'},
      {path:'bookings',component:CustomersListComponent},
      // {path:':idx/customer-details',component:CustomersDetailsComponent}
      {path:'customer-details/:idx',component:DetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
