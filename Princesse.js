
//Define map start up options, here defined to center on Paris, and Create Map
		var mapOptions = {
			center: [48.86, 2.33],
			zoom: 10 ,
			maxZoom : 20,
			}
			
		var map = new L.map('map', mapOptions); 
			
			map.createPane('modern');
			map.getPane('modern').style.zIndex = 140;
			
			map.createPane('iledeFrance');
			map.getPane('iledeFrance').style.zIndex = 150;

			map.createPane('france');
			map.getPane('france').style.zIndex = 145;
	
	
			map.createPane('europe');
			map.getPane('europe').style.zIndex = 143;

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
			char1.addTo(map);

	

		var char2 = new L.GeoJSON.AJAX("Character2_v5.geojson", 
			{style: myStyleCharacter2, onEachFeature:popUp}); 	
			char2.addTo(map);


		var ducDeNemours =  new L.GeoJSON.AJAX("movementTesting.geojson", {
			onEachFeature: popUp,
			style: swapColor
			});
			ducDeNemours.addTo(map);
		
		function swapColor(feature) {
			if (feature.properties.Book_Part == 1) {
				switch (feature.properties.Character) {
					case 'Prince de Cleves': return {color: "#ff0000", "dashArray": '15, 15, 5, 10' };
					case 'Duc de Nemours': return {color: "#0000ff", "dashArray": '15, 15, 5, 10'};
				}
			}
			
		}
		

//arrows on the movement geojson
	ducDeNemours.on('mouseover', function () {
        this.setText('  ►  ', {repeat: true, offset: 8, attributes: {fill: 'red', 'font-size': '20'}});
		});
    ducDeNemours.on('mouseout', function () {
        this.setText(null);
    }); 




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
		ducDeNemours.refilter(function(feature){
			return feature.properties.Book_Part == val; //char1 filtered to only include Timestamps  equal to the value of the slider
		});
		ducDeNemours.addTo(map); //readd char1 to map
		
		char2.refilter(function(feature){ //repeats for each character
			return feature.properties.Book_Part <= val;
		});
		char2.addTo(map);		
	}

//Initial filter to open the map with
	onSlider(1); 


	var esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		pane :'modern', attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
		}).addTo(map); 
				
		
	var paris1675 = L.tileLayer('./tiledMaps/1675/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 9, maxZoom: 25}).addTo(map);
	var paris1652 = L.tileLayer('./tiledMaps/1652/{z}/{x}/{y}.png', {tms: true, attribution: "", zIndex: 130, minZoom: 9, maxZoom: 25});
	var europe1644 = L.tileLayer('./tiledMaps/1644/{z}/{x}/{y}.png', {tms: true, pane: 'europe', attribution: "", minZoom: 1, maxZoom: 8}).addTo(map);
	
	var france1570 = L.tileLayer('./tiledMaps/1570/{z}/{x}/{y}.png', {tms: true, pane: 'france', attribution: "", minZoom: 6, maxZoom: 10}).addTo(map);
	
	var ileDeFrance1598 = L.tileLayer('./tiledMaps/1598/{z}/{x}/{y}.png', {tms: true, pane: 'iledeFrance', attribution: "", minZoom: 9, maxZoom: 13}).addTo(map);
	
	var paris1615 = L.tileLayer('./tiledMaps/1615/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 11, maxZoom: 16});
		
var paris1578 = L.tileLayer('./tiledMaps/1578/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 12, maxZoom: 18});
     
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
					l.bindPopup(out.join("<br />"))		
				}
			}

						

//List of desired baseMap layers
	var baseLayers = {
		"Modern Imagery" : esri_WorldImagery
		};
		
//List of Layers to be controlled by the Opacity Control Box
		var opacityLayers = {
			"1578 Paris" : paris1578,
			"1615 Paris" : paris1615,
			"1652 Paris" : paris1652,
			"1675 Paris" : paris1675,
			"1598 Ile de France" : ileDeFrance1598,
			"1570 France" : france1570,
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
			var louvre1 = L.marker([48.860352821094246, 2.3385858535766606]);
			var photoImg = "<img src='./Images/Fig. 1 Louvre Israel Silvestre.jpeg' width=500px/>";
			louvre1.bindPopup(photoImg + "<br>" + "I am the Louvre");
			
			var louvre2= L.marker([48.86104454579249, 2.3360109329223637]);
			var photoImg2 = "<img src='./Images/Fig. 2 Louvre Israel Silvestre.jpeg' width=500px/>" ;
			louvre2.bindPopup(photoImg2 + "<br>" + "I am the Louvre too!");
			
			var coulommiers= L.marker([48.72358515157852, 3.0514526367187504]);
			coulommiers.bindPopup("I am Coulommiers");
//Creation of interestingSites group so all places can be turned on/off together
			var pointsOfFocus = L.layerGroup([louvre1, louvre2, coulommiers]).addTo(map);
	

//Grouping of Layers that we want to be able to turn on and off		
		var overlayMaps = {
			"1578 Paris" : paris1578,
			"1615 Paris" : paris1615,
			"1652 Paris" : paris1652,
			"1675 Paris" : paris1675,
			"1598 Ile de France" : ileDeFrance1598,
			"1570 France" : france1570,
			"1644 Europe" : europe1644,
			"Points of Focus" : pointsOfFocus,
			};
		
		//creation of on/off control box
		L.control.layers(baseLayers, overlayMaps, {collapsed: false}).addTo(map);
		
		//Creation of Opacity Control Box
		L.control.opacity(
			opacityLayers, //the variable containing all the maps
			{label: "Opacity",
			collapsed: true}
			).addTo(map);
			
		//Creation of pan/scale function like Fulcrum images have. Uses PanControl plugin  
		L.control.pan().addTo(map);
		L.control.scale().addTo(map);



