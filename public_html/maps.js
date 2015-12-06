var map;
var MarkerData = [{"Name": "Debrecen", "Latitude": 47.526174, "Longitude": 21.621898, "LocationType": "Station"},
    {"Name": "Penn Station", "Latitude": 40.75058, "Longitude": -73.99358, "LocationType": "Station"},
    {"Name": "Empire State Building", "Latitude": 40.748039, "Longitude": -73.985753, "LocationType": "Attraction"},
    {"Name": "Times Square", "Latitude": 40.756631, "Longitude": -73.988369, "LocationType": "Attraction"},
    {"Name": "Central Park", "Latitude": 40.770641, "Longitude": -73.974196, "LocationType": "Attraction"},
    {"Name": "Crowne Plaza Times Square", "Latitude": 40.760342, "Longitude": -73.98482, "LocationType": "Hotel"},
    {"Name": "Sheraton New York Hotel ", "Latitude": 40.739714, "Longitude": -73.989315, "LocationType": "Hotel"}]

var counter = 0;
var marker;

var date = new Date(2015, 11, 5, 22, 31, 0, 0);
var pirosDuration = 104;
var zoldDuration = 16;
var path = 'images/piros.png'

function initialize() {
    var myOptions = {
        center: new google.maps.LatLng(MarkerData[0].Latitude, MarkerData[0].Longitude),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map_canvas"),
            myOptions);

    for (i = 0; i < MarkerData.length; i++) {
        var image;
        if (MarkerData[i].LocationType == "Station") {
            image = 'images/train.png';
        } else if (MarkerData[i].LocationType == "Hotel") {
            image = 'images/lodging.png';
        } else if (MarkerData[i].LocationType == "Attraction") {
            image = 'images/monument.png';
        }
    }

    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    setInterval(function () {

        var location = new google.maps.LatLng(MarkerData[0].Latitude, MarkerData[0].Longitude);

        var icon = {
            url: path,
            size: new google.maps.Size(20, 20),
            scaledSize: new google.maps.Size(10, 10),
            anchor: new google.maps.Point(5, 5)
        };

        if (metersPerPixel(map.getZoom()) == 0) {
            marker.setMap(null);
            marker = null;
        } else {
            var size = 1 / metersPerPixel(map.getZoom() + 1) * 20;
        }
        icon.size = new google.maps.Size(size, size);
        icon.scaledSize = new google.maps.Size(size, size);
        icon.anchor = new google.maps.Point(size / 2, size / 2);

        //console.log('S' + size);

        if (marker == null) {
            marker = new google.maps.Marker({
                position: location,
                map: map,
                icon: icon,
                label: {
                    text: '1',
                    color: 'white'
                }
            });
        }

        var now = new Date();
        var dif = now.getTime() - date.getTime();

        //console.log(parseInt(dif/1000));

        var prefix = 'D';
        var osszes = (pirosDuration + zoldDuration);
        var duration = (dif / 1000) % osszes;
        duration = parseInt(duration);

        //console.log(duration);

        if (duration > pirosDuration) {
            duration = osszes - (duration % osszes);
            prefix = 'Z';
            path = 'images/zold.png';
        } else {
            duration = pirosDuration - (duration % osszes);
            prefix = 'P';
            path = 'images/piros.png';
        }

        console.log(prefix + duration);

        marker.set('label', duration + '');
        marker.set('icon', icon);
        console.log(icon);

    }, 1000);

    function attachMessage(marker, msg) {
        var infowindow = new google.maps.InfoWindow({
            content: msg,
            size: new google.maps.Size(120, 150)
        });
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });
    }

    function metersPerPixel(zoomLevel) {
        console.log(zoomLevel);
        if (zoomLevel < 15)
            return 0;
        return 1 / zoomLevel * 10;
    }
}