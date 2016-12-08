import { Component, Input, ElementRef, ViewChild, Optional }   from '@angular/core';
import { IntervalObservable }                           from 'rxjs/observable/IntervalObservable';
import { MapService }                                   from '../Services/map.services';
import { MapComponent }                                 from '../Map/Map.component'
import { APIServices }                                  from '../Services/api.services';
import { IconService }                                  from '../Services/icon.service';

declare var L: any;

@Component({
    moduleId: module.id.replace("/dist/", "/app/"),
    providers: [ APIServices, IconService ],
    selector: 'polyline',
    templateUrl: 'polyline.html'
})

export class PolylineElement {
    polyline : any = null;
    isStarted : boolean = false;
    car : any;
    incomplete : string = "#FF69B4";
    complete : string = "#FF0000";
    isIconSet : boolean = false;

    @Input() route : Array<Array<number>> = [];
    @Input() isComplete : boolean = false;
    @Input() vehicleID : number = 0;

    new_icon = L.icon({
        iconUrl: "assets/images/Truck_Yellow.png",
        iconSize: [42, 42],
        iconAnchor: [32, 44],
    });

    start_icon = L.icon({
        iconUrl: 'assets/images/start.png',
        iconSize: [16, 16],
    });

    end_icon = L.icon({
        iconUrl: 'assets/images/end.png',
        iconSize: [16, 16],
    });

    constructor(private IconService : IconService, private APIServices : APIServices, private MapService : MapService, @Optional() private MapComponent?: MapComponent){}

    ngOnInit(){
        if (this.MapComponent) {
            let map = this.MapService.getMap();

            this.polyline = new L.polyline(this.route, null);
            this.polyline.addTo(map);


            if(this.route.length > 0){
                let start = new L.marker([this.route[0][0], this.route[0][1]], {icon: this.start_icon});
                start.addTo(map);

                console.log("Icon used");
                this.car = new L.marker([this.route[0][0], this.route[0][1]], {icon: this.new_icon}).on('click', () => {
                    this.truck_click();
                });

                this.car.addTo(map);

                this.isStarted = true;
            }
        } else {
          console.warn("This polyline-element will not be rendered \n the expected parent node of polyline-element should be either leaf-element or leaflet-group");
        }
    }

    ngDoCheck(inputChanges){
        let same = true;
        let cur_cords = this.polyline.getLatLngs();
        
        if(this.route.length != cur_cords.length){
            let map = this.MapService.getMap();

            map.removeLayer(this.polyline);

            this.polyline = new L.polyline(this.route, {color: this.incomplete, weight: 7});
            this.polyline.addTo(map);

            if(this.route.length > 0){
                if(!this.isStarted){
                    let start = new L.marker([this.route[0][0], this.route[0][1]], {icon: this.start_icon});
                    start.addTo(map);
                }

                if(this.isStarted)
                    map.removeLayer(this.car);

                let lastIndex = this.route.length - 1;

                //map.setView([this.route[lastIndex][0], this.route[lastIndex][1]]);

                this.car = new L.marker([this.route[lastIndex][0], this.route[lastIndex][1]], {icon: this.new_icon}).on('click', () => {
                    this.truck_click();
                });

                this.car.addTo(map);
                this.isStarted = true;
            }
        }

        this.updateIcon();
        this.endRoute();
    }

    truck_click(){
        console.log(this.isComplete);
        console.log("TRUCK CLICK!");
    }

    updateIcon(){
        if(!this.isIconSet && this.vehicleID != 0){
            this.isIconSet = true;
            this.APIServices.GetVehicleIcon(this.vehicleID).subscribe(data => {
                console.log("Update should have happend?");
                this.new_icon = L.icon({
                    iconUrl: "data:image/png;base64,"+this.IconService.CleanBody(data),
                    iconSize: [42, 42],
                    iconAnchor: [32, 44],
                });
            }, error => {});
        }
    }

    endRoute(){
        if(this.isComplete){
            let map = this.MapService.getMap();
            let lastIndex = this.route.length - 1;

            map.removeLayer(this.car);
            map.removeLayer(this.polyline);

            this.polyline = new L.polyline(this.route, {color: this.complete, weight: 7});
            this.polyline.addTo(map);

            console.log("Icon used");
            this.car = new L.marker([this.route[lastIndex][0], this.route[lastIndex][1]], {icon: this.end_icon});
            this.car.addTo(map);
        }
    }
}

