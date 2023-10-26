import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-edit-shifts',
  templateUrl: './edit-shifts.component.html',
  styleUrls: ['./edit-shifts.component.css'],
})
export class EditShiftsComponent implements OnInit {
  shifts = [];
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
  async editShift(shift) {}
}
