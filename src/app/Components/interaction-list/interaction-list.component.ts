import { Component, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';
import * as XLSX from 'xlsx';

import { ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-interaction-list',
  templateUrl: './interaction-list.component.html',
  styleUrls: ['./interaction-list.component.css']
})
export class InteractionListComponent {
  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
  requestlist: any;
  allrequest:boolean=true;
  p: number = 1;
  isClicked :boolean=false;
  searchText: any;

  companyName: any;
  customerID: any;
  isDone: any;
  machineNumber: any;
  modelId: any;
  modelName: any;
  region: any;
  regionId: any;
  remarks: any;
  requestFor: any;
  zone: any;
  attendtypelist: any;
  usersList: any;
  selectedAttendedHow: any;
  selectedAttendedBy: any;
  userName: any;
  roleId: any;
  IsLoggedIn: any;
  requestId: any;
  dateofinteraction: any;
  compInteractions : boolean= false;
  interactlist: any=[];
  currentDate: Date | undefined;
  formattedDateInteraction:string='';
  Datewiserequest: string="";
  fromDate: string="";
  toDate: string="";
  contact:any;
  request:any;
  contactData:any;
  tokenID: any;
customerList: number|any[];
  selectedPerticularCustomer: any;
  contactDetails: any;
  EditContact: boolean;

  constructor(private regSv: RegistrationService,
    private masterSv: MasterService, private route : Router){
      if (localStorage.getItem('IsLoggedIn') == 'true'){
        this.userName = localStorage.getItem('UserName');
        this.roleId = localStorage.getItem('Role');
        this.IsLoggedIn = true;
      }
  }
  

  ngOnInit(): void {
    this.getrequest();
    this.getAttendType();
    this.getUsers();
  }
  getAttendType(){
    this.masterSv.getAttendType().subscribe((response:any)=>{
      this.attendtypelist = response;
      console.log(this.attendtypelist)
    })
  }
  getUsers() {
    this.regSv.getUsers().subscribe((response: any) => {
      this.usersList = response;
      console.log(this.usersList);
    });
  }
  getPerticularCustomerContactDetails(data:any){
    this.selectedPerticularCustomer= data.customerID;
    this.regSv.getCustomerContactDetails(this.selectedPerticularCustomer).subscribe((result: any) => {
      this.contactDetails = result;
      console.log(this.contactDetails);
      this.EditContact = false;
  });
}
  getrequest() {
    this.regSv.getPendingrequest().subscribe((response: any) => {
      this.requestlist = response;
      console.log(this.requestlist);
      if(this.requestlist.length!=0){
        this.exporting=true;
      }
    });
  }

  onSelectAttendedBy(data:any){
    this.selectedAttendedBy = data.target.value
  }
  onSelectAttendedHow(data:any){
    this.selectedAttendedHow = data.target.value
  }
  interact(request:any){
    this.isClicked = true
    this.companyName = request.companyName
    this.customerID = request.customerID
    this.isDone = request.isDone
    this.machineNumber = request.machineNumber
    this.modelId = request.modelId
    this.modelName = request.modelName
    this.region = request.region
    this.remarks = request.remarks
    this.requestFor = request.requestFor
    this.zone = request.zone
    this.requestId = request.requestForId
    this.tokenID = request.tokenID
  }

  saveInteraction(){
    var interactionData = {
      CutomerId : this.customerID,
      CutomerName : this.companyName,
      //MachineId : this.ma
      MachineNumber : this.machineNumber,
      ModelId : this.modelId,
      ModelName : this.modelName,
      RegionId : this.regionId,
      RegionName : this.region,
      //ZoneId : this.z
      ZoneName : this.zone,
      Remarks : this.remarks,
      AttendedByUserId : this.selectedAttendedBy,
      //AttendedByUserName : this.selectedAttendedBy,
      AttendedHowId : this.selectedAttendedHow,
      TicketNo : this.tokenID,
      //AttendedHowName : this.selectedAttendedHow,
      CreatedBy : this.userName,
      RequestId : this.requestId,
      DateOfInteraction : this.dateofinteraction
    }
    this.regSv.postSaveInteraction(interactionData).subscribe((response:any )=>
      {
        if(response == "success"){
          alert("Interacted Successfully")
          this.route.navigate(['/requestList'])
        }
        else
        {
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
      doc.save('CompletedInteractionList_data.pdf');
    });
  }
  exportTableToExcel(): void {
    const element = document.getElementById('tableId'); // Replace 'tableId' with the actual ID of your HTML table
  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'interactionlist_data');
  }
  exportTableToExcelint(): void {
    const element = document.getElementById('tableIdint'); // Replace 'tableId' with the actual ID of your HTML table
  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'interactionlist_data');
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName + '.xlsx';
    downloadLink.click();
  }
  compInteractaions(){
    this.allrequest = false;
    this.compInteractions = true;
    this.regSv.getAllInteractions().subscribe((response:any)=>{
      this.interactlist = response;
      this.exporting=true;
      console.log(this.interactlist)
    })
  }
  getDatewiserequestInteraction() {
    this.Datewiserequest = this.fromDate + ',' + this.toDate;
    this.regSv.getDatewiserequestInteraction(this.Datewiserequest).subscribe((response: any) => {
      this.requestlist = response;
    });
  }
}
