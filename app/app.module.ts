import { NgModule }                          from '@angular/core';
import { BrowserModule }                     from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { HttpModule }                        from '@angular/http';
import { RouterModule, Routes }              from '@angular/router';

import { CandTLeafletComponent }             from 'angular2.leaflet.components';
import { CandTLeafletService }               from 'angular2.leaflet.components';


import { AppComponent }                      from './app.component';
import { LoginComponent }                    from './login.component';
import { DashboardComponent }                from './dashboard.component';
import { ProfileInfo }                       from './ProfileInfo/ProfileInfo.component';
import { VehicleContainerComponent }         from './vehicle.component';
import { StaffContainerComponent }           from './staff.component';
import { MapComponent }                      from './Map/Map.component';


const appRoutes: Routes = [
                { path: 'dashboard', component: DashboardComponent },
                { path: 'login', component: LoginComponent },
                { path: '', component: LoginComponent}];

@NgModule({
    imports:        [ RouterModule.forRoot(appRoutes), BrowserModule, HttpModule, FormsModule ],
    declarations:   [ AppComponent, LoginComponent, DashboardComponent, ProfileInfo, VehicleContainerComponent, StaffContainerComponent, MapComponent, CandTLeafletComponent ],
    providers:      [ CandTLeafletService ],
    bootstrap:      [ AppComponent ]

})

export class AppModule { }
