import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Services/MasterService/master.service';

import * as XLSX from 'xlsx';

import { ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-role-master',
  templateUrl: './role-master.component.html',
  styleUrls: ['./role-master.component.css']
})
export class RoleMasterComponent implements OnInit{
  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
  rolename:any;
  rolelist:any;
  p: number = 1;
  username :any;
  roleId:any;
  IsLoggedIn:any;
  roleid:any;
  viewrole:any;
  constructor(private masterSv:MasterService){
    if (localStorage.getItem('IsLoggedIn') == 'true'){
      this.username = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
  }
  ngOnInit(): void {
    this.getRole()
  }
  getRole(){
    this.masterSv.getRole().subscribe((response:any)=>{
      this.rolelist = response;
      console.log(this.rolelist)
      if(this.rolelist.length!=0){
        this.exporting=true;
      }
    })
  }
  saveRole(){
    if (this.rolename == null || this.rolename == '') {
      alert("Please enter the Role Name");
      return;
    }
    var roleData = {
      RoleName : this.rolename,
      CreatedBy : this.username
    }
    this.masterSv.saveRole(roleData).subscribe((response:any)=>{
      if(response == "success"){
        alert("Role Saved")
        window.location.reload()
      }else{
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })
  }
  deleteRole(roleid:any){
this.masterSv.deleteRole(roleid).subscribe((response:any)=>{
  if(response == "success"){
    alert("Role Deleted")
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
      doc.save('roles_data.pdf');
    });
  }

  exportTableToExcel(): void {
    const element = document.getElementById('tableId'); // Replace 'tableId' with the actual ID of your HTML table
  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'roles_data');
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName + '.xlsx';
    downloadLink.click();
  }
  UpdateRole(){
    var roleData = {
      Id:this.roleid,
      RoleName : this.viewrole,
      CreatedBy : this.username
    }
    this.masterSv.updateRole(roleData).subscribe((response:any)=>{
      if(response == "success"){
        alert("Role Updated Successfully")
        window.location.reload()
      }else{
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })
  }
  editRole(data:any){
    this.roleid=data.id;
    this.viewrole=data.roleName;
    
  }
}
