import { Component, Input, Injector, Optional } from '@angular/core';
import { MapService } from 'angular2.leaflet.components/services/map.service';


@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'line-element',
    templateUrl: 'line.html',
    styleUrls: ['line.css']
})

export class LineElement {
    constructor(private MapService : MapService){
        console.log(L);
    }
}