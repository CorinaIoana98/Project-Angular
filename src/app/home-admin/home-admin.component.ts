import { AuthService } from './../services/auth-user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceFirestoreService } from '../services/firebase.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  constructor( private router: Router, private AuthService: AuthService ){
    this.AuthService.getCurrentUser().then(observable=>{
      observable.subscribe(data=>{
        console.log(data);
        this.currentUser=data;
      })
    })
  }
  currentUser:any;
  username: string = ''; 
  selectedOption: string | null = null;

  logout() {
    this.AuthService.logout();
    this.router.navigate(['/login']);
  }

  // onOptionSelected() {
  //   if (this.selectedOption === 'allShift') {
  //     this.shiftsButton();
  //   } else if (this.selectedOption === 'allWorkers') {
  //     this.workersButton();
  //   }
  // }
  // shiftsButton() {
  //   this.router.navigate(['/shiftsPage'])
  // }
  // workersButton() {
  //   this.router.navigate(['/allWorkers'])
  // }
  toggleAllShift(){}
  toggleaAllWorkers(){}
  
}