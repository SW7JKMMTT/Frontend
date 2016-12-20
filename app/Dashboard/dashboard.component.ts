import { Router }         from '@angular/router';
import { Component }      from '@angular/core';
import { APIServices }    from '../Services/api.services';

@Component({
    moduleId: module.id.replace("/dist/", "/app/"),
    selector: 'dashboard',
    providers: [APIServices],
    templateUrl: 'dashboard.html',
    styleUrls: [ 'dashboard.css' ]
})


export class DashboardComponent {
    private currentVis : string = "employees";
    constructor(private APIServices: APIServices, private router: Router){
        if(localStorage.getItem("token") === null || localStorage.getItem("user") === null)
            router.navigate(['login']);
    }

    clicked(event : string)
    {
        this.currentVis = event;
    }
}