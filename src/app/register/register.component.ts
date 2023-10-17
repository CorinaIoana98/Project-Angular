import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      fname: new FormControl(''),
      lname: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      isAdmin: new FormControl(false),
      shifts: new FormControl([]),
    });
  }

  async register() {
    const { fname, lname, email, password, isAdmin, shifts } =
      this.registerForm.value;
    this.authService
      .signup(email, password, fname, lname, isAdmin, shifts)
      .then(() => {
        console.log('users added');
        this.route.navigate(['/login']);
      })
      .catch((err) => {
        console.error('Error adding user:', err);
      });
  }
}
