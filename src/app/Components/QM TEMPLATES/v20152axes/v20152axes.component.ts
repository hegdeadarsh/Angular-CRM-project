import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-v20152axes',
  templateUrl: './v20152axes.component.html',
  styleUrls: ['./v20152axes.component.css']
})
export class V20152axesComponent {
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
  TemplateID:any;

  //editable

  editableaxesQty: string = '1 set';
  editableaxesPrice:number=640000;

  AxesQty: string = '1 Set';
  
  AxesPrice: number =640000 ; 

  TemplateName:string="V2015_2Axes_Manual";
  CustomerName:any;
  TotalAmount: number;


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

  updateTemplate() {
  
    const previousValues = {
      BasicSystemQty:this.AxesQty,
      BasicSystemPrice:this.AxesPrice,
    }
      this.AxesQty = this.editableaxesQty;

    this.AxesPrice = this.editableaxesPrice;
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
     
  //      this.editableaxesQty = null;
  //      this.editableaxesPrice = null;
  //  }

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

  fetchTemplate() {
    this.regSv.getV20152axesetails(this.RefID).subscribe((response: any) => {
      if (response) {

      this.billingAddress = response.billingAddress;
      this.AxesQty = response.axesQty;
      this.AxesPrice = response.axesPrice;
    
    
    
     
  this.TemplateName=response.TemplateName;
      // this.KindAttention = response.KindAttention;
      alert("Details for RefID present");
    }
    else {
      alert("RefID not present. Please enter a valid RefID.");
    }
  });
}
  save(){
    this.TotalAmount = this.AxesPrice ;
   
    // Create the templateData object
    const templateData = {
  RefID : this.RefID,
  billingAddress:this.billingAddress,

  AxesQty:this.AxesQty,

  AxesPrice:this.AxesPrice,

  

  CreatedBy :this.userName,


  TemplateID:this.TemplateID,
  TemplateName:this.TemplateName,
  CustomerName:this.CustomerName,
  TotalAmount:this.TotalAmount,
   
     


      
    }
    this.regSv.postSaveV2015(templateData).subscribe((response:any )=>
    {
      if(response !=null){
        this.billingAddress=this.billingAddress,
  this.AxesQty=this.AxesQty,
  this.AxesPrice=this.AxesPrice,



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
