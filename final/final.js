/* Leaflet Configuration*/

var map = L.map('map', {
  center: [39.996643, -75.163282],
  zoom: 12
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var pointToLayer = function(feature,latlng){
  return L.circleMarker(latlng,geojsonMarkerOptions1);
};

var filter0 = function(feature){
  if (feature.properties.B===""){
    return false;}else{return true;}};

var filter1 = function(feature){
      if (feature.properties.G==="true") {
        return true;}else {return false;}};

var filter2 = function(feature){
      if (feature.properties.I==="true") {
        return true;} else {return false;}};

var filter3 = function(feature){
      if (feature.properties.H==="true") {
        return true;} else {return false;}};

    var colorMarker = function(feature){
      switch(feature) {
        case'Center City':return 'red';
        case'Bridesburg Kensington Port Richmond':return 'green';
        case'Germantown Chestnut Hill':return 'black';
        case'Lower Northeast':return 'orange';
        case'North':return 'purple';
        case'Northeast':return 'orange';
        case'Northwest':return 'black';
        case'Olney Oak Lane':return 'gray';
        case'Roxborough Manayunk':return 'pink';
        case'South':return 'blue';
        case'Southwest':return 'yellow';
        case'West':return 'maroon';
      }
    };

    var geojsonMarkerOptions1 = function(feature){
      return{
        radius: 8,
        fillColor: colorMarker(feature.properties.B),
        color: "#fff",
        weight:5,
        opacity: 0.6,
        fillOpacity: 0.6
      };
    };


    var myFilter=filter0;



$(document).ready(function(){
  var downloadData = $.ajax("https://raw.githubusercontent.com/tammydou/OST4GIS-Midterm/master/midterm/convertcsv.geojson");
  downloadData.done(function(data){
    var parseData = JSON.parse(data);


    $("#cbox-input1").prop("disabled",false);
    $("#cbox-input2").prop("disabled",false);
    $("#cbox-input3").prop("disabled",false);

    $(".btn").click(function(e){
      map.removeLayer(featureGroup);
      if ($('#cbox-input1')[0].checked) {
        featureGroup = L.geoJson(parseData, {
          pointToLayer:pointToLayer,
          filter:filter3,
          style:geojsonMarkerOptions1,
        }).addTo(map);}
      if ($('#cbox-input2')[0].checked) {
        featureGroup = L.geoJson(parseData, {
          pointToLayer:pointToLayer,
          filter:filter2,
          style:geojsonMarkerOptions1,
        }).addTo(map);}
      if ($('#cbox-input3')[0].checked) {featureGroup = L.geoJson(parseData, {
        pointToLayer:pointToLayer,
        filter:filter1,
        style:geojsonMarkerOptions1,
      }).addTo(map);}
    });

    featureGroup = L.geoJson(parseData, {
      pointToLayer:pointToLayer,
      filter:myFilter,
      style:geojsonMarkerOptions1,
    }).addTo(map);

    var info = function(layer) {
      layer.on('click', function (event) {
        var display1;
        var display2;
        var display3;
        var display4;
        var display5;
        var display6;
        display1= layer.feature.properties.A;
        display2= layer.feature.properties.C;
        display3= layer.feature.properties.J;
        display4= layer.feature.properties.F;
        display5= layer.feature.properties.D;
        display6= layer.feature.properties.E;
        $(".name").text(display1);
        $(".add").text(display2);
        $(".bus").text(display3);
        $(".months").text(display4);
        $(".day").text(display5);
        $(".time").text(display6);
      });
    };

    featureGroup.eachLayer(info);


    });
    /*$('input').click(function() {
      var removeMarkers = function(marker) {
        _.each(marker,function(m){
          map.removeLayer(marker);
        });
      };
      $("#cbox-input1:checked").each(function(){
        console.log(_.filter(parseData.features,function(year){return year.features.properties.H=="true";}));
      });
    showResults();
});*/



    /*featureGroup1 = L.geoJson(parseData, {
      onEachFeature: function(feature, layer) {
        layer.on('click', function (event) {
          $('.name').text(layer.feature.properties.A);
        });
        console.log(layer.feature.properties.A);
      showResults();
      }
    });*/
});
