import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addshift',
  templateUrl: './addshift.component.html',
  styleUrls: ['./addshift.component.css']
})
export class AddshiftComponent {
  shiftForm: FormGroup;

  constructor(private formBuilder:FormBuilder){
    this.shiftForm = this.formBuilder.group({
      shiftName: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.shiftForm.valid) {
//adaugare in firebase a shiftului
      console.log('Shift Data:', this.shiftForm.value);

      this.shiftForm.reset();
    }

}
}
