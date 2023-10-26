import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../services/auth-user.service';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  fname: string;
  lname: string;
  email: string;
  password: string;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private route: Router) {}

  //  ageRangeValidator(minAge: number, maxAge: number): Validators {
  //   return (control: AbstractControl): { [key: string]: boolean } | null => {
  //     const birthDate = control.value;

  //     if (birthDate) {
  //       const today = new Date();
  //       const age = today.getFullYear() - birthDate.getFullYear();

  //       if (age < minAge || age > maxAge) {
  //         return { ageRange: true };
  //       }
  //     }
  //     return null;
  //   };
  // }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      fname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('/^[a-zA-Zs]*$/'),
      ]),
      lname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('/^[a-zA-Zs]*$/'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      birthDate: new FormControl('', [Validators.required]),
      isAdmin: new FormControl(false),
      shifts: new FormControl(''),
    });
  }

  async register() {
    const {
      fname,
      lname,
      email,
      password,
      passwordConfirmation,
      isAdmin,
      shifts,
      birthDate,
    } = this.registerForm.value;
    this.authService
      .signup(
        email,
        password,
        passwordConfirmation,
        fname,
        lname,
        isAdmin,
        shifts,
        birthDate
      )
      .then(() => {
        console.log('users added from register');
        this.route.navigate(['/login']);
      })
      .catch((err) => {
        console.error('Error adding user:', err);
      });
  }
}
