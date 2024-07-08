import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';

@Component({
  selector: 'app-qm',
  templateUrl: './qm.component.html',
  styleUrls: ['./qm.component.css']
})
export class QMComponent {
  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
  selectedCustomer:any;
  customerList:any;
  userName: string;
  roleId: string;
  IsLoggedIn: boolean;
  customerID: any;
  country: any;
  pincode: any;
  city: any;
  addressTwo: any;
  perticularCustomerData: any;
  addressOne: any;
  addressThree: any;
  state: any;
  machineNumber: null;
  salute: any;
  contactname: any;
  designation: any;
  email: any;
  selectedModel: any;
  mobile: any;
  contactdetailslist: any;
  contactDetails: any;
  selectedTemplate: any;
  templatelist:any;

  brochurelist: any;
  selectedBrochure: any;
  maillist: any;
  templateId: any;
  editcustomerID: any;
  enquiry: string = '';
  person1: string = '';
  person2: string = '';
  formattedDate: string;
  selectedCompanyName: any;
  contactId: any;
  contactName: any;
  tableLength: any;

  RefID: string = '';
  custID: any;
  value:string;
  selectedMachine: any;

  constructor(
    private masterSv:MasterService,
    private regSv: RegistrationService,
    private route: Router,
    private httpService: HttpClient,
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
    this.getTemplate();
    this.getBrochure();
    this.getMail();
    this.getRefNo();
  }

  isSelectedRow(id: any): boolean {
    return this.contactId === id;
}
  onClickRow(details: any) {
    this.contactId = details.id;
    this.contactName = details.contactName;
    console.log(this.contactId);
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

          this.regSv.GetCustomerContactDetailsForQM(this.custID).subscribe((result: any) => {
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
    this.custID = this.perticularCustomerData[0].customerID;
        this.addressOne = this.perticularCustomerData[0].addressOne;
        this.getPerticularCustomerContactDetailsForQM(this.perticularCustomerData[0].customerID);
        this.addressTwo = this.perticularCustomerData[0].addressTwo;
        this.addressThree = this.perticularCustomerData[0].addressThree;
        this.city = this.perticularCustomerData[0].city;
        this.pincode = this.perticularCustomerData[0].pincode;
        this.state = this.perticularCustomerData[0].state;
        this.country = this.perticularCustomerData[0].country;
      
      });
      
  }

  
  getTemplate(){
    this.masterSv.getTemplates().subscribe((response:any)=>{
      this.templatelist = response;
      console.log(this.templatelist);
      if(this.templatelist.length!=0){
        this.exporting=true;
      }
    })
  }

  onSelectTemplate(data: any) {
    this.selectedTemplate = data.target.value;
    console.log(this.selectedTemplate);
  }


  openTemplate() {
    if (!this.customerID) {
      alert("Please select a company name");
      return;
    }
  
    this.editcustomerID = this.customerID;
    this.templateId = this.selectedTemplate;
  
    switch (this.templateId) {
      case "1":
        this.route.navigate(['/quotation2015HT', this.editcustomerID]);
        break;
   
        case "2":
                this.route.navigate(['/quotation2015indollor', this.editcustomerID]);
                break;
            
              case "3":
                this.route.navigate(['/quotation2015', this.editcustomerID]);
                break;
          
          
              case "4":
                this.route.navigate(['/quotation2015z25', this.editcustomerID]);
                break;
        
        
                case "5":
                  this.route.navigate(['/quotation4020', this.editcustomerID]);
                  break;
                case "6":
                  this.route.navigate(['/quotation4020HT', this.editcustomerID]);
                  break;
              
                case "7":
                  this.route.navigate(['/quotation4020z25', this.editcustomerID]);
                  break;
            
            
                case "8":
                  this.route.navigate(['/quotation4030', this.editcustomerID]);
                  break;
        
                  case "9":
                this.route.navigate(['/quotation4030indollor', this.editcustomerID]);
                break;
              case "10":
                this.route.navigate(['/quotation4030z25', this.editcustomerID]);
                break;
            
              case "11":
                this.route.navigate(['/quotation5030', this.editcustomerID]);
                break;
          
          
              case "12":
                this.route.navigate(['/quotation5030z25jlx', this.editcustomerID]);
                break;
        
                case "13":
                this.route.navigate(['/rapiditable', this.editcustomerID]);
                break;
              case "14":
                this.route.navigate(['/rapid64-cam-acsc', this.editcustomerID]);
                break;
            
              case "15":
                this.route.navigate(['/rapid64', this.editcustomerID]);
                break;
          
          
              case "16":
                this.route.navigate(['/rapidi2015Iv2015JLX', this.editcustomerID]);
                break;
        
        
                case "17":
                this.route.navigate(['/rapidI5april2021', this.editcustomerID]);
                break;
              case "18":
                this.route.navigate(['/RapidIAMC', this.editcustomerID]);
                break;
            
              case "19":
                this.route.navigate(['/rapidispares', this.editcustomerID]);
                break;
          
          
              case "20":
                this.route.navigate(['/rapiditrainings', this.editcustomerID]);
                break;
        
        
                case "22":
                this.route.navigate(['/v4020', this.editcustomerID]);
                break;
              case "23":
                this.route.navigate(['/v4030', this.editcustomerID]);
                break;
            
              case "21":
                this.route.navigate(['/v2015-jlx', this.editcustomerID]);
                break;
          
          
              case "24":
                this.route.navigate(['/quotation4020indollor', this.editcustomerID]);
                break;
        
        
                case "25":
                this.route.navigate(['/rapidIVMC', this.editcustomerID]);
                break;
              
      default:
        alert("No Template available for this");
       
    }
  }
  

 


  getRefNo() {
    this.regSv.GetRefNo().subscribe((result: any) => {
      if (this.RefID == null || this.RefID == '') {
        this.tableLength = result.length + 1;
        this.RefID = this.tableLength.toString().padStart(3, '0');
  
       
        this.updateRefIDInTemplate();

    
      }
    });
  }
  
  updateRefIDInTemplate() {
 
    this.RefID = this.tableLength.toString().padStart(3, '0');
  }
  

  getBrochure(){
    this.masterSv.getBrochure().subscribe((response:any)=>{
      this.brochurelist = response;
      console.log(this.brochurelist)
      if(this.brochurelist.length!=0){
        this.exporting=true;
      }
    })
  }

  onSelectBrochure(data: any) {
    this.selectedBrochure = data.target.value;
  }

  getMail(){
    this.masterSv.getMail().subscribe((response:any)=>{
      this.maillist = response;
      console.log(this.maillist)
      if(this.maillist.length!=0){
        this.exporting=true;
      }
    })
  }

  onSelectMail(data: any) {
    this.selectedBrochure = data.target.value;
  }

  newCustReg() {
    this.route.navigate(['/newcustomerregistration']); 
}

getPerticularCustomerContactDetailsForQM(id: any) {
  this.regSv.GetCustomerContactDetailsForQM(id).subscribe((result: any) => {
    this.contactDetails = result;
    console.log(this.contactDetails);
  });
}

save(){

 
  // Create the templateData object
  const templateData = {
RefID : this.RefID,
  }

}
}