import { Router }      from '@angular/router';
import { Component }   from '@angular/core';
import { APIServices } from '../Services/api.services';

@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'profile-info',
    providers: [APIServices],
    templateUrl: 'ProfileInfo.component.html',
    styleUrls: [ 'ProfileInfo.component.css' ]
})

export class ProfileInfo {
    firstname = '';
    surname = '';
    position = '';
    profile_image = '';
    hasIcon = false;

    constructor(private APIServices: APIServices, private router: Router) {
        if(localStorage.getItem("token") === null || localStorage.getItem("user") === null)
            router.navigate(['login']);
    }

    ngOnInit()
    {
        this.APIServices.GetCurrentUser().subscribe(
            data => {
                let person = data.json();

                for (var i=0; i < person.length; i++) {
                    if(person[i].id == localStorage.getItem("user")) {
                        console.log(person[i].hasIcon);

                        this.firstname = person[i].givenname;
                        this.surname = person[i].surname;
                        this.hasIcon = person[i].hasIcon;

                        if(person[i].permissions.length > 0)
                            this.position = person[i].permissions[0].permission;

                        if(this.hasIcon)
                            this.profile_image = this.APIServices.GetUserIcon(person[i].id);
                    }
                }
            },
            error => {
                error = error.json();
                console.log(error);
            }
        )
    }
}