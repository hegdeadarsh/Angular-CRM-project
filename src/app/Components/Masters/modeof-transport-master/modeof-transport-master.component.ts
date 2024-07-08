import { Component, ElementRef, ViewChild } from '@angular/core';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-modeof-transport-master',
  templateUrl: './modeof-transport-master.component.html',
  styleUrls: ['./modeof-transport-master.component.css']
})
export class ModeofTransportMasterComponent {
  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
 
    p: number = 1;
    
  TransportName: any;
  ModeofTransportList: any;
  viewmodeofTransport: any;
  modeofTransportID: any;
  userName:any ;
  roleId:any;
  IsLoggedIn:any;
    constructor(private masterSv:MasterService){if (localStorage.getItem('IsLoggedIn') == 'true'){
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
    }
    ngOnInit(): void {
      this.getModeofTransport ()
    }
    getModeofTransport(){
      this.masterSv.getModeofTransport().subscribe((response:any)=>{
        this.ModeofTransportList = response;
        console.log(this.ModeofTransportList)
      })
    }
    saveModeofTransport(){
      if (this.TransportName == null || this.TransportName == '') {
        alert("Please enter the Transport Name");
        return;
      }
      var ModeofTransportData = {
        TransportName : this.TransportName,
        CreatedBy : this.userName
      }
      this.masterSv.saveModeofTransport(ModeofTransportData).subscribe((response:any)=>{
        if(response == "success"){
          alert("Mode of transport Saved")
          window.location.reload()
        }else{
          alert("Somthing Went Wrong!!")
          window.location.reload()
        }
      })
    }
    deleteModeofTransport(id: any) {

    this.masterSv.deleteModeofTransport(id).subscribe((response: any) => {
      if (response === "success") {
        alert("Mode of transport Deleted");
        window.location.reload();
      } else {
        alert("Something Went Wrong!!");
        window.location.reload();
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
editModeofTransport(data: any) {
  this.modeofTransportID = data.modeofTransportID;
  this.viewmodeofTransport = data.transportName;
}

UpdateModeofTransport() {
  var ModeofTransportData = {
    ModeofTransportID: this.modeofTransportID,
    TransportName: this.viewmodeofTransport,
    CreatedBy : this.userName
  };

  this.masterSv.UpdateModeofTransport(ModeofTransportData).subscribe((response: any) => {
    if (response === 'success') {
      alert('ModeofTransport Updated');
      window.location.reload();
    } else {
      alert('Something Went Wrong!!');
      window.location.reload();
    }
  })
}



  }


