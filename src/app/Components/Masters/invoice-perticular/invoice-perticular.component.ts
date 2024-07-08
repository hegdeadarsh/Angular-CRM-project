import { Component } from '@angular/core';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import * as XLSX from 'xlsx';

import { ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-invoice-perticular',
  templateUrl: './invoice-perticular.component.html',
  styleUrls: ['./invoice-perticular.component.css']
})
export class InvoicePerticularComponent {
  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
  invoiceperticularname:any;
  invoiceperticularlist:any;
  p: number = 1;
  userName :any;
  roleId:any;
  IsLoggedIn: any;
  invoiceparticularID:any;
  viewinvoiceparticular:any;
  constructor(private masterSv:MasterService){
    if (localStorage.getItem('IsLoggedIn') == 'true'){
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
  }
  ngOnInit(): void {
    this.getInvoicePerticular()
  }
  getInvoicePerticular(){
    this.masterSv.getInvoicePerticular().subscribe((response:any)=>{
      this.invoiceperticularlist = response;
      console.log(this.invoiceperticularlist)
      if(this.invoiceperticularlist.length!=0){
        this.exporting=true;
      }
    })
  }
  saveInvoicePerticular(){  
    if (this.invoiceperticularname == null || this.invoiceperticularname == '') {
    alert("Please enter the Invoiceperticular Name");
    return;
  }
    var invoiceperticularData = {
      invoiceperticularname : this.invoiceperticularname,
      CreatedBy : this.userName
    }
    this.masterSv.saveInvoicePerticular(invoiceperticularData).subscribe((response:any)=>{
      if(response == "success"){
        alert("Invoice Perticular Saved")
        window.location.reload()
      }else{
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })
  }
  deleteInvoicePerticular(invoiceperticularid:any){
this.masterSv.deleteInvoicePerticular(invoiceperticularid).subscribe((response:any)=>{
  if(response == "success"){
    alert("Invoice Perticular Deleted")
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
      doc.save('invoiceparticulars_data.pdf');
    });
  }
  exportTableToExcel(): void {
    const element = document.getElementById('tableId'); // Replace 'tableId' with the actual ID of your HTML table
  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'invoiceparticulars_data');
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName + '.xlsx';
    downloadLink.click();
  }
  editInvoicePerticular(data:any){
this.invoiceparticularID=data.invoicePerticularId;
this.viewinvoiceparticular=data.invoicePerticularName;
  }
  UpdateInvoiceParticular(){
    var invoiceperticularData = {
      InvoicePerticularId:this.invoiceparticularID,
      InvoicePerticularName : this.viewinvoiceparticular,
      CreatedBy : this.userName
    }
    this.masterSv.updateInvoicePerticular(invoiceperticularData).subscribe((response:any)=>{
      if(response == "success"){
        alert("Invoice Perticular Updated")
        window.location.reload()
      }else{
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })
  }
}

