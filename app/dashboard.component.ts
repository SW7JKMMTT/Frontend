import { Router }       from '@angular/router';
import { Component }    from '@angular/core';
import { APIServices }  from './api.services';

@Component({
  selector: 'dashboard',
  providers: [APIServices],
  templateUrl: "html/dashboard.html",
})


export class DashboardComponent {
    constructor(private APIServices: APIServices, private router: Router) {
        if(localStorage.getItem("token") === null || localStorage.getItem("user") === null)
            router.navigate(['login']);
    }
}