import { Component, Input }   from '@angular/core';
import { Observable }    from 'rxjs/Observable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

import { APIServices } from '../Services/api.services';
import { MapService }       from '../Services/map.services';
import { IconService } from '../Services/icon.service';
import { ListService } from '../Services/lists.service';
import { EmitterService } from '../Services/emitter.service';

declare var L: any;

@Component({
    moduleId: module.id.replace("/dist/", "/app/"),
    selector: 'driver',
    providers: [ APIServices, IconService ],
    templateUrl: 'driver.html',
    styleUrls: [ 'driver.css' ]
})

export class DriverBlock {
    @Input() user : any;
    userIcon : string = "";
    isDriving : boolean = false;

    constructor(private APIServices: APIServices, private IconService: IconService, private ListService : ListService, private MapService : MapService) {}

    ngOnInit(){
        this.updateUsers();
        
        IntervalObservable.create(5000).subscribe((x) => {
            this.updateUsers();
        });
    }

    updateUsers()
    {
        if(this.user.driver != null){
            let vehicles = this.ListService.routes;

            for(var i = 0; i < vehicles.length; i++){
                let vehicle = vehicles[i];

                if(vehicle.driver == this.user.driver.id)
                    this.isDriving = true;
            }
        }

        if(this.user.hasIcon)
            this.IconService.GetIcon(this.user.id);
    }

    ngOnChanges() {
        EmitterService.get("usericon" + this.user.id).subscribe((data : string) => {
            this.userIcon = data;
        })
    }

    clicked(){
        if(this.user["driver"] == null)
            return;

        this.ListService.routes.forEach((route, index) => {
            if(route["driver"] == this.user["driver"]["id"]){
                this.APIServices.GetWaypoints(route["id"], 0).subscribe(data => {
                    let map = this.MapService.getMap();

                    let waypoints = [];
                    data.json().forEach((waypoint, index) => {
                        waypoints.push([waypoint["latitude"], waypoint["longitude"]]);
                    });

                    if(waypoints.length > 0 && map != null){
                        var routeBounds = new L.LatLngBounds(waypoints);

                        map.fitBounds(routeBounds);
                    }
                });
            }
        });
    }
}