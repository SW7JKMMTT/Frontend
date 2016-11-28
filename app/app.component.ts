import {Component} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'nuts',
  templateUrl: "html/app.html"
})

export class LoginComponent  { 
    constructor(private http: Http) { }

    login(form: any){
        return this.getToken(form.username, form.password)
            .subscribe(
                data => {
                    data = data.json();
                    console.log(data)
                },
                error => {
                    console.log("Error" + error);
                }
            )

        // let url = "http://192.168.1.241:8080/services-1.0.0/auth";

        // let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        // let options = new RequestOptions({ headers: headers });

        // var username = form.username;
        // var password = form.password;


        // let parameters = "username=" + username + "&password=" + password;

        // console.log(this.http.post(url, parameters, options).map(res => res.json()));
    }

    getToken(username: string, password: string) {
        let url = "72e5497d.ngrok.io/services-1.0.0/auth";

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let parameters = JSON.stringify({
            "username": username,
            "password": password
        });

        return this.http.post(url, parameters, options);
    }
}
