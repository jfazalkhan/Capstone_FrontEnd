import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomerService } from './customerservice';
// import { Cust } from '../cust';
// import { Customer } from '../Customer';
@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.scss']
})
export class UserregistrationComponent {
user_name: String = '';
gender:string='';
address: String = '' ;
phone: String = '';
accountNumber: String = '';
accountTyp: String = '';
area: String = '';
pincode: String = '';
house: String = '';
  registerForm: FormGroup;
  submitted = false;
  formData: any = new FormData();
  responseData: any;
  default: String = 'Florida';
  errMsg = false;
  accountType = [
    { id: 1, name: "Saving" },
    { id: 2, name: "Current" },
    { id: 3, name: "loan" }
  ];
  successMsg=false;
  formsubmitstatus=false;
  constructor(public formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,private http: HttpClient, private serviceData: CustomerService ) {
        
      }
      ngOnInit() {
        this.registerForm = this.formBuilder.group({
          userName: ['', Validators.required],
          gender:['', Validators.required],
          address: ['', Validators.required],
          phoneNo: ['', Validators.required],
          accountType: ['', Validators.required],
          account: ['', Validators.required],
          accountNumber: ['', Validators.required],
          houseNo: ['', Validators.required],
          area: ['', Validators.required],
          pincode: ['', Validators.required]     
        })
        
      }
      get f() { return this.registerForm.controls; }
      
      changeAccountType(e:any) {
      console.log(e.target.value);
      let acty = e.target.value
        this.registerForm.controls['accountType'].setValue(acty, {onlySelf: true});
      //  })
      }
      valuechange(e:any){
        this.errMsg = false;
        console.log(e.target.value);
        const name = e.target.value;
        console.log( typeof name);
        
        this.serviceData.validatUserName(name).subscribe((data:any) =>{
          console.log("returend from server");
          console.log(typeof(data['key']));
          
          var msg:string = data['key'];
          if(msg == 'not valid'){
          console.log("inside if block");
          this.errMsg = true;
          }
        })
        }
      onSubmit() { 
        this.successMsg=false;
        this.setValue();       
        this.submitted = true;
      console.log("form data ====>",this.formData);
        // if (this.registerForm.invalid) {
        //     return;
        // }
    //       let headers = new HttpHeaders({
    // 'Content-Type': 'application/json'
    //   });
//let options = { headers: headers };

const URL = 'http://localhost:8888/api/customerdetails/Details';
console.log(URL);
console.log("before sending data to post value of formdata is"+this.formData)
 
  if(this.formData.userName.length == 0){
    this.formsubmitstatus = true;
     setTimeout(()=>{
      this.formsubmitstatus = false;
       },3000)
    return;
  }
  if(this.formData.phoneNo.length  == 0){
    this.formsubmitstatus = true;
    setTimeout(()=>{
      this.formsubmitstatus = false;
       },3000)
    return;
  }
  else{

  this.http.post(URL, this.formData).subscribe((res: any) =>{
    console.log(res);
    if(res){
      this.successMsg = true;
      // setTimeout(()=>{
      //   this.successMsg = false;
      // },1000)
     // alert("value submitted");
    }
    // if (data.statusCode == 200) {
    //   alert("data successfully entered");
    //   //prompt('Success')
    //   }
    
  })
}

 
       // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));     
      }

      setValue() {
        this.user_name = this.registerForm.get('userName')?.value;
        this.gender = this.registerForm.get('gender')?.value;
        this.address = this.registerForm.get('address')?.value;
        this.phone = this.registerForm.get('phoneNo')?.value;
        this.accountTyp = this.registerForm.get('accountType')?.value;
        this.accountNumber = this.registerForm.get('accountNumber')?.value;
        this.house= this.registerForm.get('houseNo')?.value;
        this.area = this.registerForm.get('area')?.value; 
        this.pincode = this.registerForm.get('pincode')?.value; 
        console.log(this.user_name);
        console.log(this.gender);
        console.log(this.address);
        console.log(this.phone);
        console.log(this.accountTyp);
        console.log(this.accountNumber);
        console.log(this.house);
        console.log(this.area);
        console.log(this.pincode);
        
       // this.formData.append('userName',this.user_name);
        //this.formData.append('address',this)
        console.log(this.formData);
        // this.formData = {
        //   "userName":this.user_name,
        //   "address": this.address,
        //   "phoneNo": this.phone,
        //   "accountType": this.accountTyp,
        //   "AccountNumber": this.accountNumber,
        //   "HouseNo": this.house,
        //   "area": this.area,
        //   "pincode": this.pincode
        // }
       this.formData = {
          "address": {
              "area":this.area,
              "pincode": this.pincode,
              "houseNo": this.house
          },
          "userName": this.user_name,
          "gender":this.gender,
          "phoneNo": this.phone,
          "accountType": this.accountTyp,
          "accountNumber": this.accountNumber
      }
        }
        onReset() {
          this.submitted = false;
          this.registerForm.reset();
        }
        
        submitForm(){
        var formData: any = new FormData();
        formData.append('userName', this.registerForm.get('userName')?.value);
        console.log(formData);
        console.log(this.registerForm.get('userName')?.value);
        }
        
}
