import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';
import * as XLSX from 'xlsx';

import { ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
  usersList: any;
  p: number = 1;
  rolelist:any;
  viewrole:any;
  viewusername:any;
  viewemail:any;
  viewId:any;
constructor(    
  private regSv : RegistrationService, private masterSv:MasterService,private route : Router
  ){}

ngOnInit(): void {
  this.getUsers();
  this.getRole()
}
  getUsers() {
    this.regSv.getUsers().subscribe((response: any) => {
      this.usersList = response;
      console.log(this.usersList);
      if(this.usersList.length!=0){
        this.exporting=true;
      }
    });
  }
  getRole(){
    this.masterSv.getRole().subscribe((response:any)=>{
      this.rolelist = response;
      console.log(this.rolelist)
    })
  }
  deleteUser(userid: any) {
    this.regSv.deleteUser(userid).subscribe((response: any) => {
      if (response == 'success') {
        alert('User Deleted');
        window.location.reload();
      } else {
        alert('Somthing Went Wrong!!');
        window.location.reload();
      }
    });
  }
  onSelectRole(data:any){
    this.viewrole = data.target.value
      }
  editUser(data:any){

    this.viewId=data.id;
    this.viewusername=data.userName;
    this.viewemail=data.email;
    this.viewrole=data.roleId;

  }
  UpdateUser(){
    var userUpdateData = {
      Id:this.viewId,
      UserName : this.viewusername,
      Email : this.viewemail,
      RoleId : this.viewrole,
     
    }
    this.regSv.UpdateUserRegister(userUpdateData).subscribe((response:any)=>{
      if(response == "success"){
        alert("User Updated Successfully")
        window.location.reload()
      }
      else
      {
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
      doc.save('userlist_data.pdf');
    });
  }
  exportTableToExcel(): void {
    const element = document.getElementById('tableId'); // Replace 'tableId' with the actual ID of your HTML table
  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'userlist_data');
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName + '.xlsx';
    downloadLink.click();
  }

}
