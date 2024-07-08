import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import * as jspdf from 'jspdf';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-mailquotationtemplate',
  templateUrl: './mailquotationtemplate.component.html',
  styleUrls: ['./mailquotationtemplate.component.css']
})
export class MailquotationtemplateComponent {
  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
  p: number = 1;
  userName :any;
  roleId:any;
  IsLoggedIn: any;
  maillist: any;
  mailname: any;
  mailID: any;
  viewmail: any;
  constructor(private masterSv:MasterService){
    if (localStorage.getItem('IsLoggedIn') == 'true'){
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
  }
  ngOnInit(): void {
    this.getMail()
  }
  getMail(){
    this.masterSv.getMail().subscribe((response:any)=>{
      this.maillist = response;
      console.log(this.maillist)
      if(this.maillist.length!=0){
        this.exporting=true;
      }
    })
  }
  saveMail(){
    var Data = {
      MailName : this.mailname,
      CreatedBy : this.userName
    }
    this.masterSv.saveMail(Data).subscribe((response:any)=>{
      if(response == "success"){
        alert("Mail Template Saved")
        window.location.reload()
      }else{
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })
  }
  deletemail(id:any){
this.masterSv.deleteMail(id).subscribe((response:any)=>{
  if(response == "success"){
    alert("Mail Template Deleted")
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
  editMail(data:any){
this.mailID=data.mailID;
this.viewmail=data.mailName;

  }
  Updatemail(){
  var data = {
    MailID:this.mailID,
    MailName : this.viewmail,
    CreatedBy : this.userName
  }
  this.masterSv.updateMail(data).subscribe((response:any)=>{
    if(response == "success"){
      alert("Mail Template Updated")
      window.location.reload()
    }else{
      alert("Somthing Went Wrong!!")
      window.location.reload()
    }
  })
}
}
