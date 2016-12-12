import { Injectable } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { APIServices } from './api.services';
import { EmitterService } from './emitter.service';


@Injectable()
export class ListService {
    routes : Array<any> = [];
    users : Array<any> = [];
    vehicles : Array<any> = [];

    constructor(private APIServices : APIServices){
        this.updateData();
    }

    updateData(){
        this.APIServices.GetActiveRoutes().subscribe(data => {
            this.routes = data.json();
        });

        this.APIServices.GetAllUsers().subscribe(data => {
            this.users = data.json();
        });

        this.APIServices.GetAllVehicles().subscribe(data => {
            this.vehicles = data.json();
        });

        setTimeout(()=> {
            this.updateData();
        }, 10000);
    }
}