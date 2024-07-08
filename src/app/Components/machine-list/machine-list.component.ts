import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';
import * as XLSX from 'xlsx';

import { ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.css']
})
export class MachineListComponent implements OnInit {
  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting: boolean = false;
  machineList: any = [];
  p: number = 1;
  selectedCustomer: any;
  customerList: any;
  modellist: any;
  viewmachinenumber: any;
  viewmodel: any;
  viewcustomer: any;
  machineID: any;
  customerID: any;
  EditItem: any;
  deleteItem: any;
  GetAllMachines: any;
  selectedPerticularCustomer: any;
  contactDetails: any;
  CustomerId: any;
  machineCustomerList: any;
  searchText: any;
  constructor(private regSv: RegistrationService, private masterSv: MasterService,) {

  }
  ngOnInit(): void {
    // this.getAllMachine();
    this.getCustomer();
    this.getModel();
    this.getMachineCustomerDetails();
  }
  getCustomer() {
    this.regSv.getCustomer().subscribe((response: any) => {
      this.customerList = response;
      console.log(this.customerList);
    });
  }
  getModel() {
    this.masterSv.getModel().subscribe((response: any) => {
      this.modellist = response;
      console.log(this.modellist);
    });
  }
  // getAllMachine() {
  //   this.regSv.GetAllMachines().subscribe((response: any) => {
  //     this.machineList = response;
  //     console.log(this.machineList);
  //     if (this.machineList.length != 0) {
  //       this.exporting = true;
  //     }
  //   });
  // }

  getMachineCustomerDetails() {
    this.regSv.GetMachineCustomerDetails().subscribe((response: any) => {
      this.machineCustomerList = response;
      console.log(this.machineCustomerList);
      if (this.machineCustomerList.length != 0) {
        this.exporting = true;
      }
    });
  }




  onSelectCompany(data: any) {
    this.customerID = data.customerID;
    this.regSv
      .getPerticularMachine(this.customerID)
      .subscribe((response: any) => {
        this.machineCustomerList = response
      });
  }

  EditMachine(data: any) {
    this.machineID = data.id;
    this.viewmachinenumber = data.machineNumber;
    this.viewmodel = data.modelId;
    this.viewcustomer = data.customerName;

  }
  onSelectModel(data: any) {
    this.viewmodel = data.target.value;
  }

  deleteMachine(data: any) {

    var MachineData = {
      Id: data.id,
      CustomerId: data.customerID,
      MachineNumber: data.machineNumber,
      ModelId: data.modelId,
      CustomerName: data.customerName,
      FeatureDetailsID: data.featureDetailsID,
      ContactDataID: data.contactDataID

    }
    this.regSv.deleteMachine(MachineData).subscribe((response: any) => {
      if (response == 'success') {
        alert('Machine Deleted');
        window.location.reload();
      } else {
        alert('Somthing Went Wrong!!');
        window.location.reload();
      }
    });
  }
  UpdateMachine() {
    var MachineData = {
      Id: this.machineID,
      MachineNumber: this.viewmachinenumber,
      ModelId: this.viewmodel,
      CustomerName: this.viewcustomer,

    }
    this.regSv.updateMachineRegistration(MachineData).subscribe((response: any) => {
      if (response == "success") {
        alert("Machine Details Updated Successfully")
        window.location.reload()
      }
      else {
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
      doc.save('machinelist_data.pdf');
    });
  }
  exportTableToExcel(): void {
    const element = document.getElementById('tableId'); // Replace 'tableId' with the actual ID of your HTML table

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'machinelist_data');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName + '.xlsx';
    downloadLink.click();
  }

}
