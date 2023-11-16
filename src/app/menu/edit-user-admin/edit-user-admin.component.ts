import { Component, Inject,OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-user.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceFirestoreService } from 'src/app/services/firebase.service';
import { async } from '@angular/core/testing';
import { updateCurrentUser } from 'firebase/auth';
@Component({
  selector: 'app-edit-user-admin',
  templateUrl: './edit-user-admin.component.html',
  styleUrls: ['./edit-user-admin.component.css']
})
export class EditUserAdminComponent {
  editProfileForm: any;
  currentUserName: any;
  currentUser:any;
data: any;

  constructor(
    private route: ActivatedRoute,
    private firebase: UserServiceFirestoreService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
    this.route.params.subscribe(async (params) => {
      this.currentUserName = params['fname'];
      this.currentUser = await this.firebase.getShiftById(this.currentUserName);
      console.log(this.currentUser);
      if (this.currentUser) {
        this.prefillShiftForm();
      }
    });
  }
  prefillShiftForm() {
    this.editProfileForm.controls['fname'].setValue(this.currentUser.fname);
    this.editProfileForm.controls['lname'].setValue(this.currentUser.lname);

  }
  createForm() {
    this.editProfileForm = this.formBuilder.group({
      fname: [''],
      lname: ['']
    });
  }

  async onSubmit(){

    if ( this.editProfileForm.valid){
      let updatedUser:any= {
        fname:this.editProfileForm.get('fname').value,
        lname:this.editProfileForm.get('lname').value,

      };
      await this.firebase.updateShift(this.currentUser, updatedUser);

    }

  }

  onCancelClick(){}


}
