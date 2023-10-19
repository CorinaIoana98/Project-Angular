import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Shift } from 'src/app/shift';
import { UserServiceFirestoreService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-addshift',
  templateUrl: './addshift.component.html',
  styleUrls: ['./addshift.component.css']
})
export class AddshiftComponent {
  shiftForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private fireBase: UserServiceFirestoreService){
    this.shiftForm = this.formBuilder.group({
      shiftName: ['' ],
      startTime: [''],
      endTime: [''],
    });
  }

  onSubmit() {
    if (this.shiftForm.valid) {
     let shift:Shift={shiftName:this.shiftForm.get('shiftName').value,startTime:this.shiftForm.get('startTime').value,endTime:this.shiftForm.get('endTime').value};
      this.fireBase.addNewShift(shift);
      this.shiftForm.reset();
    }

}
}
