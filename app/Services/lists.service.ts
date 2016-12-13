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
            this.routes = data.json();
        });

        this.APIServices.GetAllUsers().subscribe(data => {
            // data.json().forEach((user, init_index) => {
            //     if(user["driver"] != null){
            //         this.routes.forEach((route, index) => {
            //             if(route["driver"] == user["driver"]["id"]){
            //                 users.push(user);
            //             }else{
            //                 users.push(user);
            //             }
            //         });
            //     }
            // });

            // users.sort(this.orderUsers);
            // this.users = users;

            this.users = data.json();
        });

        this.APIServices.GetAllVehicles().subscribe(data => {
            // data.json().forEach((vehicle, init_index) => {
            //     this.routes.forEach((route, index) => {
            //         if(vehicle["id"] == route["vehicle"]){
            //             vehicles.push(vehicle);
            //         }else{
            //             vehicles.push(vehicle);
            //         }
            //     });
            // });
            
            //vehicles.sort(this.orderVehicles);
            //this.vehicles = vehicles;

            this.vehicles = data.json();
        });

        setTimeout(()=> {
            this.updateData();
        }, 10000);
    }


    private orderUsers(a, b) {
        if (a["driver"] != null && a["id"] != b["id"])
            return -1;
        if (b["driver"] != null && a["id"] != b["id"])
            return 1;
        return 0;
    }

    private orderVehicles(a, b) {
        if (a["isActive"] && a["isActive"] != b["isActive"])
            return -1;
        if (b["isActive"] && a["isActive"] != b["isActive"])
            return 1;
        return 0;
    }
}