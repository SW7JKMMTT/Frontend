import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RightMenuHelper {
    private isVisible : boolean = false;
    private vehicleID : number = 0;

    constructor() { }

    public setVisibility(visible : boolean){
        this.isVisible = visible;
    }
    public getVisibility(){
        return this.isVisible;
    }
}