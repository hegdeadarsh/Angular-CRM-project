import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/Services/Location/location.service';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';

@Component({
  selector: 'app-edit-customer-lists',
  templateUrl: './edit-customer-lists.component.html',
  styleUrls: ['./edit-customer-lists.component.css']
})
export class EditCustomerListsComponent implements OnInit {
  userName: any;
  roleId: any;
  IsLoggedIn: any;
  selectedCountry: any;
  countrylist: any;
  clusterlist: any;
  routelist: any;
  regionlist: any;
  zonelist: any;
  country: any;
  state: any;
  city: any;
  selectedCluster: any;
  selectedZone: any;
  selectedRegion: any;
  selectedRoute: any;
  pincode: any;
  custid: any;
  editcompanyName: any;
  editunit: any;
  editaddressOne: any;
  editaddressTwo: any;
  editaddressThree: any;
  editpincode: any;
  editcity: any;
  editstate: any;
  editcountry: any;
  editgstin: any;
  editweeklyOff: any;
  editworkingStart: any;
  editworkingEnd: any;
  editselectedZone: any;
  editselectedcluster: any;
  editselectedroute: any;
  editselectedregion: any;
  CustomerID:any;
  editsecurityFormalities: any; CustomerDetails: any;
  constructor(private masterSv: MasterService,
    private locationService: LocationService,
    private regSv: RegistrationService,
    private route: Router, private router: ActivatedRoute) {
    if (localStorage.getItem('IsLoggedIn') == 'true') {
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }


    this.router.params.subscribe(params => {
      if (params["id"]) {
        this.custid = params["id"];
      }
    });
    window.scrollTo(0, 0);


  }
  ngOnInit(): void {
    this.GetCustomerDetails(this.custid);
    this.getCountry();
    this.getCluster();
    this.getRoute();
    this.getRegion();
    this.getZone();

    setTimeout(() => {
      this.editselectedZone = this.CustomerDetails.zoneId;
    }, 0);
  }
  onSelectCountry(data: any) {
    this.selectedCountry = data.target.value
  }
  getCountry() {
    this.masterSv.getCountry().subscribe((response: any) => {
      this.countrylist = response;
      console.log(this.countrylist)
    })
  }
  getCluster() {
    this.masterSv.getCluster().subscribe((response: any) => {
      this.clusterlist = response;
      console.log(this.clusterlist)
    })
  }
  getRoute() {
    this.masterSv.getRoute().subscribe((response: any) => {
      this.routelist = response;
      console.log(this.routelist)
    })
  }
  getRegion() {
    this.masterSv.getRegion().subscribe((response: any) => {
      this.regionlist = response;
      console.log(this.regionlist)
    })
  }
  getZone() {
    this.masterSv.getZone().subscribe((response: any) => {
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
    this.editselectedcluster = data.target.value;
  }
  onSelectRoute(data: any) {
    this.editselectedroute = data.target.value;
  }
  onSelectRegion(data: any) {
    this.editselectedregion = data.target.value;
  }
  onSelectZone(data: any) {
    this.editselectedZone = data.target.value;
  }
  GetCustomerDetails(id: any) {
    this.regSv.getCustomerDetails(id).subscribe((data: any) => {
      this.CustomerDetails = data;

      

      this.editcompanyName = this.CustomerDetails.companyName;
      this.editunit = this.CustomerDetails.unit;
      this.editaddressOne = this.CustomerDetails.addressOne;
      this.editaddressTwo = this.CustomerDetails.addressTwo;
      this.editaddressThree = this.CustomerDetails.addressThree;
      this.editpincode = this.CustomerDetails.pincode;
      this.editcity = this.CustomerDetails.city;
      this.editstate = this.CustomerDetails.state;
      this.editcountry = this.CustomerDetails.country;
      this.editgstin = this.CustomerDetails.gstin;
      this.editweeklyOff = this.CustomerDetails.weeklyOff;
      this.editworkingStart = this.CustomerDetails.workingStart;
      this.editworkingEnd = this.CustomerDetails.workingEnd;
      this.editsecurityFormalities = this.CustomerDetails.securityFormalities;
      this.editselectedZone = this.CustomerDetails.zoneId;
      this.editselectedcluster = this.CustomerDetails.clusterId;
      this.editselectedroute = this.CustomerDetails.routeId;
      this.editselectedregion = this.CustomerDetails.regionId;


      console.log(this.CustomerDetails);
      console.log(this.selectedZone);
    });
  }
  updateCustomerregistration() {


    var customerRegData = {
      CustomerID:this.custid,
      CompanyName: this.editcompanyName,
      Unit: this.editunit,
      AddressOne: this.editaddressOne,
      AddressTwo: this.editaddressTwo,
      AddressThree: this.editaddressThree,
      Pincode: this.editpincode,
      City: this.editcity,
      State: this.editstate,
      Country: this.editcountry,
      GSTIN: this.editgstin,
      Cluster: this.editselectedcluster,
      RouteNumber: this.editselectedroute,
      Region: this.editselectedregion,
      Zone: this.editselectedZone,
      WeeklyOff: this.editweeklyOff,
      WorkingStart: this.editworkingStart,
      WorkingEnd: this.editworkingEnd,
      SecurityFormalities: this.editsecurityFormalities,
      CreatedBy: this.userName
    }
    this.regSv.updateCustomerRegistration(customerRegData).subscribe((response: any) => {
      if (response == "success") {
        alert("Updated Successfully")
        this.route.navigate(['/customerLists'])
      }
      else {
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })

  }
}
