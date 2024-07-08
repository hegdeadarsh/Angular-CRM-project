import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Services/MasterService/master.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit{
  countryname:any;
  countrylist:any;
  p: number = 1;
  username :any;
  constructor(private masterSv:MasterService){
  }
  ngOnInit(): void {
    this.getCountry()
  }
  getCountry(){
    this.masterSv.getCountry().subscribe((response:any)=>{
      this.countrylist = response;
      console.log(this.countrylist)
    })
  }
  saveCountry(){
    

      if (this.countryname == null || this.countryname == '') {
        alert("Please enter the Country Name");
        return;
      }
    var countryData = {
      CountryName : this.countryname,
      CreatedBy : this.username
    }
    this.masterSv.saveCountry(countryData).subscribe((response:any)=>{
      if(response == "success"){
        alert("Country Saved")
        window.location.reload()
      }else{
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })
  }
  deleteCountry(countryid:any){
this.masterSv.deleteCountry(countryid).subscribe((response:any)=>{
  if(response == "success"){
    alert("Country Deleted")
    window.location.reload()
  }else{
    alert("Somthing Went Wrong!!")
    window.location.reload()
  }
})
  }
}
