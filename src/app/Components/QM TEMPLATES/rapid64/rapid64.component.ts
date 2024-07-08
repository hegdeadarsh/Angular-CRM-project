import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-rapid64',
  templateUrl: './rapid64.component.html',
  styleUrls: ['./rapid64.component.css']
})
export class Rapid64Component {
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

  editableQtyA: string = '1 Set';
  editableQtyB: string = '1 Set';
  editableQtyC: string = '1 Set';
  editablePrice:number=65200;

  UpgradeQtyA: string = '1 Set';
  UpgradeQtyB: string = '1 Set';
  UpgradeQtyC: string = '1 Set';
  UpgradePrice: number =65200 ; 

  TemplateName: string = "Rapid64 UPGRADE";
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
      UpgradeQtyA:this.UpgradeQtyA,
      UpgradeQtyB:this.UpgradeQtyB,
      UpgradeQtyC:this.UpgradeQtyC,
      UpgradePrice:this.UpgradePrice,
    }
    this.UpgradeQtyA = this.editableQtyA;
    this.UpgradeQtyB = this.editableQtyB;  
    this.UpgradeQtyC = this.editableQtyC;
    this.UpgradePrice = this.editablePrice;
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
    this.regSv.getRapid64details(this.RefID).subscribe((response: any) => {
      if (response) {
    

      this.billingAddress = response.billingAddress;
      this.UpgradeQtyA = response.upgradeQtyA;
  
      this.UpgradeQtyB = response.upgradeQtyB;
      this.UpgradeQtyC = response.upgradeQtyC;
  
      this.UpgradePrice = response.upgradePrice;
     
  this.TemplateName=response.templateName;
      // this.KindAttention = response.KindAttention;
      alert("Details for RefID present");
    }
    else {
      alert("RefID not present. Please enter a valid RefID.");
    }
  });
}
  


  save(){
    this.TotalAmount = this.UpgradePrice;
   
    // Create the templateData object
    const templateData = {
  RefID : this.RefID,
  billingAddress:this.billingAddress,

  UpgradeQtyA:this.UpgradeQtyA,
  UpgradeQtyB:this.UpgradeQtyB,
  UpgradeQtyC:this.UpgradeQtyC,
  UpgradePrice:this.UpgradePrice,

  

  CreatedBy :this.userName,


  TemplateID:this.TemplateID,
  TemplateName:this.TemplateName,
  CustomerName:this.CustomerName,
 TotalAmount:this.TotalAmount,
   
     


      
    }
    this.regSv.postSaverapid64(templateData).subscribe((response:any )=>
    {
      if(response !=null){
        this.billingAddress=this.billingAddress,
  this.UpgradeQtyA=this.UpgradeQtyA,
  this.UpgradeQtyB=this.UpgradeQtyB,
  this.UpgradeQtyC=this.UpgradeQtyC,
  this.UpgradePrice=this.UpgradePrice,


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
