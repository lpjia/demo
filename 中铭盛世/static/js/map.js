if ($("#google-map").length) {
    function initialize() {
        var mapOptions = {
            zoom: 17.01,
            scrollwheel: false,
            styles: [{
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#d3d3d3"
                }, {
                    "lightness": 17
                }]
            }, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#e5e5e5"
                }, {
                    "lightness": 20
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 17
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 29
                }, {
                    "weight": 0.2
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 18
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 18
                }]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f3f3f3"
                }, {
                    "lightness": 21
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#d3d3d3"
                }, {
                    "lightness": 21
                }]
            }, {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#f8f8f8"
                }, {
                    "lightness": 25
                }]
            }, {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "saturation": 36
                }, {
                    "color": "#222222"
                }, {
                    "lightness": 30
                }]
            }, {
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f5f5"
                }, {
                    "lightness": 19
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#fefefe"
                }, {
                    "lightness": 10
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#fefefe"
                }, {
                    "lightness": 17
                }, {
                    "weight": 1.2
                }]
            }],

            /* --Add your Location here-- */
            center: new google.maps.LatLng(-33.8826177, 151.2287826)
        };
        var map = new google.maps.Map(document.getElementById('google-map'),
            mapOptions);
        var svg = [
            '<svg class="map-pin" xmlns="http://www.w3.org/2000/svg" width="50" height="65" viewBox="0 0 50 65">',
            '<path fill="#FFBF00" d="M25 1C11.8 1 1 11.8 1 25c0 10.6 6.8 19.5 16.3 22.7L25 64l8.8-16.7C42.7 43.8 49 35.1 49 25 49 11.8 38.3 1 25 1zm0 35c-6.1 0-11-4.9-11-11s4.9-11 11-11 11 4.9 11 11-4.9 11-11 11z"/>',
            '</svg>'
        ].join('\n');
        var marker = new google.maps.Marker({
            position: map.getCenter(),
            /* Map Marker if you want to add custom icon */
            icon: { url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
            },
            map: map
        });

    }
    google.maps.event.addDomListener(window, 'load', initialize);
}