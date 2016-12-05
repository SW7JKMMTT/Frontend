import { Router }                   from '@angular/router';
import { Component }                from '@angular/core';
import { APIServices }              from '../Services/api.services';

@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'dashboard',
    providers: [APIServices],
    templateUrl: 'dashboard.component.html',
    styleUrls: [ 'dashboard.component.css' ]
})


export class DashboardComponent {
    constructor(private APIServices: APIServices, private router: Router)
    {
        if(localStorage.getItem("token") === null || localStorage.getItem("user") === null)
            router.navigate(['login']);
    }

    clicked(event: string)
    {
        console.log(event);
    }
}