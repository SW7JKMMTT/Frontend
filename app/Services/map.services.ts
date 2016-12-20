import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

declare var L: any;

@Injectable()
export class MapService {
    private map;

    constructor() { }

    public setMap(map) {
        this.map = map;
    }

    public getMap() {
        return this.map;
    }

}