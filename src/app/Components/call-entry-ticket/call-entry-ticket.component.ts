import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, interval, map, startWith } from 'rxjs';
import { MasterService } from 'src/app/Services/MasterService/master.service';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';

@Component({
  selector: 'app-call-entry-ticket',
  templateUrl: './call-entry-ticket.component.html',
  styleUrls: ['./call-entry-ticket.component.css']
})
export class CallEntryTicketComponent {
  machineNumber: any;
  requestlist: any;
  contactData: any;
  selectedCustomer: any;
  customerList: any;
  perticularCustomerData: any;
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
  zone: any;
  region: any;
  weeklyOff: any;
  workingStart: any;
  workingEnd: any;
  securityFormalities: any;
  customerID: any;
  companyName: any;
  selectedMachine: any;
  custID: any;

  perticularCustomerInvoiceData: any;
  warrantyTill: any;
  warrantyFrom: any;
  features: any;
  tableLength: any;
  ManuscriptNo: any;
  MachineNo: any;
  interactiondata: any;
  requestslist: any = [];
  selectedCallEntry: any;
  Priority: any;
  priority: any;
  selectedPriority: any;
  selpriority: any;
  fault: any;
  Resolution: any;
  selectedRequest: any;
  selectedrequest: any;
  sandslist: any;
  selectedsands: any;
  userName: any;
  roleId: any;
  IsLoggedIn: any;
  invoicePerticular: any;
  machineList: any;
  perticularMachineData: any;
  teleSupportList: any = [];
  fieldVisitList: any = [];
  selectedTeleSupport: any;
  selectedFieldVisit: any;
  combinedList: any;
  teleSupportRequests: any;
  teleSupportrequestslist: any = [];
  fieldVisitRequests: any;
  fieldVisitRequestslist: any = [];
  selectedrequestt: any;
  selectedrequestf: any;
  contactDetails: any;
  customerTicketList: any;
  mobile: any;
  selectedModel: any;
  email: any;
  designation: any;
  contactname: any;
  salute: any;
  machineSelected: boolean = true;
  ticketNo: any;
  contactId: any;
  startTime: Date;
  endTime: Date;
  contactName: any;
  MachineTicketList: any[] = [];
  customerId: any;
  newTicketNo: any;
  ticketDetailsList: any[] = [];
  usersList: any;
  selectedAttendedBy: any;
  selectedAttendedHow: any;
  attendtypelist: any;
  ticketNumber: any;
  dateofinteraction: any;
  requestId: any;
  modelName: any;
  requestForId: any;
  reqForId: any;
  requestForName: any;
  
  valuetime: Date;
  value: any;
  ClusterId: any;
  selectedCustomerid: any;
  constructor(private regSv: RegistrationService,
    private masterSv: MasterService, private httpService: HttpClient,
    private route: Router) {
    if (localStorage.getItem('IsLoggedIn') == 'true') {
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.IsLoggedIn = true;
    }
  }
  public systemTime: Observable<Date>;
  ngOnInit(): void {
    this.getCustomer();
    this.getTokenNo();
    this.getRequests();
    this.getSands();
    this.getUsers();
    this.getAttendType();
    this.systemTime = interval(1000).pipe(
      startWith(0),
      map(() => new Date())
    );
    this.value = new Date();
    // this.getAttendedBybyid(this.customerID);
  }
 
  goToCustomerList(){
    this.route.navigate(['/customerLists']);
  }
  goToTripSheet(){
    this.route.navigate(['/tripsheet']);
  }
  goToWorkFront(){
    this.route.navigate(['/workFront']);
  }
  saveRequest() {
    this.endTime = new Date();
    //const timeDifference = this.endTime.getTime() - this.startTime.getTime();
    //console.log('Time difference: ' + timeDifference + ' milliseconds')
    if (this.selectedrequest == null || this.selectedrequest == "") {
      alert('Please select request type');
    }else if(this.contactId == null || this.contactId == ""){
      alert('Please select Contact Person');
    }else if(this.fault == null || this.fault == ""){
      alert('Please enter Fault');
    }else if(this.Resolution == null || this.Resolution == ""){
      alert('Please enter Resolution');
    }else if(this.valuetime == null || this.valuetime == undefined){
      alert('Please enter Start Time');
    }else if(this.endTime == null || this.endTime == undefined){
      alert('Please enter End Time');
    }
    else {
      const frmData = new FormData();
      frmData.append("MachineNumber", this.selectedMachine);
      frmData.append("CustomerId", this.custID);
      frmData.append("CustomerName", this.companyName);
      if(this.ticketNo == null){
        this.ticketNumber = this.newTicketNo;
      }else{
        this.ticketNumber = this.ticketNo;
      }
        frmData.append("TokenNo", this.ticketNumber);
      
      frmData.append("ContactId", this.contactId);
      
      frmData.append("StartTime", this.valuetime.toISOString());
      frmData.append("EndTime", this.endTime.toISOString());   
      frmData.append("CallFrom", this.contactName);

      frmData.append("RequestFor", JSON.stringify(this.selectedrequest));

      this.selectedrequest.forEach((requestfor: string, index: number) => {
        frmData.append(`RequestFor[${index}]`, requestfor);
      });

      frmData.append("SandS", JSON.stringify(this.selectedsands));

      frmData.append("Remarks", this.fault);
      frmData.append("Resolution", this.Resolution);
      frmData.append("CreatedOn", this.value);   
      frmData.append("CreatedBy", this.userName);
      this.httpService.post('https://blockchainmatrimony.com/customermanagerapi/api/RequestAndInteractions/PostSaveRequestForm/', frmData).subscribe((data: any) => {
        if (data == "success") {
          alert("Request Saved");
          this.route.navigate(['/dashboard'])
        } else {
          alert("Somthing Went Wrong!!")
        }
      })
    }
  }

  onChangeMachineNo() {
    this.regSv.getMachineFromMachineNumber(this.machineNumber).subscribe((response: any) => {
      if (response == null) {
        alert("No Machine Found!!!")
      } else {
        this.perticularCustomerData = response;
        console.log(this.perticularCustomerData);
        this.selectedCustomer = this.perticularCustomerData[0].companyName;
        this.onSelectCustomer(this.perticularCustomerData[0]);
      //   this.ClusterId = this.perticularCustomerData[0].clusterId;
      // this.selectedCustomerid= this.perticularCustomerData[0].customerId;
      }
    })
  }

  getRequests() {
    this.masterSv.getRequests().subscribe((response: any) => {
      this.combinedList = response;

      this.teleSupportRequests = this.combinedList.filter((item: any) => item.priority.startsWith('T'));
      const mappedTeleSupportRequests: { label: string; value: any }[] = this.teleSupportRequests.map((requests: any) => ({
        label: requests.requestsName,
        value: requests.requestsId,
      }));
      this.teleSupportrequestslist = mappedTeleSupportRequests.sort((a: { label: string }, b: { label: string }) =>
        a.label.localeCompare(b.label)
      );
      console.log(this.teleSupportrequestslist);
      //fieldVisit Requests Lists
      this.fieldVisitRequests = this.combinedList.filter((item: any) => item.priority.startsWith('F'));
      const mappedFieldRequests: { label: string; value: any }[] = this.fieldVisitRequests.map((requests: any) => ({
        label: requests.requestsName,
        value: requests.requestsId,
      }));
      this.fieldVisitRequestslist = mappedFieldRequests.sort((a: { label: string }, b: { label: string }) =>
        a.label.localeCompare(b.label)
      );

      console.log(this.fieldVisitRequestslist);
    });
  }

  getTokenNo() {
    this.regSv.GetMachineId().subscribe((result: any) => {
      this.tableLength = result.length + 1; 
      this.newTicketNo = this.tableLength.toString().padStart(4, '0');
    })
  }

  // generateMachineNo(tableLength: number): string {
  //   if (tableLength < 0) {
  //     tableLength = 0;
  //   } else {
  //     tableLength = tableLength;
  //   }
  //   // Create a 5-digit number with the last digit as tableLength
  //   const paddedTableLength = tableLength.toString().padStart(4, '0');
  //   return paddedTableLength;
  // }

  getSands() {
    this.masterSv.getSands().subscribe((response: any) => {
      this.sandslist = response.map((sands: any) => ({
        label: sands.sandsName,
        value: sands.sandsId,
      }));
      console.log(this.sandslist);
    })
  }

  isRowSelected(id: any): boolean {
    return this.selectedMachine === id;
}

  onRowClick(data: any) {
    this.selectedMachine = data.machineNumber;
    this.ticketNo = data.tokenNo;
    this.modelName = data.modelName;
    this.requestForId =  data.requestForId;
    console.log(this.selectedMachine);
    this.onSelectTicket();
    if(this.ticketNo == null){
      this.ticketDetailsList = [];
    }
    this.onChangeMachineNumber();
  }

  onSelectTicket(){
    this.regSv.getTicketDetailsFromTicket(this.ticketNo).subscribe((response: any) => {
      if (response != null){
        this.ticketDetailsList = response;
        console.log('Ticket Details:', this.ticketDetailsList);
        if(this.ticketNo == null){
          this.ticketDetailsList = [];
        }
      }else{
        alert("Invalid Ticket Number");
      }
    })
  }

  onChangeMachineNumber() {
    this.regSv.getMachineFromMachineNumber(this.selectedMachine).subscribe((response: any) => {
      if (response == null) {
        alert("No Machine Found!!!")
      } else {
        this.perticularCustomerData = response;
        console.log(this.perticularCustomerData);
        this.selectedCustomer = this.perticularCustomerData[0].companyName;
        this.custID = this.perticularCustomerData[0].customerId;
        this.companyName = this.perticularCustomerData[0].companyName;
        this.GetInvoicesCustomer(this.perticularCustomerData[0].customerId);
        this.getPerticularCustomerContactDetails(this.perticularCustomerData[0].customerId);
        this.getCustomerTickets(this.perticularCustomerData[0].customerId);
        console.log(this.perticularCustomerInvoiceData);
        console.log(this.contactDetails);
        console.log(this.customerTicketList);
        console.log(this.perticularCustomerData[0].customerId);
        this.unit = this.perticularCustomerData[0].unit;
        this.addressOne = this.perticularCustomerData[0].addressOne;
        this.addressTwo = this.perticularCustomerData[0].addressTwo;
        this.addressThree = this.perticularCustomerData[0].addressThree;
        this.city = this.perticularCustomerData[0].city;
        this.pincode = this.perticularCustomerData[0].pincode;
        this.state = this.perticularCustomerData[0].state;
        this.country = this.perticularCustomerData[0].country;
        this.gstin = this.perticularCustomerData[0].gstin;
        this.cluster = this.perticularCustomerData[0].cluster;
        this.routeNo = this.perticularCustomerData[0].routeNumber;
        this.region = this.perticularCustomerData[0].region;
        this.zone = this.perticularCustomerData[0].zone;
        this.weeklyOff = this.perticularCustomerData[0].weeklyOff;
        this.workingStart = this.perticularCustomerData[0].workingStart;
        this.workingEnd = this.perticularCustomerData[0].workingEnd;
        this.warrantyFrom = this.perticularCustomerData[0].warrantyFrom;
        this.warrantyTill = this.perticularCustomerData[0].warrantyTill;
        this.features = this.perticularCustomerData[0].features;
        this.invoicePerticular = this.perticularCustomerData[0].invoicePerticular;
        this.securityFormalities = this.perticularCustomerData[0].securityFormalities;
      }
      console.log('Selected Machine Number:', this.selectedMachine);
    })
  }


  onSelectCustomer(data: any){
    this.valuetime = new Date();

    this.customerID = data.companyName;
    this.regSv.getMachineTicketDetails(this.customerID).subscribe((response: any) => {
      if (response != null || response.length != 0) {
        this.MachineTicketList = response;
        console.log('List is', this.MachineTicketList);
          } else {
            alert("Something went wrong!!!")
          }
    });
    this.regSv
        .getPerticularCust(this.customerID)
        .subscribe((response: any) => {
          if (response != null) {
            this.perticularCustomerData = response;
            this.companyName = this.perticularCustomerData[0].companyName;
            this.custID = this.perticularCustomerData[0].customerID;
            this.getPerticularCustomerContactDetails(this.custID);
            console.log(this.perticularCustomerData[0].customerID);
            console.log(this.perticularCustomerData);
            this.unit = this.perticularCustomerData[0].unit;
            this.addressOne = this.perticularCustomerData[0].addressOne;
            this.addressTwo = this.perticularCustomerData[0].addressTwo;
            this.addressThree = this.perticularCustomerData[0].addressThree;
            this.city = this.perticularCustomerData[0].city;
            this.pincode = this.perticularCustomerData[0].pincode;
            this.state = this.perticularCustomerData[0].state;
            this.country = this.perticularCustomerData[0].country;
            this.gstin = this.perticularCustomerData[0].gstin;
            this.cluster = this.perticularCustomerData[0].cluster;
            this.routeNo = this.perticularCustomerData[0].routeNumber;
            this.region = this.perticularCustomerData[0].region;
            this.zone = this.perticularCustomerData[0].zone;
            this.weeklyOff = this.perticularCustomerData[0].weeklyOff;
            this.workingStart = this.perticularCustomerData[0].workingStart;
            this.workingEnd = this.perticularCustomerData[0].workingEnd;
            this.securityFormalities =
              this.perticularCustomerData[0].securityFormalities;

          } else {
            alert("Something went wrong!!!")
          }
        });
  }

  onSelectCompany(data: any) {
    this.customerID = data.companyName;
    this.regSv.getMachineInLocation(this.customerID)
      .subscribe((response: any) => {
        if (response == null) {
          alert("No Machine Found!!!");
        } else {
          this.perticularMachineData = [];
          this.perticularMachineData = response;
          console.log(this.perticularMachineData);

          // Clear existing machineList and then populate with new data
          this.machineList = [];
          // Loop through the machines and populate the machineList
          for (const machine of this.perticularMachineData) {
            this.machineList.push({
              machineNumber: machine.machineNumber,
              machineInLocation: machine.machineInLocation,
              modelName: machine.modelName
            });
          }
        }
      });
    // if (this.perticularMachineData != 0) {
      this.regSv
        .getPerticularCust(this.customerID)
        .subscribe((response: any) => {
          if (response != null) {
            this.perticularCustomerData = response;
            this.companyName = this.perticularCustomerData[0].companyName;
            this.custID = this.perticularCustomerData[0].customerID;
            this.GetInvoicesCustomer(this.custID);
            console.log(this.custID);  
            this.getPerticularCustomerContactDetails(this.perticularCustomerData[0].customerID);
            // this.getCustomerTickets(this.perticularCustomerData[0].customerID);
            console.log(this.perticularCustomerData[0].customerID);
            console.log(this.perticularCustomerData);
            this.unit = this.perticularCustomerData[0].unit;
            this.addressOne = this.perticularCustomerData[0].addressOne;
            this.addressTwo = this.perticularCustomerData[0].addressTwo;
            this.addressThree = this.perticularCustomerData[0].addressThree;
            this.city = this.perticularCustomerData[0].city;
            this.pincode = this.perticularCustomerData[0].pincode;
            this.state = this.perticularCustomerData[0].state;
            this.country = this.perticularCustomerData[0].country;
            this.gstin = this.perticularCustomerData[0].gstin;
            this.cluster = this.perticularCustomerData[0].cluster;
            this.routeNo = this.perticularCustomerData[0].routeNumber;
            this.region = this.perticularCustomerData[0].region;
            this.zone = this.perticularCustomerData[0].zone;
            this.weeklyOff = this.perticularCustomerData[0].weeklyOff;
            this.workingStart = this.perticularCustomerData[0].workingStart;
            this.workingEnd = this.perticularCustomerData[0].workingEnd;
            this.warrantyFrom = this.perticularCustomerData[0].warrantyFrom;
            this.warrantyTill = this.perticularCustomerData[0].warrantyTill;
            this.features = this.perticularCustomerData[0].features;
            this.invoicePerticular = this.perticularCustomerData[0].invoicePerticular;
            this.securityFormalities =
              this.perticularCustomerData[0].securityFormalities;

          } else {
            alert("Something went wrong!!!")
          }
        });
      this.machineSelected = true;
  }

  getCustomerTickets(id: any) {
    this.regSv.getCustomerTickets(id).subscribe((res: any) => {
      this.customerTicketList = res;
      console.log(this.customerTicketList);
    });
  }

  isSelectedRow(id: any): boolean {
    return this.contactId === id;
}
  onClickRow(details: any) {
    this.contactId = details.id;
    this.contactName = details.contactName;
    console.log(this.contactId);
  }

  getPerticularCustomerContactDetails(id: any) {
    this.regSv.getCustomerContactDetails(id).subscribe((result: any) => {
      this.contactDetails = result;
      console.log(this.contactDetails);
    });
  }

  addContactDetails() {
    if (this.contactname == null || this.contactname == "") {
      alert('Please enter Contact name');
    }else if(this.mobile == null || this.mobile == ""){
      alert('Please enter Mobile number');
    }
    else {
    var contactdata = {
      Salute: this.salute,
      ContactName: this.contactname,
      Designation: this.designation,
      Email: this.email,
      Mobile: this.mobile,
      MachineId: this.selectedMachine,
      MachineNumber: this.selectedMachine,
      CustomerId: this.custID,
      CreatedBy: this.userName,
    };
    this.regSv.postcontactdetails(contactdata).subscribe((response: any) => {
      if (response != null) {
        alert('Contact added successfully!');

        this.regSv.getCustomerContactDetails(this.custID).subscribe((result: any) => {
          this.contactDetails = result;
          console.log(this.contactDetails);
        });
        this.salute = '';
        this.contactname = '';
        this.designation = '';
        this.email = '';
        this.mobile = '';
      } else {
        alert('Something Went Wrong!!!');
      }
    });
  }
  }
 
  onSelectCallEntry() {
    if (this.selectedCallEntry) {
      const selectedRequest = this.requestslist.find((requestslist: any) => requestslist.requestsId === this.selectedCallEntry);
      if (selectedRequest) {
        this.selectedPriority = selectedRequest.priority;
      }
    }
  }
  onSelectRequest() {
    if (this.selectedrequestt != null) {
      this.selectedrequest = this.selectedrequestt;
    } else {
      this.selectedrequest = this.selectedrequestf;
    }
    console.log(this.selectedrequest);
  }
  onSelectsands() {
    console.log(this.selectedsands);
  }

  GetInvoicesCustomer(id: any) {
    this.regSv
      .getPerticularCustomerInvoice(id)
      .subscribe((response: any) => {
        this.perticularCustomerInvoiceData = response;
        console.log(this.perticularCustomerInvoiceData);
      });
  }

 
  getCustomer() {
    this.regSv.getCustomer().subscribe((response: any) => {
      this.customerList = response;
      console.log(this.customerList);
    });
  }
  getAttendType() {
    this.masterSv.getAttendType().subscribe((response: any) => {
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
    onSelectAttendedBy(data: any) {
      this.selectedAttendedBy = data.target.value
    }
    onSelectAttendedHow(data: any) {
      this.selectedAttendedHow = data.target.value
    }

  Done() {
    this.reqForId = this.requestForId;
    this.regSv.getRequestForById(this.reqForId).subscribe((Response:any) => {
      if (Response == null || Response == ''){
        alert("No request Found");
      }else{
        this.requestForName = Response;
        console.log(Response);
      }
    });
  
  }
  savedoneDetails() {
    if(this.selectedAttendedBy == null || this.selectedAttendedBy == ''){
      alert("Please Enter Attended By");
    }else if(this.selectedAttendedHow == null || this.selectedAttendedHow == ''){
      alert("Please Enter Attended How");
    }else if(this.dateofinteraction == null || this.dateofinteraction == ''){
      alert('Please Enter Date of Interaction');
    }else if(this.ticketNo == null || this.ticketNo == ''){
      alert("No Ticket are available to clear")
    }else {
      if(this.ticketNo == null){
        this.ticketNumber = this.newTicketNo;
      }else{
        this.ticketNumber = this.ticketNo;
      }
    var interactionData = {
      CutomerId: this.custID,
      CutomerName: this.companyName,
      TicketNo: this.ticketNumber,
      MachineNumber: this.selectedMachine,
      // ModelId: this.modelId,
      ModelName: this.modelName,
      // RegionId: this.regionId,
      RegionName: this.region,
      //ZoneId : this.z
      ZoneName: this.zone,
      Remarks: this.fault,
      AttendedByUserId: this.selectedAttendedBy,
      //AttendedByUserName : this.selectedAttendedBy,
      AttendedHowId: this.selectedAttendedHow,
      //AttendedHowName : this.selectedAttendedHow,
      CreatedBy: this.userName,
      RequestId: this.reqForId,
      DateOfInteraction: this.dateofinteraction
    }
    this.regSv.postSaveInteraction(interactionData).subscribe((response: any) => {
      if (response == "success") {
        alert("Interacted Successfully")
        window.location.reload()
      }
      else {
        alert("Somthing Went Wrong!!")
        window.location.reload()
      }
    })
  }
}
}
