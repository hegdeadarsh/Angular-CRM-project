import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rapidi64-cam-acsc',
  templateUrl: './rapidi64-cam-acsc.component.html',
  styleUrls: ['./rapidi64-cam-acsc.component.css']
})
export class Rapidi64CamACSCComponent {
  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
  RefNo: any;
  tableLength: any;
  generateMachineNo: any;
  userName: any;
  roleId:any;
  IsLoggedIn: any;
  RefID:any ;
  billingAddress:any;
  reflist:any;
  customerList: any;
  customer:any;
  customerID: any;
  selectedPerticularaddress: any;
  EditBillingAddress: boolean;
  selectedcustID: any;
  customerdata: any;

editableDesQty:string='1 set';
editableDesPrice:number=62500;
editableACSCQty: string = '1 set';
editableACSCPrice:number=45600;

  ACSCQty: string = '1 Set';
  ACSCPrice: number =45600 ; 

  DesQty: string = '1 Set';
  DesPrice: number =62500 ; 
  TemplateName:string="Rapid64 CAM-ACSC";
  TemplateID: any;
  CustomerName: any;
  KindAttention: any;
  TotalAmount: any;

  constructor(private regSv:RegistrationService , private router: ActivatedRoute, private route: Router){
    if (localStorage.getItem('IsLoggedIn') == 'true'){
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
 
  
  this.router.params.subscribe(params => {
    if (params["id"]) {
      this.customerID = params["id"];
    }
  });
  window.scrollTo(0, 0);

  }


  ngOnInit(): void {
    this.getRefNo(); 
    this.getBillingAddress();
   
  }


  print (printSectionId) {
    var innerContents = document.getElementById(printSectionId).innerHTML;
    var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=yes');
    popupWinindow.document.open();
    popupWinindow.document.write('<html> <head><style> '+ '.sign{text-align:right;margin-left:-25px} '+ ' .logo{text-align:right;margin-right:-5px;top:0;right:0;} .   ' + ' .abc{background-color: rgb(212, 212, 212)} '+ '  </style>  </head><body onload="window.print()">' + innerContents + '</html>');
    popupWinindow.document.close();
    //window.print();
  };

  public value = new Date();


getBillingAddress(){
    this.selectedcustID= this.customerID;
    this.regSv.getCustomerBillingAddress(this.selectedcustID).subscribe((result: any) => {
      this.customerdata = result;
      console.log(this.customerdata);
      this.billingAddress=this.customerdata[0].billingAddress;
      this.EditBillingAddress = false;
  });
}

  getRefNo() {
    this.regSv.GetRefNo().subscribe((result: any) => {
      if (this.RefID == null || this.RefID == '') {
        this.tableLength = result.length + 1;
        this.RefID = this.tableLength.toString().padStart(3, '0'); // Assuming result is an array or collection
      }
    });
  }

  updateTemplate() {
  
    const previousValues = {
      ACSCQty:this.ACSCQty,
      ACSCPrice:this.ACSCPrice,
      DesQty:this.DesQty,
      DesPrice:this.DesPrice,
    }
    this.ACSCQty = this.editableACSCQty;
    this.ACSCPrice = this.editableACSCPrice;  
    this.DesQty = this.editableDesQty;
    this.DesPrice = this.editableDesPrice;
    const changesMade = Object.keys(previousValues).some(key => previousValues[key] !== this[key]);
    if (changesMade) {
       alert('Changes made successfully.');
     } else {
       alert('No changes made or something went wrong.');
     }
   
     // Reset the editable values
    //  this.resetEditableValues();
   }
  //  resetEditableValues() {
     
  //      this.editableQty = null;
  //      this.editablePrice = null;
  //      this.editabledesQty = null;
  //      this.editabledesPrice = null;
  //  }

  fetchTemplate() {
    this.regSv.getRapid64CAMdetails(this.RefID).subscribe((response: any) => {
      if (response) {

      this.billingAddress = response.billingAddress;
      this.ACSCPrice = response.acscPrice;
  
      this.ACSCQty = response.acscQty;
      this.DesPrice = response.desPrice;
  
      this.DesQty = response.desQty;
     
  this.TemplateName=response.templateName ;
       this.KindAttention = response.KindAttention;
       alert("Details for RefID present");
      }
      else {
        alert("RefID not present. Please enter a valid RefID.");
      }
    });
  }
  save(){
    this.TotalAmount = this.DesPrice + this.ACSCPrice;
   
    // Create the templateData object
    const templateData = {
      RefID : this.RefID,
      billingAddress:this.billingAddress,
      ACSCPrice:this.ACSCPrice,
      ACSCQty:this.ACSCQty,
      DesPrice:this.DesPrice,
      DesQty:this.DesQty,
      TemplateName:this.TemplateName,
      
  CreatedBy :this.userName,


  TemplateID:this.TemplateID,
  TotalAmount:this.TotalAmount,
  CustomerName:this.CustomerName,

    }
    this.regSv.postSaveRapidi64cam(templateData).subscribe((response:any )=>
    {
      if(response !=null){
        this.billingAddress=this.billingAddress,

  this.ACSCPrice=this.ACSCPrice,
  this.ACSCQty=this.ACSCQty,
  this.DesPrice=this.DesPrice,
  this.DesQty=this.DesQty,



        alert("Saved Successfully")
       // window.location.reload()
      }
      else
      {
        alert("Somthing Went Wrong!!")
        //window.location.reload()
      } 
    })
  
 
}
}
