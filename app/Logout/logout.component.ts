import { Router }                         from '@angular/router';
import { Component, Input, OnChanges }    from '@angular/core';
import { APIServices }                    from '../Services/api.services';

@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'logout',
    providers: [ APIServices ],
    templateUrl: 'logout.html',
})

export class LogoutComponent { 
    constructor(private APIServices: APIServices, private router: Router) {
        localStorage.clear();
        router.navigate(['login']);
    }
}