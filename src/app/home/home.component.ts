import { AuthService } from './../services/auth-user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  constructor( private router: Router, private AuthService: AuthService ){}

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

  showEditProfile: boolean=false;
  toggleEditProfile() {
    this.showEditProfile = !this.showEditProfile;
  }
  
}
