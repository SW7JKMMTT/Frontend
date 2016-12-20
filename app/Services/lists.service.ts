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
        let users = [];
        let vehicles = [];

        this.APIServices.GetActiveRoutes().subscribe(data => {
            this.routes = data;
        });

        this.APIServices.GetAllUsers().subscribe(data => {
            this.users = data;
        });

        this.APIServices.GetAllVehicles().subscribe(data => {
            this.vehicles = data;
        });

        setTimeout(()=> {
            this.updateData();
        }, 10000);
    }
}