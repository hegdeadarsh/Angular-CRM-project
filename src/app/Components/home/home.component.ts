import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
userName: any;
roleId: any;
IsLoggedIn: any;
constructor(){
  if (localStorage.getItem('IsLoggedIn') == 'true'){
    this.userName = localStorage.getItem('UserName');
    this.roleId = localStorage.getItem('Role');
    this.IsLoggedIn = true;
  }
}
}
