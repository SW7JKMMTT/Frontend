import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { CandTLeafletComponent, CandTLeafletService } from 'angular2.leaflet.components';

import { FormsModule, ReactiveFormsModule }  from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login.component';
import { LogoutComponent } from './Logout/logout.component';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { ProfileInfo } from './ProfileInfo/ProfileInfo.component';
import { MapComponent } from './Map/Map.component';

const appRoutes: Routes = [
                { path: '', component: LoginComponent },
                { path: 'login', component: LoginComponent },
                { path: 'logout', component: LogoutComponent },
                { path: 'dashboard', component: DashboardComponent }];


@NgModule({
    imports: [BrowserModule, MaterialModule.forRoot(), RouterModule.forRoot(appRoutes), FormsModule],
    declarations: [AppComponent, MapComponent, CandTLeafletComponent, LoginComponent, LogoutComponent, DashboardComponent, ProfileInfo ],
    providers: [CandTLeafletService],
    bootstrap: [AppComponent]
})

export class AppModule { }
