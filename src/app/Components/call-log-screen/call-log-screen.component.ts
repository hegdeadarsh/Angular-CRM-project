import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, interval, map, startWith } from 'rxjs';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';

@Component({
  selector: 'app-call-log-screen',
  templateUrl: './call-log-screen.component.html',
  styleUrls: ['./call-log-screen.component.css']
})
export class CallLogScreenComponent {
  machineNumber: any;
  requestlist: any;
  contactData: any;
  selectedCustomer: any;
  customerList: any;
  perticularCustomerData: any;
  unit: any;
  addressOne: any;
  addressTwo: any;
  addressThree: any;
  city: any;
  pincode: any;
  state: any;
  country: any;
  gstin: any;
  cluster: any;
  routeNo: any;
  zone: any;
  region: any;
  weeklyOff: any;
  workingStart: any;
  workingEnd: any;
  securityFormalities: any;
  customerID: any;
  companyName: any;
  selectedMachine:any;
  custID: any;

  perticularCustomerInvoiceData: any;
  warrantyTill: any;
  warrantyFrom: any;
  features: any;
  tableLength: any;
  ManuscriptNo: any;
  MachineNo: any;
  interactiondata: any;
  requestslist: any = [];
  selectedCallEntry: any;
  Priority: any;
  priority: any;
  selectedPriority: any;
  selpriority: any;
  foult: any;
  Resolution: any;
  selectedRequest: any;
  selectedrequest: any;
  sandslist: any;
  selectedsands: any;
  userName: any;
  roleId: any;
  IsLoggedIn: any;
  invoicePerticular: any;
  machineList: any;
  perticularMachineData: any;
 
  constructor(private regSv: RegistrationService ,
     private masterSv: MasterService , private httpService: HttpClient,
     private route: Router){ if (localStorage.getItem('IsLoggedIn') == 'true') {
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
  }
  ngOnInit(): void {
    this.getCustomer();
    this.getTokenNo();
    this.getRequests();
    this.getSands();
   
    // this.getAttendedBybyid(this.customerID);
  }
   public value = new Date();

  //  getAttendedBybyid(data:any){
  //   this.customerID = data.customerID;
  //   this.regSv
  //   .getAttendedby(this.customerID)
  //     .subscribe((response: any) => {
  //       if (response == null) {
  //         alert("No User Found!!!")
  //       } else {
  //       this.interactiondata = response;
  //       }
  //  });
  // }

  getRequests() {
    this.masterSv.getRequests().subscribe((response: any) => {
      const mappedRequests: { label: string; value: any }[] = response.map((requests: any) => ({
        label: requests.requestsName,
        value: requests.requestsId,
      }));
      this.requestslist = mappedRequests.sort((a: { label: string }, b: { label: string }) =>
        a.label.localeCompare(b.label)
      );
  
      console.log(this.requestslist);
    });
  }
  getTokenNo() {
    this.regSv.GetMachineId().subscribe((result: any) => {
      this.tableLength = result.length + 1; // Assuming result is an array or collection
      this.MachineNo = this.generateMachineNo(this.tableLength);
    })
  }
  getSands() {
    this.masterSv.getSands().subscribe((response: any) => {
      this.sandslist = response.map((sands: any) => ({
        label: sands.sandsName,
        value: sands.sandsId,
      }));
      console.log(this.sandslist);
    })
  }
  generateMachineNo(tableLength: number): string {
    // Ensure tableLength is a single digit (0-9)
    if (tableLength < 0) {
      tableLength = 0;
    } else if (tableLength > 9) {
      tableLength = 9;
    }
    // Create a 5-digit number with the last digit as tableLength
    const paddedTableLength = tableLength.toString().padStart(4, '0');
    return paddedTableLength;
  }
  
  onRowClick(machineNumber: string) {
    this.selectedMachine = machineNumber;
    console.log(this.selectedMachine);
    this.onChangeMachineNumber();
  }
   onChangeMachineNumber() {
    this.regSv.getMachineFromMachineNumber(this.selectedMachine).subscribe((response: any) => {
      if (response == null) {
        alert("No Machine Found!!!")
      } else {
        this.perticularCustomerData = response;       
        console.log(this.perticularCustomerData);
        this.selectedCustomer = this.perticularCustomerData[0].companyName;
        this.custID=this.perticularCustomerData[0].customerId;
        this.companyName = this.perticularCustomerData[0].companyName;
        this.GetInvoicesCustomer(this.perticularCustomerData[0].customerId);
        console.log(this.perticularCustomerData[0].customerId);
        this.unit = this.perticularCustomerData[0].unit;
        this.addressOne = this.perticularCustomerData[0].addressOne;
        this.addressTwo = this.perticularCustomerData[0].addressTwo;
        this.addressThree = this.perticularCustomerData[0].addressThree;
        this.city = this.perticularCustomerData[0].city;
        this.pincode = this.perticularCustomerData[0].pincode;
        this.state = this.perticularCustomerData[0].state;
        this.country = this.perticularCustomerData[0].country;
        this.gstin = this.perticularCustomerData[0].gstin;
        this.cluster = this.perticularCustomerData[0].cluster;
        this.routeNo = this.perticularCustomerData[0].routeNumber;
        this.region = this.perticularCustomerData[0].region;
        this.zone = this.perticularCustomerData[0].zone;
        this.weeklyOff = this.perticularCustomerData[0].weeklyOff;
        this.workingStart = this.perticularCustomerData[0].workingStart;
        this.workingEnd = this.perticularCustomerData[0].workingEnd;
        this.warrantyFrom = this.perticularCustomerData[0].warrantyFrom;
          this.warrantyTill = this.perticularCustomerData[0].warrantyTill;
          this.features = this.perticularCustomerData[0].features;
          this.invoicePerticular = this.perticularCustomerData[0].invoicePerticular;

        this.securityFormalities =
          this.perticularCustomerData[0].securityFormalities;
       
      }
      console.log('Selected Machine Number:', this.selectedMachine);
    })
  }
  onSelectCompany(data: any){
    this.customerID = data.companyName;
    // this.regSv
    // .getPerticularCustomer(this.customerID)
    //   .subscribe((response: any) => {
    //     if (response!= null) {
    //       this.perticularCustomerData = response;
    //       this.companyName = this.perticularCustomerData[0].companyName;
    //       this.custID=this.perticularCustomerData[0].customerId;
    //       this.GetInvoicesCustomer(this.perticularCustomerData[0].customerId);
    //       console.log(this.perticularCustomerData[0].customerId);  
    //       this.GetMachineInLocation();
          
    //       this.unit = this.perticularCustomerData[0].unit;
    //       this.addressOne = this.perticularCustomerData[0].addressOne;
          
    //       this.addressThree = this.perticularCustomerData[0].addressThree;
    //       this.city = this.perticularCustomerData[0].city;
    //       this.pincode = this.perticularCustomerData[0].pincode;
    //       this.state = this.perticularCustomerData[0].state;
    //       this.country = this.perticularCustomerData[0].country;
    //       this.gstin = this.perticularCustomerData[0].gstin;
    //       this.cluster = this.perticularCustomerData[0].cluster;
    //       this.routeNo = this.perticularCustomerData[0].routeNumber;
    //       this.region = this.perticularCustomerData[0].region;
    //       this.zone = this.perticularCustomerData[0].zone;
    //       this.weeklyOff = this.perticularCustomerData[0].weeklyOff;
    //       this.workingStart = this.perticularCustomerData[0].workingStart;
    //       this.workingEnd = this.perticularCustomerData[0].workingEnd;
    //       this.warrantyFrom = this.perticularCustomerData[0].warrantyFrom;
    //       this.warrantyTill = this.perticularCustomerData[0].warrantyTill;
    //       this.features = this.perticularCustomerData[0].features;
    //       this.invoicePerticular = this.perticularCustomerData[0].invoicePerticular;
    //       this.securityFormalities =
    //         this.perticularCustomerData[0].securityFormalities;
    //     } else {
    //       alert("No Requests Found For Selected Customer!!!")
    //     }
    //   });
      this.regSv.getMachineInLocation(this.customerID)
    .subscribe((response: any) => {
      if (response == null) {
        alert("No Machine Found!!!");
      } else {
        this.perticularMachineData = response;       
        console.log(this.perticularMachineData);

        // Clear existing machineList and then populate with new data
        this.machineList = [];

        // Loop through the machines and populate the machineList
        for (const machine of this.perticularMachineData) {
          this.machineList.push({
            machineNumber: machine.machineNumber,
            machineInLocation: machine.machineInLocation
          });
        }
      } 
    });
  }

  GetMachineInLocation(){
  
  }

  saveRequest(){
if(this.selectedMachine == null || this.selectedMachine == ""){
  alert('Machine Number is required');
}else if(this.selectedrequest == null || this.selectedrequest == ""){
  alert('Please select request type');
 }
 //else if(this.selectedsands == null || this.selectedsands == ""){
//   alert('Please select S and S');
// }
else {
    const frmData = new FormData();
    frmData.append("MachineNumber", this.selectedMachine);
      frmData.append("CustomerId", this.custID);
      frmData.append("CustomerName", this.companyName);
      frmData.append("TokenNo",this.MachineNo);

      frmData.append("RequestFor", JSON.stringify(this.selectedrequest));

      this.selectedrequest.forEach((requestfor: string, index:number) => {
        frmData.append(`RequestFor[${index}]`, requestfor);
      });

      frmData.append("SandS", JSON.stringify(this.selectedsands));

      frmData.append("Remarks", this.foult);
     
      frmData.append("CreatedBy", this.userName);
      this.httpService.post('https://blockchainmatrimony.com/customermanagerapi/customermanagerapi/api/RequestAndInteractions/PostSaveRequestForm/', frmData).subscribe((data: any) => {
        if (data == "success") {
          alert("Request Saved");
          this.route.navigate(['/dashboard'])
        } else {
          alert("Somthing Went Wrong!!")
        }
      })
    }
  }

  onSelectCallEntry() {
    if (this.selectedCallEntry) {
      const selectedRequest = this.requestslist.find((requestslist: any) => requestslist.requestsId === this.selectedCallEntry);
      if (selectedRequest) {
        this.selectedPriority = selectedRequest.priority;
      }
    }
  }
  onSelectRequest(){
    console.log(this.selectedrequest);
  }onSelectsands(){
    console.log(this.selectedsands);
  }
  
  GetInvoicesCustomer(id:any){
    this.regSv
    .getPerticularCustomerInvoice(id)
    .subscribe((response: any) => {
      this.perticularCustomerInvoiceData = response;
      console.log(this.perticularCustomerInvoiceData);

    });
  }
  getCustomer() {
    this.regSv.getCustomer().subscribe((response: any) => {
      this.customerList = response;
      console.log(this.customerList);
    });
  }
}
