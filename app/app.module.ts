import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule }   from '@angular/http';

import { LoginComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule ],
  declarations: [ LoginComponent ],
  bootstrap:    [ LoginComponent ]
})
export class AppModule { }
