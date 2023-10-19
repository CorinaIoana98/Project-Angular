import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent {
  profileForm:FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userId: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      //actualizarea in firebase
      console.log('Profile Data:', this.profileForm.value);
    }
  }
}
