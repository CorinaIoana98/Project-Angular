import { Component } from '@angular/core';
import { AuthService } from '../services/auth-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent OnInit {

  currentUser: any | null ;
  constructor(private AuthService :AuthService ,private route :Router) {}
  ngOnInit() : void{
    this.authService.getCurrentUser().subcribe((data)=>{
      this.currentUser =data;
    })
 
  } 
  logout (){
    this.authService.logout();
    console.log('user logged out ')
    this.route.navigate(['/login'])

  }
}
