import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';

@Component({
  selector: 'app-quotation2015-ht',
  templateUrl: './quotation2015-ht.component.html',
  styleUrls: ['./quotation2015-ht.component.css']
})
export class Quotation2015HTComponent {
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
  TemplateName: string = "Quotation 2015 HT";
  BasicSystemQty: string = '1 Set';
  BasicSystemPrice: number =800000  ; 
 
  OptionalQtyA:number=1;
  OptionalPriceA:number=	267200;

  OptionalQtyB:number=1;
  OptionalPriceB:number=38500;

  OptionalQtyC: number=1;
  OptionalPriceC:  number=19500;

  OptionalQtyD:number=1 ;
  OptionalPriceD: number = 89100; 
  TemplateID: any;
  
  CustomerName: any;
KindAttention: any;

   

  //editable

  editableQty: string = '1 Set';
  editablePrice:number=800000;

  editableQtyA:number=1;
  editablePriceA:number=267200;

  editableQtyB:number=1;
  editablePriceB:number=38500;

   editableQtyC:number=1;
  editablePriceC:number=19500;

  editableQtyD:number=1;
  editablePriceD:number=89100;

 
// OptionalPriceH: number;
  

companyoldName: any;

KindAttentionlist: any;

  fetchedData: any;

  templateId: any;
  selectedTemplate: any;
  editcustomerID: any;
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
    this.regSv.getCustomerBillingAddress1(this.selectedcustID).subscribe((result: any) => {
      this.customerdata = result;
      console.log(this.customerdata);
      this.billingAddress=this.customerdata[0].billingAddress;
      this.EditBillingAddress = false;
  });
}

  getRefNo() {
    this.regSv.GetRefNo1().subscribe((result: any) => {
      if (this.RefID == null || this.RefID == '') {
        this.tableLength = result.length + 1;
        this.RefID = this.tableLength.toString().padStart(3, '0'); // Assuming result is an array or collection
      }
    });
  }

  onSelectTemplate(data: any) {
    this.selectedTemplate = data.target.value;
    console.log('Selected Template:', this.selectedTemplate);
  }

  fetchTemplate() {
    if (!this.RefID || this.RefID === '') {
      alert('Reference ID is required to fetch the template.');
      return;
    }
  
    this.regSv.gettemplatedetails2015HT(this.RefID).subscribe(
      (response: any) => {
        if (response != null) {
          this.BasicSystemQty = response.basicSystemQty;
          this.BasicSystemPrice = response.basicSystemPrice;
  
          this.OptionalQtyA = response.optionalQtyA;
          this.OptionalPriceA = response.optionalPriceA;
  
          this.OptionalQtyB = response.optionalQtyB;
          this.OptionalPriceB = response.optionalPriceB;
  
          this.OptionalQtyC = response.optionalQtyC;
          this.OptionalPriceC = response.optionalPriceC;
  
          this.OptionalQtyD = response.optionalQtyD;
          this.OptionalPriceD = response.optionalPriceD;
  
          this.KindAttention = response.KindAttention;
          alert("Details for RefID present");
        } else {
          alert(`Reference ID not found for this template`);
        }
      }
    );
  }
  

  save(){
    this.TotalAmount = this.BasicSystemPrice;
    var templateData = {
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
    this.regSv.postSavequotationtemplate2015HT(templateData).subscribe((response:any )=>
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
     this.route.navigate(['/qm', this.editcustomerID]);
      }
      else
      {
        alert("Somthing Went Wrong!!")
      //  window.location.reload()
      } 
    })


   
  }

}