import { Router }      from '@angular/router';
import { Component }   from '@angular/core';
import { APIServices } from './api.services';

@Component({
  selector: 'vehicle-container',
  providers: [APIServices],
  templateUrl: "html/modules/_vehicle_container.html",
})


export class VehicleContainerComponent {
    constructor(private APIServices: APIServices, private router: Router) {
        
    }
}

