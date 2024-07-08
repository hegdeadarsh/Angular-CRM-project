import { Component, ElementRef, ViewChild } from '@angular/core';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-document-mail-template',
  templateUrl: './document-mail-template.component.html',
  styleUrls: ['./document-mail-template.component.css']
})
export class DocumentMailTemplateComponent {
  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
 p: number = 1;
 

  MailTemplateList: any;
  MailTemplateName: any;
  viewdocumentTemplate: any;
  mailTemplateID: any;
  userName: any;
  IsLoggedIn: any;
  roleId: any;

      constructor(private masterSv:MasterService)
      {if (localStorage.getItem('IsLoggedIn') == 'true'){
        this.userName = localStorage.getItem('UserName');
        this.roleId = localStorage.getItem('Role');
        this.IsLoggedIn = true;
      }
      }
      ngOnInit(): void {
        this.getMailTemplate()
      }
      getMailTemplate() {
        this.masterSv.getMailTemplate().subscribe((response: any) => {
           this.MailTemplateList = response;
           console.log(this.MailTemplateList);
        })
     }
     saveMailtemplate() {
      
      if (this.MailTemplateName == null || this.MailTemplateName == '') {
        alert("Please enter the MailTemplate Name ");
        return;
      }
      const templateData = {
        MailTemplateName: this.MailTemplateName,
        CreatedBy : this.userName
      }
    
      this.masterSv.saveMailtemplate(templateData).subscribe((response: any) => {
        if (response === 'success') {
          alert(' Mail Template Saved');
          this.getMailTemplate(); 
          this.MailTemplateName = ''; 
        } else {
          alert('Something Went Wrong!!');
        }
      })
    }
    
    deleteMailtemplate(id: any) {
      this.masterSv.deleteMailtemplate(id).subscribe((response: any) => {
        if (response === "success") {
          alert("Template Deleted");
          this.getMailTemplate();
        } else {
          alert("Something Went Wrong!!");
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


    editMailTemplate(data: any) {
      this.mailTemplateID = data.mailTemplateID;
      this.viewdocumentTemplate = data.mailTemplateName;
    }
    
    UpdateMailTemplate() {
      var documenttemplateData = {
        MailTemplateID: this.mailTemplateID,
        MailTemplateName: this.viewdocumentTemplate,
        CreatedBy : this.userName
      }
    
      this.masterSv.UpdateMailTemplate(documenttemplateData).subscribe((response: any) => {
        if (response === 'success') {
          alert('Template Updated');
          window.location.reload();
        } else {
          alert('Something Went Wrong!!');
          window.location.reload();
        }
      })
    }

    
  }
  
  

