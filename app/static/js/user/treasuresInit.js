/* jshint camelcase:false */
/* global google:true */

(function(){
  'use strict';

  $(document).ready(function(){
    $('form').submit(addTreasure);
  });

  function addTreasure(e){
    var lat = $('#lat').val();

    if(!lat){
      var name = $('#locName').val();
      geocode(name);
      e.preventDefault();
    }
  }

  function geocode(address){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address:address}, function(results, status){
      var lName = results[0].formatted_address,
          lat  = results[0].geometry.location.lat(),
          lng  = results[0].geometry.location.lng();

      $('#locName').val(lName);
      $('#lat').val(lat);
      $('#lng').val(lng);

      $('form').submit();
    });
  }
})();

