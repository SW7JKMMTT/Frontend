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
        let url = 'http://172.25.23.247:8080/services-1.0.0/';

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

        return this.http.post(this.url['login'], parameters, this.options).map((res) => res.json());
    }

    GetCurrentUser(userID) {
        return this.http.get(this.url['user']+"/"+userID, this.auth_token).map((res) => res.json());
    }
    
    GetAllUsers() {
        return this.http.get(this.url['user'], this.auth_token).map((res) => res.json());
    }

    GetUserIcon(userid) {
        return this.http.get(this.url['user']+'/'+userid+'/icon', this.image_headers).map((res) => res["_body"].replace(/(\r\n|\n|\r)/gm,""));
    }

    GetAllVehicles() {
        return this.http.get(this.url['vehicle'], this.auth_token).map((res) => res.json());
    }

    GetVehicleInfo(VehicleID) {
        return this.http.get(this.url['vehicle']+'/'+VehicleID, this.auth_token).map((res) => res.json());
    }

    GetVehicleIcon(VehicleID) {
        return this.http.get(this.url['vehicle']+'/'+VehicleID+'/icon', this.image_headers).map((res) => res["_body"].replace(/(\r\n|\n|\r)/gm,""));
    }

    GetWaypoints(RouteID, timestamp) {
        if(timestamp == 0)
            return this.http.get(this.url['route']+'/'+RouteID+'/waypoint', this.auth_token).map((res) => res.json());
        return this.http.get(this.url['route']+'/'+RouteID+'/waypoint?byRoute_after='+timestamp, this.auth_token).map((res) => res.json());
    }

    GetRouteWaypoints(RouteID) {
        return this.http.get(this.url['route']+'/'+RouteID+'/waypoint', this.auth_token).map((res) => res.json());
    }

    GetRouteData(RouteID){
        return this.http.get(this.url['route']+'/'+RouteID, this.auth_token).map((res) => res.json());
    }

    GetRouteWithinArea(lat, lng, radius){
        return this.http.get(this.url['route']+'?latitude='+lat+'&longitude='+lng+'&radius='+radius+'&state=ACTIVE', this.auth_token).map((res) => res.json());
    }

    GetActiveRoutes() {
        return this.http.get(this.url['route']+'?state=ACTIVE', this.auth_token).map((res) => res.json());
    }
}

