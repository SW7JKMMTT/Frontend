import { Router }      from '@angular/router';
import { Component }   from '@angular/core';
import { APIServices } from '../api.services';

@Component({
    moduleId: module.id.replace("/build/", "/app/"),
    selector: 'profile-info',
    providers: [APIServices],
    templateUrl: 'ProfileInfo.html',
    styleUrls: [ 'ProfileInfo.css' ]
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

        APIServices.GetCurrentUser().subscribe(
            data => {
                let data2 = data.json();

                for (var i=0; i < data2.length; i++) {
                    if(data2[i].id == localStorage.getItem("user")) {
                        this.firstname = data2[i].givenname;
                        this.surname = data2[i].surname;
                        this.hasIcon = data2[i].hasIcon;

                        if(data2[i].permissions.length > 0)
                            this.position = data2[i].permissions[0].permission;

                        if(this.hasIcon)
                            this.profile_image = 'assets/images/profile.jpg';

                        console.log(data2[i]);
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