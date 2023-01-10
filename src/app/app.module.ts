import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { RouterModule, Routes } from '@angular/router';

// import { HelpcustomerComponent } from './helpcustomer/helpcustomer.component';
// import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserregistrationComponent } from './userregistration/userregistration.component';
//import { AppRoutingModule } from './app-routing.module';

// const appRoutes: Routes = [
  
//   { path: '', redirectTo: '/home', component: HomeComponent, pathMatch: 'full' },  
//   {
//       path: 'customer',
//       component: CustomerComponent,
//       pathMatch: 'full',
//   }
//   ];


  @NgModule({
    declarations: [ AppComponent, HomeComponent,  UserregistrationComponent],
    imports: [ 
      RouterModule.forRoot([
        { path: 'home', component: HomeComponent },
        { path: 'customer', component: CustomerComponent, data: {reuse: true} },
         {path: 'contact', component: ContactComponent },
        {path: 'onboarding', component: UserregistrationComponent },
        // {path: 'onboarding', component: OnboardingComponent },
        
      ]),
      BrowserModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
   
    ],
    exports: [RouterModule],
    bootstrap: [ AppComponent ]
  })
export class AppModule { }
