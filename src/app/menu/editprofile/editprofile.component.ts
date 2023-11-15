import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { getAuth } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth-user.service';
import { UserServiceFirestoreService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
})
export class EditprofileComponent {
  profileForm: FormGroup;
  currentUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private firebase: UserServiceFirestoreService,
    private authService: AuthService
  ) {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    this.authService.getCurrentUser().then((observable) => {
      observable.subscribe((data) => {
        this.currentUser = data;
        if (this.currentUser) {
          this.profileForm.controls['firstName'].setValue(
            this.currentUser.fname
          );
          this.profileForm.controls['lastName'].setValue(
            this.currentUser.lname
          );
        }
      });
    });
  }

  async onSubmit() {
    if (this.profileForm.valid) {
      console.log('Profile Data:', this.profileForm.value);
      const updatedUserProfile = {
        firstName: this.profileForm.controls['firstName'].value,
        lastName: this.profileForm.controls['lastName'].value,
      };

      await this.firebase.updateUser(updatedUserProfile);
    }
  }
}
