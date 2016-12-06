    constructor(private APIServices : APIServices){
        // APIServices.GetActiveRoutes().subscribe(
        //     data => {
        //         let routes = data.json();

        //         for (var i = 0; i < routes.length; i++) {
        //             let route = routes[i];

        //             this.route_handler(route);
        //         }
        //     },
        //     error => {
        //     }
        // )

        this.route_handler({"id": 130});
        console.log(this.mapElement);
    }

    route_handler(route_data){
        this.APIServices.GetRouteWaypoints(route_data["id"]).subscribe(
            data => {
                let waypoints = data.json();

                for(var i = 0; i < waypoints.length; i++){
                    let waypoint = waypoints[i];


                    this.route_array.push([waypoint.latitude, waypoint.longitude])
                }

            },
            error => {
            }
        )
    
    }
