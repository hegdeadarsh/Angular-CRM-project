import { Component } from '@angular/core';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import * as XLSX from 'xlsx';

import { ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-type-of-attend-master',
  templateUrl: './type-of-attend-master.component.html',
  styleUrls: ['./type-of-attend-master.component.css']
})
export class TypeOfAttendMasterComponent {
  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
  attendtypename:any;
  attendtypelist:any;
  p: number = 1;
  userName :any;
  roleId:any;
  IsLoggedIn: any;
  attendtypeID:any;
  viewattendtype:any;
  constructor(private masterSv:MasterService){
    if (localStorage.getItem('IsLoggedIn') == 'true'){
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
  }
  ngOnInit(): void {
    this.getAttendType()
  }
  getAttendType(){
    this.masterSv.getAttendType().subscribe((response:any)=>{
      this.attendtypelist = response;
      console.log(this.attendtypelist)
      if(this.attendtypelist.length!=0){
        this.exporting=true;
      }
    })
  }
  saveAttendType(){
    if (this.attendtypename == null || this.attendtypename == '') {
      alert("Please enter the AttendType Name");
      return;
    }
    var attendtypeData = {
      AttendTypeName : this.attendtypename,
      CreatedBy : this.userName
    }
    this.masterSv.saveAttendType(attendtypeData).subscribe((response:any)=>{
      if(response == "success"){
        alert("Attend Type Saved")
        window.location.reload()
      }else{
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })
  }
  exportTableToPDF(): void {
    const doc = new jspdf.jsPDF();
    const table = this.table.nativeElement;

    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = doc.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save('attendtypes_data.pdf');
    });
  }
  exportTableToExcel(): void {
    const element = document.getElementById('tableId'); // Replace 'tableId' with the actual ID of your HTML table
  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'attendtypes_data');
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName + '.xlsx';
    downloadLink.click();
  }
  deleteAttendType(attendtypeid:any){
this.masterSv.deleteAttendType(attendtypeid).subscribe((response:any)=>{
  if(response == "success"){
    alert("AttendType Deleted")
    window.location.reload()
  }else{
    alert("Somthing Went Wrong!!")
    window.location.reload()
  }
})
  }
  editAttendType(data:any){
this.attendtypeID=data.attendTypeId;
this.viewattendtype=data.attendTypeName;
  }
  UpdateAttendType(){
    var attendtypeData = {
      AttendTypeId:this.attendtypeID,
      AttendTypeName : this.viewattendtype,
      CreatedBy : this.userName
    }
    this.masterSv.updateAttendType(attendtypeData).subscribe((response:any)=>{
      if(response == "success"){
        alert("Attend Type Updated")
        window.location.reload()
      }else{
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })
  }
}
