import { Component } from '@angular/core';
import { MasterService } from 'src/app/Services/MasterService/master.service';

import * as XLSX from 'xlsx';

import { ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-model-master',
  templateUrl: './model-master.component.html',
  styleUrls: ['./model-master.component.css']
})
export class ModelMasterComponent {
  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
  modelname:any;
  modellist:any;
  p: number = 1;
  userName :any;
  roleId:any;
  IsLoggedIn: any;
  modelID:any;
  viewmodel:any;
  constructor(private masterSv:MasterService){
    if (localStorage.getItem('IsLoggedIn') == 'true'){
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
  }
  ngOnInit(): void {
    this.getModel()
  }
  getModel(){
    this.masterSv.getModel().subscribe((response:any)=>{
      this.modellist = response;
      console.log(this.modellist)
    if(this.modellist.length!=0){
      this.exporting=true;
    }
    })
  }
  saveModel(){
    if (this.modelname == null || this.modelname == '') {
      alert("Please enter the Model Name");
      return;
    }
    var modelData = {
      ModelName : this.modelname,
      CreatedBy : this.userName
    }
    this.masterSv.saveModel(modelData).subscribe((response:any)=>{
      if(response == "success"){
        alert("Model Saved")
        window.location.reload()
      }else{
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })
  }
  deleteModel(modelid:any){
this.masterSv.deleteModel(modelid).subscribe((response:any)=>{
  if(response == "success"){
    alert("Model Deleted")
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
      doc.save('models_data.pdf');
    });
  }
  exportTableToExcel(): void {
    const element = document.getElementById('tableId'); // Replace 'tableId' with the actual ID of your HTML table
  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'models_data');
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName + '.xlsx';
    downloadLink.click();
  }
  editModel(data:any){
this.modelID=data.modelId;
this.viewmodel=data.modelName;
  }
  UpdateModel(){
    var modelData = {
      ModelId:this.modelID,
      ModelName : this.viewmodel,
      CreatedBy : this.userName
    }
    this.masterSv.updateModel(modelData).subscribe((response:any)=>{
      if(response == "success"){
        alert("Model Updated")
        window.location.reload()
      }else{
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })
  }

}
