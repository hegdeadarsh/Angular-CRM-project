import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';
import * as XLSX from 'xlsx';

import { ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-trip-sheet',
  templateUrl: './trip-sheet.component.html',
  styleUrls: ['./trip-sheet.component.css']
})
export class TripSheetComponent {
  @ViewChild('table', { static: false }) table!: ElementRef;

userName: any;
  roleId: any;
  IsLoggedIn: any;
  tripList: any;
  p : number=1;
  editTripId: any;
  userId: any;
uniqueTripList: any;
  tripId: any;
constructor(private regSv:RegistrationService, private route:Router){
  if (localStorage.getItem('IsLoggedIn') == 'true') {
    this.userName = localStorage.getItem('UserName');
    this.userId = localStorage.getItem('UserID');
    this.roleId = localStorage.getItem('Role');
    this.IsLoggedIn = true;
  }
}
ngOnInit(): void {
  this.getTripSheetNos();
  console.log(this.roleId);
}

getTripSheetNos() {
  this.regSv.GetTripSheetNos().subscribe((response: any) => {
    this.tripList = response;
    console.log(this.tripList);
  });
}

// getUniqueTravelIds(tripList: any[]): any[] {
//   const uniqueTravelIds = new Set();
//   const uniqueTripList = tripList.filter((trip) => {
//     if (!uniqueTravelIds.has(trip.travelId)) {
//       uniqueTravelIds.add(trip.travelId);
//       return true;
//     }
//     return false;
//   });

//   return uniqueTripList;
// }

openTripSheet(data:any){
  this.tripId = data.tripSheetNo;
  this.route.navigate(['/TravelSheet',this.tripId]);
}

deleteTripData(id:any){
  this.regSv.deleteTripData(id).subscribe((response:any)=>{
    if(response == "success"){
      alert("Trip Data Deleted")
      window.location.reload()
    }else{
      alert("Somthing Went Wrong!!")
    }
  })
}

newEntry(){
  this.route.navigate(['/travelBudget']);
}
exportTableToPDF(): void {
  const doc = new jspdf.jsPDF();
  const table = this.table.nativeElement;

  html2canvas(table).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = doc.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    doc.save('tripSheet.pdf');
  });
}

exportTableToExcel(): void {
  const element = document.getElementById('tableId'); // Replace 'tableId' with the actual ID of your HTML table

  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, 'tripSheet');
}

private saveAsExcelFile(buffer: any, fileName: string): void {
  const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  const downloadLink = document.createElement('a');
  downloadLink.href = window.URL.createObjectURL(data);
  downloadLink.download = fileName + '.xlsx';
  downloadLink.click();
}
}
