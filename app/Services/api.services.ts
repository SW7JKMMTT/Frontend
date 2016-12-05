import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

interface Dictionary {
    [ index: string ]: string
}

@Injectable()
export class APIServices {
    url: Dictionary;
    options: RequestOptions;
    auth_token: RequestOptions;

    constructor(private http: Http) {
        let url = "http://sw708e16.cs.aau.dk/services-1.0.0/";

        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        
        let auth_headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Sleepy token="+localStorage.getItem("token") 
        });

        this.url = {
            "login": url+"auth",
            "user": url+"user",
        }

        this.options = new RequestOptions({ headers: headers });
        this.auth_token = new RequestOptions({ headers: auth_headers });
    }

    Login(username: string, password: string) {
        let parameters = JSON.stringify({
            "username": username,
            "password": password
        });

        return this.http.post(this.url["login"], parameters, this.options);
    }

    GetCurrentUser() {
        return this.http.get(this.url["user"], this.auth_token);
    }

    GetUserIcon(userid) {
        return this.url["user"] + "/" + userid + "/icon";
    }
}

