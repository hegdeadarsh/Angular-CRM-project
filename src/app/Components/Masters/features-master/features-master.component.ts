import { Component } from '@angular/core';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import * as XLSX from 'xlsx';

import { ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-features-master',
  templateUrl: './features-master.component.html',
  styleUrls: ['./features-master.component.css']
})
export class FeaturesMasterComponent {
  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
  featuresname:any;
  featureslist:any;
  p: number = 1;
  userName :any;
  roleId:any;
  IsLoggedIn: any;
  featureID:any;
  viewfeature:any;
  constructor(private masterSv:MasterService){
    if (localStorage.getItem('IsLoggedIn') == 'true'){
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
  }
  ngOnInit(): void {
    this.getFeatures()
  }
  getFeatures(){
    this.masterSv.getFeatures().subscribe((response:any)=>{
      this.featureslist = response;
      console.log(this.featureslist)
      if(this.featureslist.length!=0){
        this.exporting=true;
      }
    })
  }
  saveFeatures(){
    if (this.featuresname == null || this.featuresname == '') {
    alert("Please enter the Features  Name");
    return;
  }
   
    var featuresData = {
      FeaturesName : this.featuresname,
      CreatedBy : this.userName
    }
    this.masterSv.saveFeatures(featuresData).subscribe((response:any)=>{
      if(response == "success"){
        alert("Features Saved")
        window.location.reload()
      }else{
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })
  }
  deleteFeatures(featuresid:any){
this.masterSv.deleteFeatures(featuresid).subscribe((response:any)=>{
  if(response == "success"){
    alert("Features Deleted")
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
      doc.save('features_data.pdf');
    });
  }

  exportTableToExcel(): void {
    const element = document.getElementById('tableId'); // Replace 'tableId' with the actual ID of your HTML table
  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'features_data');
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName + '.xlsx';
    downloadLink.click();
  }
  editFeatures(data:any){
    this.featureID=data.featuresId;
    this.viewfeature=data.featuresName;
  }
  UpdateFeature(){
    var featuresData = {
      FeaturesId:this.featureID,
      FeaturesName : this.viewfeature,
      CreatedBy : this.userName
    }
    this.masterSv.updateFeatures(featuresData).subscribe((response:any)=>{
      if(response == "success"){
        alert("Features Updated")
        window.location.reload()
      }else{
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })
  }
}
