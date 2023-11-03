import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-all-workers',
  templateUrl: './all-workers.component.html',
  styleUrls: ['./all-workers.component.css']
})
export class AllWorkersComponent {
  users;
  // workers=[];
  constructor(private authService: AuthService) {}

  async ngOnInit():Promise<void>{
    
    this.authService.getAllWorkers().then((result)=>{
// for(let user of result){
//   if(user.uid){
// for(let users of user.uid){
//   this.users.push(users);
//   this.users.push(user);
// }
//   }
// }
this.users = result
    })
      }
}
