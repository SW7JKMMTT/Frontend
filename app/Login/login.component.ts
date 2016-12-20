import { Router }                         from '@angular/router';
import { Component, Input, OnChanges }    from '@angular/core';
import { APIServices }                    from '../Services/api.services';

@Component({
    moduleId: module.id.replace("/dist/", "/app/"),
    selector: 'login',
    providers: [ APIServices ],
    templateUrl: 'login.html',
    styleUrls: [ 'login.css' ]
})

export class LoginComponent { 
    visibility : string = 'hidden';
    error : string = '';

    constructor(private APIServices: APIServices, private router: Router) {
        if(localStorage.getItem("token") !== null && localStorage.getItem("user") !== null)
            router.navigate(['dashboard']);
    }


    login(form: any){
        this.visibility = 'hidden';

        return this.APIServices.Login(form.username, form.password).subscribe(
            data => {
                localStorage.setItem("token", data["token"]);
                localStorage.setItem("user", data["user"]);
                
                this.router.navigate(['dashboard']);
            },
            error => {
                error = error.json();

                this.error = error["message"];
                this.visibility = 'shown';
            }
        )
    }
}
