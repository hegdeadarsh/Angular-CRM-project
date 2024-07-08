import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit{
  username: any;
  email: any;
  password: any;
  confirm_password: any;
  doNotPass: boolean = false;
  selectedRole:any;
  rolelist:any=[]
  alreadyexist: any;
  constructor(
    private masterSv:MasterService,
    private regSv : RegistrationService,
    private route : Router
  ){

  }
  ngOnInit(): void {
    this.getRole()
  }
  onSelectRole(data:any){
this.selectedRole = data.target.value
  }
  getRole(){
    this.masterSv.getRole().subscribe((response:any)=>{
      this.rolelist = response;
      console.log(this.rolelist)
    })
  }
userRegistration(){
  if(this.password == this.confirm_password){
    var userRegistrationData = {
      UserName : this.username,
      Email : this.email,
      RoleId : this.selectedRole,
      Password : this.password,
      ConfirmPassword : this.confirm_password
    }
    this.regSv.userRegister(userRegistrationData).subscribe((response:any)=>{
      if(response == "success"){
        alert("Registered Successfully")
        this.route.navigate(['/login'])
      }else if(response == "fail"){
this.alreadyexist = " User already exists please try different User Name"
      }
      else
      {
        alert("Somthing Went Wrong!!")
        window.location.reload()
      } 
    })
  }else{
    this.doNotPass = true
  }
 
}
}
