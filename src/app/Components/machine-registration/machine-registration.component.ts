import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';

@Component({
  selector: 'app-machine-registration',
  templateUrl: './machine-registration.component.html',
  styleUrls: ['./machine-registration.component.css'],
})
export class MachineRegistrationComponent implements OnInit {
  customerList: any;
  modellist: any;
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
  region: any;
  zone: any;
  weeklyOff: any;
  workingStart: any;
  workingEnd: any;
  securityFormalities: any;
  userName: any;
  roleId: any;
  IsLoggedIn: any;
  selectedCustomer: any;
  perticularCustomerData: any;
  selectedModel: any;
  invoiceNumber: any;
  invoicedoc: any;
  invoiceamount: any;
  invoicedate: any;
  selectedFeatures: any = [];
  featureslist: any;
  invoiceperticularlist: any;
  selectedinvoiceperticular: any;
  warrantyTill: any;
  warrantyFrom: any;
  machineNumber: any;
  mobile: any;
  email: any;
  dueamount:any;
  designation: any;
  contactname: any;
  salute: any;
  selectedOptions: any = [];
  contactdetailslist: any = [];
  files2: any;
  docs: any;
  customerID: any;
  constructor(
    private regSv: RegistrationService,
    private masterSv: MasterService,
    private httpService: HttpClient,
    private route: Router
  ) {
    if (localStorage.getItem('IsLoggedIn') == 'true') {
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
  }
  ngOnInit(): void {
    this.getCustomer();
    this.getModel();
    this.getFeatures();
    this.getInvoicePerticular();
  }
  getInvoicePerticular() {
    this.masterSv.getInvoicePerticular().subscribe((response: any) => {
      this.invoiceperticularlist = response;
      console.log(this.invoiceperticularlist);
    });
  }
  getFeatures() {
    // this.masterSv.getFeatures().subscribe((response:any)=>{
    //   this.featureslist = response;
    //   console.log(this.featureslist)
    // })
    this.masterSv.getFeatures().subscribe((response: any) => {
      this.featureslist = response.map((feature: any) => ({
        label: feature.featuresName,
        value: feature.featuresId,
      }));
      console.log(this.featureslist);
    });
  }
  getModel() {
    this.masterSv.getModel().subscribe((response: any) => {
      this.modellist = response;
      console.log(this.modellist);
    });
  }
  getCustomer() {
    this.regSv.getCustomer().subscribe((response: any) => {
      this.customerList = response;
      console.log(this.customerList);
    });
  }
  onSelectCompany(data: any) {
    this.customerID = data.customerID;
    this.regSv
      .getPerticularCustomer(this.customerID)
      .subscribe((response: any) => {
        this.perticularCustomerData = response;
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
        this.securityFormalities =
          this.perticularCustomerData[0].securityFormalities;
      });
  }
  onSelectModel(data: any) {
    this.selectedModel = data.target.value;
  }
  
  onSelectInvoiceperticular(data: any) {
    this.selectedinvoiceperticular = data.target.value;
  }
  // onSelectFeature(data: any) {
  //   this.selectedFeatures = data.target.value;
  // }
  onSelectFeature(): void {
    console.log(this.selectedFeatures);
  }
  addContactDetails() {
    if (this.machineNumber != null && this.customerID != null) {
      var contactdata = {
        Salute: this.salute,
        ContactName: this.contactname,
        Designation: this.designation,
        Email: this.email,
        Mobile: this.mobile,
        MachineId: this.machineNumber,
        MachineNumber: this.machineNumber,
        CustomerId: this.selectedCustomer.customerID,
        CreatedBy: this.userName,
        ModelID:this.selectedModel
      };
      this.regSv.postcontactdetails(contactdata).subscribe((response: any) => {
        if (response != null) {
          this.contactdetailslist = response;
          console.log(this.contactdetailslist)
        } else {
          alert('Something Went Wrong!!!');
        }
      });
      this.salute = '';
      this.contactname = '';
      this.designation = '';
      this.email = '';
      this.mobile = '';
    } else {
      alert('Please select Customer/ Enter Machine Number');
    }
  }
//   OnselectFile(event:any) {
//     if(this.machineNumber == null){
//         alert("Please Enter The Machine Number")
//     }else if(this.selectedCustomer == null){
//         alert("Plase Select The Customer")
//     }else if(this.invoiceNumber == null){
//         alert("Plase Enter The Invoice Number")  
//     }else{
//       var fileslist2 = "";
//       this.files2 = [].slice.call(event.target.files);
//       fileslist2 = this.files2[0];
//       this.docs = fileslist2;
//       const frmData = new FormData();
//       frmData.append("MachineNumber", this.machineNumber);
//       frmData.append("CustomerId", this.selectedCustomer);
//       frmData.append("CreatedBy", this.userName);
//       frmData.append("InvoiceNumber", this.invoiceNumber);
//       frmData.append("document", this.docs);
//   this.httpService.post('https://blockchainmatrimony.com/customermanagerapi/api/MachineRegistration/UploadInvoice/',frmData).subscribe((data:any) => {
//             {
//               alert("Uploaded Successfully!!")
//             }  
//           })
//     }
// }
onselectdoc(event: any) {
  var fileslist2 = "";
  this.files2 = [].slice.call(event.target.files);
  fileslist2 = this.files2[0];
  this.docs = fileslist2;
}
uploadInvoice(){
  const frmData = new FormData();
  frmData.append("MachineNumber", this.machineNumber);
    frmData.append("CustomerId", this.selectedCustomer.customerID);
    frmData.append("ModelId", this.selectedModel);
    frmData.append("CreatedBy", this.userName);
    frmData.append("InvoiceNumber", this.invoiceNumber);
    frmData.append("document", this.docs);
    frmData.append("InvoiceAmount",this.invoiceamount);
    frmData.append("DueAmount",this.dueamount);
this.httpService.post('https://blockchainmatrimony.com/customermanagerapi/api/MachineRegistration/UploadInvoice/',frmData).subscribe((data:any) => {
          if(data == "success"){
            alert("Document Uploaded Successfully!!")
          }else{
            alert("Somthing Went Wrong!!")
          }  
        })
}
  registerMachine() {
    const frmData = new FormData();
    frmData.append("MachineNumber", this.machineNumber);
      frmData.append("ModelId", this.selectedModel);
      frmData.append("CustomerId", this.selectedCustomer.customerID);
      
      //frmData.append("Features", this.selectedFeatures);
      frmData.append("Features", JSON.stringify(this.selectedFeatures));

      // Append the individual features to the FormData object
      this.selectedFeatures.forEach((feature: string, index:number) => {
        frmData.append(`Features[${index}]`, feature);
       // frmData.append(`Features[${index}].value`, feature.value);
      });
      
      frmData.append("InvoiceNumber", this.invoiceNumber);
      frmData.append("InvoiceDate", this.invoicedate);
      frmData.append("InvoiceAmount", this.invoiceamount);
      frmData.append("DueAmount",this.dueamount);
      frmData.append("InvoicePerticularId", this.selectedinvoiceperticular);
      frmData.append("WarrantyFrom", this.warrantyFrom);
      frmData.append("WarrantyTill", this.warrantyTill);
      frmData.append("CreatedBy", this.userName);
  this.httpService.post('https://blockchainmatrimony.com/customermanagerapi/api/MachineRegistration/PostMachineRegistration/',frmData).subscribe((data:any) => {
            if(data == "success"){
              alert("Machine Registartion Successfull");
              this.route.navigate(['/machineLists'])
            }else{
              alert("Somthing Went Wrong!!")
            }  
          })




  }
}
