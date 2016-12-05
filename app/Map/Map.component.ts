import { Component }     from '@angular/core';
import { APIServices }   from '../Services/api.services';
import { MapService }    from 'angular2.leaflet.components/services/map.service';


@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'map',
    providers: [ APIServices ],
    templateUrl: 'map.component.html',
    styleUrls: [ 'map.component.css' ]
})

export class MapComponent {
    route_array = [[52.6, -1.1],[52.605, -1.1], [52.606, -1.105], [52.697, -1.109]];

    constructor(private APIServices: APIServices, private mapService: MapService){
        APIServices.GetActiveRoutes().subscribe(
            data => {
                let routes = data.json();

                for (var i = 0; i < routes.length; i++) {
                    let route = routes[i];

                    console.log(route);

                    //this.route_handler(route);
                }
            },
            error => {
            }
        )
    }

    route_handler(route_data){
        let test = []
        this.APIServices.GetRouteWaypoints(route_data["id"]).subscribe(
            data => {
                let waypoints = data.json();

                for(var i = 0; i < waypoints.length; i++){
                    let waypoint = waypoints[i];

                    test.push([waypoint.latitude, waypoint.longitude])
                }

                this.route_array = test
            },
            error => {
            }
        )
    
    }
}
