import { Component } from '@angular/core';

@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'map',
    templateUrl: 'map.component.html',
    styleUrls: [ 'map.component.css' ]
})

export class MapComponent { }
