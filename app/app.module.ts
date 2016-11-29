import { NgModule }                          from '@angular/core';
import { BrowserModule }                     from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { HttpModule }                        from '@angular/http';
import { RouterModule, Routes }              from '@angular/router';

import { AppComponent }                      from './app.component';
import { LoginComponent }                    from './login.component';
import { DashboardComponent }                from './dashboard.component';
import { ProfileInfoComponent }              from './profile_info.component';

const appRoutes: Routes = [
                { path: 'dashboard', component: DashboardComponent },
                { path: 'login', component: LoginComponent },
                { path: '', component: LoginComponent}];

@NgModule({
    imports:        [ RouterModule.forRoot(appRoutes), BrowserModule, HttpModule, FormsModule ],
    declarations:   [ AppComponent, LoginComponent, DashboardComponent, ProfileInfoComponent ],
    bootstrap:      [ AppComponent ]
})

export class AppModule { }
