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
    @Input() tiles: string = "https://cartodb-basemaps-b.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png";
    //@Input() tiles: string = "http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg";
    //@Input() tiles: string = "http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}";
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
        }).on('movestart', (e: MouseEvent) => { 
            this.mapMoved();
        }).on('moveend', (e: MouseEvent) => { 
            this.mapStopped();
        });

        this.MapService.setMap(map);

        L.tileLayer(this.tiles).addTo(map);

        //this.updateBounds();
        //this.updateRoutes();
    }

    updateBounds(){
        let points = [];

        this.APIServices.GetActiveRoutes().subscribe(data => {
            data.json().forEach((route, index) => {
                this.APIServices.GetWaypoints(route.id, 0).subscribe(data => {
                    data.json().forEach((waypoint, index) => {
                        points.push([waypoint.latitude, waypoint.longitude]);
                    })
                })
            })
        })

        setTimeout(()=> {
            let map = this.MapService.getMap();

            var myBounds = new L.LatLngBounds(points);

            map.fitBounds(myBounds);
        }, 1000);


        if(this.shouldZoom){
            setTimeout(() => {
                this.updateBounds();
            }, 7500)
        }
    }

    mapStopped(){
        let map = this.MapService.getMap();
    }

    mapMoved(){
        //console.log(this.map.getCenter());
        //console.log(this.map.getBounds());
        this.shouldZoom = false;
    }

    updateRoutes(){
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

            data.json().forEach((element, index) => {
                active_routes.push(element["id"]);
            });

            this.routes = active_routes;

            setTimeout(() => {
                this.updateRoutes();
            }, 7500);
        })
    }
}
