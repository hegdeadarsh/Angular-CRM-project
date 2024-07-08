import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';


@Component({
  selector: 'app-request-and-interaction',
  templateUrl: './request-and-interaction.component.html',
  styleUrls: ['./request-and-interaction.component.css']
})
export class RequestAndInteractionComponent implements OnInit{
  requestForm: boolean = false;
  interactionForm: boolean = false;
  IsDone:boolean=false;
  machineNumber:any;
  model:any;
  customerName:any;
  data: any = [];
  addressOne: any;
  addressThree: any;
  addressTwo: any;
  city: any;
  country: any;
  customerId: any;
  gstin: any;
  invoiceAmount: any;
  invoiceDate: any;
  invoiceFileBlob: any;
  invoiceNumber: any;
  invoicePerticular: any;
  modelName: any;
  pincode: any;
  region: any;
  routeNumber: any;
  securityFormalities: any;
  state: any;
  unit: any;
  warrantyFrom: any;
  warrantyTill: any;
  weeklyOff: any;
  workingEnd: any;
  workingStart: any;
  zone: any;
  requestslist: any;
  sands:any;
  remarks:any;
  selectedrequest: any;
  userName:any;
  roleId: any;
  IsLoggedIn: any;
  sandslist: any;
  selectedsands: any;
  constructor(private regSv : RegistrationService,
    private masterSv : MasterService, private httpService: HttpClient,
    private route: Router){
      if (localStorage.getItem('IsLoggedIn') == 'true') {
        this.userName = localStorage.getItem('UserName');
        this.roleId = localStorage.getItem('Role');
        this.IsLoggedIn = true;
      }
    }
  ngOnInit(): void {
    this.getRequests();
    this.getSands();
  }
  getRequests() {
    this.masterSv.getRequests().subscribe((response: any) => {
      this.requestslist = response.map((requests: any) => ({
        label: requests.requestsName,
        value: requests.requestsId,
      }));
      console.log(this.requestslist);
    });
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
  onSelectRequest(){
    console.log(this.selectedrequest);
  }
  onSelectsands(){
    console.log(this.selectedsands);
  }
  request(){
    this.requestForm = true
    this.interactionForm = false
  }
  interaction(){
    this.interactionForm = true
    this.requestForm = false
  }
  onChangeMachineNumber(){
this.regSv.getMachineFromMachineNumber(this.machineNumber).subscribe((response : any)=>{
  if(response == null){
    alert("No Machine Found!!!")
  }else{
    this.data = response[0]
  console.log(this.data)
  this.addressOne = this.data.addressOne
  this.addressThree = this.data.addressThree
  this.addressTwo = this.data.addressTwo
  this.city = this.data.city
  this.country = this.data.country
  this.customerId = this.data.customerId
  this.customerName = this.data.companyName
  this.gstin = this.data.gstin
  this.invoiceAmount = this.data.invoiceAmount
  this.invoiceDate = this.data.invoiceDate
  this.invoiceFileBlob = this.data.invoiceFileBlob
  this.invoiceNumber = this.data.invoiceNumber
  this.invoicePerticular = this.data.invoicePerticular
  this.modelName = this.data.modelName
  this.pincode = this.data.pincode
  this.region = this.data.region
  this.routeNumber = this.data.routeNumber
  this.securityFormalities = this.data.securityFormalities
  this.state = this.data.state
  this.unit = this.data.unit
  this.warrantyFrom = this.data.warrantyFrom
  this.warrantyTill = this.data.warrantyTill
  this.weeklyOff = this.data.weeklyOff
  this.workingEnd = this.data.workingEnd
  this.workingStart = this.data.workingStart
  this.zone = this.data.zone
  }
})
  }
  saveRequest(){

    const frmData = new FormData();
    frmData.append("MachineNumber", this.machineNumber);
      frmData.append("CustomerId", this.customerId);
      frmData.append("CustomerName", this.customerName);
      
      //frmData.append("Features", this.selectedFeatures);
      frmData.append("RequestFor", JSON.stringify(this.selectedrequest));

      // Append the individual features to the FormData object
      this.selectedrequest.forEach((requestfor: string, index:number) => {
        frmData.append(`RequestFor[${index}]`, requestfor);
       // frmData.append(`Features[${index}].value`, feature.value);
      });


        
      //frmData.append("Features", this.selectedFeatures);
      frmData.append("SandS", JSON.stringify(this.selectedsands));

      // Append the individual features to the FormData object
      this.selectedsands.forEach((sands: string, index:number) => {
        frmData.append(`SandS[${index}]`, sands);
       // frmData.append(`Features[${index}].value`, feature.value);
      });
      

     // frmData.append("SandS", this.sands);
      frmData.append("Remarks", this.remarks);
     
      frmData.append("CreatedBy", this.userName);
  this.httpService.post('https://blockchainmatrimony.com/customermanagerapi/api/RequestAndInteractions/PostSaveRequestForm/',frmData).subscribe((data:any) => {
            if(data == "success"){
              alert("Request Saved");
              this.route.navigate(['/dashboard'])
            }else{
              alert("Somthing Went Wrong!!")
            }  
          })


//     var requestData = {
//       MachineNumber : this.machineNumber,
//       CustomerId : this.customerId,
//       CustomerName : this.customerName,
//      // RequestFor : this.selectedrequest,
//      // RequestForId
//       SandS : this.sands,
//      // SandSId : 
//       Remarks : this.remarks,
//       IsDone : false,
//       CreatedBy : this.userName
//     }
//     this.regSv.saveRequestFormData(requestData).subscribe((response : any)=>{
// if(response == "success"){
//   alert("Request Saved")
// }else{
//   alert("Somthing Went Wrong!!!")
// }
//     })
  }
}
