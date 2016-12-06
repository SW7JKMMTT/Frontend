import { Component }     from '@angular/core';
import { APIServices }   from '../Services/api.services';

import { CandTLeafletService } from 'angular2.leaflet.components';

@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'map',
    providers: [ APIServices ],
    templateUrl: 'map.component.html',
    styleUrls: [ 'map.component.css' ]
})

export class MapComponent {
    route_array = [[3.3, -1.1],[2.2, -1.1]];

    constructor(private APIServices: APIServices, private candTLeafletService: CandTLeafletService){
        // APIServices.GetActiveRoutes().subscribe(
        //     data => {
        //         let routes = data.json();

        //         for (var i = 0; i < routes.length; i++) {
        //             let route = routes[i];

        //             this.route_handler(route);
        //         }
        //     },
        //     error => {
        //     }
        // )

        this.route_handler({"id": 130});

        console.log(this.candTLeafletService);

    }

    route_handler(route_data){
        this.APIServices.GetRouteWaypoints(route_data["id"]).subscribe(
            data => {
                let waypoints = data.json();

                for(var i = 0; i < waypoints.length; i++){
                    let waypoint = waypoints[i];


                    this.route_array.push([waypoint.latitude, waypoint.longitude])
                }

            },
            error => {
            }
        )
    
    }
}
