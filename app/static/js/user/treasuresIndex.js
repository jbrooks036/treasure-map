/* global google:true */

(function(){
  'use strict';

  var map;

  $(document).ready(function(){
    initMap(0, 0, 2);
    var positions = getPositions();
    positions.forEach(function(pos){
      addMarker(pos.lat, pos.lng, pos.name);
    });
  });

  function addMarker(lat, lng, locName){
    var latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: locName, animation: google.maps.Animation.DROP});
    // , icon: '/img/bluepin.png'});
  }

  function getPositions(){
    var positions = $('table tbody tr').toArray().map(function(tr){
      var locName = $(tr).attr('data-locName'),
          lat  = $(tr).attr('data-lat'),
          lng  = $(tr).attr('data-lng'),
          pos  = {name:locName, lat:parseFloat(lat), lng:parseFloat(lng)};
      return pos;
    });

    console.log(positions);
    return positions;
  }

  function initMap(lat, lng, zoom){
    var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }
})();

