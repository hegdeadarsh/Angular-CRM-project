import { Component } from '@angular/core';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent {
  customerList: any=[];
  noofCustomers: any;
  pendingrequestlist: any;
  noofpendingrequest: any;
  constructor(private regSv:RegistrationService){}
  ngOnInit(): void {
    this.getCustomer();
    this.getPendingrequest();
  }
  getCustomer() {
    this.regSv.getCustomer().subscribe((response: any) => {
      this.customerList = response;
      this.noofCustomers = this.customerList.length
      console.log(this.customerList);
    });
  }
  getPendingrequest() {
    this.regSv.GetPendingRequestsfordashboard().subscribe((response: any) => {
      this.pendingrequestlist = response;
      this.noofpendingrequest = this.pendingrequestlist.length
      console.log(this.noofpendingrequest);
    });
  }
}
