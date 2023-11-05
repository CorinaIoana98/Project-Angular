import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AddshiftComponent } from './menu/addshift/addshift.component';
import { MyshiftsComponent } from './menu/myshifts/myshifts.component';
import { EditprofileComponent } from './menu/editprofile/editprofile.component';
import { EditShiftsComponent } from './menu/edit-shifts/edit-shifts.component';
import { ToastrService } from 'ngx-toastr';
import { AllShiftsComponent } from './menu/all-shifts/all-shifts.component';
import { AllWorkersComponent } from './menu/all-workers/all-workers.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeAdminComponent,
    RegisterComponent,
    LoginComponent,
    AddshiftComponent,
    MyshiftsComponent,
    EditprofileComponent,
    EditShiftsComponent,
    AllShiftsComponent,
    AllWorkersComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ToastrModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
