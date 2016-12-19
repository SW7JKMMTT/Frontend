import { Component }       from '@angular/core';
import { Observable }      from 'rxjs/Observable';
import { APIServices }     from '../Services/api.services';
import { RightMenuHelper } from '../Services/rightMenuHelper.services';

@Component({
    moduleId: module.id.replace("/dist/", "/app/"),
    selector: 'right-menu',
    providers: [ APIServices ],
    templateUrl: 'RightMenu.html',
    styleUrls: [ 'RightMenu.css' ]
})

export class RightMenu {
    constructor(private APIServices: APIServices, private RightMenuHelper: RightMenuHelper) {}
}