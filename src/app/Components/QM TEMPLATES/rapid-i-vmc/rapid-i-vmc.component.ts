import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';

@Component({
  selector: 'app-rapid-i-vmc',
  templateUrl: './rapid-i-vmc.component.html',
  styleUrls: ['./rapid-i-vmc.component.css']
})
export class RapidIVMCComponent {

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


  TemplateName: string = "Rapid-I-VMC";

//editable

editableQtyA:number=1;
editablePriceA:number=267000;

editableQtyB:number=1;
editablePriceB:number=17600;

 editableQtyC:number=1;
editablePriceC:number=124700;

editableQtyD: string = '1 Pair';
editablePriceD:number=19500;

editableQtyE:number=1;
editablePriceE:number=219000;

editableQtyF:number=1;
editablePriceF:number=258000;

editableQtyG:number=1;
editablePriceG:number=297000;

editableQtyH:number=1;
editablePriceH:number=96000;


BasicQty:string = '1 Set';
BasicPrice: number =  697000 ;

BasicQtyA:string = '1 Set';
BasicPriceA: number =  820000 ;

BasicQtyB:string = '1 Set';
BasicPriceB: number =  950000 ;

BasicQtyC:string = '1 Set';
BasicPriceC: number =  1085000 ;




OptionalQtyA:number=1;
OptionalPriceA:number=267000;

OptionalQtyB:number=1;
OptionalPriceB:number=17600;

OptionalQtyC: number=1;
OptionalPriceC:  number=124700;

OptionalQtyD:string = '1 Pair';
OptionalPriceD: number=19500 ;

OptionalQtyE:number=1;
OptionalPriceE: number = 219000;

OptionalQtyF:number=1;
OptionalPriceF: number = 258000;

OptionalQtyG:number=1;
OptionalPriceG: number = 297000;

OptionalQtyH:number=1;
OptionalPriceH: number = 96000;


editablebasicQty:string = '1 Set';
editablebasicPrice: number =  697000 ;

editablebasicQtyA:string = '1 Set' ;
editablebasicPriceA: number = 820000 ;

editablebasicQtyB:string = '1 Set' ;
editablebasicPriceB: number = 950000  ;

editablebasicQtyC:string = '1 Set';
editablebasicPriceC: number = 1085000;
  TemplateID: any;
  KindAttention: any;
  TotalAmount: number;
  CustomerName: any;

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
      BasicQty:this.BasicQty,
      BasicPrice:this.BasicQty,

      BasicQtyA:this.BasicQtyA,
      BasicPriceA:this.BasicPriceA,

      BasicQtyB:this.BasicQtyB,
      BasicPriceB:this.BasicPriceB,

      BasicQtyC:this.BasicQtyC,
      BasicPriceC:this.BasicPriceC,

      OptionalQtyA:this.OptionalQtyA,
      OptionalPriceA:this.OptionalPriceA,

      OptionalQtyB:this.OptionalQtyB,
      OptionalPriceB:this.OptionalPriceB,

      OptionalQtyC:this.OptionalQtyC,
      OptionalPriceC:this.OptionalPriceC,

      OptionalQtyD:this.OptionalQtyD,
      OptionalPriceD:this.OptionalPriceD,

      OptionalQtyE:this.OptionalQtyE,
      OptionalPriceE:this.OptionalPriceE,

      OptionalQtyF:this.OptionalQtyF,
      OptionalPriceF:this.OptionalPriceF,

      OptionalQtyG:this.OptionalQtyG,
      OptionalPriceG:this.OptionalPriceG,

      OptionalQtyH:this.OptionalQtyH,
      OptionalPriceH:this.OptionalPriceH,
    };


    this.BasicQty=this.editablebasicQty;
    this.BasicPrice = this.editablebasicPrice;
    this.BasicQtyA = this.editablebasicQtyA;
    this.BasicPriceA = this.editablebasicPriceA;
    this.BasicQtyB = this.editablebasicQtyB;
    this.BasicPriceB = this.editablePriceB;
    this.BasicQtyC = this.editablebasicQtyC;
    this.BasicPriceC = this.editablePriceC;
    this.OptionalQtyC = this.editableQtyC;
    this.OptionalPriceC = this.editablePriceC;
    this.OptionalQtyD = this.editableQtyD;
    this.OptionalPriceD = this.editablePriceD;
    this.OptionalQtyE = this.editableQtyE;
    this.OptionalPriceE = this.editablePriceE;
    this.OptionalQtyF = this.editableQtyF;
    this.OptionalPriceF = this.editablePriceF;
    this.OptionalQtyG = this.editableQtyG;
    this.OptionalPriceG = this.editablePriceG;
    this.OptionalQtyH = this.editableQtyH;
    this.OptionalPriceH = this.editablePriceH;

    const changesMade = Object.keys(previousValues).some(key => previousValues[key] !== this[key]);
 if (changesMade) {
    alert('Changes made successfully.');
  } else {
    alert('No changes made or something went wrong.');
  }

  // Reset the editable values
  // this.resetEditableValues();
}
// resetEditableValues() {

//     this.editableQty = null;
//     this.editablePrice = null;
//     this.editableQtyA = null;
//     this.editablePriceA = null;
//     this.editableQtyB = null;
//     this.editablePriceB = null;
//     this.editableQtyC = null;
//     this.editablePriceC = null;
//     this.editableQtyD = null;
//     this.editablePriceD = null;
//     this.editableQtyE = null;
//     this.editablePriceE = null;
//     this.editableQtyF = null;
//     this.editablePriceF = null;
//     this.editableQtyG = null;
//     this.editablePriceG = null;
//     this.editableQtyH = null;
//     this.editablePriceH = null;

// }
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
    this.regSv.getVMCdetails(this.RefID).subscribe((response: any) => {
      if (response) {
      this. BasicQty=response.basicQty,
      this. BasicPrice=response.basicPrice,

      this. BasicQtyA=response.basicQtyA,
      this. BasicPriceA=response.basicPriceA,

      this. BasicQtyB=response.basicQtyB,
      this. BasicPriceB=response.basicPriceB,

      this. BasicQtyC=response.basicQtyC,
      this. BasicPriceC=response.basicPriceC,

      this. BasicQtyA=response.basicQtyA,
      this. BasicPriceA=response.basicPriceA,

      this. BasicQtyB=response.basicQtyB,
      this. BasicPriceB=response.basicPriceB,

      this. BasicQtyC=response.basicQtyC,
      this. BasicPriceC=response.basicPriceC,

      this.OptionalQtyA = response.optionalQtyA;
      this.OptionalPriceA = response.optionalPriceA;

      this.OptionalQtyB = response.optionalQtyB;
      this.OptionalPriceB = response.optionalPriceB;

      this.OptionalQtyC = response.optionalQtyC;
      this.OptionalPriceC = response.optionalPriceC;

      this.OptionalQtyD = response.optionalQtyD;
      this.OptionalPriceD = response.optionalPriceD;

      this.OptionalQtyE = response.optionalQtyE;
      this.OptionalPriceE = response.optionalPriceE;

      this.OptionalQtyF = response.optionalQtyF;
      this.OptionalPriceF = response.optionalPriceF;

      this.OptionalQtyG = response.optionalQtyG;
      this.OptionalPriceG = response.optionalPriceG;

      this.OptionalQtyH = response.optionalQtyH;
      this.OptionalPriceH = response.optionalPriceH;

      this.KindAttention = response.KindAttention;
      alert("Details for RefID present");
    }
    else {
      alert("RefID not present. Please enter a valid RefID.");
    }
  });
}
save(){
  this.TotalAmount = this.BasicPrice;

  // Create the templateData object
  const templateData = {
RefID : this.RefID,
billingAddress:this.billingAddress,

BasicQty:this.BasicQty,
BasicPrice:this.BasicQty,

BasicQtyA:this.BasicQtyA,
BasicPriceA:this.BasicPriceA,

BasicQtyB:this.BasicQtyB,
BasicPriceB:this.BasicPriceB,

BasicQtyC:this.BasicQtyC,
BasicPriceC:this.BasicPriceC,

OptionalQtyA:this.OptionalQtyA,
OptionalPriceA:this.OptionalPriceA,

OptionalQtyB:this.OptionalQtyB,
OptionalPriceB:this.OptionalPriceB,

OptionalQtyC:this.OptionalQtyC,
OptionalPriceC:this.OptionalPriceC,

OptionalQtyD:this.OptionalQtyD,
OptionalPriceD:this.OptionalPriceD,

OptionalQtyE:this.OptionalQtyE,
OptionalPriceE:this.OptionalPriceE,

OptionalQtyF:this.OptionalQtyF,
OptionalPriceF:this.OptionalPriceF,

OptionalQtyG:this.OptionalQtyG,
OptionalPriceG:this.OptionalPriceG,

OptionalQtyH:this.OptionalQtyH,
OptionalPriceH:this.OptionalPriceH,

CreatedBy :this.userName,


TemplateID:this.TemplateID,
TemplateName:this.TemplateName,
CustomerName:this.CustomerName,
KindAttention:this.KindAttention,
TotalAmount:this.TotalAmount,




  }
  this.regSv.postSavequotationtemplateRapidIVMC(templateData).subscribe((response:any )=>
  {
    if(response !=null){

    



 this.BasicQty=this.BasicQty,
 this.BasicPrice=this.BasicPrice,
      
 this.BasicQtyA=this.BasicQtyA,
 this.BasicPriceA=this.BasicPriceA,
      
this.BasicQtyB=this.BasicQtyB,
this.BasicPriceB = this.BasicPriceB,
      
this.BasicQtyC = this.BasicQtyC,
this.BasicPriceC = this.BasicPriceC,

this.OptionalQtyA=this.OptionalQtyA,
this.OptionalPriceA=this.OptionalPriceA,

this.OptionalQtyB=this.OptionalQtyB,
this.OptionalPriceB=this.OptionalPriceB,

this.OptionalQtyC=this.OptionalQtyC,
this.OptionalPriceC = this.OptionalPriceC,

this.OptionalQtyD = this.OptionalQtyD,
this.OptionalPriceD = this.OptionalPriceD,

this.OptionalQtyE = this.OptionalQtyE,
this.OptionalPriceE = this.OptionalPriceE,

this.OptionalQtyF = this.OptionalQtyF,
this.OptionalPriceF = this.OptionalPriceF,

this.OptionalQtyG = this.OptionalQtyG,
this.OptionalPriceG = this.OptionalPriceG,

this.OptionalQtyH = this.OptionalQtyH,
this.OptionalPriceH = this.OptionalPriceH,


      this.KindAttention=this.KindAttention,

      alert("Saved Successfully")
   //   window.location.reload()
    }
    else
    {
      alert("Somthing Went Wrong!!")
    //  window.location.reload()
    }
  })



}
}
