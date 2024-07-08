import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rapidtable',
  templateUrl: './rapidtable.component.html',
  styleUrls: ['./rapidtable.component.css']
})
export class RapidtableComponent {
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

  editableVisionQty: string = '1 No';
  editableVisionPrice: number =5825000; 

  TemplateName:string="RapidI TABLE";


  VisionQty: string = '1 No';
  VisionPrice: number =5825000 ; 
  TemplateID: any;
  CustomerName: any;
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
      BasicSystemQty:this.VisionQty,
      BasicSystemPrice:this.VisionPrice,
    }
      this.VisionQty = this.editableVisionQty;

    this.VisionPrice = this.editableVisionPrice;
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
  
  fetchTemplate() {
    this.regSv.getRapiditabledetails(this.RefID).subscribe((response: any) => {
      if (response) {

      this.billingAddress = response.billingAddress;
      this.VisionPrice = response.visionPrice;
  
      this.VisionQty = response.visionQty;
    
     
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
    this.TotalAmount = this.VisionPrice;
   
    // Create the templateData object
    const templateData = {
      RefID : this.RefID,
      billingAddress:this.billingAddress,
      VisionPrice:this.VisionPrice,
      VisionQty:this.VisionQty,
      CreatedBy :this.userName,
      TotalAmount:this.TotalAmount,

  TemplateID:this.TemplateID,
  TemplateName:this.TemplateName,
  CustomerName:this.CustomerName,
    }
    this.regSv.postSaveRapidtable(templateData).subscribe((response:any )=>
    {
      if(response !=null){
        this.billingAddress=this.billingAddress,
  this.VisionPrice=this.VisionPrice,
  this.VisionQty=this.VisionQty,



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
