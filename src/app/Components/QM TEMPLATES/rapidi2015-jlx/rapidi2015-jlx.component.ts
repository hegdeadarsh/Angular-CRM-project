import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rapidi2015-jlx',
  templateUrl: './rapidi2015-jlx.component.html',
  styleUrls: ['./rapidi2015-jlx.component.css']
})
export class Rapidi2015JLXComponent {
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

  editableQty: number = 1;
  editablePrice:number=267000;

  editableQtyA:number=1;
  editablePriceA:number=267000;

  editableQtyB:number=1;
  editablePriceB:number=17600;

   editableQtyC:number=1;
  editablePriceC:number=124700;

  editableQtyD:number=1;
  editablePriceD:number=219000;

  editableQtyE:number=1;
  editablePriceE:number=258000;

 editableQtyF:number=1;
  editablePriceF:number=297000;

  editableQtyG:number=1;
  editablePriceG:number=96000;

  editableQtyH:number=1;
  editablePriceH:number=14715;





  BasicSystemQty: number=1;
  BasicSystemPrice: number= 267000; 

  OptionalQtyA:number=1;
  OptionalPriceA:number=267000;

  OptionalQtyB:number=1;
  OptionalPriceB:number=17600;

  OptionalQtyC: number=1;
  OptionalPriceC:  number=124700;

  OptionalQtyD:number=1;
  OptionalPriceD: number =219000; 

  OptionalQtyE:number=1;
  OptionalPriceE: number = 258000; 

  OptionalQtyF:number=1;
  OptionalPriceF: number = 297000; 

  OptionalQtyG:number=1;
  OptionalPriceG: number = 96000; 

  OptionalQtyH:number=1;
  OptionalPriceH: number = 14715; 

  TemplateName: string = "RapidI 2015JLX";
  CustomerName:any;
  KindAttention: any;
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
      BasicSystemQty:this.BasicSystemQty,
      BasicSystemPrice:this.BasicSystemPrice,
    
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


    this.BasicSystemQty = this.editableQty;

    this.BasicSystemPrice = this.editablePrice;
    this.OptionalQtyA = this.editableQtyA;
    this.OptionalPriceA = this.editablePriceA;
    this.OptionalQtyB = this.editableQtyB;
    this.OptionalPriceB = this.editablePriceB;
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

  logCompleteQuotation() {
    const quotationDiv = document.getElementById('RefID');
    if (quotationDiv) {
      console.log(quotationDiv.innerHTML);
    } else {
      console.error('Element with ID "RefID" not found.');
    }
  }

  print(printSectionId) {
    // Get the values to be printed
    var qtyValue = this.OptionalQtyE.toString();
  var priceValue = this.OptionalPriceE.toString();
  
    // Update the content of the cells with the values
    var qtyCell = document.querySelector('#' + printSectionId + ' #qtyCell');
    if (qtyCell) {
      qtyCell.innerHTML = qtyValue;
    }
  
    var priceCell = document.querySelector('#' + printSectionId + ' #priceCell');
    if (priceCell) {
      priceCell.innerHTML = priceValue;
    }
  
    // Continue with the rest of your print logic
    var innerContents = document.getElementById(printSectionId).innerHTML;
    var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=yes');
    popupWinindow.document.open();
    popupWinindow.document.write('<html> <head><style> '+ '.sign{text-align:right;margin-left:-25px} '+ ' .logo{text-align:right;margin-right:-5px;top:0;right:0;} .   ' + ' .abc{background-color: rgb(212, 212, 212)} '+ '  </style>  </head><body onload="window.print()">' + innerContents + '</html>');
    popupWinindow.document.close();
  }
  

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
    this.regSv.getRapid2015JLXdetails(this.RefID).subscribe((response: any) => {
      if (response) {
      this. BasicSystemQty=response.basicSystemQty,
      this. BasicSystemPrice=response.basicSystemPrice,

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
    this.TotalAmount = this.BasicSystemPrice;
   
    // Create the templateData object
    const templateData = {
  RefID : this.RefID,
  billingAddress:this.billingAddress,

  BasicSystemQty:this.BasicSystemQty,
  BasicSystemPrice:this.BasicSystemPrice,

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
    this.regSv.postSaveRapid2015JLX(templateData).subscribe((response:any )=>
    {
      if(response !=null){
        this.BasicSystemQty=this.BasicSystemQty,
  this.BasicSystemPrice=this.BasicSystemPrice,

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
