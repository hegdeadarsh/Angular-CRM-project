import { Component } from '@angular/core';
import { MasterService } from 'src/app/Services/MasterService/master.service';

import * as XLSX from 'xlsx';

import { ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-requests-master',
  templateUrl: './requests-master.component.html',
  styleUrls: ['./requests-master.component.css'],
})
export class RequestsMasterComponent {
  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
  requestsname: any;
  requestslist: any;
  p: number = 1;
  userName: any;
  roleId: any;
  IsLoggedIn: any;
  prioritylist:any;
  viewrequestname:any;
  priorityID:any;

  selectedPriority:any;
  Priorityy:any;
  viewrequest:any;
  viewpriority:any;
  viewpriorityupdate:any;
  viewrequestnameupdate:any;
  viewrequestID:any;

  constructor(private masterSv: MasterService) {
    if (localStorage.getItem('IsLoggedIn') == 'true') {
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
  }
  ngOnInit(): void {
    this.getRequests();
    this.getPriority();
  }
  getRequests() {
    this.masterSv.getRequests().subscribe((response: any) => {
      this.requestslist = response;
      console.log(this.requestslist);
      if(this.requestslist.length!=0){
        this.exporting=true;
      }
    });
  }
  getPriority(){
    this.masterSv.getPriority().subscribe((response: any) => {
      this.prioritylist = response;
      console.log(this.prioritylist);
    });
  }
  saveRequests() {
    if (this.requestsname == null || this.requestsname == '') {
      alert("Please enter the Requests Name");
      return;
    }
    var requestsData = {
      RequestsName: this.requestsname,
      CreatedBy: this.userName,
    };
    this.masterSv.saveRequests(requestsData).subscribe((response: any) => {
      if (response == 'success') {
        alert('Request Saved');
        window.location.reload();
      } else {
        alert('Somthing Went Wrong!!');
        window.location.reload();
      }
    });
  }
  deleteRequests(requestsid: any) {
    this.masterSv.deleteRequests(requestsid).subscribe((response: any) => {
      if (response == 'success') {
        alert('Request Deleted');
        window.location.reload();
      } else {
        alert('Somthing Went Wrong!!');
        window.location.reload();
      }
    });
  }
  SetPriority(data:any){
this.viewrequestname=data.requestsName;
this.priorityID=data.requestsId;
this.viewpriority=data.priority;
  }
  onSelectPriority(data: any) {
    this.selectedPriority = data.target.value;
  }
  onSelectPriorityUpdate(data: any) {
    this.viewpriorityupdate = data.target.value;
  }
  ChangePriority(){
    if(this.selectedPriority=="undefined" || this.selectedPriority==null || this.selectedPriority=="")
    {
      alert("Please Select the Priority")
    }
    else{
      this.Priorityy=this.selectedPriority;
      this.UpdatePriority();
    }
    
  }
  UpdatePriority(){
    var requestsData = {
      RequestsName: this.viewrequestname,
      RequestsId: this.priorityID,
      Priority:this.Priorityy
    };
    this.masterSv.updatePriority(requestsData).subscribe((response: any) => {
      if (response == 'success') {
        alert('Priority Saved');
        window.location.reload();
      } else {
        alert('Somthing Went Wrong!!');
        window.location.reload();
      }
    });
  }
  exportTableToPDF(): void {
    const doc = new jspdf.jsPDF();
    const table = this.table.nativeElement;

    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = doc.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save('requests_data.pdf');
    });
  }

  
  exportTableToExcel(): void {
    const element = document.getElementById('tableId'); // Replace 'tableId' with the actual ID of your HTML table
  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'requests_data');
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName + '.xlsx';
    downloadLink.click();
  }

  editRequest(data:any){
this.viewpriorityupdate=data.priority;
this.viewrequestnameupdate=data.requestsName;
this.viewrequestID=data.requestsId;
  }

  UpdateRequest(){
    var requestsData = {
      RequestsId:this.viewrequestID,
      Priority:this.viewpriorityupdate,
      RequestsName: this.viewrequestnameupdate,
      CreatedBy: this.userName,
    };
    this.masterSv.updateRequests(requestsData).subscribe((response: any) => {
      if (response == 'success') {
        alert('Request Updated');
        window.location.reload();
      } else {
        alert('Somthing Went Wrong!!');
        window.location.reload();
      }
    });
  }
}
