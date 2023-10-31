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
  shifts=[];

  async ngOnInit():Promise<void>{

this.authService.getAllShifts().then((result)=>{
  for(let user of result){
    if(user.shifts){
      for(let shifts of user.shifts){
        this.shifts.push(shifts);
        this.shifts.push(user);
      }
    }
  }
})
  }
  

  editShift(){ }
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

  // deleteShifts(shift_Name){
  //   this.AuthService.deleteShifts(shift_Name);
  // }
}


