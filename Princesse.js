
//Define map start up options, here defined to center on Paris, and Create Map
		var mapOptions = {
			center: [48.86, 2.33],
			zoom: 13 ,
			maxZoom : 20,
			}
			
		var map = new L.map('map', mapOptions); 
	
	//Set Line Styles for each Character
		var myStyleCharacter1 = {
			"color": "#ff1500",
			"weight": 6,
			"opacity": 0.5,
			"dashArray": '15, 15, 5, 10'};

		var myStyleCharacter2 = {
			"color": "#04ff00",
			"weight": 6,
			"opacity": 0.5};

//Create Characters from .geoJson's exported from ArcPro and create popUp box		
		var char1 = new L.GeoJSON.AJAX("Character1_v5.geojson", 
			{style: myStyleCharacter1, onEachFeature:popUp}); 

		var char2 = new L.GeoJSON.AJAX("Character2_v5.geojson", 
			{style: myStyleCharacter2, onEachFeature:popUp}); 	




//Create Timeline Slider 
 var slider = d3
    .sliderHorizontal()
    .min(1)
    .max(4)
    .step(1)
	.ticks(4)
	.tickFormat(d3.format(',.0f')) //integer format. Others possible
    .width(150)
    .displayValue(true)
    .on('end', val => { //tells it to run onSlider when engaged with
	    onSlider(val);
    });

  d3.select('#slider') //this edits the timeline location, while the .css edits the box
    .append('svg')
    .attr('width', 200)
    .attr('height', 50)
    .append('g')
    .attr('transform', 'translate(20,10)')
    .call(slider); 
	
//Function to re-evaluate Characters based on Timestamp	
	function onSlider(val) { //function receives the value on the slider
		char1.refilter(function(feature){
			return feature.properties.Timestamp <= val; //char1 filtered to only include Timestamps less than or equal to the value of the slider
		});
		char1.addTo(map); //readd char1 to map
		
		char2.refilter(function(feature){ //repeats for each character
			return feature.properties.Timestamp <= val;
		});
		char2.addTo(map);		
	}

//Initial filter to open the map with
	onSlider(1);

//Externally called Google Earth tiled basemap
	var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
		}).addTo(map);
			
//Local basemaps created from a .geotiff  using gdal2tiles (workflow available) 
	var map1675 = L.tileLayer('./tiledMaps/1675/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 9, maxZoom: 25}).addTo(map);
	var map1652 = L.tileLayer('./tiledMaps/1652/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 9, maxZoom: 25}).addTo(map);
	var europe1644 = L.tileLayer('./tiledMaps/1644/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 1, maxZoom: 8}).addTo(map);

     
//Function to allow for popup box containing attributes of .geoJSON files
	function popUp(f,l){
		var out = [];
				if (f.properties){
					for(key in f.properties){
						if (key == "Database_Link") {
						out.push('<a href="'+ f.properties[key] + '" target="_blank">Link to Database</a>'); } //for linking to external databases/webpages
						else {
						out.push(key+": "+f.properties[key]); //pushes out .geoJSON attributes exported from ArcGIS
						}
					}
					l.bindPopup(out.join("<br />"));
					}
				}



//List of desired baseMap layers
		var baseLayers = {
			"Modern Satellite Imagery" : Esri_WorldImagery};
		
//List of Layers to be controlled by the Opacity Control Box
		var opacityLayers = {
			"1652 Gomboust" : map1652,
			"1675 Rochefort" : map1675,
			"1644 Europe" : europe1644
			};

//Lets you see lat/long in the console. Useful for placing non-georeferenced maps in the correct location
			map.on('click', function(e){
			var coord = e.latlng;
			var lat = coord.lat;
			var lng = coord.lng;
			console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
			});
		
//Louvre images placed manually by lat/long, followed by photo binding
			var Louvre1 = L.marker([48.860352821094246, 2.3385858535766606]);
			var photoImg = "<img src='./Images/Fig. 1 Louvre Israel Silvestre.jpeg' width=500px/>";
			Louvre1.bindPopup(photoImg + "<br>" + "I am the Louvre");
			
			var Louvre2= L.marker([48.86104454579249, 2.3360109329223637]);
			var photoImg2 = "<img src='./Images/Fig. 2 Louvre Israel Silvestre.jpeg' width=500px/>" ;
			Louvre2.bindPopup(photoImg2 + "<br>" + "I am the Louvre too!");
			
		//Creation of interestingSites group so all places can be turned on/off together
			var interestingSites = L.layerGroup([Louvre1, Louvre2]).addTo(map);
	

		//Grouping of Layers that we want to be able to turn on and off		
		var overlayMaps = {
			"1675 Rochefort" : map1675,
			"1652 Gomboust" : map1652,
			"1644 Europe" : europe1644,
			"Interesting Sites" : interestingSites};
		
		//creation of on/off control box
		L.control.layers(baseLayers, overlayMaps, {collapsed: false}).addTo(map);
		
		//Creation of Opacity Control Box
		L.control.opacity(
			opacityLayers, //the variable containing all the maps
			{label: "Opacity Controls"}
			).addTo(map);
			
		//Creation of pan/scale function like Fulcrum images have. Uses PanControl plugin  
		L.control.pan().addTo(map);
		L.control.scale().addTo(map);
		
		
	


//Old control slider we are no longer using but I want to keep the code for now
/*	var slider = L.control.range({
    position: 'topright',
    min: 1,
    max: 5,
    value: 1,
    step: 1,
    orient: 'horizontal',
    iconClass: 'leaflet-range-icon',
    icon: false,
	label: "Test"
});

				
slider.on('input change', function(e) {
	            char1.refilter(function(feature){
			return feature.properties.Timestamp <= e.value;
		});
		char1.addTo(map);
		
		char2.refilter(function(feature){
			return feature.properties.Timestamp <= e.value;
		});
		char2.addTo(map);
});
map.addControl(slider);		 */



