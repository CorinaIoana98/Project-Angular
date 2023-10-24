import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth-user.service';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { EditShiftsComponent } from './menu/edit-shifts/edit-shifts.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: AuthService },
  { path: 'home-admin', component: HomeAdminComponent },
  { path: 'home', component: HomeComponent },
  { path: 'edit-shifts', component: EditShiftsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
