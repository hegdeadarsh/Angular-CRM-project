import { Component, ElementRef, ViewChild } from '@angular/core';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import * as jspdf from 'jspdf';


@Component({
  selector: 'app-consumables',
  templateUrl: './consumables.component.html',
  styleUrls: ['./consumables.component.css']
})
export class ConsumablesComponent {
  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
  p: number = 1;
  userName :any;
  roleId:any;
  IsLoggedIn: any;
  consumableslist: any;
  consumablesname: any;
  viewconsumables: any;
  consumablesID: any;
  constructor(private masterSv:MasterService){
    if (localStorage.getItem('IsLoggedIn') == 'true'){
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
  }
  ngOnInit(): void {
    this.getConsumables()
  }
  getConsumables(){
    this.masterSv.getConsumables().subscribe((response:any)=>{
      this.consumableslist = response;
      console.log(this.consumableslist)
      if(this.consumableslist.length!=0){
        this.exporting=true;
      }
    })
  }
  saveConsumables(){

    if (this.consumablesname == null || this.consumablesname == '') {
      alert("Please enter the Consumables Name");
      return;
    }
    var consumablesData = {
      ConsumablesName : this.consumablesname,
      CreatedBy : this.userName
    }
    this.masterSv.saveConsumables(consumablesData).subscribe((response:any)=>{
      if(response == "success"){
        alert("Consumables Saved")
        window.location.reload()
      }else{
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })
  }
  deleteConsumables(consumablesid:any){
this.masterSv.deleteConsumables(consumablesid).subscribe((response:any)=>{
  if(response == "success"){
    alert("Consumables Deleted")
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
      doc.save('consumables_data.pdf');
    });
  }
  exportTableToExcel(): void {
    const element = document.getElementById('tableId'); // Replace 'tableId' with the actual ID of your HTML table
  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'consumables_data');
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName + '.xlsx';
    downloadLink.click();
  }
  editConsumables(data:any){
this.consumablesID=data.consumablesId;
this.viewconsumables=data.consumablesName;
  }
  UpdateConsumables(){
  var consumablesData = {
    ConsumablesId:this.consumablesID,
    ConsumablesName : this.viewconsumables,
    CreatedBy : this.userName
  }
  this.masterSv.updateConsumables(consumablesData).subscribe((response:any)=>{
    if(response == "success"){
      alert("Consumables Updated")
      window.location.reload()
    }else{
      alert("Somthing Went Wrong!!")
      window.location.reload()
    }
  })
}
}
