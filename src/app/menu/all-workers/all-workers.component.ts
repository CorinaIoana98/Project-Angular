import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
// import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth-user.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-all-workers',
  templateUrl: './all-workers.component.html',
  styleUrls: ['./all-workers.component.css']
})
export class AllWorkersComponent {
  // users;
  // workers=[];
  users: MatTableDataSource<any>;

  constructor(private authService: AuthService, public dialog: MatDialog,) {}

 

  ngOnInit() {
    this.authService.getAllWorkers().then((data) => {
      this.users = new MatTableDataSource(data);
    });
  }

//   async ngOnInit():Promise<void>{
//     this.authService.getAllWorkers().then((result)=>{
// this.users = result
//     })
//       }

editProfile(user:any){

}
deleteAccount(user: any) {

}
}