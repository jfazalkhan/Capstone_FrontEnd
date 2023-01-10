import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cust } from "../cust";
import { Customer } from "../Customer";
@Injectable({
    providedIn: 'root'
  })
  
export class CustomerService
{  
  errMsg:boolean;
     private Url = "http://localhost:8888/api/customerdetails/";

     //private sendUrl = "http://localhost:8888/api/customerdetails/";

    constructor(private http: HttpClient) { }

    createCustomer(customer: any): Observable<Object>
    {
        return this.http.get(`$('this.baseUrl')`, customer);
    }

   addCustomers(custr:Customer) : Observable<Customer>
   {
     return this.http.post<Customer>(`${this.Url}`,Cust);
   }
   
   
  public validatUserName(userName: String):Observable<[Cust]>{
    const val = this.Url+`creditcheck/${userName}`;
    console.log("generated url ======> ",val);
    //alert(this.http.get(val));
    //return this.http.get(val)
   return  <Observable<[Cust]>>this.http.get(val);
   //.subscribe((data: Cust) => {
     // console.log(data.key);
      
      //  console.log(data.key)
      //   let str = data.key;
      //   if(str == 'invalid'){
      //     this.errMsg = true;
      //   }
       
        // this.errMsg = data
    
      // alert(data.key)
   // })
   }
} 