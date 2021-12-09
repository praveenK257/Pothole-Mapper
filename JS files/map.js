var map = new ol.Map(
    {
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([77.5116811,10.4520292]),
            zoom: 15 
         })
    }
);

function loadmaps(){

    $.getJSON("https://api.thingspeak.com/channels/1554670/feed.json?api_key=9P6QLOWV7O5ME9IL", 
    
    function(data){
        
        var jsonData = data;
        var Lat=new Array(jsonData.feeds.length),Lon=new Array(jsonData.feeds.length);
          
        for(let i=0;i<Lat.length;i++){
          Lat[i] = Number(jsonData.feeds[i].field1);
          Lon[i] = Number(jsonData.feeds[i].field2);
        
          var marker = new ol.Feature({
            geometry: new ol.geom.Point(
            ol.proj.fromLonLat( [Lon[i],Lat[i]] )
            ),
          });
            
          let vectorSource = new ol.source.Vector({
              features: [marker]
          });
          let markerVectorLayer = new ol.layer.Vector({
              source: vectorSource
          });
          
          map.addLayer(markerVectorLayer);
        }
        
    }).done(function() { initialize();});
}

window.setInterval(function(){ loadmaps(); }, 5000 );

