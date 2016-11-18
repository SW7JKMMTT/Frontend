var map = L.map('truckster_map', {
    center: [51.505, -0.09],
    zoom: 9
});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

var greenIcon = L.icon({
    iconUrl: 'assets/images/Truck_Yellow.png',
    iconSize:     [64, 64]
});

L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map).on('click', right_menu_in);

function right_menu_in(e)
{
    $('.right-inner').animate({"left":"0%"}, 150);

    setTimeout(function(){
        right_menu_out()
    }, 1000);
}

function right_menu_out()
{
    $('.right-inner').animate({"left":"100%"}, 150);
}

