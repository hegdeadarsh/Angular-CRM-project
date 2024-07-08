import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-document-type-master',
  templateUrl: './document-type-master.component.html',
  styleUrls: ['./document-type-master.component.css'],
})
export class DocumentTypeMasterComponent implements OnInit {
  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
   
  DocumentName:any;
  DocumentTypeList:any;
    p: number = 1;
    username :any;
  viewdocument: any;
  documentID: any;
  userName: any;
  roleId: any;
  IsLoggedIn: any;
    constructor(private masterSv:MasterService)
    {if (localStorage.getItem('IsLoggedIn') == 'true'){
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
    }
    ngOnInit(): void {
      this.getDocumentType()
    }
    getDocumentType(){
      this.masterSv.getDocumentType().subscribe((response:any)=>{
        this.DocumentTypeList = response;
        console.log(this.DocumentTypeList)
      })
    }
    saveDocumentType(){
       
      if (this.DocumentName == null || this.DocumentName == '') {
        alert("Please enter the Document Name");
        return;
      }
      var documentTypeData = {
        DocumentName : this.DocumentName,
        CreatedBy : this.userName
      }
      this.masterSv.saveDocumentType(documentTypeData).subscribe((response:any)=>{
        if(response == "success"){
          alert("Document Type Saved")
          window.location.reload()
        }else{
          alert("Somthing Went Wrong!!")
          window.location.reload()
        }
      })
    }
    deleteDocumentType(id: any) {

    this.masterSv.deleteDocumentType(id).subscribe((response: any) => {
      if (response === "success") {
        alert("DocumentType Deleted");
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
editDocumentType(data: any) {
  this.documentID = data.documentID;
  this.viewdocument = data.documentName;
}

UpdateDocumentType() {
  var documentData = {
    DocumentID: this.documentID,
    DocumentName: this.viewdocument,
    CreatedBy : this.userName
  }

  this.masterSv.UpdateDocumentType(documentData).subscribe((response: any) => {
    if (response === 'success') {
      alert('Document Type Updated');
      window.location.reload();
    } else {
      alert('Something Went Wrong!!');
      window.location.reload();
    }
  })
}


  }
  


