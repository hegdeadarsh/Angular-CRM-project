import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import * as jspdf from 'jspdf';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-brochure',
  templateUrl: './brochure.component.html',
  styleUrls: ['./brochure.component.css']
})
export class BrochureComponent {

  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
  p: number = 1;
  userName :any;
  roleId:any;
  IsLoggedIn: any;
  brochurename: any;
  brochureID: any;
  viewbrochure: any;
  brochurelist: any;
  constructor(private masterSv:MasterService){
    if (localStorage.getItem('IsLoggedIn') == 'true'){
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
  }
  ngOnInit(): void {
    this.getBrochure()
  }
  getBrochure(){
    this.masterSv.getBrochure().subscribe((response:any)=>{
      this.brochurelist = response;
      console.log(this.brochurelist)
      if(this.brochurelist.length!=0){
        this.exporting=true;
      }
    })
  }
  saveBrochure(){
    var Data = {
      BrochureName : this.brochurename,
      CreatedBy : this.userName
    }
    this.masterSv.saveBrochure(Data).subscribe((response:any)=>{
      if(response == "success"){
        alert("Brochure Saved")
        window.location.reload()
      }else{
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })
  }
  deletebrochure(id:any){
this.masterSv.deleteBrochure(id).subscribe((response:any)=>{
  if(response == "success"){
    alert("Brochure Deleted")
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
      doc.save('faults_data.pdf');
    });
  }
  exportTableToExcel(): void {
    const element = document.getElementById('tableId'); // Replace 'tableId' with the actual ID of your HTML table
  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'faults_data');
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName + '.xlsx';
    downloadLink.click();
  }
  editBrochure(data:any){
this.brochureID=data.brochureID;
this.viewbrochure=data.brochureName;

  }
  Updatebrochure(){
  var data = {
    BrochureID:this.brochureID,
    BrochureName : this.viewbrochure,
    CreatedBy : this.userName
  }
  this.masterSv.updateBrochure(data).subscribe((response:any)=>{
    if(response == "success"){
      alert("Brochure Updated")
      window.location.reload()
    }else{
      alert("Somthing Went Wrong!!")
      window.location.reload()
    }
  })
}
}
