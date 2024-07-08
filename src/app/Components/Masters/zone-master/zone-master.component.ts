import { Component } from '@angular/core';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import * as XLSX from 'xlsx';

import { ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-zone-master',
  templateUrl: './zone-master.component.html',
  styleUrls: ['./zone-master.component.css']
})
export class ZoneMasterComponent {
  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
  zonename:any;
  zonelist:any;
  p: number = 1;
  userName :any;
  roleId:any;
  IsLoggedIn: any;
  zoneID:any;
  viewzone:any;
  constructor(private masterSv:MasterService){
    if (localStorage.getItem('IsLoggedIn') == 'true'){
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
  }
  ngOnInit(): void {
    this.getZone()
  }
  getZone(){
    this.masterSv.getZone().subscribe((response:any)=>{
      this.zonelist = response;
      console.log(this.zonelist)
      if(this.zonelist.length!=0){
        this.exporting=true;
      }
    })
  }
  saveZone(){
    if (this.zonename == null || this.zonename == '') {
      alert("Please enter the Zone Name");
      return;
    }
    var zoneData = {
      ZoneName : this.zonename,
      CreatedBy : this.userName
    }
    this.masterSv.saveZone(zoneData).subscribe((response:any)=>{
      if(response == "success"){
        alert("Zone Saved")
        window.location.reload()
      }else{
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })
  }
  deleteZone(zoneid:any){
this.masterSv.deleteZone(zoneid).subscribe((response:any)=>{
  if(response == "success"){
    alert("Zone Deleted")
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
      doc.save('zones_data.pdf');
    });
  }
  exportTableToExcel(): void {
    const element = document.getElementById('tableId'); // Replace 'tableId' with the actual ID of your HTML table
  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'zones_data');
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName + '.xlsx';
    downloadLink.click();
  }
  editZone(data:any){
this.zoneID=data.zoneId;
this.viewzone=data.zoneName;
  }
UpdateZone(){
  var zoneData = {
    ZoneId:this.zoneID,
    ZoneName : this.viewzone,
    CreatedBy : this.userName
  }
  this.masterSv.updateZone(zoneData).subscribe((response:any)=>{
    if(response == "success"){
      alert("Zone Saved")
      window.location.reload()
    }else{
      alert("Somthing Went Wrong!!")
      window.location.reload()
    }
  })
}
}