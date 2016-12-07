import { Component, Input, Injector, Optional, ElementRef, ViewChild } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { APIServices }    from '../Services/api.services';
import { ListService }    from '../Services/lists.service';
import { MapService }     from '../Services/map.services';


var Lealflet = require('leaflet');
declare var L: any;

@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'map',
    providers: [ APIServices ],
    templateUrl: 'map.html',
    styleUrls: [ 'map.css' ]
})

export class MapComponent {
    constructor(private APIServices : APIServices, private ListService : ListService, private MapService : MapService){}

    @Input() lat: number = 57.012048;
    @Input() lon: number = 9.991264;
    @Input() zoom: number = 13;
    //@Input() tiles: string = "http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg";
    @Input() tiles: string = "http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}";
    @ViewChild('truckster_map') mapElement: ElementRef;

    ngOnInit(){
        let map = L.map(this.mapElement.nativeElement, {
            zoomControl: false,
            center: L.latLng(this.lat, this.lon),
            zoom: this.zoom,
            minZoom: 4,
            maxZoom: 19,
            layers: [],
            closePopupOnClick: false
        }).on('moveend', (e: MouseEvent) => { 
            this.test();
        });

        this.MapService.setMap(map);

        L.tileLayer(this.tiles).addTo(map);

        IntervalObservable.create(50).subscribe((x) => {
            this.updateRoutes();
        });
    }

    test(){
        //console.log(this.map.getCenter());
        //console.log(this.map.getBounds());
    }

    updateRoutes(){
        //console.log(this.ListService.routes);
    }
}
