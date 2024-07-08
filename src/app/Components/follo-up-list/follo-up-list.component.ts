import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-follo-up-list',
  templateUrl: './follo-up-list.component.html',
  styleUrls: ['./follo-up-list.component.css'],
  providers: [DatePipe]
})
export class FolloUpListComponent implements OnInit {
  @ViewChild('table', { static: false }) table!: ElementRef;
  currentDate: Date | undefined;
  formattedDate: string = '';
  currentTime: string = '';
  customerList: any;
  selectedCustomer: any;
  machineList: any;
  FollowUpList: any;
  p: number = 1;
  followupstatus: any;
  followupremarks: any;
  followupdate: any;
  followuptime: any;
  followupcontactperson: any;
  followupourperson: any;
  followupupdatedamount : any;
  userName: any;
  roleId: any;
  IsLoggedIn: any;
  followupinvoiceID: any;
  followupmachinenumber: any;
  followupcustomerid: any;
  followupmodelname: any;
  followupmodelid: any;
  invoicedetails:boolean=false;
  followupdetails:boolean=false;
  followupinvoicenumber: any;
  followupinvoiceamount: any;
  followupdueamount: any;
  FollowUpData:any;
  Pending:boolean=false;
  Completed:boolean=false;
  customerID: any;
  Datewiserequest: string="";
  fromDate: string='';
  toDate: string="";
  requestlist: any;
  followup: any;
  constructor(private regSv: RegistrationService, private masterSv: MasterService, private datePipe: DatePipe) {
    if (localStorage.getItem('IsLoggedIn') == 'true') {
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
  }
  ngOnInit(): void {
    this.getCustomer();
    this.getFollowupList();
  }
  getCustomer() {
    this.regSv.getCustomer().subscribe((response: any) => {
      this.customerList = response;
      console.log(this.customerList);
    });
  }
  getFollowupList() {
    this.regSv.getFollowup().subscribe((response: any) => {
      this.FollowUpList = response;
      this.invoicedetails=true;
      this.followupdetails=false;
      // for (let i = 0; i < this.FollowUpList.length; i++) {
      //   if (this.FollowUpList[i].isPaid == true) {
      //     this.followupstatus = "Completed";
      //   }
      //   else {
      //     this.followupstatus = "Pending";
      //   }

      // }
      console.log(this.FollowUpList);
    });
  }
  onSelectCompany(data: any) {
    this.customerID = data.customerID;
    this.regSv
      .getCustomerFollowup(this.customerID)
      .subscribe((response: any) => {
        this.FollowUpList = response
        // for (let i = 0; i < this.FollowUpList.length; i++) {
        //   if (this.FollowUpList[i].isPaid == true) {
        //     this.followupstatus = "Completed";


        //   }
        //   else {
        //     this.followupstatus = "Pending";
        //   }

        // }
        this.invoicedetails=true;
        this.followupdetails=false;
        console.log(this.FollowUpList);
      });
  }
  MakeFollowUp(data: any) {
    this.currentDate = new Date();
    // this.currentDatee = new Date(this.currentDate );
    const formattedDate = this.datePipe.transform(this.currentDate, 'dd/MMMM/yyyy'); // Format the date

    this.currentTime = this.currentDate.toLocaleTimeString();
    this.followupdate = formattedDate;
    this.followuptime = this.currentTime;
    this.followupcontactperson = data.customerName;
    this.followupourperson = this.userName;
    this.followupinvoiceID = data.id;
    this.followupmachinenumber = data.machineNumber;
    this.followupcustomerid = data.customerId;
    this.followupmodelname = data.modelName;
    this.followupmodelid = data.modelId;
    this.followupinvoicenumber = data.invoiceNumber;
    this.followupinvoiceamount == data.invoiceAmount;
    this.followupdueamount = data.dueAmount;


  }
  SaveFollowUp() {
    var followupData = {
      ID: 0,
      InvoiceID: this.followupinvoiceID,
      MachineNumber: this.followupmachinenumber,
      CustomerID: this.followupcustomerid,
      CustomerName: this.followupcontactperson,
      ModelID: this.followupmodelid,
      ModelName: this.followupmodelname,
      InvoiceNumber: this.followupinvoicenumber,
      InvoiceAmount: this.followupinvoiceamount,
      DueAmount: this.followupdueamount,
      Date:this.followupdate,
      Time: this.currentTime,
      ContactPerson: this.followupcontactperson,
      Remarks: this.followupremarks,
      OurPerson: this.userName,
      followupupdatedamount : this.followupupdatedamount,
    }
    this.masterSv.saveFollowup(followupData).subscribe((response: any) => {
      if (response == "success") {
        alert("Follow-Up Saved")
        window.location.reload()
      } else {
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })
  }
  FollowupComplete() {
    if (this.selectedCustomer != undefined) {

      this.regSv
      .getCustomerFollowupCompleteCustomer(this.selectedCustomer)
      .subscribe((response: any) => {
        this.FollowUpList = response
        // for (let i = 0; i < this.FollowUpList.length; i++) {
        //   if (this.FollowUpList[i].isPaid == true) {
        //     this.followupstatus = "Completed";


        //   }
        //   else {
        //     this.followupstatus = "Pending";
        //   }

        // }
        this.invoicedetails=true;
        this.followupdetails=false;

        console.log(this.FollowUpList);
      });
     }
     else{
      this.regSv
      .getCustomerFollowupComplete()
      .subscribe((response: any) => {
        this.FollowUpList = response
        // for (let i = 0; i < this.FollowUpList.length; i++) {
        //   if (this.FollowUpList[i].isPaid == true) {
        //     this.followupstatus = "Completed";


        //   }
        //   else {
        //     this.followupstatus = "Pending";
        //   }

        // }
        this.invoicedetails=true;
        this.followupdetails=false;
        console.log(this.FollowUpList);
      });
     }
  }

  FollowupList() {
    if ( this.selectedCustomer != undefined) {
    this.regSv.getFollowupListsforCustomer(this.selectedCustomer).subscribe((response: any) => {
      this.FollowUpData = response;
      this.followupdetails=true;
      this.invoicedetails=false;
      console.log(this.FollowUpData);
    });
  }
  else{
    this.regSv.getFollowupLists().subscribe((response: any) => {
      this.FollowUpData = response;
      this.followupdetails=true;
      this.invoicedetails=false;
      console.log(this.FollowUpData);
    });
  }
  }

  FollowupPending() {
if ( this.selectedCustomer != undefined) {

      this.regSv
      .getCustomerFollowupPending()
      .subscribe((response: any) => {
        this.FollowUpList = response
        // for (let i = 0; i < this.FollowUpList.length; i++) {
        //   if (this.FollowUpList[i].isPaid == true) {
        //     this.followupstatus = "Completed";


        //   }
        //   else {
        //     this.followupstatus = "Pending";
        //   }

        // }
        this.invoicedetails=true;
        this.followupdetails=false;
        console.log(this.FollowUpList);
      });
     }
     else{
      this.regSv
      .getCustomerFollowupPending()
      .subscribe((response: any) => {
        this.FollowUpList = response
        // for (let i = 0; i < this.FollowUpList.length; i++) {
        //   if (this.FollowUpList[i].isPaid == true) {
        //     this.followupstatus = "Completed";


        //   }
        //   else {
        //     this.followupstatus = "Pending";
        //   }

        // }
        this.invoicedetails=true;
        this.followupdetails=false;
        console.log(this.FollowUpList);
      });
     }
  }
  exportTableToPDF(): void {
    const doc = new jspdf.jsPDF();
    const table = this.table.nativeElement;

    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = doc.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save('follow-up.pdf');
    });
  }
  exportTableToExcel(): void {
    const element = document.getElementById('tableId'); // Replace 'tableId' with the actual ID of your HTML table
  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'follow-up_data');
  }
  exportTableToExcelint(): void {
    const element = document.getElementById('tableId'); // Replace 'tableId' with the actual ID of your HTML table
  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'follow-up_data');
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName + '.xlsx';
    downloadLink.click();
  }
  exportTableToExcelfo(): void {
    const element = document.getElementById('tableIdfo'); // Replace 'tableId' with the actual ID of your HTML table
  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'folow-up');
  }
  exportTableToExcelintfo(): void {
    const element = document.getElementById('tableIdfo'); // Replace 'tableId' with the actual ID of your HTML table
  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'folow-up');
  }
 
  GetDatewiserequestfollowup() {
    this.Datewiserequest = this.fromDate + ',' + this.toDate;
    this.regSv.getDatewiserequestfollowupDate(this.Datewiserequest).subscribe((response: any) => {
      this.followup = response;
    });
  }
}
