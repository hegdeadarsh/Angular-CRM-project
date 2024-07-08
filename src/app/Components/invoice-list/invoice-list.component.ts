import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';

import { ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
  CustumerDetails: boolean = false;
  CustumerInvoiceDetails:boolean=false;
  userName: any;
  roleId: any;
  IsLoggedIn: any;
  machineNumber: any;
  selectedCustomer: any;
  perticularCustomerData: any;
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
  InvoiceImage:any;
  perticularCustomerInvoiceData:any;
  customerList: any;
  p: number = 1
  closeResult: any;
  dismissalert: any;
  viewcustomername: any;
  viewunitname: any;
  viewaddressone: any;
  viewaddresstwo: any;
  viewaddressthree: any;
  viewpincode: any;
  viewcity: any;
  viewstate: any;
  viewcountry: any;
  viewgstin: any;
  viewcluster: any;
  viewroutenumber: any;
  viewregion: any;
  viewzone: any;
  viewweekoff: any;

  viewworkingstart: any;
  viewworkingend: any;
  viewcreatedby: any;
  viewcreatedon: any;
  custID:any;
  fromDate: string | number | Date = ''; // Providing an empty string as an initializer
  toDate: string | number | Date = '';
  Datewiserequest: string="";
  invoiceperticularlist: any;
  constructor(private regSv: RegistrationService,
    private masterSv: MasterService, private modalService: NgbModal) {
    if (localStorage.getItem('IsLoggedIn') == 'true') {
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
  }
  ngOnInit(): void {
    this.getCustomer();
  }
  onChangeMachineNumber() {
    this.regSv.getMachineFromMachineNumber(this.machineNumber).subscribe((response: any) => {
      if (response == null) {
        alert("No Machine Found!!!")
      } else {
        this.perticularCustomerData = response;
        this.CustumerDetails = true;
        console.log(this.perticularCustomerData);
        this.custID=this.perticularCustomerData.customerId;
        this.GetInvoicesCustomer(this.perticularCustomerData[0].customerId);
        console.log(this.perticularCustomerData[0].customerId);
        this.unit = this.perticularCustomerData[0].unit;
        this.addressOne = this.perticularCustomerData[0].addressOne;
        this.addressTwo = this.perticularCustomerData[0].addressTwo;
        this.addressThree = this.perticularCustomerData[0].addressThree;
        this.city = this.perticularCustomerData[0].city;
        this.pincode = this.perticularCustomerData[0].pincode;
        this.state = this.perticularCustomerData[0].state;
        this.country = this.perticularCustomerData[0].country;
        this.gstin = this.perticularCustomerData[0].gstin;
        this.cluster = this.perticularCustomerData[0].cluster;
        this.routeNo = this.perticularCustomerData[0].routeNumber;
        this.region = this.perticularCustomerData[0].region;
        this.zone = this.perticularCustomerData[0].zone;
        this.weeklyOff = this.perticularCustomerData[0].weeklyOff;
        this.workingStart = this.perticularCustomerData[0].workingStart;
        this.workingEnd = this.perticularCustomerData[0].workingEnd;
        this.securityFormalities =
          this.perticularCustomerData[0].securityFormalities;
          this.exporting=true;
      }
    })
  }


  onSelectCompany(data: any) {
    this.selectedCustomer = data.customerID;
    this.regSv
      .getPerticularCustomer(this.selectedCustomer)
      .subscribe((response: any) => {
        this.perticularCustomerData = response;
        this.CustumerDetails = true;

        this.GetInvoicesCustomer(this.selectedCustomer);
        console.log(this.perticularCustomerData);
        this.unit = this.perticularCustomerData[0].unit;
        this.addressOne = this.perticularCustomerData[0].addressOne;
        this.addressTwo = this.perticularCustomerData[0].addressTwo;
        this.addressThree = this.perticularCustomerData[0].addressThree;
        this.city = this.perticularCustomerData[0].city;
        this.pincode = this.perticularCustomerData[0].pincode;
        this.state = this.perticularCustomerData[0].state;
        this.country = this.perticularCustomerData[0].country;
        this.gstin = this.perticularCustomerData[0].gstin;
        this.cluster = this.perticularCustomerData[0].cluster;
        this.routeNo = this.perticularCustomerData[0].routeNumber;
        this.region = this.perticularCustomerData[0].region;
        this.zone = this.perticularCustomerData[0].zone;
        this.weeklyOff = this.perticularCustomerData[0].weeklyOff;
        this.workingStart = this.perticularCustomerData[0].workingStart;
        this.workingEnd = this.perticularCustomerData[0].workingEnd;
        this.securityFormalities =
          this.perticularCustomerData[0].securityFormalities;
          this.exporting=true;
      });
  }



  getCustomer() {
    this.regSv.getCustomer().subscribe((response: any) => {
      this.customerList = response;

      console.log(this.customerList);
    });
  }


  ViewDetails(data: any) {

    this.viewcustomername = data.companyName;
    this.viewunitname = data.unit;
    this.viewaddressone = data.addressOne;
    this.viewaddresstwo = data.addressTwo;
    this.viewaddressthree = data.addressThree;

    this.viewpincode = data.pincode;
    this.viewcity = data.city;
    this.viewstate = data.state;
    this.viewcountry = data.country;
    this.viewgstin = data.gstin;

    this.viewcluster = data.cluster;
    this.viewroutenumber = data.routeNumber;
    this.viewregion = data.region;
    this.viewzone = data.zone;
    this.viewweekoff = data.weeklyOff;

    this.viewworkingstart = data.workingStart;
    this.viewworkingend = data.workingEnd;
    this.viewcreatedby = data.createdBy;
    this.viewcreatedon = data.createdOn;

    // this.modalService.open(viewdetails).result.then(
    //   (result) => {
    //     this.closeResult = `Closed with: ${result}`;
    //   },
    //   (reason) => {
    //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //   }
    // );
  }

  ViewImage(dataa:any){
    this.InvoiceImage=dataa.blobLink;
  }
  GetInvoicesCustomer(id:any){
    this.regSv
    .getPerticularCustomerInvoice(id)
    .subscribe((response: any) => {
      this.perticularCustomerInvoiceData = response;
      console.log(this.perticularCustomerInvoiceData);
this.CustumerInvoiceDetails=true;
    });
  }




  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  closealert() {
    this.dismissalert = false;
  }
  exportTableToPDF(): void {
    const doc = new jspdf.jsPDF();
    const table = this.table.nativeElement;

    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = doc.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save('Invoice_data.pdf');
    });
  }
  exportTableToExcel(): void {
    const element = document.getElementById('tableId'); // Replace 'tableId' with the actual ID of your HTML table
  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Invoice_data');
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName + '.xlsx';
    downloadLink.click();
  }
 
}
