import { Component } from '@angular/core';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import * as XLSX from 'xlsx';

import { ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-purpose-job-time-master',
  templateUrl: './purpose-job-time-master.component.html',
  styleUrls: ['./purpose-job-time-master.component.css']
})
export class PurposeJobTimeMasterComponent {
  @ViewChild('table', { static: false }) table!: ElementRef;
  purposeName: any;
  jobTime: any;

  exporting: boolean = false;
  viewpurposeupdate: any;
  viewJobTime: any;
  p: number = 1;
  userName: any;
  roleId: any;
  IsLoggedIn: any;
  purposeList: any;
  purposeId: any;
  constructor(private masterSv: MasterService) {
    if (localStorage.getItem('IsLoggedIn') == 'true') {
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
  }

  ngOnInit(): void {
    this.getAllPurposeJobTime();
  }
  getAllPurposeJobTime() {
    this.masterSv.getAllPurposeJobTime().subscribe((response: any) => {
      this.purposeList = response;
      console.log(this.purposeList);
      if (this.purposeList.length != 0) {
        this.exporting = true;
      }
    });
  }
  save() {
    if(this.purposeName == null || this.purposeName == ''){
      alert("Please enter the Purpose Name");
    }else if(this.jobTime == null || this.jobTime == ''){
      alert("Please enter the Job Time");
    }else{
    var purposeData = {
      PurposeName: this.purposeName,
      JobTime: this.jobTime,
      CreatedBy: this.userName,
    };
    this.masterSv.savePurposeJobTime(purposeData).subscribe((response: any) => {
      if (response == 'success') {
        alert('Purpose - Est. Job Tme saved');
        window.location.reload();
      } else {
        alert('Somthing Went Wrong!!');
        window.location.reload();
      }
    });
  }
  }

  deletePurpose(id: any) {
    this.masterSv.deletePurpose(id).subscribe((response: any) => {
      if (response == 'success') {
        alert('Purpose Deleted');
        window.location.reload();
      } else {
        alert('Somthing Went Wrong!!');
        window.location.reload();
      }
    });
  }

  editPurpose(data: any) {
    this.viewpurposeupdate = data.purposeName;
    this.viewJobTime = data.jobTime;
    this.purposeId = data.id;
  }
  updatePurpose() {
    var purposeData = {
      Id: this.purposeId,
      PurposeName: this.viewpurposeupdate,
      JobTime: this.viewJobTime,
      CreatedBy: this.userName,
    };
    this.masterSv.updatePurpose(purposeData).subscribe((response: any) => {
      if (response == 'success') {
        alert('Purpose - Est Job time Updated');
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
      doc.save('purpose_data.pdf');
    });
  }

  exportTableToExcel(): void {
    const element = document.getElementById('tableId'); // Replace 'tableId' with the actual ID of your HTML table

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'purpose_data');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName + '.xlsx';
    downloadLink.click();
  }
}
