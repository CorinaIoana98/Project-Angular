import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: string;
  password: string;

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  // login() {
  //   this.authService.login(
  //     this.loginForm.value.email,
  //     this.loginForm.value.password).then(result=>{
  //     if(result)   this.route.navigate(['/home']);
  //     else 
  //     { alert("User not found"); }
  //   });
  //   console.log('user logged in');
  // }

  async login() {
    const result = await this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    );

    if (result) {
      const isAdmin = await this.authService.isUserAdmin();

      if (isAdmin) {
        this.route.navigate(['/home-admin']);
      } else {
        this.route.navigate(['/home']);
      }
    } else {
      alert('User not found');
    }
  }

}
