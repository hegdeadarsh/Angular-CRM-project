import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';

import { ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-locationdetailslist',
  templateUrl: './locationdetailslist.component.html',
  styleUrls: ['./locationdetailslist.component.css']
})
export class LocationdetailslistComponent {
  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
  requestlist: any;
  allrequest:boolean=true;
  p: number = 1;
  userName:any;
  roleId:any;
  contactData:any;
  IsLoggedIn:any;
  userId:any;
  machineNumber:any;
  selectedCustomer:any;
  particularMachineRequestsData:any;
  perticularCustomerRequestsData:any;
  customerList:any;
  locationlist: any;
  getPerticularCustomerdetails: any;
  perticularCustomerData: any;
  nearbyLodge: any;
  clusterId: any;
  selectedCluster: any;

  clusterList:any;
  masterSv: any;
  clusterlist: any;
  customerID: any;
  clusterID: any;
  constructor(private regSv: RegistrationService, 
    private route : Router
    ){
    if (localStorage.getItem('IsLoggedIn') == 'true') {
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.userId = localStorage.getItem('UserID');
      this.IsLoggedIn = true;
    }
  }
  ngOnInit(): void {
    this.getrequest();
    this.getCustomer();
    //this.getPerticularCustomerdetails();
    this.getCluster();
    
  }

  getCustomer() {
    this.regSv.getCustomer().subscribe((response: any) => {
      this.customerList = response;

      console.log(this.customerList);
    });
  }

  getrequest() {
    this.regSv.getAllrequest().subscribe((response: any) => {
      this.requestlist = response.array1;;
      this.contactData=response.array2;
      console.log(this.requestlist);
      if(this.requestlist.length!=0){
        this.exporting=true;
      }
       
      else {
        alert("No Details Found For this Machine Number!!!")
      }
    });
  }
  
  getCluster(){
    this.regSv.getCluster().subscribe((response:any)=>{
      this.clusterlist = response;
      console.log(this.clusterlist)
    
    })
  }


  onChangeMachineNumber(){
    this.regSv.getAlldetails(this.machineNumber).subscribe((response: any) => {
      this.locationlist = response;
      console.log(this.locationlist);
      if(this.locationlist.length!=0){
        this.exporting=true;
      }
       
      else {
        alert("No Details Found For this Machine Number!!!")
      }
    });
 }
 newEntry(){
  this.route.navigate(['/locationDetails']);
}
 

  onSelectCompany(data: any){
  
    this.customerID = data.customerID;
    this.regSv.getPerticularCustomerdetails(this.customerID).subscribe((response: any) => {
       
        this.locationlist = response;
        // this.selectedCustomer= this.locationlist.customerName;
        console.log(this.locationlist);
        if(this.locationlist.length!=0){
          this.exporting=true;
        }
         
   else {
          alert("No Details Found For Selected Customer!!!")
        }
      });
  }


  
  onSelectCluster(data:any)
  {
    this.clusterID = data.clusterId;
    this.regSv.getClusterdetails(this.clusterID).subscribe((response:any)=>{
      this.locationlist = response;
      console.log(this.locationlist)
      if(this.locationlist.length!=0){
        this.exporting=true;
      }
      else {
        alert("No Details Found For Selected Cluster!!!")
      }

    });
  }



  exportTableToPDF(): void {
    const doc = new jspdf.jsPDF();
    const table = this.table.nativeElement;

    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = doc.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save('requestlist_data.pdf');
    });
  }
  exportTableToExcel(): void {
    const element = document.getElementById('tableId'); // Replace 'tableId' with the actual ID of your HTML table
  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'requestlist_data');
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName + '.xlsx';
    downloadLink.click();
  }

}
