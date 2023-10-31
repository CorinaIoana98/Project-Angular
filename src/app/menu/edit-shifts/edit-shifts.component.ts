import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-edit-shifts',
  templateUrl: './edit-shifts.component.html',
  styleUrls: ['./edit-shifts.component.css'],
})
export class EditShiftsComponent {
  shifts: any;
}
