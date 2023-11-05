import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-user.service';
import { UserServiceFirestoreService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-edit-shifts',
  templateUrl: './edit-shifts.component.html',
  styleUrls: ['./edit-shifts.component.css'],
})
export class EditShiftsComponent {
  editShiftForm: any;
  currentShift: any;
  currentShiftId: string;

  constructor(
    private route: ActivatedRoute,
    private firebase: UserServiceFirestoreService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
    this.route.params.subscribe(async (params) => {
      this.currentShiftId = params['id'];
      this.currentShift = await this.firebase.getShiftById(this.currentShiftId);
      console.log(this.currentShift);
      if (this.currentShift) {
        this.prefillShiftForm();
      }
    });
  }

  createForm() {
    this.editShiftForm = this.formBuilder.group({
      startTime: [''],
      endTime: [''],
      wage: [''],
      place: [''],
      date: [''],
    });
  }

  prefillShiftForm() {
    this.editShiftForm.controls['startTime'].setValue(
      this.currentShift.startTime
    );
    this.editShiftForm.controls['endTime'].setValue(this.currentShift.endTime);
    this.editShiftForm.controls['wage'].setValue(this.currentShift.wage);
    this.editShiftForm.controls['place'].setValue(this.currentShift.place);
    this.editShiftForm.controls['date'].setValue(
      new Date(this.currentShift.date)
    );
  }

  async onSubmit() {
    if (this.editShiftForm.valid) {
      let updatedShift: any = {
        startTime: this.editShiftForm.get('startTime').value,
        endTime: this.editShiftForm.get('endTime').value,
        wage: this.editShiftForm.get('wage').value,
        place: this.editShiftForm.get('place').value,
        date: this.editShiftForm.get('date').value,
      };

      await this.firebase.updateShift(this.currentShiftId, updatedShift);
    }
  }
}
