import { Component }       from '@angular/core';
import { APIServices }     from '../Services/api.services';
import { ListService }     from '../Services/lists.service';
import { Observable }      from 'rxjs/Observable';

@Component({
    moduleId: module.id.replace("/dist/", "/app/"),
    selector: 'staff-container',
    providers: [ APIServices ],
    templateUrl: 'staff.html',
    styleUrls: [ 'staff.css' ]
})

export class StaffBlock {
    private staff : Array<any> = [];
    private isEmpty : boolean = true;

    constructor(private APIServices: APIServices, private ListService : ListService) {}

    ngOnInit(){
        this.updateUsers();
    }

    updateUsers(){
        if (this.ListService.users != this.staff)
            this.staff = this.ListService.users;

        this.isEmpty = this.ListService.users.length == 0;

        setTimeout(() => {
            this.updateUsers();
        }, 1000);
    }
}