/* global google:true */

(function(){
  'use strict';

  var map;

  $(document).ready(function(){
    var pos = getPosition();
    initMap(pos.lat, pos.lng, 11);
    addMarker(pos.lat, pos.lng, pos.name);
  });

  function addMarker(lat, lng, locName){
    var latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: locName, animation: google.maps.Animation.DROP});
  }

  function getPosition(){
    var $vacation = $('#vacation'),
        locName   = $vacation.attr('data-locName'),
        lat       = $vacation.attr('data-lat'),
        lng       = $vacation.attr('data-lng'),
        pos       = {name:locName, lat:parseFloat(lat), lng:parseFloat(lng)};

    return pos;
  }

  function initMap(lat, lng, zoom){
    var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }
})();

