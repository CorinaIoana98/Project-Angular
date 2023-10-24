import { AuthService } from './../services/auth-user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceFirestoreService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentUser: any;
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

  // navigateTo(item: string) {
  //   //Navigatia din menu
  //   console.log(`Navigating to ${item}`);
  // }

  logout() {
    this.AuthService.logout();
    this.router.navigate(['/login']);
  }

  showAddShift: boolean = false;

  toggleAddShift() {
    this.showAddShift = !this.showAddShift;
  }

  showEditProfile: boolean = false;
  toggleEditProfile() {
    this.showEditProfile = !this.showEditProfile;
  }
  showMyshifts: boolean = false;
  toggleMyshifts() {
    this.showMyshifts = !this.showMyshifts;
  }

  ngOnInit() {}
}
