import { AuthService } from './../services/auth-user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceFirestoreService } from '../services/firebase.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentUser: any;
  shifts: MatTableDataSource<any>;
  constructor(
    private router: Router,
    private AuthService: AuthService,
    private user: UserServiceFirestoreService
  ) {
    this.AuthService.getCurrentUser().then((observable) => {
      observable.subscribe((data) => {
        console.log(data);
        this.currentUser = data;
      });
    });
  }


  logout() {
    this.AuthService.logout();
    this.router.navigate(['/login']);
  }

  showAddShift: boolean = false;

  toggleAddShift() {
    if(this.showEditProfile == true)  this.showEditProfile = !this.showEditProfile;
    if(this.showMyshifts == true)  this.showMyshifts = !this.showMyshifts;
    this.showAddShift = !this.showAddShift;
  }

  showEditProfile: boolean = false;
  toggleEditProfile() {
    if(this.showAddShift == true)  this.showAddShift = !this.showAddShift;
    if(this.showMyshifts == true)  this.showMyshifts = !this.showMyshifts;

    this.showEditProfile = !this.showEditProfile;
  }
  showMyshifts: boolean = false;
  
  toggleMyshifts() {
    if(this.showAddShift == true)  this.showAddShift = !this.showAddShift;
    if(this.showEditProfile == true)  this.showEditProfile = !this.showEditProfile;

    this.showMyshifts = !this.showMyshifts;
  }

  ngOnInit() {}
}
