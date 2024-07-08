import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import * as XLSX from 'xlsx';
import { MasterService } from 'src/app/Services/MasterService/master.service';

@Component({
  selector: 'app-quotationtemplate',
  templateUrl: './quotationtemplate.component.html',
  styleUrls: ['./quotationtemplate.component.css']
})
export class QuotationtemplateComponent {

  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
  p: number = 1;
  userName :any;
  roleId:any;
  IsLoggedIn: any;
  templatelist: any;
  


  templatename: any;
  templateID: any;
  viewtemplate: any;
  constructor(private masterSv:MasterService){
    if (localStorage.getItem('IsLoggedIn') == 'true'){
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
  }
  ngOnInit(): void {
    this.getTemplate()
  }
  getTemplate(){
    this.masterSv.getTemplates().subscribe((response:any)=>{
      this.templatelist = response;
      console.log(this.templatelist)
      if(this.templatelist.length!=0){
        this.exporting=true;
      }
    })
  }
  saveTemplate(){
    var faultsData = {
      TemplateName : this.templatename,
      CreatedBy : this.userName
    }
    this.masterSv.saveTemplates(faultsData).subscribe((response:any)=>{
      if(response == "success"){
        alert("Template Saved")
         window.location.reload()
      }else{
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })
  }
  deletetemplate(id:any){
this.masterSv.deleteTemplates(id).subscribe((response:any)=>{
  if(response == "success"){
    alert("Template Deleted")
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
  editTemplate(data:any){
this.templateID=data.templateID;
this.viewtemplate=data.templateName;
  }
  Updatetemplate(){
  var data = {
    TemplateID:this.templateID,
    TemplateName : this.viewtemplate,
    CreatedBy : this.userName
  }
  this.masterSv.updateTemplate(data).subscribe((response:any)=>{
    if(response == "success"){
      alert("Template Updated")
      window.location.reload()
    }else{
      alert("Somthing Went Wrong!!")
      window.location.reload()
    }
  })
}


}
