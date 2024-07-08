import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-q4020-ht',
  templateUrl: './q4020-ht.component.html',
  styleUrls: ['./q4020-ht.component.css']
})
export class Q4020HTComponent {
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
  editablePrice:number=900000;

  editableQtyA:number=1;
  editablePriceA:number=267000;

  editableQtyB:number=1;
  editablePriceB:number=36000;

   editableQtyC:string='1 Pair';
  editablePriceC:number=19500;

  editableQtyD:number=1;
  editablePriceD:number=89100;







  BasicSystemQty: number=1;
  BasicSystemPrice: number= 900000; 

  OptionalQtyA:number=1;
  OptionalPriceA:number=267000;

  OptionalQtyB:number=1;
  OptionalPriceB:number=36000;

  OptionalQtyC:string='1 Pair';
  OptionalPriceC:  number=19500;

  OptionalQtyD:number=1;
  OptionalPriceD: number =89100; 



  TemplateName: string = "Quotation 4020HT";
  CustomerName:any;
  KindAttention: any;
  TotalAmount: number;
  cdr: any;
 
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
  

    const changesMade = Object.keys(previousValues).some(key => previousValues[key] !== this[key]);
 if (changesMade) {
    alert('Changes made successfully.');
  } else {
    alert('No changes made or something went wrong.');
  }

  // Reset the editable values
  this.resetEditableValues();
}
resetEditableValues() {
  
    this.editableQty = null;
    this.editablePrice = null;
    this.editableQtyA = null;
    this.editablePriceA = null;
    this.editableQtyB = null;
    this.editablePriceB = null;
    this.editableQtyC = null;
    this.editablePriceC = null;
    this.editableQtyD = null;
    this.editablePriceD = null;
  
}

  logCompleteQuotation() {
    const quotationDiv = document.getElementById('RefID');
    if (quotationDiv) {
      console.log(quotationDiv.innerHTML);
    } else {
      console.error('Element with ID "RefID" not found.');
    }
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

  fetchTemplate() {
    this.regSv.getQ4020HTdetails(this.RefID).subscribe((response: any) => {
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
  
      this.TemplateName=response.TemplateName;
  
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



  CreatedBy :this.userName,


  TemplateID:this.TemplateID,
  TemplateName:this.TemplateName,
  CustomerName:this.CustomerName,
  KindAttention:this.KindAttention,
  TotalAmount:this.TotalAmount,
   
     


      
    }
    this.regSv.postSavequotation4020HT(templateData).subscribe((response:any )=>
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
