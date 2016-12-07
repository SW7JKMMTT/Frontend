import { Router }      from '@angular/router';
import { Component }   from '@angular/core';
import { Observable }    from 'rxjs/Observable';
import { APIServices } from '../Services/api.services';
import { IconService } from '../Services/icon.service';
import { EmitterService } from '../Services/emitter.service';

@Component({
    moduleId: module.id.replace("/dist/", "/"),
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

    constructor(private APIServices: APIServices, private router: Router) {
        if(localStorage.getItem("token") === null || localStorage.getItem("user") === null)
            router.navigate(['login']);
    }

    ngOnInit()
    {
        this.APIServices.GetCurrentUser().subscribe(
            data => {
                for (var i=0; i < data.length; i++) {
                    if(data[i].id == localStorage.getItem("user")) {
                        this.firstname = data[i].givenname;
                        this.surname = data[i].surname;
                        this.hasIcon = data[i].hasIcon;

                        if(data[i].permissions.length > 0)
                            this.position = data[i].permissions[0].permission;

                        if(this.hasIcon)
                            this.APIServices.GetUserIcon(data[i].id).subscribe(
                                data => {
                                    let imageData = data["_body"].replace(/(\r\n|\n|\r)/gm,"");

                                    this.profileImage = imageData;
                                })
                    }
                }
            }
        )
    }
}