import { NgModule }                             from '@angular/core';
import { BrowserModule }                        from '@angular/platform-browser';
import { MaterialModule }                       from '@angular/material';
import { RouterModule, Routes }                 from '@angular/router';
import { FormsModule, ReactiveFormsModule }     from '@angular/forms';

import { CandTLeafletComponent, CandTLeafletService } from 'angular2.leaflet.components';
import { ListService }                                from './Services/lists.service';
import { APIServices }                                from './Services/api.services';
import { MapService }                                 from './Services/map.services';


import { AppComponent }         from './app.component';
import { LoginComponent }       from './Login/login.component';
import { LogoutComponent }      from './Logout/logout.component';
import { DashboardComponent }   from './Dashboard/dashboard.component';
import { ProfileInfo }          from './ProfileInfo/ProfileInfo.component';
import { StaffBlock }           from './Staff/staff.component';
import { VehicleBlock }         from './Vehicle/vehicle.component';
import { DriverBlock }          from './Driver/driver.component';

import { MapComponent }         from './Map/Map.component';
import { RouteElement }         from './Map/Route.component';
import { PolylineElement }      from './Map/Polyline.component';

const appRoutes: Routes = [
                { path: '', component: LoginComponent },
                { path: 'login', component: LoginComponent },
                { path: 'logout', component: LogoutComponent },
                { path: 'dashboard', component: DashboardComponent }];


@NgModule({
    imports: [BrowserModule, MaterialModule.forRoot(), RouterModule.forRoot(appRoutes), FormsModule],
    declarations: [AppComponent, MapComponent, PolylineElement, RouteElement, LoginComponent, LogoutComponent, DashboardComponent, ProfileInfo, StaffBlock, VehicleBlock, DriverBlock ],
    providers: [ APIServices, ListService, MapService ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
