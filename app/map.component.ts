import { Router }                   from '@angular/router';
import { Component }                from '@angular/core';
import { APIServices }              from './api.services';

@Component({
  selector: 'map',
  providers: [APIServices],
  templateUrl: "html/modules/_map.html",
})

export class MapComponent {
    constructor(private APIServices: APIServices, private router: Router)
    {
        if(localStorage.getItem("token") === null || localStorage.getItem("user") === null)
            router.navigate(['login']);

        // var map = new L.Map('truckster_map', {
        //     center: new L.LatLng(40.731253, -73.996139),
        //     zoom: 12,
        // });
   }
}