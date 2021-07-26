import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { StartComponent } from './welcome/start/start.component';
import { LoginComponent } from './welcome/login/login.component';
import { SignupComponent } from './welcome/signup/signup.component';
import { UserComponent } from './user/user.component';
import { UserSidenavComponent } from './user/user-sidenav/user-sidenav.component';
import { UserRoomsComponent } from './user/user-rooms/user-rooms.component';
import { WelcomeNavbarComponent } from './welcome/welcome-navbar/welcome-navbar.component';
import { SharedNavbarComponent } from './shared-navbar/shared-navbar.component';
import { AdminComponent } from './admin/admin.component';
import { CustomersListComponent } from './admin/customers-list/customers-list.component';
import { CustomersDetailsComponent } from './admin/customers-details/customers-details.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './welcome/auth-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//needed for reactive forms ********************
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './admin/details/details.component';
//needed for http routing ********************

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    StartComponent,
    LoginComponent,
    SignupComponent,
    UserComponent,
    UserSidenavComponent,
    UserRoomsComponent,
    WelcomeNavbarComponent,
    SharedNavbarComponent,
    AdminComponent,
    CustomersListComponent,
    CustomersDetailsComponent,
    DetailsComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,//required
    HttpClientModule //required
  ],
  
  providers: [ 
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],

  bootstrap: [AppComponent]
})
export class AppModule { }
