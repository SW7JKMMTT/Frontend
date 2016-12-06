import { Router }      from '@angular/router';
import { Component }   from '@angular/core';
import { APIServices } from '../Services/api.services';
import { Observable }    from 'rxjs/Observable';

@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'vehicle-container',
    providers: [ APIServices ],
    templateUrl: 'vehicle.html',
    styleUrls: [ 'vehicle.css' ]
})

export class VehicleBlock {
    constructor(private APIServices: APIServices, private router: Router) {
        if(localStorage.getItem("token") === null || localStorage.getItem("user") === null)
            router.navigate(['login']);
    }

    private vehicles:any = new Observable(observer => {
        this.APIServices.GetAllVehicles().subscribe(
            vehicles => { 
                observer.next(vehicles.json()); 
            }
        );
    });
}