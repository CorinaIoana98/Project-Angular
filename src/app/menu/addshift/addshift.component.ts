import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Shift } from 'src/app/shift';
import { UserServiceFirestoreService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-addshift',
  templateUrl: './addshift.component.html',
  styleUrls: ['./addshift.component.css'],
})
export class AddshiftComponent {
  shiftForm: FormGroup;
  AuthService: any;

  constructor(
    private formBuilder: FormBuilder,
    private fireBase: UserServiceFirestoreService
  ) {
    this.shiftForm = this.formBuilder.group({
      shiftName: [''],
      startTime: [''],
      endTime: [''],
    });
  }

  onSubmit() {
    if (this.shiftForm.valid) {
      let shift: any = {
        shiftName: this.shiftForm.get('shiftName').value,
        startTime: this.shiftForm.get('startTime').value,
        endTime: this.shiftForm.get('endTime').value,
      };
      this.fireBase.addNewShift(shift);
      this.shiftForm.reset();
    }
  }
  async saveShifts() {
    const shifts = {
      shiftName: this.shiftForm.value.shiftName,
      place: this.shiftForm.value.place,
      wage: this.shiftForm.value.wage,
      startTime: this.shiftForm.value.startTime,
      endTime: this.shiftForm.value.endTime,
      date: this.shiftForm.value.date,
    };
    (await this.AuthService.addNewShift(shifts)).subscribe(() => {
      console.log('shifts added');
      this.shiftForm.reset();
    });
  }
}
