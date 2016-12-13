import { Component }     from '@angular/core';
import { Observable }    from 'rxjs/Observable';
import { APIServices }   from '../Services/api.services';
import { ListService }   from '../Services/lists.service';

@Component({
    moduleId: module.id.replace("/dist/", "/app/"),
    selector: 'vehicle-container',
    providers: [ APIServices ],
    templateUrl: 'vehicles.html',
    styleUrls: [ 'vehicles.css' ]
})

export class VehiclesBlock {
    private vehicles : Array<any> = [];
    private isEmpty : boolean = true;

    constructor(private APIServices: APIServices, private ListService : ListService) {}

    ngOnInit(){
        this.updateVehicles();
    }

    updateVehicles(){
        if (this.ListService.vehicles != this.vehicles)
            this.vehicles = this.ListService.vehicles;

        this.isEmpty = this.ListService.vehicles.length == 0;

        setTimeout(() => {
            this.updateVehicles();
        }, 5000);
    }
}