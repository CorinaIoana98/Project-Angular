import { AuthService } from 'src/app/services/auth-user.service';
import { Auth } from 'firebase/auth';
// import { AuthService } from './../services/auth-user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceFirestoreService } from '../services/firebase.service';
import { UserServiceService } from '../services/user-service.service';
import { user } from '@angular/fire/auth';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  bestWorker: any;

  constructor( private router: Router, private AuthService: AuthService ){
    this.AuthService.getCurrentUser().then(observable=>{
      observable.subscribe(data=>{
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
if(this.showAllWorkers == true)  this.showAllWorkers = !this.showAllWorkers;
    this.showAllshifts = !this.showAllshifts;
  }

  showAllWorkers: boolean = false;
  toggleAllWorkers(){
    if(this.showAllshifts == true)  this.showAllshifts = !this.showAllshifts;
    this.showAllWorkers = !this.showAllWorkers;
  }

  showEditProfile:boolean=false;


 userName:any;
 shifs:any;
 lastShifts: MatTableDataSource<any>;

  ngOnInit():void{
    this.AuthService.getAllShifts().then((users:any[])=>{
      let maxShiftCount = -1;
      let personWithMostShifts = [];
      users.forEach((user) => {
        if (user.shifts && user.shifts.length >= maxShiftCount) {
          maxShiftCount = user.shifts.length;
          personWithMostShifts=[];
          personWithMostShifts.push(user);
        }
      });  
      this.bestWorker = personWithMostShifts;
    });

    this.AuthService.lastWeekShifts().then((data) => {
      this.lastShifts = new MatTableDataSource(data);
    });

  }
  
}