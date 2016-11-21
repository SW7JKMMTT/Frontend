$(document).ready(function() {
    var map = init();

    $(".vehicle").on("click", function() {
        lat = $(this).data("lat");
        lon = $(this).data("lon");

        if (lat === undefined || lon === undefined)
            return;

        map.panTo(new L.LatLng(lat, lon));
    });
});

function init()
{
    
    username = "deadpool"
    token = "549tnemr4bo7rsn93hu4hhrl";
    return "test";
}

// function init() {
//     lat = 0;
//     lon = 0;
//     vehicles = $('.vehicle').length;

//     $('.vehicle').each(function() {
//         lat += parseFloat($(this).data("lat"));
//         lon += parseFloat($(this).data("lon"));
//     });

//     map = L.map('truckster_map', {
//         center: [(lat / vehicles), (lon / vehicles)],
//         zoom: 9
//     });

//     L.tileLayer('http://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(map);

//     test = L.Routing.control({
//         waypoints: [
//             L.latLng(55.6760968, 12.568337100000008),
//             L.latLng(55.40375599999999, 10.402370000000019),
//             L.latLng(56.162939, 10.203921)
//         ],
//         plan: L.Routing.plan({
//             addWaypoints: true
//         }),
//         lineOptions: {
//             styles: [{
//                 color: 'black',
//                 opacity: 0.75,
//                 weight: 3
//             }]
//         },
//         fitSelectedRoutes: false
//     }).addTo(map);

//     test.addWaypoints([L.latLng(56.563173, 9.022822)]);
//     //test.setWaypoints(test.getWaypoints().concat([L.latLng(56.563173, 9.022822)]));

//     // L.Routing.control({
//     //     waypoints: [
//     //         L.latLng(56.563173, 9.022822),
//     //         L.latLng(57.048820, 9.921747),
//     //     ],
//     //     lineOptions: {
//     //         styles: [{
//     //             color: 'darkgrey',
//     //             opacity: 0.75,
//     //             weight: 3
//     //         }]
//     //     },
//     //     fitSelectedRoutes: false
//     // }).addTo(map);


//     console.log(L.Routing)
 
//     return map;

// }




// function right_menu_in(e) {
//     $('.right-inner').animate({
//         "left": "0%"
//     }, 150);

//     setTimeout(function() {
//         right_menu_out()
//     }, 1000);
// }

// function right_menu_out() {
//     $('.right-inner').animate({
//         "left": "100%"
//     }, 150);
// }