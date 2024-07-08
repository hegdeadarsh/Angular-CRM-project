import { Component } from '@angular/core';
import { MasterService } from 'src/app/Services/MasterService/master.service';

@Component({
  selector: 'app-sands-master',
  templateUrl: './sands-master.component.html',
  styleUrls: ['./sands-master.component.css']
})
export class SandsMasterComponent  {
  sandsname: any;
  sandslist: any;
  p: number = 1;
  userName: any;
  roleId: any;
  IsLoggedIn: any;
  sasid:any;
  viewsands:any;
  constructor(private masterSv: MasterService) {
    if (localStorage.getItem('IsLoggedIn') == 'true') {
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
  }
  ngOnInit(): void {
    this.getSands();
  }
  getSands() {
    this.masterSv.getSands().subscribe((response: any) => {
      this.sandslist = response;
      console.log(this.sandslist);
    });
  }
  saveSands() {
    if (this.sandsname == null || this.sandsname == '') {
      alert("Please enter the Sands Name");
      return;
    }
    var sandsData = {
      SandsName: this.sandsname,
      CreatedBy: this.userName,
    };
    this.masterSv.saveSands(sandsData).subscribe((response: any) => {
      if (response == 'success') {
        alert('S & S Saved');
        window.location.reload();
      } else {
        alert('Somthing Went Wrong!!');
        window.location.reload();
      }
    });
  }
  deleteSands(sandsid: any) {
    this.masterSv.deleteSands(sandsid).subscribe((response: any) => {
      if (response == 'success') {
        alert('S & S Deleted');
        window.location.reload();
      } else {
        alert('Somthing Went Wrong!!');
        window.location.reload();
      }
    });
  }
  editsands(data:any){
    this.sasid=data.sandsId;
    this.viewsands=data.sandsName;
  }
  UpdateSands(){
    var sandsData = {
      SandsId:this.sasid,
      SandsName: this.viewsands,
      CreatedBy: this.userName,
    };
    this.masterSv.updateSands(sandsData).subscribe((response: any) => {
      if (response == 'success') {
        alert('S & S Updated');
        window.location.reload();
      } else {
        alert('Somthing Went Wrong!!');
        window.location.reload();
      }
    });
  }
}
