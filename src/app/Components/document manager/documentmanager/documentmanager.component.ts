import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/Services/MasterService/master.service';

import { RegistrationService } from 'src/app/Services/Registration/registration.service';

@Component({
  selector: 'app-documentmanager',
  templateUrl: './documentmanager.component.html',
  styleUrls: ['./documentmanager.component.css']
})
export class DocumentmanagerComponent {
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
  DocumentTypeList: any[] = [];
  docs: any;
  TemplateName:any;
  customerID: any;
  perticularMachineData: any;
  machineList: any[];
  companyName: any;
  custID: any;
  getPerticularCustomerContactDetails: any[];
  features: any;
  invoicePerticular: any;
  machineSelected: boolean;
  selectedrequest: null;
  selectedMachine: string | Blob;
  MachineNo: string | Blob;
  selectedsands: any;
  Resolution: string | Blob;
  foult: string | Blob;
  contactDetails: any;
  documentID: any;
  spinner: any;
  templateID: any;
  TemplateList:any;
  getPerticularDocumentType: any;
  selectedmailtemplate: any;
  MailTemplateList:any;
  template:any;
DocumentType: any;
  documentTypeId: any;
  selectedTemplate: any;
  ModeofTransportList: any;
  selectedmodeoftransport: any;
  value: string;
RefID: any;
  tableLength: any;
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
    this.value = new Date().toISOString().substring(0, 10);

  }
  ngOnInit(): void {
    this.getCustomer();
    this.getModel();
    this.getFeatures();
    this.getInvoicePerticular();
    this.getDocumentTypes();
    this.getmailtemplate();
    this.getTemplate();
    this.getModeofTransport();
  }
  getInvoicePerticular() {
    this.masterSv.getInvoicePerticular().subscribe((response: any) => {
      this.invoiceperticularlist = response;
      console.log(this.invoiceperticularlist);
    });
  }
  getFeatures() {
    
    this.masterSv.getFeatures().subscribe((response: any) => {
      this.featureslist = response.map((feature: any) => ({
        label: feature.featuresName,
        value: feature.featuresId,
      }));
      console.log(this.featureslist);
    });
  }

  getDocumentTypes() {
    this.masterSv.getDocumentType().subscribe((data: any) => {
      this.DocumentTypeList = data;
      console.log(this.DocumentTypeList);
    });
  }
  getTemplate() {
    this.masterSv.getTemplate().subscribe((response: any) => {
      this.TemplateList = response;
      console.log(this.TemplateList);
    });
  }
  getmailtemplate(){
    this.masterSv.getMailTemplate().subscribe((response:any)=>{
      this.MailTemplateList = response;
      console.log(this.MailTemplateList)
    })
  }

  getModeofTransport(){
    this.masterSv.getModeofTransport().subscribe((response:any)=>{
      this.ModeofTransportList = response;
      console.log(this.ModeofTransportList)
    })
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
  
  // getRefNo() {
  //   this.regSv.GetRefNo().subscribe((result: any) => {
  //     if (this.RefID == null || this.RefID == '') {
  //       this.tableLength = result.length + 1;
  //       this.RefID = this.tableLength.toString().padStart(3, '0');
  
       
  //       this.updateRefIDInTemplate();

    
  //     }
  //   });
  // }
  updateRefIDInTemplate() {
    throw new Error('Method not implemented.');
  }
  addContactDetails() {
    if (this.contactname == null || this.contactname == "") {
      alert('Please enter Contact name');
    } else if (this.mobile == null || this.mobile == "") {
      alert('Please enter Mobile number');
    } else {
      var contactdata = {
        Salute: this.salute,
        ContactName: this.contactname,
        Designation: this.designation,
        Email: this.email,
        Mobile: this.mobile,
        MachineId: this.selectedMachine,
        MachineNumber: this.selectedMachine,
        CustomerId: this.custID,
        CreatedBy: this.userName,
      };

      this.regSv.postcontactdetailsqm(contactdata).subscribe((response: any) => {
        if (response != null) {
          alert('Contact added successfully!');

          this.regSv.getCustomerContactDetails(this.custID).subscribe((result: any) => {
            this.contactDetails = result;
            console.log(this.contactDetails);
          });


          this.salute = '';
          this.contactname = '';
          this.designation = '';
          this.email = '';
          this.mobile = '';
        } else {
          alert('Something Went Wrong!!!');
        }
      });
    }
  }
 
  onSelectCompany(data: any) {
    this.customerID = data.customerID;
    this.regSv
      .getPerticularCustomer(this.customerID)
      .subscribe((response: any) => {
        this.perticularCustomerData = response;
    this.custID = this.perticularCustomerData[0].customerID;
        this.addressOne = this.perticularCustomerData[0].addressOne;
        this.getPerticularCustomerContactDetailss(this.perticularCustomerData[0].customerID);
        this.addressTwo = this.perticularCustomerData[0].addressTwo;
        this.addressThree = this.perticularCustomerData[0].addressThree;
        this.city = this.perticularCustomerData[0].city;
        this.pincode = this.perticularCustomerData[0].pincode;
        this.state = this.perticularCustomerData[0].state;
        this.country = this.perticularCustomerData[0].country;
      
      });
      
  }
  clear() {
    window.location.reload();
  }

 
  onSelectModel(data: any) {
    this.selectedModel = data.target.value;
  }
   
  onSelectmodeoftransport(data: any) {
    this.selectedmodeoftransport = data.target.value;
  }
  
  onSelectInvoiceperticular(data: any) {
    this.selectedinvoiceperticular = data.target.value;
  }
  
  onSelectFeature(): void {
    console.log(this.selectedFeatures);
  }
 

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
this.httpService.post('https://blockchainmatrimony.com/customermanagerapi/customermanagerapi/api/MachineRegistration/UploadInvoice/',frmData).subscribe((data:any) => {
          if(data == "success"){
            alert("Document Uploaded Successfully!!")
          }else{
            alert("Somthing Went Wrong!!")
          }  
        })
}

 getPerticularCustomerContactDetailss(id: any) {
  this.regSv.getCustomerContactDetailss(id).subscribe((result: any) => {
    this.contactDetails = result;
     console.log(this.contactDetails);
  });
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

  navigateCustomerRegistrationComponent() {
    // Navigate to the '/mailquotationtemplate' route
    this.route.navigate(['/newcustomerregistration']);
}




OnselectDocumentType(event: any) {
  this.documentTypeId = event.target.value;
  this.masterSv.getPerticularDocumentType(this.documentTypeId).subscribe((Data: any) => {
    this.TemplateList = Data;
    console.log(this.TemplateList);
    
  });
}




OnselectTemplate(event: any) {
  this.selectedTemplate = event.target.value;
  this.spinner.show();

  setTimeout(() => {
    this.spinner.hide();
  }, 1000);
}

onselectemailtemplate(selectedValue: any) {
  this.selectedmailtemplate = selectedValue;
}

}



