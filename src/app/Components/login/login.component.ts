import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
interface LoginResponse{
  token :string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email:any;
  password:any;
  loginFailed: any;
  constructor(private http:HttpClient,
    private route:Router){}
  ngOnInit(): void {
  }
  login(){
    this.http.post<LoginResponse>('https://blockchainmatrimony.com/customermanagerapi/api/Login/Login',{username:this.email, password:this.password}).subscribe(
      (response:any)=>{
        if(response == "fail"){
          this.loginFailed = "Invalid Credentials!!!"
        }else{
          localStorage.setItem('token', response.token);
          localStorage.setItem('UserName', response.userName);
          localStorage.setItem('UserID',response.userId);
          localStorage.setItem('Role', response.roleId);
          localStorage.setItem('IsLoggedIn', 'true');
          this.route.navigate(['/dashboard']).then(()=>{
            window.location.reload()
          })

        }
      }
    )
        }
}
