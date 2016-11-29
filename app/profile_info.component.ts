import { Router }      from '@angular/router';
import { Component }   from '@angular/core';
import { APIServices } from './api.services';

@Component({
  selector: 'profile-info',
  providers: [APIServices],
  templateUrl: "html/modules/_profile_info.html",
})

export class ProfileInfoComponent {
    constructor(private APIServices: APIServices, private router: Router) {
        if(localStorage.getItem("token") === null || localStorage.getItem("user") === null){
            router.navigate(['login']);
        }

        APIServices.GetCurrentUser().subscribe(
            data => {
                data = data.json();
                console.log(data);
            },
            error => {
                error = error.json();
                console.log(error);
            }
        )
    }
}