import { Component } from '@angular/core';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import * as XLSX from 'xlsx';

import { ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.css']
})
export class ClusterComponent {
  @ViewChild('table', { static: false }) table!: ElementRef;
  exporting:boolean=false;
  clustername:any;
  clusterlist:any;
  p: number = 1;
  userName: any;
  roleId: any;
  IsLoggedIn: any;
  clusterid:any;
  viewcluster:any;
  constructor(private masterSv:MasterService){
    if (localStorage.getItem('IsLoggedIn') == 'true'){
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
  }
  ngOnInit(): void {
    this.getCluster()
  }
  getCluster(){
    this.masterSv.getCluster().subscribe((response:any)=>{
      this.clusterlist = response;
      console.log(this.clusterlist)
      if(this.clusterlist.length!=0){
        this.exporting=true;
      }
    })
  }


  saveCluster() {
    if (this.clustername == null || this.clustername == '') {
      alert("Please enter the cluster Name");
      return;
    }
  
    var clusterData = {
      ClusterName: this.clustername,
      CreatedBy: this.userName
    };
  
    this.masterSv.saveCluster(clusterData).subscribe((response: any) => {
      if (response == "success") {
        alert("Cluster Saved");
        window.location.reload();
      } else {
        alert("Something Went Wrong!!");
        window.location.reload();
      }
    });
  }
  
  deleteCluster(clusterid:any){
this.masterSv.deleteCluster(clusterid).subscribe((response:any)=>{
  if(response == "success"){
    alert("Cluster Deleted")
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
      doc.save('clusters_data.pdf');
    });
  }
  exportTableToExcel(): void {
    const element = document.getElementById('tableId'); // Replace 'tableId' with the actual ID of your HTML table
  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'clusters_data');
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName + '.xlsx';
    downloadLink.click();
  }
  editCluster(data:any){
    this.clusterid=data.clusterId;
    this.viewcluster=data.clusterName;

  }
  UpdateCluster(){
    var clusterData = {
      ClusterId:this.clusterid,
      ClusterName : this.viewcluster,
      CreatedBy : this.userName
    }
    this.masterSv.updateCluster(clusterData).subscribe((response:any)=>{
      if(response == "success"){
        alert("Cluster Updated ")
        window.location.reload()
      }else{
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })
  }
}
