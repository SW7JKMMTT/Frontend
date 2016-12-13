import { Component, Input } from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { APIServices }      from '../Services/api.services';
import { ListService }      from '../Services/lists.service';
import { MapService }       from '../Services/map.services';

declare var L: any;

@Component({
    moduleId: module.id.replace("/dist/", "/app/"),
    selector: 'vehicle',
    providers: [ APIServices ],
    templateUrl: 'vehicle.html',
    styleUrls: [ 'vehicle.css' ]
})

export class VehicleComponent {
    @Input() vehicleData: any = [];
    isMoveing : string = "Parked";

    constructor(private APIServices : APIServices, private ListService : ListService, private MapService : MapService){}

    clicked(e){
        if(!e)
            return;

        this.ListService.routes.forEach((route, index) => {
            if(route["vehicle"] == this.vehicleData["id"]){
                this.APIServices.GetWaypoints(route["id"], 0).subscribe(data => {
                    let map = this.MapService.getMap();

                    let waypoints = [];
                    data.json().forEach((waypoint, index) => {
                        waypoints.push([waypoint["latitude"], waypoint["longitude"]]);
                    });

                    if(waypoints.length > 0 && map != null){
                        //let waypoint = waypoints[waypoints.length-1];
                        var routeBounds = new L.LatLngBounds(waypoints);

                        map.fitBounds(routeBounds);
                        //map.setView([waypoint[0], waypoint[1]]);
                    }
                });
            }
        });
    }

    ngDoCheck(){
        if(this.vehicleData["isActive"]){
            this.isMoveing = "Driving";
        }else{
            this.isMoveing = "Parked";
        }
    }
}