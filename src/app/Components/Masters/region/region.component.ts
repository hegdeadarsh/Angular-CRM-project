import { Component } from '@angular/core';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import * as XLSX from 'xlsx';

import { ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent{
  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
  regionname:any;
  regionlist:any;
  p: number = 1;
  userName :any;
  roleId:any;
  IsLoggedIn: any;
  regionID:any;
  viewregion:any;
  constructor(private masterSv:MasterService){
    if (localStorage.getItem('IsLoggedIn') == 'true'){
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
  }
  ngOnInit(): void {
    this.getRegion()
  }
  getRegion(){
    this.masterSv.getRegion().subscribe((response:any)=>{
      this.regionlist = response;
      console.log(this.regionlist)
      if(this.regionlist.length!=0){
        this.exporting=true;
      }
    })
  }
  saveRegion(){
    if (this.regionname == null || this.regionname == '') {
    alert("Please enter the Region Name");
    return;
  }
    var regionData = {
      RegionName : this.regionname,
      CreatedBy : this.userName
    }
    this.masterSv.saveRegion(regionData).subscribe((response:any)=>{
      if(response == "success"){
        alert("Region Saved")
        window.location.reload()
      }else{
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })
  }
  deleteRegion(regionid:any){
this.masterSv.deleteRegion(regionid).subscribe((response:any)=>{
  if(response == "success"){
    alert("Region Deleted")
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
      doc.save('regions_data.pdf');
    });
  }
  exportTableToExcel(): void {
    const element = document.getElementById('tableId'); // Replace 'tableId' with the actual ID of your HTML table
  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'regions_data');
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName + '.xlsx';
    downloadLink.click();
  }
  editRegion(data:any){
this.regionID=data.regionId;
this.viewregion=data.regionName;
  }
UpdateRegion(){
  var regionData = {
    RegionId:this.regionID,
    RegionName : this.viewregion,
    CreatedBy : this.userName
  }
  this.masterSv.updateRegion(regionData).subscribe((response:any)=>{
    if(response == "success"){
      alert("Region Updated")
      window.location.reload()
    }else{
      alert("Somthing Went Wrong!!")
      window.location.reload()
    }
  })
}
}

