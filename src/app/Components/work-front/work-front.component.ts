import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';
import * as XLSX from 'xlsx';

import { ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-work-front',
  templateUrl: './work-front.component.html',
  styleUrls: ['./work-front.component.css'],
  providers: [DatePipe]
})
export class WorkFrontComponent implements OnInit {
  @ViewChild('table', { static: false }) table!: ElementRef;
  @ViewChild('table1', { static: false }) table1!: ElementRef;
  @ViewChild('table2', { static: false }) table2!: ElementRef;

  userName: any;
  roleId: any;
  IsLoggedIn: any;
  worklist: any;
  date!: Date;
  p: number = 1;
  customerList: any;
  exporting: boolean = false;
  requestlist: any;
  zonelist: any;
  selectedZone: any;
  contactData: any;
  zoneName: any;
  currentDate: Date | undefined;
  formattedDate: string = '';
  formattedDateRemarks: string = '';
  currentDatee: Date | undefined;
  priority0Worklist: any[] = [];
  otherWorklist: any = [];
  workpriority: any = [];
  zoneSelected: boolean = false;
  selectedAttendedBy: any;
  selectedAttendedHow: any;
  isClicked: boolean = false;
  customerID: any;
  companyName: any;
  isDone: any;
  machineNumber: any;
  modelId: any;
  modelName: any;
  region: any;
  remarks: any;
  requestFor: any;
  zone: any;
  requestId: any;
  regionId: any;
  dateofinteraction: any;
  attendtypelist: any;
  usersList: any;
  workpriority45: any[] = [];
  tokenID: any;
  tableLength: any;
  generateMachineNo: any;
  MachineNo: any;
  //sequence1: boolean[] = [];
 // sequence2: boolean[] = [];
 // currentSequenceNumber = 1;
  // checedLength: any = [];
  // checedLengthvalue: any;
  sequence: boolean[];
 // checkedIndexes: number[] = [];
  selectedRows: any[] = [];
  selectedRows1: any[] = [];
  sequenceTwo: boolean[];
  checkedRows: any[];
  checkedRows1: any[];
  checkedIndexes: number[] = [];
  checkedIndexes1: number[] = [];
  constructor(
    private regSv: RegistrationService,
    private masterSv: MasterService,
    private route: Router,
    private datePipe: DatePipe,
    private zoneng: NgZone
  ) {
    if (localStorage.getItem('IsLoggedIn') == 'true') {
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
    this.sequence = new Array(this.workpriority.length).fill(false);
    this.sequenceTwo = new Array(this.workpriority45.length).fill(false);
  }

  ngOnInit(): void {
    this.getrequest();
    this.getAttendType();
    this.getUsers();

    const date = new Date();
    this.currentDate = new Date();
    const formattedDate = this.datePipe.transform(
      this.currentDate,
      'dd MMM yyyy'
    ); // Format the date
    this.formattedDate = formattedDate !== null ? formattedDate : '';
    const formattedDateRemarks = this.datePipe.transform(
      this.currentDate,
      'dd/MM/yy'
    ); // Format the date
    this.formattedDateRemarks =
      formattedDateRemarks !== null ? formattedDateRemarks : '';

    if (this.formattedDate === null) {
      this.formattedDate = '';
    }
    this.getZone();
    //this.getWorkfrontrequest(); // Initialize the worklist when the component is loaded
  }

  getZone() {
    this.masterSv.getZone().subscribe((response: any) => {
      this.zonelist = response;
    });
  }



onCheckboxClick(request: any) {
  const index = this.selectedRows.findIndex(row => row.tokenID === request.tokenID);
  const index1 = this.workpriority.indexOf(request);

  if (index1 !== -1) {
    if (this.sequence[index1]) {
      // If checked, remove the index from the checkedIndexes array
      const checkedIndex = this.checkedIndexes.indexOf(index1);
      if (checkedIndex !== -1) {
        this.checkedIndexes.splice(checkedIndex, 1);
      }
    } else {
      // If unchecked, add the index to the checkedIndexes array
      this.checkedIndexes.push(index1);
    }
  }

  this.selectedRows = [];

  for (let i = 0; i < this.checkedIndexes.length; i++) {
    const checkedIndex = this.checkedIndexes[i];
    // Add an empty row before each checked row
    const emptyRow = this.createEmptyRow();
    this.selectedRows.push(emptyRow);
    
    // Add the checked row
    this.selectedRows.push(this.workpriority[checkedIndex]);
  }

  // Add an extra empty row at the end
  const extraEmptyRow = this.createEmptyRow();
  this.selectedRows.push(extraEmptyRow);

  console.log(this.selectedRows);
}

createEmptyRow(): any {
  return {
    addressOne: '', addressThree: '', addressTwo: '', city:'', cluster:'', clusterId: '', companyName: '', contactData: '', contactDatastring: '',
    country: '', createdBy: '', createdOn: '', customerID: '', customerId: '', customerName: '', date: '', dateString: '', features: '', featuresId: '',
    gstin: '', invoiceAmount: '', invoiceDate: '', invoiceFileBlob: '', invoiceNumber: '', invoicePerticular: '', invoicePerticularId: '', isDone: '',
    machineId: '', machineNumber: '', modelId: '', modelName: '', pincode: '', priority: '', region: '', regionId: '', remarks: '', requestFor: '',
    requestForId: '', requestId: '', routeId: '', routeNumber: '', sandS: '', sandSId: '', securityFormalities: '', state:'', tokenID: '',unit:'',
    warrantyFrom:'', warrantyTill: '', weeklyOff:'', workingEnd:'', workingStart:'', zone:'', zoneId:''
  };
}

generateTS() {
  if (this.selectedZone == null || this.selectedZone == "") {
    alert("Please select zone");
    return;
  }
  this.route.navigate(['/TravelSheet'], { state: { selectedData: this.selectedRows } });
}

onCheckboxClick1(request: any) {
  const index = this.selectedRows1.findIndex(row => row.tokenID === request.tokenID);
  const index2 = this.workpriority45.indexOf(request);

  if (index2 !== -1) {
    if (this.sequenceTwo[index2]) {
      // If checked, remove the index from the checkedIndexes array
      const checkedIndex = this.checkedIndexes1.indexOf(index2);
      if (checkedIndex !== -1) {
        this.checkedIndexes1.splice(checkedIndex, 1);
      }
    } else {
      // If unchecked, add the index to the checkedIndexes array
      this.checkedIndexes1.push(index2);
    }
  }

  this.selectedRows1 = [];

  for (let i = 0; i < this.checkedIndexes1.length; i++) {
    const checkedIndex = this.checkedIndexes1[i];
    // Add an empty row before each checked row
    const emptyRow = this.createEmptyRow();
    this.selectedRows1.push(emptyRow);
    
    // Add the checked row
    this.selectedRows1.push(this.workpriority45[checkedIndex]);
  }

  // Add an extra empty row at the end
  const extraEmptyRow = this.createEmptyRow();
  this.selectedRows1.push(extraEmptyRow);

  console.log(this.selectedRows1);
  }
  

generateTStwo() {
  if (this.selectedZone == null || this.selectedZone == "") {
    alert("Please select zone");
    return;
  }
  this.route.navigate(['/TravelSheet'], { state: { selectedData: this.selectedRows1 } });
}


  onSelectZone(data: any) {
    this.otherWorklist = []
    this.workpriority45 = []
    this.workpriority = []
    this.exporting = false;
    this.selectedZone = data.target.value;

    // Set the zoneName variable based on the selectedZone
    this.GetZoneName();

    this.regSv
      .getWorkfrontrequestzonewise(this.selectedZone)
      .subscribe((response: any) => {
        this.worklist = response;
        this.sortWorklist(); // Sort the worklist after changing the data

        if (this.worklist.length != 0) {
          this.exporting = true;
        } else {
          alert('No Requests Found For Selected Zone!!!');
        }
        for (var i = 0; i < this.worklist.length; i++) {
          if (this.worklist[i].priority === "T0" || this.worklist[i].priority === "T1" || this.worklist[i].priority === "T2" || this.worklist[i].priority === "T3" || this.worklist[i].priority === "T4" || this.worklist[i].priority === "T5" || this.worklist[i].priority === "T6") {
            this.otherWorklist.push(this.worklist[i]);
          } else 
          // if (this.worklist[i].priority === "F4" || this.worklist[i].priority === "F5" || this.worklist[i].priority === "F6") {
          //   this.workpriority45.push(this.worklist[i]);
          //   // console.log(this.workpriority45)
          // } else 
          {
            this.workpriority.push(this.worklist[i]);
          }
        }
      });
    this.zoneSelected = true;
    console.log(this.otherWorklist)
    console.log(this.workpriority)
    // console.log(this.workpriority45)

  }

  GetZoneName() {
    for (let i = 0; i < this.zonelist.length; i++) {
      if (this.selectedZone == this.zonelist[i].zoneId) {
        this.zoneName = this.zonelist[i].zoneName;
        console.log(this.selectedZone);
        console.log(this.zoneName);
      }
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
      doc.save('table_data.pdf');
    });
  }
  exportTableToPDF1(): void {
    const doc = new jspdf.jsPDF();
    const table = this.table1.nativeElement;

    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = doc.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save('table_data.pdf');
    });
  }
  exportTableToPDF2(): void {
    const doc = new jspdf.jsPDF();
    const table = this.table2.nativeElement;

    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = doc.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save('table_data.pdf');
    });
  }
  // getWorkfrontrequest() {
  //   this.regSv.getWorkfrontrequest().subscribe((response: any) => {
  //     this.worklist = response;
  //     this.sortWorklist();


  //     this.workpriority45 = [];

  //     for (var i = 0; i < this.worklist.length; i++) {
  //       if (this.worklist[i].requestFor === "T0" || this.worklist[i].requestFor === "T1" || this.worklist[i].requestFor === "T2"|| this.worklist[i].requestFor === "T3"|| this.worklist[i].requestFor === "T4"|| this.worklist[i].requestFor === "T5"|| this.worklist[i].requestFor === "T6") {
  //         this.otherWorklist.push(this.worklist[i]);
  //       } else if (this.worklist[i].requestFor === "F4" || this.worklist[i].requestFor === "F5"|| this.worklist[i].requestFor === "F6" ) {
  //         this.workpriority45.push(this.worklist[i]);
  //         console.log(this.workpriority45)
  //       } else {
  //         this.workpriority.push(this.worklist[i]);
  //       }
  //     }
  //     console.log(this.otherWorklist)
  //     console.log(this.workpriority45)
  //     console.log(this.workpriority)

  //   });
  // }


  exportTableToExcel(): void {
    const element = document.getElementById('tableId');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const excelBuffer: any = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, 'WorkFront' + this.formattedDate);
  }
  exportTableToExcel1(): void {
    const element = document.getElementById('tableId1');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const excelBuffer: any = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, 'WorkFront' + this.formattedDate);
  }
  exportTableToExcel2(): void {
    const element = document.getElementById('tableId2');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const excelBuffer: any = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, 'WorkFront' + this.formattedDate);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName + '.xlsx';
    downloadLink.click();
  }

  sortWorklist() {
    this.worklist.sort((a: { routeId: number; priority: number; }, b: { routeId: number; priority: number; }) => {
      if (a.routeId !== b.routeId) {

        return a.routeId - b.routeId;
      } else {

        return a.priority - b.priority;
      }
    });
  }

  getAttendType() {
    this.masterSv.getAttendType().subscribe((response: any) => {
      this.attendtypelist = response;
      console.log(this.attendtypelist)
    })
  }



  getUsers() {
    this.regSv.getUsers().subscribe((response: any) => {
      this.usersList = response;
      console.log(this.usersList);
    });
  }
  getrequest() {
    this.regSv.getPendingrequest().subscribe((response: any) => {
      this.requestlist = response;
      console.log(this.requestlist);
      if (this.requestlist.length != 0) {
        this.exporting = true;
      }
    });
  }
  onSelectAttendedBy(data: any) {
    this.selectedAttendedBy = data.target.value
  }
  onSelectAttendedHow(data: any) {
    this.selectedAttendedHow = data.target.value
  }
  Done(abd: any) {
    this.isClicked = true
    this.companyName = abd.companyName
    this.tokenID = abd.tokenID
    this.customerID = abd.customerID
    this.isDone = abd.isDone
    this.machineNumber = abd.machineNumber
    this.modelId = abd.modelId
    this.modelName = abd.modelName
    this.region = abd.region
    this.remarks = abd.remarks
    this.requestFor = abd.requestFor
    this.zone = abd.zone
    this.requestId = abd.requestForId
  }


  savedoneDetails() {
    var interactionData = {
      CutomerId: this.customerID,
      CutomerName: this.companyName,
      TicketNo: this.tokenID,
      //MachineId : this.ma
      MachineNumber: this.machineNumber,
      ModelId: this.modelId,
      ModelName: this.modelName,
      RegionId: this.regionId,
      RegionName: this.region,
      //ZoneId : this.z
      ZoneName: this.zone,
      Remarks: this.remarks,
      AttendedByUserId: this.selectedAttendedBy,
      //AttendedByUserName : this.selectedAttendedBy,
      AttendedHowId: this.selectedAttendedHow,
      //AttendedHowName : this.selectedAttendedHow,
      CreatedBy: this.userName,
      RequestId: this.requestId,
      DateOfInteraction: this.dateofinteraction
    }
    this.regSv.postSaveInteraction(interactionData).subscribe((response: any) => {
      if (response == "success") {
        alert("Interacted Successfully")
        window.location.reload()
      }
      else {
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })
  }

}
