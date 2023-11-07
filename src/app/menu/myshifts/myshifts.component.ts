import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-myshifts',
  templateUrl: './myshifts.component.html',
  styleUrls: ['./myshifts.component.css'],
})
export class MyshiftsComponent implements OnInit {
  shifts = [];

  displayedColumns = [
    'shiftName',
    'startShift',
    'endShift',
    'wage',
    'place',
    'date',
    'editShift',
    'deleteShift',
  ];

  constructor(private authService: AuthService) {}
  async ngOnInit(): Promise<void> {
    (await this.authService.getEditShifts()).subscribe((data: Array<any>) => {
      this.shifts = data;
      console.log(this.shifts);
    });
  }
  // async deleteShifts(shift_Name) {
  //   (await this.authService.deleteShifts(shift_Name)).subscribe((data) => {
  //     console.log('shift deleted');
  //     this.shifts = data;
  //   });
  // }

  async deleteShifts(shift_Name) {
    (await this.authService.deleteShifts(shift_Name)).subscribe((data) => {
      if (Array.isArray(data)) {
        console.log('Shift deleted');
        this.shifts = data;
      } else {
        console.error('Invalid data received:', data);
      }
    });
  }
}
