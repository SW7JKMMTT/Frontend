import { Component, Input, Injector, Optional, ElementRef, ViewChild } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { APIServices }    from '../Services/api.services';
import { ListService }    from '../Services/lists.service';
import { MapService }     from '../Services/map.services';
import { HaversineService, GeoCoord } from "ng2-haversine";

var Lealflet = require('leaflet');
declare var L: any;

@Component({
    moduleId: module.id.replace("/dist/", "/app/"),
    selector: 'map',
    providers: [ APIServices ],
    templateUrl: 'map.html',
    styleUrls: [ 'map.css' ]
})

export class MapComponent {
    constructor(private APIServices : APIServices, private ListService : ListService, private MapService : MapService, private _haversineService: HaversineService){}

    @Input() lat: number = 57.012048;
    @Input() lon: number = 9.991264;
    @Input() zoom: number = 13;
    @Input() tiles: string = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    @ViewChild('truckster_map') mapElement: ElementRef;

    private routes : Array<string> = [];
    private shouldZoom : boolean = true;

    ngOnInit(){
        let map = L.map(this.mapElement.nativeElement, {
            zoomControl: false,
            center: L.latLng(this.lat, this.lon),
            zoom: this.zoom,
            minZoom: 4,
            maxZoom: 17,
            layers: [],
            closePopupOnClick: false
        }).on('moveend', (e: MouseEvent) => { 
            this.mapStopped();
        });

        this.MapService.setMap(map);

        L.tileLayer(this.tiles).addTo(map);

        this.updateBounds();
        this.updateRoutes(true);
    }

    updateBounds(){
        let points = [];

        this.APIServices.GetActiveRoutes().subscribe(data => {
            data.forEach((route, index) => {
                this.APIServices.GetWaypoints(route.id, 0).subscribe(data => {
                    data.forEach((waypoint, index) => {
                        points.push([waypoint.latitude, waypoint.longitude]);
                    })
                }, error => {})
            })
        }, error => {})

        setTimeout(()=> {
            if(points.length > 0) {
                let map = this.MapService.getMap();

                var myBounds = new L.LatLngBounds(points);

                map.fitBounds(myBounds);
            }
        }, 1000);
    }

    mapStopped(){
        this.updateRoutes(false);
    }

    updateRoutes(isService){
        let map = this.MapService.getMap();

        let center = map.getCenter();
        let bounds = map.getBounds();

        let map_center: GeoCoord = {
            latitude: center["lat"],
            longitude: center["lng"]
        };

        let bot_corner: GeoCoord = {
            latitude: bounds["_northEast"]["lat"],
            longitude: bounds["_northEast"]["lng"]
        };

        let kilometers = this._haversineService.getDistanceInKilometers(map_center, bot_corner);

        this.APIServices.GetRouteWithinArea(center["lat"], center["lng"],kilometers).subscribe(data => {
            let active_routes = [];

            data.forEach((element, index) => {
                active_routes.push(element["id"]);
            });

            this.routes = active_routes;

            if(isService){
                setTimeout(() => {
                    this.updateRoutes(isService);
                }, 7500);
            }
        })
    }
}
