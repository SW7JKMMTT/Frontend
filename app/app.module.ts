import { NgModule }                             from '@angular/core';
import { BrowserModule }                        from '@angular/platform-browser';
import { MaterialModule }                       from '@angular/material';
import { RouterModule, Routes }                 from '@angular/router';
import { FormsModule }                          from '@angular/forms';

import { ListService }                          from './Services/lists.service';
import { APIServices }                          from './Services/api.services';
import { MapService }                           from './Services/map.services';
import { RightMenuHelper }                      from './Services/rightMenuHelper.services';
import { HaversineService }                     from "ng2-haversine";

import { AppComponent }                         from './app.component';
import { LoginComponent }                       from './Login/login.component';
import { LogoutComponent }                      from './Logout/logout.component';
import { DashboardComponent }                   from './Dashboard/dashboard.component';
import { ProfileInfo }                          from './ProfileInfo/ProfileInfo.component';
import { EmployeesBlock }                       from './Employees/Employees.component';
import { VehiclesBlock }                        from './Vehicles/vehicles.component';
import { VehicleComponent }                     from './Vehicle/vehicle.component';
import { EmployeeBlock }                        from './Employee/Employee.component';
import { MapComponent }                         from './Map/Map.component';
import { RouteElement }                         from './Route/Route.component';
import { PolylineElement }                      from './Polyline/Polyline.component';
import { RightMenu }                            from './RightMenu/RightMenu.component';

const appRoutes: Routes = [
                { path: '', component: LoginComponent },
                { path: 'login', component: LoginComponent },
                { path: 'logout', component: LogoutComponent },
                { path: 'dashboard', component: DashboardComponent }];

@NgModule({
    imports: [BrowserModule, MaterialModule.forRoot(), RouterModule.forRoot(appRoutes), FormsModule],
    declarations: [AppComponent, MapComponent, PolylineElement, RouteElement, LoginComponent, LogoutComponent, DashboardComponent, ProfileInfo, EmployeesBlock, VehiclesBlock, VehicleComponent, EmployeeBlock, RightMenu ],
    providers: [ APIServices, ListService, MapService, HaversineService, RightMenuHelper ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
