import { Component }       from '@angular/core';
import { ListService }     from '../Services/lists.service';
import { Observable }      from 'rxjs/Observable';

@Component({
    moduleId: module.id.replace("/dist/", "/app/"),
    selector: 'employee-container',
    templateUrl: 'Employees.html',
    styleUrls: [ 'Employees.css' ]
})

export class EmployeesBlock {
    private employees : Array<any> = [];
    private isEmpty : boolean = true;

    constructor(private ListService : ListService) {}

    private increment : number = 20;
    private numUsers : number = this.increment;

    ngOnInit(){
        this.updateUsers();
    }

    updateUsers(){
        if (this.ListService.users != this.employees)
            this.employees = this.ListService.users.slice(0, this.numUsers);

        this.isEmpty = this.ListService.users.length == 0;

        setTimeout(() => {
            this.updateUsers();
        }, 1000);
    }

    loadMore() {
        this.numUsers += this.increment;

        if (this.ListService.users != this.employees)
            this.employees = this.ListService.users.slice(0, this.numUsers);
    }
}