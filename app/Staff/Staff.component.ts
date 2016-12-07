import { Router }          from '@angular/router';
import { Component }       from '@angular/core';
import { APIServices }     from '../Services/api.services';
import { Observable }      from 'rxjs/Observable';

@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'staff-container',
    providers: [ APIServices ],
    templateUrl: 'staff.html',
    styleUrls: [ 'staff.css' ]
})

export class StaffBlock {
    constructor(private APIServices: APIServices, private router: Router) {
        if(localStorage.getItem("token") === null || localStorage.getItem("user") === null)
            router.navigate(['login']);
    }

    private users:any = new Observable(observer => {
        this.APIServices.GetAllUsers().subscribe(
            users => { 
                observer.next(users.json()); 
            }
        );
    });
}