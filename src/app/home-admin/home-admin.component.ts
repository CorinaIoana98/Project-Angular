import { AuthService } from './../services/auth-user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceFirestoreService } from '../services/firebase.service';
import { UserServiceService } from '../services/user-service.service';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  personWithMostShifts: any;
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

  shifts:any;
  showAllshifts: boolean = false;
  toggleAllShift(){
    // console.log('dadssfasf')
    this.showAllshifts = !this.showAllshifts;

    
  }

  showAllWorkers: boolean = false;
  toggleAllWorkers(){
    this.showAllWorkers = !this.showAllWorkers;
  }

  ngOnInit():void{
    this.AuthService.getAllShifts().then((users:any[])=>{
      let maxShiftCount = -1;
      let personWithMostShifts = [];
  
      users.forEach((user) => {
        // const data = user.data();
        // const id = user.id;
        // console.log(data, id)
        if (user.shifts && user.shifts.length >= maxShiftCount) {
          maxShiftCount = user.shifts.length;
          personWithMostShifts.push(user);
        }
        // console.log(personWithMostShifts)
        // personWithMostShifts.push(personWithMostShifts);
      });  
      
      this.personWithMostShifts = personWithMostShifts;
      console.log(this.personWithMostShifts)
    });
  }
  
}