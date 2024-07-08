import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';
import {  ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-travel-sheet',
  templateUrl: './travel-sheet.component.html',
  styleUrls: ['./travel-sheet.component.css']
})
export class TravelSheetComponent {
  @ViewChild('table', { static: false }) table!: ElementRef;

  userName: any;
  roleId: any;
  IsLoggedIn: any;
  selectedData: any[] = [];
  userId: any;
 // travel: any;
 // estDistKms: any;
 // estTravelTime: any;
  estJobTime: any;
 // FoodFuel: any;
  schdET: any;
  mileageCng: number;
  vehicle: any;
  mileagePetrol: number;
  fuelPriceReqd : number;
  mileageDiesel: number;
  FuelPriceCNG: number;
  FuelPricePetrol: number;
  FuelPriceDiesel: number;
  fuelReqd: number;
  sparesReqd: any;
//initialTime: any;
 // initialTime: string = '00:00';
  travel: string = '';
  estDistanceKms: string = '';
  estTravelTime: string = '';
  FoodFuel: string = '';
 // totalSchdET: string = this.initialTime;
  initialTime: string; // Set your initial time here
  cumulativeTime: number = 0;
startPlace: any;
startCluster: any;
timeDifference?: string;
totalEstTravelTime: number = 0;
formattedTotalEstTravelTime: string = '';
totalFoodFuel: number = 0;
formattedTotalFoodFuel: string = '';
totalEstJobTime: number = 0;
formattedTotalEstJobTime: string = '';
totalEstDistKms: number = 0;
  tableLength: any;
  tripSheetNo: any;
tripSheetNumber: any;
  tripDetails: any;
  estimatedTravelTime: any;
  estimatedJobTime: any;
endPlace: any;
endCluster: any;
finalTime: any;
isUpdate: any;

  constructor(private el: ElementRef, private renderer: Renderer2,  private router: ActivatedRoute,
     private route: Router,
      private regSv: RegistrationService,
    private httpService: HttpClient){
    if (localStorage.getItem('IsLoggedIn') == 'true') {
      this.userName = localStorage.getItem('UserName');
      this.roleId = localStorage.getItem('Role');
      this.userId = localStorage.getItem('UserID');
      this.IsLoggedIn = true;
    }

    this.router.params.subscribe(params => {
      if (params["id"]) {
        this.tripSheetNumber = params["id"];
      }
    });

    this.router.paramMap.subscribe(params => {
      const state = window.history.state;
      this.selectedData = state.selectedData || [];

      console.log('Selected Data:', this.selectedData);
    });
  }
  ngOnInit(): void {
    this.getTripSheetNo();
    this.loadTripDetailsByTripSheetNo();
  }
  exportTableToPDF1(): void {
    // Set A4 dimensions in landscape mode
    const pdfWidth = 297; // A4 width in mm
    const pdfHeight = 210; // A4 height in mm
  
    const doc = new jspdf.jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [pdfWidth, pdfHeight],
    });
  
    const table = this.table.nativeElement;
  
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');
      const imgWidth = pdfWidth; // Use A4 width for image width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      // Calculate the position to center the image on the page
      const xPos = 0;
      const yPos = (pdfHeight - imgHeight) / 2;
  
      doc.addImage(imgData, 'PNG', xPos, yPos, imgWidth, imgHeight);
      doc.save('TripSheet - ' + this.tripSheetNo + '.pdf');
    });
  }
  
  getTripSheetNo() {
    this.regSv.getTripSheetNo().subscribe(
      (result: any) => {
        // Increment the received TripSheetNumber by 1 or set to '001' if it's 0
        this.tripSheetNo = (parseInt(result) + 1 || 1).toString().padStart(3, '0');
      }
    );
  }

  print(printSectionId) {
    const printContent = this.el.nativeElement.querySelector('#' + printSectionId);
    const clonedContent = printContent.cloneNode(true);
   // Create a new window and open it
    const popupWindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=yes');
    // Write the HTML content to the new window
    popupWindow.document.open();
    popupWindow.document.write('<html><title>' + 'TripSheet - ' + this.tripSheetNo + '</title><style>table{ margin-left:10%; border-collapse: collapse; } table, th, td { border: 1px solid black; }</style><head></head><body onload="window.print()">');
    popupWindow.document.body.appendChild(clonedContent);
    popupWindow.document.write('</body></html>');
    popupWindow.document.close();
  }

  // getTripDetailsbyTripSheetNo() {
  //   this.regSv.getTripDetailsbyTripSheetNo(this.tripSheetNumber).subscribe((result: any) => {
  //     if (result.length != 0) {
  //       this.selectedData = result;
  //       console.log('Trip Sheet Details', this.selectedData);
  //       const firstTripDetails = result[0]; // Assuming the first element holds trip details
  //       this.tripSheetNo = firstTripDetails.tripSheetNo;
  //       this.FuelPriceCNG = firstTripDetails.fuelPriceCNG;
  //       this.FuelPricePetrol = firstTripDetails.fuelPricePetrol;
  //       this.FuelPriceDiesel = firstTripDetails.fuelPriceDiesel;
  //       this.fuelPriceReqd = firstTripDetails.fuelPriceReqd;
  //       this.fuelReqd = firstTripDetails.fuelReqd;
  //       this.initialTime = firstTripDetails.initialTime;
  //       this.mileageCng = firstTripDetails.mileageCNG;
  //       this.mileagePetrol = firstTripDetails.mileagePetrol;
  //       this.mileageDiesel = firstTripDetails.mileageDiesel;
  //       this.sparesReqd = firstTripDetails.sparesReqd;
  //       this.startCluster = firstTripDetails.startCluster;
  //       this.startPlace = firstTripDetails.startPlace;
  //       this.endCluster = firstTripDetails.endCluster;
  //       this.endPlace = firstTripDetails.endPlace;
  //       this.vehicle = firstTripDetails.vehicle;
  //       this.totalEstDistKms = firstTripDetails.totalEstDistKms;
  //       this.formattedTotalEstJobTime = firstTripDetails.totalEstJobTime;
  //       this.formattedTotalEstTravelTime = firstTripDetails.totalEstTravelTime;
  //       this.formattedTotalFoodFuel = firstTripDetails.totalFoodFuel;
  //       this.timeDifference = firstTripDetails.totalSchdET;
  //     }
  //     else {
  //       alert("Invalid Trip Sheet Number");
  //     }
  //   })

  // }

  public value = new Date();

  reSequence(){
    this.route.navigate(['/workFront']);
  }
  private apiUrl = 'https://blockchainmatrimony.com/customermanagerapi/api';
  recalculateFuel() {
    // Ensure totalEstDistKms is greater than zero to avoid division by zero
    if (this.totalEstDistKms > 0) {
      let mileage: number | undefined;
      let fuelPrice: number | undefined;
  
      if (this.mileageCng !== null && this.mileageCng !== undefined && this.mileageCng !== 0) {
        mileage = this.mileageCng;
        fuelPrice = this.FuelPriceCNG;
      } else if (this.mileagePetrol !== null && this.mileagePetrol !== undefined && this.mileagePetrol !== 0) {
        mileage = this.mileagePetrol;
        fuelPrice = this.FuelPricePetrol;
      } else if (this.mileageDiesel !== null && this.mileageDiesel !== undefined && this.mileageDiesel !== 0) {
        mileage = this.mileageDiesel;
        fuelPrice = this.FuelPriceDiesel;
      } else {
        // Handle the case where no valid mileage value is provided
        this.fuelReqd = null;
        this.fuelPriceReqd = null;
        return;
      }
  
      if (mileage !== null && mileage !== undefined && mileage !== 0) {
        const fuelReqd = parseFloat((this.totalEstDistKms / mileage).toFixed(2));
        const fuelPriceReqd = parseFloat((fuelReqd * (fuelPrice || 0)).toFixed(2));
      
        this.fuelReqd = isNaN(fuelReqd) ? null : fuelReqd;
        this.fuelPriceReqd = isNaN(fuelPriceReqd) ? null : fuelPriceReqd;
      } else {
        // Handle the case where mileage is zero or undefined
        this.fuelReqd = null;
        this.fuelPriceReqd = null;
      }
    } else {
      // Handle the case where totalEstDistKms is zero
      this.fuelReqd = null;
      this.fuelPriceReqd = null;
    }
  }
  
  onInputChange() {
    this.recalculateFuel();
  }
 
  updateScheduleTimes() {
    let cumulativeTime = this.getMinutesFromTime(this.initialTime);
    this.totalEstTravelTime = 0;
    this.totalFoodFuel = 0;
    this.totalEstJobTime = 0;
    this.totalEstDistKms = 0;
    for (let i = 0; i < this.selectedData.length; i++) {
      const item = this.selectedData[i];
      // Update cumulative time
      this.estimatedTravelTime = item.estTravelTime;
      this.estimatedJobTime = item.estJobTime;
        const estTravelTimeMinutes = this.getMinutesFromTime(item.estTravelTime);
        const foodFuelMinutes = this.getMinutesFromTime(item.foodFuelOthers);
        const estJobTimeMinutes = this.getMinutesFromTime(item.estJobTime);
        const estDistKms = parseFloat(item.estDistanceKms) || 0; 
        // Handle undefined values
        const validEstTravelTime = !isNaN(estTravelTimeMinutes);
        const validFoodFuel = !isNaN(foodFuelMinutes);
        const validEstJobTime = !isNaN(estJobTimeMinutes);

        if (validEstTravelTime) {
          cumulativeTime += estTravelTimeMinutes;
          // Add estTravelTime to the total sum
          this.totalEstTravelTime += estTravelTimeMinutes;
        }
        if (validFoodFuel) {
          cumulativeTime += foodFuelMinutes;
          this.totalFoodFuel += foodFuelMinutes;
        }
      
    if (validEstJobTime) {
      cumulativeTime += estJobTimeMinutes;
      this.totalEstJobTime += estJobTimeMinutes;
    }
    this.totalEstDistKms += estDistKms;

      // Update the schedule time in the current row
      item.schdET = this.addMinutesToTime(this.initialTime, cumulativeTime);
      this.formattedTotalEstTravelTime = this.formatMinutesToHHMM(this.totalEstTravelTime);
      this.formattedTotalFoodFuel = this.formatMinutesToHHMM(this.totalFoodFuel);
      this.formattedTotalEstJobTime = this.formatMinutesToHHMM(this.totalEstJobTime);
    // Calculate time difference and update a property for display
    const timeDifferenceMinutes = this.getMinutesFromTime(item.schdET) - this.getMinutesFromTime(this.initialTime);
    this.timeDifference = this.formatMinutesToHHMM(timeDifferenceMinutes);
    
  }
  console.log('final data:',this.selectedData);
}

formatMinutesToHHMM(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${this.padZero(hours)}:${this.padZero(remainingMinutes)}`;
}
  getMinutesFromTime(time: string): number {
    if (!time) {
      return 0; // or handle the case where time is undefined/null
    }

    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  addMinutesToTime(time: string, minutes: number): string {
    if (!time) {
      return ''; // or handle the case where time is undefined/null
    }

    const [hours, oldMinutes] = time.split(':').map(Number);
    if(this.estimatedTravelTime  != undefined || this.estimatedJobTime != undefined || this.estimatedTravelTime  != "" || this.estimatedJobTime != ""){
      // const newMinutes = oldMinutes + minutes;
      const newMinutes =  minutes;

      const newHours = Math.floor(newMinutes / 60);
      const adjustedMinutes = newMinutes % 60;
      
    return `${this.padZero(newHours)}:${this.padZero(adjustedMinutes)}`;
    }
   else return this.initialTime

  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
  // updateTripDetails() {
  //   // Update the selectedData array or make a call to the API to update the details
  
  //   // Example: Update the first item in the selectedData array
  //   if (this.selectedData.length > 0) {
  //     this.selectedData[0].fuelPriceCNG = this.FuelPriceCNG;
  //     this.selectedData[0].fuelPricePetrol = this.FuelPricePetrol;
  //     this.selectedData[0].fuelPriceDiesel = this.FuelPriceDiesel;
  //     this.selectedData[0].fuelPriceReqd = this.fuelPriceReqd;
  //     this.selectedData[0].fuelReqd = this.fuelReqd;
  //     this.selectedData[0].initialTime = this.initialTime;
  //     this.selectedData[0].mileageCNG = this.mileageCng;
  //     this.selectedData[0].mileagePetrol = this.mileagePetrol;
  //     this.selectedData[0].mileageDiesel = this.mileageDiesel;
  //     this.selectedData[0].sparesReqd = this.sparesReqd;
  //     this.selectedData[0].startCluster = this.startCluster;
  //     this.selectedData[0].startPlace = this.startPlace;
  //     this.selectedData[0].endCluster = this.endCluster;
  //     this.selectedData[0].endPlace = this.endPlace;
  //     this.selectedData[0].vehicle = this.vehicle;

  //     this.selectedData[0].totalEstDistKms = this.totalEstDistKms;
  //     this.selectedData[0].totalEstJobTime = this.formattedTotalEstJobTime;
  //     this.selectedData[0].totalEstTravelTime = this.formattedTotalEstTravelTime;
  //     this.selectedData[0].totalFoodFuel = this.formattedTotalFoodFuel;
  //     this.selectedData[0].totalSchdET = this.timeDifference;
  

  //     // Make a call to update the data on the server
  //     this.httpService.post('https://blockchainmatrimony.com/customermanagerapi/api/TravelBudget/PostUpdateTripSheetData', this.selectedData[0]).subscribe((data: any) => {
  //       if (data == "success") {
  //         alert("Updated Successfully");
  //         // Optionally, navigate to the tripsheet page or handle other logic
  //       } else {
  //         alert("Something Went Wrong!!");
  //       }
  //     });
  //   } else {
  //     alert("No data to update");
  //   }
  // }
// Method to load trip details by trip sheet number
loadTripDetailsByTripSheetNo() {
  this.regSv.getTripDetailsbyTripSheetNo(this.tripSheetNumber).subscribe((result: any) => {
    if (result.length !== 0) {
      this.selectedData = result;
      console.log('Trip Sheet Details', this.selectedData);
      // Populate form fields with trip details
      this.tripSheetNo = this.selectedData[1].tripSheetNo;
      this.FuelPriceCNG = this.selectedData[1].fuelPriceCNG;
      this.FuelPricePetrol = this.selectedData[1].fuelPricePetrol;
      this.FuelPriceDiesel = this.selectedData[1].fuelPriceDiesel;
      this.fuelPriceReqd = this.selectedData[1].fuelPriceReqd;
      this.fuelReqd = this.selectedData[1].fuelReqd;
      this.initialTime = this.selectedData[1].initialTime;
      this.mileageCng = this.selectedData[1].mileageCNG;
      this.mileagePetrol = this.selectedData[1].mileagePetrol;
      this.mileageDiesel = this.selectedData[1].mileageDiesel;
      this.sparesReqd = this.selectedData[1].sparesReqd;
      this.startCluster = this.selectedData[1].startCluster;
      this.startPlace = this.selectedData[1].startPlace;
      this.endCluster = this.selectedData[1].endCluster;
      this.endPlace = this.selectedData[1].endPlace;
      this.vehicle = this.selectedData[1].vehicle;
      this.totalEstDistKms = this.selectedData[1].totalEstDistKms;
      this.formattedTotalEstJobTime = this.selectedData[1].totalEstJobTime;
      this.formattedTotalEstTravelTime = this.selectedData[1].totalEstTravelTime;
      this.formattedTotalFoodFuel = this.selectedData[1].totalFoodFuel;
      this.timeDifference = this.selectedData[1].totalSchdET;
    } else {
      alert("Invalid Trip Sheet Number");
    }
  });
}

// Method to save edited trip details
saveEditedTripDetails() {
  // Check if the condition is true (replace the condition with your actual check)
   {
    var editedData = {
      TripSheetNo: this.tripSheetNo,
      TripSheetValues: this.selectedData.map(item => {
        return {
          MachineNumber: item.machineNumber,
          CompanyName: item.companyName,
          CustomerId: item.customerID,
          Purpose: item.purpose,
          Cluster: item.cluster,
          ModelId: item.modelId,
          ModelName: item.modelName,
          Remarks: item.remarks,
          RequestForId: item.requestForId,
          TicketId: item.tokenID,
          Id:item.id,
          Zone: item.zone,
          EstDistanceKms: item.estDistanceKms,
          EstTravelTime: this.convertTimeStringToTimeSpan(item.estTravelTime),
          FoodFuelOthers: this.convertTimeStringToTimeSpan(item.foodFuelOthers),
          EstJobTime: this.convertTimeStringToTimeSpan(item.estJobTime),
          SchdET: this.convertTimeStringToTimeSpan(item.schdET),
          // Add other properties specific to ArrayDataVM
        };
      }),
      TotalEstDistKms: this.totalEstDistKms,
      TotalEstTravelTime: this.formattedTotalEstTravelTime,
      TotalFoodFuel: this.formattedTotalFoodFuel,
      TotalEstJobTime: this.formattedTotalEstJobTime,
      TotalSchdET: this.timeDifference,
      CreatedBy: this.userName,
      MileageCNG: this.mileageCng,
      MileagePetrol: this.mileagePetrol,
      MileageDiesel: this.mileageDiesel,
      FuelReqd: this.fuelReqd,
      FuelPriceCNG: this.FuelPriceCNG,
      FuelPricePetrol: this.FuelPricePetrol,
      FuelPriceDiesel: this.FuelPriceDiesel,
      FuelPriceReqd: this.fuelPriceReqd,
      SparesReqd: this.sparesReqd,
      Vehicle: this.vehicle,
      StartPlace: this.startPlace,
      StartCluster: this.startCluster,
      EndPlace: this.endPlace,
      EndCluster: this.endCluster,
      InitialTime: this.initialTime,
      UserId: this.userId,

    };

    // Send a request to update trip details
    this.httpService.post('https://blockchainmatrimony.com/customermanagerapi/api/TravelBudget/PostUpdateTripSheetData', editedData).subscribe((data: any) => {
      if (data === "success") {
        alert("Trip details updated successfully");
        this.route.navigate(['/tripsheet']);
      } else {
        alert("Something went wrong!!");
      }
    });
  }
}


  save() {  
    if (this.selectedData.length === 0) {
      alert("At least One Record Should Be Added.");
    } else if (this.initialTime == null || this.initialTime.toString().trim() === '') {
      alert("Please enter starting time");
    } 
    else if (this.startPlace == null || this.startPlace.toString().trim() === '') {
      alert("Starting Place value can't be left blank.");
    }
    else if (this.startCluster == null || this.startCluster.toString().trim() === '') {
      alert("Starting Cluster value can't be left blank.");
    } 
    else if (this.endPlace == null || this.endPlace.toString().trim() === '') {
      alert("Ending Place value can't be left blank.");
    }
    else if (this.endCluster == null || this.endCluster.toString().trim() === '') {
      alert("Ending Cluster value can't be left blank.");
    }  else if (this.vehicle == null || this.vehicle.toString().trim() === '') {
      alert("Please enter vehicle Name");
    } else if (this.sparesReqd == null || this.sparesReqd.toString().trim() === '') {
      alert("Please enter spares required."); 
    }else if (
      // For CNG
      (
        (this.FuelPriceCNG == null || this.FuelPriceCNG.toString().trim() === '') ||
        (this.mileageCng == null || this.mileageCng.toString().trim() === '')
      ) &&
      // For Petrol
      (
        (this.FuelPricePetrol == null || this.FuelPricePetrol.toString().trim() === '') ||
        (this.mileagePetrol == null || this.mileagePetrol.toString().trim() === '')
      ) &&
      // For Diesel
      (
        (this.FuelPriceDiesel == null || this.FuelPriceDiesel.toString().trim() === '') ||
        (this.mileageDiesel == null || this.mileageDiesel.toString().trim() === '')
      )
    ) {
      console.log("Debugging - Fuel price and mileage issue");
      alert("Both Fuel Price and Mileage should be filled for each case.");
    }
          
          else{
    var data = {
      TripSheetNo: this.tripSheetNo,
      TripSheetValues: this.selectedData.map(item => {
        return {
          MachineNumber: item.machineNumber,
          CompanyName: item.companyName,
          CustomerId: item.customerID,
          Purpose: item.purpose,
          Cluster: item.cluster,
          ModelId: item.modelId,
          ModelName: item.modelName,
          Remarks: item.remarks,
          RequestForId: item.requestForId,
          TicketId: item.tokenID,
          Zone: item.zone,
          EstDistanceKms: item.estDistanceKms,
          EstTravelTime: this.convertTimeStringToTimeSpan(item.estTravelTime),
          FoodFuelOthers: this.convertTimeStringToTimeSpan(item.foodFuelOthers),
          EstJobTime: this.convertTimeStringToTimeSpan(item.estJobTime),
          SchdET: this.convertTimeStringToTimeSpan(item.schdET),
          // Add other properties specific to ArrayDataVM
        };
      }),
      TotalEstDistKms: this.totalEstDistKms,
      TotalEstTravelTime: this.formattedTotalEstTravelTime,
      TotalFoodFuel: this.formattedTotalFoodFuel,
      TotalEstJobTime: this.formattedTotalEstJobTime,
      TotalSchdET: this.timeDifference,
      CreatedBy: this.userName,
      MileageCNG: this.mileageCng,
      MileagePetrol: this.mileagePetrol,
      MileageDiesel: this.mileageDiesel,
      FuelReqd: this.fuelReqd,
      FuelPriceCNG: this.FuelPriceCNG,
      FuelPricePetrol: this.FuelPricePetrol,
      FuelPriceDiesel: this.FuelPriceDiesel,
      FuelPriceReqd: this.fuelPriceReqd,
      SparesReqd: this.sparesReqd,
      Vehicle: this.vehicle,
      StartPlace: this.startPlace,
      StartCluster: this.startCluster,
      EndPlace: this.endPlace,
      EndCluster: this.endCluster,
      InitialTime: this.initialTime,
      UserId: this.userId,
    };
  
    this.httpService.post('https://blockchainmatrimony.com/customermanagerapi/api/TravelBudget/PostSaveTripSheetData',data).subscribe((data:any) => {
      if(data == "success"){
        alert("Saved Successfully");
        this.route.navigate(['/tripsheet'])
      }else{
        alert("Somthing Went Wrong!!");
      }  
    })
  }
}
  convertTimeStringToTimeSpan(timeString: string | null): string | null {
    return timeString ? `${timeString}:00` : null;
  }
 
}
