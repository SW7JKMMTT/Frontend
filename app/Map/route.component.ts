import { Component, Input }   from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { APIServices }        from '../Services/api.services';


@Component({
    moduleId: module.id.replace("/dist/", "/"),
    providers: [ APIServices ],
    selector: 'route',
    templateUrl: 'route.html',
})

export class RouteElement {
    @Input() routeID: number = 0;
    private lastTimestamp : number = 0;
    private route = [];

    constructor(private APIServices: APIServices){}

    ngOnInit(){
        IntervalObservable.create(500).subscribe((x) => {
            this.updateRoute();
        });

    }

    updateRoute(){
        this.APIServices.GetWaypoints(this.routeID, this.lastTimestamp).subscribe(data => {
            let waypoints = data.json();

            for(var i = 0; i < waypoints.length; i++){
                let waypoint = waypoints[i];

                if(waypoint.timestamp > this.lastTimestamp)
                    this.lastTimestamp = waypoint.timestamp;

                this.route.push([waypoint.latitude, waypoint.longitude]);
            }
        });
    }
}