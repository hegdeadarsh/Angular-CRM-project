import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';

@Component({
  selector: 'app-locationdetails',
  templateUrl: './locationdetails.component.html',
  styleUrls: ['./locationdetails.component.css']
})
export class LocationdetailsComponent {
  perticularCustomerData: any;
  userName: any;
  IsLoggedIn: any;
  roleId: any;
  machineList: any;
  customerList: any;
  selectedCustomer:any;
  selectedModel: any;

 
  roadCondition: any;
  locationType: any;
  nearbyLodge:any;
  nearbyPetrolBunk: any;
  bestLodge: any;
  nearbyMedicalShops: any;
  nearbyHospital:any;
  nearbyMechanicShops: any;
  whatToCarry:any;
  textarea:any;
  machineNumber: any;
  customerID: any;
  companyName: any;
  MachineNumber: any;
 
  hotelType: any;
  CutomerName:any;
  besthotels: any;
  custID: any;
  selectedCustomerid: any;

  ClusterId: any;

 
  constructor(
    private regSv: RegistrationService,

    private httpService: HttpClient,
    private route : Router
  ) {
    if (localStorage.getItem('IsLoggedIn') == 'true') {
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
  }
  ngOnInit(): void {
  }





  onChangeMachineNumber() {
    this.regSv.getMachineFromMachineNumber(this.machineNumber).subscribe((response: any) => {
      if (response == null) {
        alert("No Machine Found!!!")
      } else {
        this.perticularCustomerData = response;
        console.log(this.perticularCustomerData);
        this.selectedCustomer = this.perticularCustomerData[0].companyName;
        this.ClusterId = this.perticularCustomerData[0].clusterId;
      this.selectedCustomerid= this.perticularCustomerData[0].customerId;
      }
    })
  }

  // onSelectCompany(data: any) {
  //   this.customerID = data.customerID;
  //   this.regSv
  //     .getPerticularCustomer(this.customerID)
  //     .subscribe((response: any) => {
  //       if (response != null) {
  //         this.perticularCustomerData = response;
  //         this.selectedCustomer = this.perticularCustomerData[0].companyName;
  //         this.customerID = this.perticularCustomerData[0].id;
  //         this.clusterId=this.perticularCustomerData[0].id;
  //       } else {
  //         alert("No Requests Found For Selected Customer!!!")
  //       }
  //     });
  // }
  savelocationdetails() {
    if (this.machineNumber == null || this.machineNumber == '') {
      alert("Please Enter Machine Number");
    } else if (this.selectedCustomer == null || this.selectedCustomer == '') {
      alert("Please Select Customer");
    }else if (this.roadCondition == null || this.roadCondition == '') {
      alert("Please Select Road Condition");
    }
    else if  (this.locationType == null || this.locationType == '') {
      alert("Please Select Location Type");
    } else if (this.nearbyLodge == null || this.nearbyLodge == '') {
      alert("Please Enter Nearby Lodge");
    }else if (this.nearbyPetrolBunk == null || this.nearbyPetrolBunk == '') {
      alert("Please Enter Nearby Petrolbunk");
    }
    else if  (this.hotelType == null || this.hotelType == '') {
      alert("Please Select Hotel Type");
    } else if (this.besthotels == null || this.besthotels == '') {
      alert("Please Enter Best Hotels");
    }else if (this.nearbyMedicalShops == null || this.nearbyMedicalShops == '') {
      alert("Please Enter Nearby MedicalShops");
    }
    else if (this.nearbyHospital == null || this.nearbyHospital == '') {
      alert("Please Enter Nearby Hospital");
    } else if (this.nearbyMechanicShops == null || this.nearbyMechanicShops == '') {
      alert("Please Enter Nearby MechanicShops");
    }else if (this.whatToCarry == null || this.whatToCarry == '') {
      alert("Please Enter what to carry");
    } else if (this.textarea == null || this.textarea == '') {
      alert("Please Enter TextArea");
    } else {

    const frmData = new FormData();
  
    frmData.append("MachineNumber", this.machineNumber);
      frmData.append("CustomerName", this.selectedCustomer);
      frmData.append("clusterId", this.ClusterId);

      frmData.append("ModelId", this.selectedModel);
      frmData.append("CustomerId", this.selectedCustomerid);
      frmData.append("RoadCondition", this.roadCondition);
      frmData.append("InsideCityOutsideCity",this.locationType);
      frmData.append("NearbyLodge", this.nearbyLodge);
      frmData.append("NearbyPetrolBunk", this.nearbyPetrolBunk);
      frmData.append("hotelType", this.hotelType); 
      frmData.append("besthotels", this.besthotels); 
      frmData.append("NearbyMedicalShop", this.nearbyMedicalShops);
      frmData.append("NearbyHospital", this.nearbyHospital);
      frmData.append("NearbyMechanicShops", this.nearbyMechanicShops);
      frmData.append("WhatToCarry", this.whatToCarry);
      frmData.append("TextArea", this.textarea);
      frmData.append("CreatedBy", this.userName);

  this.httpService.post('https://blockchainmatrimony.com/customermanagerapi/customermanagerapi/api/MachineRegistration/LocationDetails/',frmData).subscribe((data:any) => {
            if(data == "success"){
              alert("Saved Successfully");
            //  this.route.navigate(['/locationDetailslist'])
            }else{
              alert("Somthing Went Wrong!!")
              window.location.reload()
            }  
          })



        }
  }
}
