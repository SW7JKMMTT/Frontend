import { Router }                         from '@angular/router';
import { Component, Input, OnChanges }    from '@angular/core';
import { APIServices }                    from './api.services';

@Component({
  templateUrl: "html/login.html",
  providers: [APIServices],
})

export class LoginComponent { 
    /*
    brug sessionStorage som sessions
    brug localStorage som cookies

    til log ud: localStorage.clear();
    */
    constructor(private APIServices: APIServices, private router: Router) {
        if(localStorage.getItem("token") !== null && localStorage.getItem("user") !== null)
            router.navigate(['dashboard']);
    }

    visibility = 'hidden';
    error = '';

    login(form: any){
        this.visibility = 'hidden';

        return this.APIServices.Login(form.username, form.password).subscribe(
            data => {
                data = data.json();

                console.log(data["token"]);
                console.log(data["id"]);

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
