import { Router }                   from '@angular/router';
import { Component }                from '@angular/core';

@Component({
    selector: 'map',
    providers: [],
    templateUrl: "html/modules/_map.html",
})

export class MapComponent {
    constructor(private router: Router)
    {
        if(localStorage.getItem("token") === null || localStorage.getItem("user") === null)
            router.navigate(['login']);
    }

    ngOnInit()
    {
    }
}