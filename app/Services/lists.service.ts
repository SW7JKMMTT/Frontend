import { Injectable } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { APIServices } from './api.services';
import { EmitterService } from './emitter.service';


@Injectable()
export class ListService {
    routes : Array<any> = [];

    constructor(private APIServices : APIServices){
        this.updateRoutes();

        IntervalObservable.create(10000).subscribe((x) => {
            this.updateRoutes();
        });
    }

    updateRoutes(){
        this.APIServices.GetActiveRoutes().subscribe(data => {
            this.routes = data.json();
        });
    }
}