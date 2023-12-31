import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
// import { Shift } from 'src/app/shift';
import { UserServiceFirestoreService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-addshift',
  templateUrl: './addshift.component.html',
  styleUrls: ['./addshift.component.css'],
})
export class AddshiftComponent {
  shiftForm: any;
  AuthService: any;
  router: any;
  // ngOnInit() {
  //   this.shiftForm = new FormGroup({
  //     shiftName: new FormControl(new Date().getTime()),
  //   });
  // }

  constructor(
    private formBuilder: FormBuilder,
    private fireBase: UserServiceFirestoreService
  ) {
    this.shiftForm = this.formBuilder.group({
      shiftName: [new Date().getTime()],
      startTime: [''],
      endTime: [''],
      wage: [''],
      place: [''],
      date: [''],
    });
  }

  onSubmit() {
    if (this.shiftForm.valid) {
      let shift: any = {
        shiftName: this.shiftForm.get('shiftName').value,
        startTime: this.shiftForm.get('startTime').value,
        endTime: this.shiftForm.get('endTime').value,
        wage: this.shiftForm.get('wage').value,
        place: this.shiftForm.get('place').value,
        date: new Date(this.shiftForm.get('date').value).toLocaleString(
          'en-US'
        ),
      };
      this.fireBase.addNewShift(shift);
      // this.router.navigate(['/home']);
   //   this.shiftForm.reset();
      window.location.reload();
    }
  }
  async saveShifts() {
    const shifts = {
      shiftName: this.shiftForm.value.shiftName,
      startTime: this.shiftForm.value.startTime,
      endTime: this.shiftForm.value.endTime,
      wage: this.shiftForm.value.wage,
      place: this.shiftForm.value.place,
      date: this.shiftForm.value.date,
    };
    (await this.AuthService.addNewShift(shifts)).subscribe(() => {
      console.log('shifts added');
      this.shiftForm.reset();
    });
  }
}
