import { Router }      from '@angular/router';
import { Component }   from '@angular/core';
import { Observable }    from 'rxjs/Observable';
import { APIServices } from '../Services/api.services';
import { IconService } from '../Services/icon.service';
import { EmitterService } from '../Services/emitter.service';

@Component({
    moduleId: module.id.replace("/dist/", "/app/"),
    selector: 'profile-info',
    providers: [APIServices],
    templateUrl: 'ProfileInfo.html',
    styleUrls: [ 'ProfileInfo.css' ]
})

export class ProfileInfo {
    firstname : string = '';
    surname : string = '';
    position : string = '';
    profileImage : string = '';
    hasIcon : boolean = false;

    constructor(private APIServices: APIServices, private router: Router) {}

    ngOnInit()
    {
        this.APIServices.GetCurrentUser(localStorage.getItem("user")).subscribe(data => {
            this.firstname = data.givenname;
            this.surname = data.surname;
            this.hasIcon = data.hasIcon;

            if(data.permissions.length > 0)
                this.position = data.permissions[0].permission;

            if(this.hasIcon)
                this.APIServices.GetUserIcon(data.id).subscribe(
                    data => {
                        let imageData = data["_body"].replace(/(\r\n|\n|\r)/gm,"");

                        this.profileImage = imageData;
                    })
        }, error => {
            localStorage.clear();
            this.router.navigate(['login']);
        });
    }
}