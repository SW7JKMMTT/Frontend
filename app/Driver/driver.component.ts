import { Router }      from '@angular/router';
import { Component, Input }   from '@angular/core';
import { Observable }    from 'rxjs/Observable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

import { APIServices } from '../Services/api.services';
import { IconService } from '../Services/icon.service';
import { ListService } from '../Services/lists.service';
import { EmitterService } from '../Services/emitter.service';

@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'driver',
    providers: [ APIServices, IconService ],
    templateUrl: 'driver.html',
    styleUrls: [ 'driver.css' ]
})

export class DriverBlock {
    @Input() user : any;
    userIcon : string = "";
    isDriving : boolean = false;

    constructor(private APIServices: APIServices, private IconService: IconService, private ListService : ListService, private router: Router) {
        if(localStorage.getItem("token") === null || localStorage.getItem("user") === null)
            router.navigate(['login']);
    }

    ngOnInit(){
        this.updateUsers();
        
        IntervalObservable.create(5000).subscribe((x) => {
            this.updateUsers();
        });
    }

    updateUsers()
    {
        if(this.user.driver != null){
            let vehicles = this.ListService.routes;

            for(var i = 0; i < vehicles.length; i++){
                let vehicle = vehicles[i];

                if(vehicle.driver == this.user.driver.id)
                    this.isDriving = true;
            }
        }

        if(this.user.hasIcon)
            this.IconService.GetIcon(this.user.id);

    }

    ngOnChanges() {
        EmitterService.get("usericon" + this.user.id).subscribe((data : string) => {
            this.userIcon = data;
        })
    }
}