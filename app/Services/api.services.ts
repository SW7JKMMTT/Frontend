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
    image_headers: RequestOptions;

    constructor(private http: Http) {
        //let url = 'http://sw708e16.cs.aau.dk/services-1.0.0/';
        let url = 'http://172.25.11.114:8080/services-1.0.0/';


        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        
        let auth_headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Sleepy token='+localStorage.getItem('token') 
        });

        let image_headers = new Headers({
            'Content-Type': 'image/png',
            'Authorization': 'Sleepy token='+localStorage.getItem('token'),
            'X-Accept-Encoding': 'base64'
        });

        this.url = {
            'login': url+'auth',
            'user': url+'user',
            'route': url+'route',
            'vehicle': url+'vehicle'
        }

        this.options = new RequestOptions({ headers: headers });
        this.auth_token = new RequestOptions({ headers: auth_headers });
        this.image_headers = new RequestOptions({ headers: image_headers });
    }

    Login(username: string, password: string) {
        let parameters = JSON.stringify({
            'username': username,
            'password': password
        });

        return this.http.post(this.url['login'], parameters, this.options);
    }

    GetCurrentUser() {
        return this.http.get(this.url['user'], this.auth_token).map((res) => res.json());
    }
    
    GetAllUsers() {
        return this.http.get(this.url['user'], this.auth_token);
    }

    GetAllVehicles() {
        return this.http.get(this.url['vehicle'], this.auth_token);
    }

    GetWaypoints(RouteID, timestamp) {
        if(timestamp == null){
            return this.http.get(this.url['route'] + "/" + RouteID + "/waypoint", this.auth_token);
        }
        return this.http.get(this.url['route'] + "/" + RouteID + "/waypoint?byRoute_after=" + timestamp, this.auth_token);
    }

    GetUserIcon(userid) {
        return this.http.get(this.url['user'] + '/' + userid + '/icon', this.image_headers);
    }

    GetActiveRoutes() {
        //return this.http.get(this.url['route']+'?state=CREATED', this.auth_token);
        return this.http.get(this.url['route']+'?state=ACTIVE', this.auth_token);
        //return this.http.get(this.url['route'], this.auth_token);
    }

    GetRouteWaypoints(route_id) {
        return this.http.get(this.url['route']+'/' + route_id + '/waypoint', this.auth_token);
    }
}

