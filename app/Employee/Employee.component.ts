import { Component, Input }    from '@angular/core';
import { Observable }          from 'rxjs/Observable';
import { IntervalObservable }  from 'rxjs/observable/IntervalObservable';

import { APIServices }         from '../Services/api.services';
import { MapService }          from '../Services/map.services';
import { ListService }         from '../Services/lists.service';

declare var L: any;

@Component({
    moduleId: module.id.replace('/dist/', '/app/'),
    selector: 'employee',
    providers: [ APIServices ],
    templateUrl: 'Employee.html',
    styleUrls: [ 'Employee.css' ]
})

export class EmployeeBlock {
    @Input() employee : any;
    userIcon : string = '';
    isDriving : boolean = false;

    constructor(private APIServices: APIServices, private ListService : ListService, private MapService : MapService) {}

    ngOnInit(){
        this.updateUsers();
        
        IntervalObservable.create(5000).subscribe((x) => {
            this.updateUsers();
        });
    }

    updateUsers()
    {
        if(this.employee.driver != null){
            let vehicles = this.ListService.routes;

            for(var i = 0; i < vehicles.length; i++){
                let vehicle = vehicles[i];

                if(vehicle.driver == this.employee.driver.id)
                    this.isDriving = true;
            }
        }

        if(this.employee.hasIcon)
            this.APIServices.GetUserIcon(this.employee.id).subscribe(data => {
                this.employeeIcon = 'url(data:image/png;base64,'+data+')';
            })
    }

    clicked(){
        if(this.employee['driver'] == null)
            return;

        this.ListService.routes.forEach((route, index) => {
            if(route['driver'] == this.employee['driver']['id']){
                this.APIServices.GetWaypoints(route['id'], 0).subscribe(data => {
                    let map = this.MapService.getMap();

                    let waypoints = [];
                    data.forEach((waypoint, index) => {
                        waypoints.push([waypoint['latitude'], waypoint['longitude']]);
                    });

                    if(waypoints.length > 0 && map != null){
                        var routeBounds = new L.LatLngBounds(waypoints);

                        map.fitBounds(routeBounds);
                    }
                });
            }
        });
    }
}