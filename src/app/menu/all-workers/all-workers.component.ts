import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-all-workers',
  templateUrl: './all-workers.component.html',
  styleUrls: ['./all-workers.component.css']
})
export class AllWorkersComponent {
  users=[];
  constructor(private authService: AuthService) {}

  async ngOnInit():Promise<void>{
    
    this.authService.getAllWorkers().then((result)=>{
return result;
    })
      }
}
