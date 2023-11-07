import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-all-shifts',
  templateUrl: './all-shifts.component.html',
  styleUrls: ['./all-shifts.component.css']
})
export class AllShiftsComponent {

  constructor(private authService: AuthService) {}

  allShifts:any;
  // shifts=[];
  users=[];
  allUsers:any;
  shifts: any[] = [];
  searchName: string = '';
  searchStartDate: Date;
  searchEndDate: Date;
  searchPlace: string = '';

  async ngOnInit():Promise<void>{
this.authService.getAllShifts().then((result)=>{
    this.shifts = result;
})
  }

  isShiftVisible(shift: any): boolean {
    const isNameMatch = !this.searchName || shift.shiftName.includes(this.searchName);
    const isStartDateMatch = !this.searchStartDate || new Date(shift.date) >= new Date(this.searchStartDate);
    const isEndDateMatch = !this.searchEndDate || new Date(shift.date) <= new Date(this.searchEndDate);
    const isPlaceMatch = !this.searchPlace || shift.place.includes(this.searchPlace);
    // if(isNameMatch && isStartDateMatch && isEndDateMatch && isPlaceMatch )
    return isNameMatch && isStartDateMatch && isEndDateMatch && isPlaceMatch;
  }
  
  performSearch() {
     // usersInfo=usersInfo.filter(user => user['shifts'] && user['shifts'].length > 0);
    this.authService
      .searchShifts(this.searchName, this.searchStartDate, this.searchEndDate, this.searchPlace)
      .then((querySnapshot) => {

        this.shifts = querySnapshot.docs.map((doc) => doc.data());
      });
   
      // this.shifts=this.shifts.filter()
  }

  // shifts: MatTableDataSource<any>;
  // ngOnInit() {
  //   this.yourService.getShiftData().then((data) => {
  //     this.shifts = new MatTableDataSource(data);
  //   });
  // }

}


