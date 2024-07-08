import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';
import * as XLSX from 'xlsx';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-travel-budget',
  templateUrl: './travel-budget.component.html',
  styleUrls: ['./travel-budget.component.css']
})
export class TravelBudgetComponent {
  @ViewChild('table', { static: false }) table!: ElementRef;
  
  perticularCustomerData: any;
  selectedCustomer: any;
  custID: any;
  companyName: any;
  p: number = 1;
  customerID: any;
  customerList: any;
  rows: any[] = [];
  machineNumber: string = '';
  purpose: any;
  clusterLoc: any;
  interDist: any;
  cummDist: any;
  actualODORead: any;
  travelTime: any;
  schd: any;
  actualTime: any;
  mileage: any;
  cngPrev: any;
  cng: any;
  userName: any;
  roleId: any;
  IsLoggedIn: any;
  tableLength: any;
  MachineNo: any;
  TravelId: any;
  TripId: any;
  userId: any;
  uniqueTravelID: any;
  budgetList: any=[];
  addedTime: any;
  removeColon: any;
  totaltime: any;
  document: any;
  totalMinutes: any;
  totalTime: any;
  totalHours: any;
  timetaken: any = [];
  displayCalculatedTime: any;
  timeForJob: any;
  estTravelTime: any;
  estTimeForJob: any;
  disableEstTimeForJob = false;
  disableEstTravelTime = false;
  inputClicked= false;
  showestTravelTimeInputs: boolean = true;
  showestTimeInputs: boolean = true;
  rupees: any;
  person: any;
  estInterDistance:number = 0;
  estCompanyDistance:number = 0;
  additionResult:number = 0;
  travel: number = 0;
  cngread: number = 0;
  totalAmount: number = 0;
  budgetListdist: any=[];
  onEstInterDistanceChange:any;
  item:any;
 
  totalEstInterDistance: number = 0;
  totalEstCompanyDistance: number = 0;
  lastEstCompanyDistance: number = 0;
  totalDistance: any;
  selectedData: any[] = [];
  
  constructor(private regSv: RegistrationService, private router: ActivatedRoute, private route: Router) {
    if (localStorage.getItem('IsLoggedIn') == 'true') {
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.userId = localStorage.getItem('UserID');
      this.IsLoggedIn = true;
    }

    this.router.params.subscribe(params => {
      if (params["id"]) {
        this.TravelId = params["id"];
      }
    });

    // this.router.paramMap.subscribe(params => {
    //   const state = window.history.state;
    //   this.selectedData = state.selectedData || [];

    //   console.log('Selected Data:', this.selectedData);
    // });
    window.scrollTo(0, 0);
  }
  
  ngOnInit(): void {
    this.getCustomer();
    this.getTravelId();
    this.getTravelBudgetbyTravelIdTime();
    this.GetTravelBudgetbyDistance();
  }

  calculateTotals() {
    this.totalEstInterDistance = this.budgetListdist.reduce((total: any, item: { estInterDistance: any; }) => total + item.estInterDistance, 0);
    
    if (this.budgetListdist.length > 0) {
      this.lastEstCompanyDistance = this.budgetListdist[this.budgetListdist.length - 1].estCompanyDistance;
    } else {
      this.lastEstCompanyDistance = 0;
    }
  }

  
  updateTotalAmount() {
    this.totalAmount = Number(this.travel) + Number(this.cng);
  }

  getTravelBudgetbyTravelIdTime() {
    this.regSv.GetTravelBudgetbyTravelId(this.TravelId).subscribe((response: any) => {
      this.budgetList = response;

      for (let i = 0; i < this.budgetList.length; i++) {
        if (i > 0) {
          if (this.budgetList[i].estTimeForJob == null) {
            const converttodatetime = new Date(this.budgetList[i].estTravelTime);
            const startTimeHours = converttodatetime.getHours();
            const startTimeMin = converttodatetime.getMinutes();

            const converttodatetime1 = new Date(this.budgetList[i - 1].schdETD);
            const endTimeHours = converttodatetime1.getHours();
            const endTimeMin = converttodatetime1.getMinutes();
            const addedHours = startTimeHours + endTimeHours;
            const addedMinutes = startTimeMin + endTimeMin;

            this.addedTime = new Date();
            this.addedTime.setHours(addedHours, addedMinutes);
            console.log(this.addedTime);
            this.budgetList[i].schdETD = this.addedTime;
          } else if (this.budgetList[i].estTravelTime == null) {
            const converttodatetime = new Date(this.budgetList[i].estTimeForJob);
            const startTimeHours = converttodatetime.getHours();
            const startTimeMin = converttodatetime.getMinutes();

            const converttodatetime1 = new Date(this.budgetList[i - 1].schdETD);
            const endTimeHours = converttodatetime1.getHours();
            const endTimeMin = converttodatetime1.getMinutes();
            const addedHours = startTimeHours + endTimeHours;
            const addedMinutes = startTimeMin + endTimeMin;

            this.addedTime = new Date();
            this.addedTime.setHours(addedHours, addedMinutes);
            console.log(this.addedTime);
            this.budgetList[i].schdETD = this.addedTime;
          }
        }
      }

      const converttodatetime1 = new Date(this.budgetList[0].schdETD);
      const startHour = converttodatetime1.getHours();
      const startMinute = converttodatetime1.getMinutes();
      const endHour = this.budgetList[this.budgetList.length - 1].schdETD.getHours();
      const endMinute = this.budgetList[this.budgetList.length - 1].schdETD.getMinutes();

      const totalMinutes = endMinute - startMinute;
      const totalHours = endHour - startHour;

      const totalTime = new Date();
      totalTime.setHours(totalHours, totalMinutes);
      this.timetaken.push(totalTime);
      console.log(this.timetaken);
      this.displayCalculatedTime = this.timetaken[0];
      return totalTime.toString();


      

     





    });
  }

  GetTravelBudgetbyDistance() {
    this.regSv.GetTravelBudgetbyDistance(this.TravelId).subscribe((response: any) => {
      this.budgetListdist = response;
  
      for (let i = 0; i < this.budgetListdist.length; i++) {
        this.budgetListdist[i].estCompanyDistance = parseInt(this.budgetListdist[i].estInterDistance, 10);
  
        if (i > 0) {
          this.budgetListdist[i].estCompanyDistance += parseInt(this.budgetListdist[i - 1].estCompanyDistance, 10);
        }
      }
  
      console.log(this.budgetListdist);
  
      // Update total distance after processing the budgetListdist
      this.updateTotalDistance();
    });
  }
  
  updateTotalDistance() {
    // Calculate the total distance based on the last item in budgetListdist
    if (this.budgetListdist.length > 0) {
      this.totalDistance = this.budgetListdist[this.budgetListdist.length - 1].estCompanyDistance;
    } else {
      this.totalDistance = 0;
    }
  }
  
  
  
 

  estTravelTimeInputs(){
if(this.estTravelTime  != null){
  this.showestTravelTimeInputs = true
  this.showestTimeInputs = false
}

  }
  estTimeInputs(){
if(this.estTimeForJob != null){
  this.showestTimeInputs = true
  this.showestTravelTimeInputs = false
}

  }
  goToTripSheet() {
    this.route.navigate(['/tripsheet']);
  }

  public value = new Date();

  getTravelId() {
    this.regSv.GetTravelBudget().subscribe((result: any) => {
      if (this.TravelId == null || this.TravelId == '') {
        this.tableLength = result.length + 1; // Assuming result is an array or collection
        this.TravelId = this.tableLength.toString().padStart(3, '0');
      }
    });
  }

  // generateMachineNo(tableLength: number): string {
  //   if (tableLength < 0) {
  //     tableLength = 0;
  //   } else if (tableLength > 9) {
  //     tableLength = 9;
  //   }
  //   const paddedTableLength = tableLength.toString().padStart(3, '0');
  //   return paddedTableLength;
  // }




//    calculateTotal() {
//     // Get values from input fields
//     const travelKms = parseFloat(this.document.getElementById('travelKms').value) || 0;
//     const cngBudget = parseFloat(this.document.getElementById('cngBudget').value) || 0;
//     const amountBudget = parseFloat(this.document.getElementById('amountBudget').value) || 0;

//     // Calculate total cost
//     const totalCost = travelKms + cngBudget + amountBudget;

//     // Display the total cost
//     this.document.getElementById('totalCost').innerText = `Total Cost: $${totalCost.toFixed(2)}`;
// }

  onChangeMachineNumber() {
    this.regSv.getMachineFromMachineNumber(this.machineNumber).subscribe((response: any) => {
      if (response == null) {
        alert("No Machine Found!!!")
      } else {
        this.perticularCustomerData = response;
        console.log(this.perticularCustomerData);
        this.selectedCustomer = this.perticularCustomerData[0].companyName;
      }
    });
  }

  onSelectCompany(data: any) {
    this.customerID = data.customerID;
    this.regSv.getPerticularCustomer(this.customerID).subscribe((response: any) => {
      if (response != null) {
        this.perticularCustomerData = response;
        this.selectedCustomer = this.perticularCustomerData[0].companyName;
        this.custID = this.perticularCustomerData[0].customerId;
      } else {
        alert("No Requests Found For Selected Customer!!!")
      }
    });
  }

  getCustomer() {
    this.regSv.getCustomer().subscribe((response: any) => {
      this.customerList = response;
      console.log(this.customerList);
    });
  }

  save() {
    if (this.machineNumber == null || this.machineNumber == '') {
      alert("Please Enter Machine Number");
    } else if (this.selectedCustomer == null || this.selectedCustomer == '') {
      alert("Please Select Customer");
    } else if (this.purpose == null || this.purpose == '') {
      alert("Please Enter Purpose");
    } else {
      var TravelBudgetList = {
        UserId: this.userId,
        UserName: this.userName,
        MachineNumber: this.machineNumber,
        CustomerName: this.selectedCustomer,
        Purpose: this.purpose,
        ClusterLocation: this.clusterLoc,
        EstInterDistance: this.interDist,
        EstCompanyDistance: this.cummDist,
        ActualODOReading: this.actualODORead,
        EstTravelTime: this.travelTime,
        EstTimeForJob: this.timeForJob,
        SchdETD: this.schd,
        ActualTime: this.actualTime,
        CNG: this.cng,
        Mileage: this.mileage,
        CNGFilledPreviously: this.cngPrev,
        TravelId: this.TravelId,
      }
      this.regSv.saveTravelBudget(TravelBudgetList).subscribe((Response: any) => {
        if (Response == "success") {
          alert('Record Saved Successfully');
          window.location.reload();
        } else {
          alert('Error In Saving Record')
        }
      });
      
    }
  }




  exportTableToPDF(): void {
    const doc = new jspdf.jsPDF();
    const table = this.table.nativeElement;

    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = doc.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save('travel_budget.pdf');
    });
  }

  exportTableToExcel(): void {
    const element = document.getElementById('tableId');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'travel_budget');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName + '.xlsx';
    downloadLink.click();
  }
}
