import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth-user.service';
@Component({
  selector: 'app-edit-user-admin',
  templateUrl: './edit-user-admin.component.html',
  styleUrls: ['./edit-user-admin.component.css']
})
export class EditUserAdminComponent {
  constructor(private authService: AuthService,
    public dialogRef: MatDialogRef<EditUserAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    // // Update the user data in Firebase
    // const userId = this.data.id;
    // this.authService.collection('users').doc(userId).update(this.data)
    //   .then(() => {
    //     console.log('User updated successfully!');
    //     this.dialogRef.close(this.data);
    //   })
    //   .catch(error => {
    //     console.error('Error updating user:', error);
    //   });
  } 
}
