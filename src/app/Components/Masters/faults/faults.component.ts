import { Component, ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-faults',
  templateUrl: './faults.component.html',
  styleUrls: ['./faults.component.css']
})
export class FaultsComponent {
  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
  p: number = 1;
  userName :any;
  roleId:any;
  IsLoggedIn: any;
  faultslist: any;
  faultsname: any;
  viewfaults: any;
  faultsID: any;
  constructor(private masterSv:MasterService){
    if (localStorage.getItem('IsLoggedIn') == 'true'){
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
  }
  ngOnInit(): void {
    this.getFaults()
  }
  getFaults(){
    this.masterSv.getFaults().subscribe((response:any)=>{
      this.faultslist = response;
      console.log(this.faultslist)
      if(this.faultslist.length!=0){
        this.exporting=true;
      }
    })
  }
  saveFaults(){
    if (this.faultsname == null || this.faultsname == '') {
    alert("Please enter the Faults Name");
    return;
  }
    var faultsData = {
      FaultsName : this.faultsname,
      CreatedBy : this.userName
    }
    this.masterSv.saveFaults(faultsData).subscribe((response:any)=>{
      if(response == "success"){
        alert("Faults Saved")
        window.location.reload()
      }else{
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })
  }
  deleteFaults(faultsid:any){
this.masterSv.deleteFaults(faultsid).subscribe((response:any)=>{
  if(response == "success"){
    alert("Faults Deleted")
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
  editFaults(data:any){
this.faultsID=data.faultsId;
this.viewfaults=data.faultsName;
  }
  Updatefaults(){
  var faultsData = {
    FaultsId:this.faultsID,
    FaultsName : this.viewfaults,
    CreatedBy : this.userName
  }
  this.masterSv.updateFaults(faultsData).subscribe((response:any)=>{
    if(response == "success"){
      alert("Faults Updated")
      window.location.reload()
    }else{
      alert("Somthing Went Wrong!!")
      window.location.reload()
    }
  })
}
}
