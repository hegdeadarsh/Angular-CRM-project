import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
userName: any;
roleId: any;
IsLoggedIn: any;
constructor(private router:Router){
  if (localStorage.getItem('IsLoggedIn') == 'true'){
    this.userName = localStorage.getItem('UserName');
    this.roleId = localStorage.getItem('Role');
    this.IsLoggedIn = true;
  }
}
logout() {
  this.IsLoggedIn = false;
  localStorage.setItem("IsLoggedIn", "false");
  localStorage.removeItem('token');
  localStorage.clear();
  this.router.navigate(['/home']).then(()=>{
    window.location.reload();
  });
}
}
