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
        this.updateRoute();
    }

    updateRoute(){
        this.APIServices.GetWaypoints(this.routeID, this.lastTimestamp).subscribe(data => {
            if(this.route.length == 0){
                let datapoints = data.json();
            }else{
                let datapoints = data.json().reverse();
            }

            datapoints.forEach((waypoint, index) => {
                if(waypoint.timestamp > this.lastTimestamp)
                    this.lastTimestamp = waypoint.timestamp;

                this.route.push([waypoint.latitude, waypoint.longitude]);
            });

            setTimeout(() => {
               this.updateRoute();
            }, 5000);
        });
    }
}