import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/Services/Location/location.service';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit{
  selectedCountry: any;
  countrylist: any;
  companyName: any;
  unit: any;
  addressOne: any;
  addressTwo: any;
  addressThree: any;
  city: any;
  pincode: any;
  state: any;
  country: any;
  gstin: any;
  cluster: any;
  routeNo: any;
  region: any;
  zone: any;
  weeklyOff: any;
  workingStart: any;
  workingEnd: any;
  securityFormalities: any;
  userName: any;
  roleId: any;
  IsLoggedIn: any;
  clusterlist:any;
  selectedCluster:any;
  routelist:any;
  selectedRoute:any;
  regionlist:any;
  selectedRegion:any;
  zonelist:any;
  selectedZone:any;
  companyoldName: any;
  billingAddress: any;
  constructor(private masterSv:MasterService,
    private locationService:LocationService,
    private regSv : RegistrationService,
    private route : Router){
      if (localStorage.getItem('IsLoggedIn') == 'true'){
        this.userName = localStorage.getItem('UserName');
        this.roleId = localStorage.getItem('Role');
        this.IsLoggedIn = true;
      }
  }
  ngOnInit(): void {
    this.getCountry();
    this.getCluster();
    this.getRoute();
    this.getRegion();
    this.getZone();
  }
onSelectCountry(data:any){
this.selectedCountry = data.target.value
  }
  getCountry(){
    this.masterSv.getCountry().subscribe((response:any)=>{
      this.countrylist = response;
      console.log(this.countrylist)
    })
  }
  getCluster(){
    this.masterSv.getCluster().subscribe((response:any)=>{
      this.clusterlist = response;
      console.log(this.clusterlist)
    })
  }
  getRoute(){
    this.masterSv.getRoute().subscribe((response:any)=>{
      this.routelist = response;
      console.log(this.routelist)
    })
  }
  getRegion(){
    this.masterSv.getRegion().subscribe((response:any)=>{
      this.regionlist = response;
      console.log(this.regionlist)
    })
  }
  getZone(){
    this.masterSv.getZone().subscribe((response:any)=>{
      this.zonelist = response;
      console.log(this.zonelist)
    })
  }

  onPincodeChange() {
    this.locationService.getLocationByPincode(this.pincode)
      .subscribe((response: any) => {
        const { countryCode, adminName1, adminName3 } = response.postalCodes[0];
        this.country = countryCode;
        this.state = adminName1;
        this.city = adminName3;
      });
  }
  onSelectCluster(data: any) {
    this.selectedCluster = data.target.value;
  }
  onSelectRoute(data: any) {
    this.selectedRoute = data.target.value;
  }
  onSelectRegion(data: any) {
    this.selectedRegion = data.target.value;
  }
  onSelectZone(data: any) {
    this.selectedZone = data.target.value;
  }
  registration(){
    var customerRegData = {
      CompanyName :this.companyName,
      CompanyOldName : this.companyoldName,
      Unit :this.unit,
      AddressOne :this.addressOne,
      AddressTwo :this.addressTwo,
      AddressThree :this.addressThree,
      BillingAddress:this.billingAddress,
      Pincode :this.pincode,
      City :this.city,
      State :this.state,
      Country :this.country,
      GSTIN :this.gstin,
      Cluster :this.selectedCluster,
      RouteNumber :this.selectedRoute,
      Region :this.selectedRegion,
      Zone :this.selectedZone,
      WeeklyOff :this.weeklyOff,
      WorkingStart :this.workingStart,
      WorkingEnd :this.workingEnd,
      SecurityFormalities :this.securityFormalities,
      CreatedBy :this.userName
    }
    this.regSv.customerRegistration(customerRegData).subscribe((response :any)=>
    {
      if(response == "success"){
        alert("Registered Successfully")
        this.route.navigate(['/customerLists'])
      }
      else
      {
        alert("Somthing Went Wrong!!")
        window.location.reload()
      } 
    })
  }
}
