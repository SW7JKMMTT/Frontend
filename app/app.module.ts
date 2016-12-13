import { NgModule }                             from '@angular/core';
import { BrowserModule }                        from '@angular/platform-browser';
import { MaterialModule }                       from '@angular/material';
import { RouterModule, Routes }                 from '@angular/router';
import { FormsModule }                          from '@angular/forms';

import { ListService }                          from './Services/lists.service';
import { APIServices }                          from './Services/api.services';
import { MapService }                           from './Services/map.services';
import { HaversineService }                     from "ng2-haversine";

import { AppComponent }                         from './app.component';
import { LoginComponent }                       from './Login/login.component';
import { LogoutComponent }                      from './Logout/logout.component';
import { DashboardComponent }                   from './Dashboard/dashboard.component';
import { ProfileInfo }                          from './ProfileInfo/ProfileInfo.component';
import { StaffBlock }                           from './Staff/staff.component';
import { VehiclesBlock }                        from './Vehicles/vehicles.component';
import { VehicleComponent }                     from './Vehicle/vehicle.component';
import { DriverBlock }                          from './Driver/driver.component';
import { MapComponent }                         from './Map/Map.component';
import { RouteElement }                         from './Route/Route.component';
import { PolylineElement }                      from './Polyline/Polyline.component';

const appRoutes: Routes = [
                { path: '', component: LoginComponent },
                { path: 'login', component: LoginComponent },
                { path: 'logout', component: LogoutComponent },
                { path: 'dashboard', component: DashboardComponent }];

@NgModule({
    imports: [BrowserModule, MaterialModule.forRoot(), RouterModule.forRoot(appRoutes), FormsModule],
    declarations: [AppComponent, MapComponent, PolylineElement, RouteElement, LoginComponent, LogoutComponent, DashboardComponent, ProfileInfo, StaffBlock, VehiclesBlock, VehicleComponent, DriverBlock ],
    providers: [ APIServices, ListService, MapService, HaversineService ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
