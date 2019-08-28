
//This is where you define the map start up options, here defined to center on Paris and to have a particular zoom. 
		var mapOptions = {
			center: [48.86, 2.33],
			zoom: 10 ,
			maxZoom : 20,
			}

//This creates the map variable itself based on the options you have chosen. Note that its size is set in the html file	
		var map = new L.map('map', mapOptions); 
			
			
//Here is where the marker creation takes place. Simply name your variable and use the specified code to insert the lat/long. 
//The lat/long for a particular point can be found either online or by opening the console box of the map and clicking the desired spot
//Then, use the following code if you have an image you want to add, or just insert text, or do both with the bindPopup command
			
			//Image and Text
			var louvre1 = L.marker([48.860352821094246, 2.3385858535766606]);
			var photoImg = "<img src='./Images/Fig. 1 Louvre Israel Silvestre.jpeg' width=500px/>";
			louvre1.bindPopup(photoImg + "<br>" + "I am the Louvre");
			
			var louvre2= L.marker([48.86104454579249, 2.3360109329223637]);
			var photoImg2 = "<img src='./Images/Fig. 2 Louvre Israel Silvestre.jpeg' width=500px/>" ;
			louvre2.bindPopup(photoImg2 + "<br>" + "I am the Louvre too!");
			
			var coulommiers= L.marker([48.72358515157852, 3.0514526367187504]);
			var photoImg3= "<img src='./Images/Coulommiers_vers_1600.jpg' width=300px/>" ;
			coulommiers.bindPopup(photoImg3);

			var coulommiers2= L.marker([48.72258515157852, 3.0534526367187504]);
			var photoImg4= "<img src='./Images/Prospect_du_Chasteau_de_Coulommiers_en_Brie.jpg' width=500px/>" ;
			coulommiers2.bindPopup(photoImg4 + "<br>" + "I am Coulommiers as well");


			var brussels = L.marker([51.09662294502995, 5.158081054687501]);
			brussels.bindPopup("I am Brussels!");







//Lastly, add the point to your Points of Focus group so all places can be turned on/off together
			var pointsOfFocus = L.layerGroup([louvre1, louvre2, coulommiers, coulommiers2, brussels]).addTo(map);




//This is the code that lets you see lat/long in the console. Just right click the map and chose inspect element, then click Console to view the box
//This code could be erased for the final map if desired
			map.on('click', function(e){
			var coord = e.latlng;
			var lat = coord.lat;
			var lng = coord.lng;
			console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
			});
		




//Now we will move on to looking at the map underlays
//This lets you put the map layers in a specified order according to their zIndex. The lower the number, the lower down the map will appear.
//Here it is set up so that the modern imagery is the lowest, followed by the europe imagery, followed by the france imagery, etc. 
//Just below, when the layers are imported, you'll see that some are put in a specific pane so they don't cover up smaller ones.	
		map.createPane('modern');
		map.getPane('modern').style.zIndex = 140;
			
		map.createPane('iledeFrance');
		map.getPane('iledeFrance').style.zIndex = 150;

		map.createPane('france');
		map.getPane('france').style.zIndex = 145;
	
		map.createPane('europe');
		map.getPane('europe').style.zIndex = 143;	


//Here is where we bring in the different map underlays
//This first is the modern world imagery, currently called from arcGIS online.
	var esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		pane :'modern', attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
		}).addTo(map); 
		
	
//Now we start calling our locally stored and created Tile Maps. For how to tile a map, see the tiling instructions in the tutorial
//Note that some have .addTo(map) on the end. This means they will appear when the map is initially loaded
//You can also set the min/max zoom for these maps, though this is also relient upon actually having made tiles at these zoom levels 
	var paris1578 = L.tileLayer('./tiledMaps/1578/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 12, maxZoom: 18});
	var paris1615 = L.tileLayer('./tiledMaps/1615/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 11, maxZoom: 16});
	var paris1652 = L.tileLayer('./tiledMaps/1652/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 9, maxZoom: 25});
	var paris1675 = L.tileLayer('./tiledMaps/1675/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 9, maxZoom: 25}).addTo(map);
	
//Note that these last 3 have a "pane" that is definined in their options. This is so that they will appear beneath the smaller maps instead of on top
//See just above for the z values of the different panes
	var ileDeFrance1598 = L.tileLayer('./tiledMaps/1598/{z}/{x}/{y}.png', {tms: true, pane: 'iledeFrance', attribution: "", minZoom: 9, maxZoom: 13}).addTo(map);
	var france1570 = L.tileLayer('./tiledMaps/1570/{z}/{x}/{y}.png', {tms: true, pane: 'france', attribution: "", minZoom: 6, maxZoom: 10}).addTo(map);
	var europe1644 = L.tileLayer('./tiledMaps/1644/{z}/{x}/{y}.png', {tms: true, pane: 'europe', attribution: "", minZoom: 1, maxZoom: 8}).addTo(map);




//Now we want to create our layer box that lets us turn different maps on and off
//These can be divided into two types, basically radio buttons and check boxes
//Maps put in the "baseMaps" variable are radio buttons, which means only one map can be turned on at a time

//List of desired baseMap layers
//Right now it just includes our modern underlay
	var baseLayers = {
		"Modern Imagery" : esri_WorldImagery
		};
	

//Maps put in the overlayMaps variable are check boxes, meaning any variety of them can be turned on at a time
//Right now it includes all the other maps we have imported, as well as our Points of Focus icon group
//Note the order the maps are listed here is the order they will appear in the checkbox. The first part of each row is the label to accompany it
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



//Then this created the actual control box
	L.control.layers(baseLayers, overlayMaps, {collapsed: false}).addTo(map);


//Now we do the same thing for the opacity control box
//Here is our list of Layers to be controlled by the Opacity Control Box, again in the proper order
		var opacityLayers = {
			"1578 Paris" : paris1578,
			"1615 Paris" : paris1615,
			"1652 Paris" : paris1652,
			"1675 Paris" : paris1675,
			"1598 Ile de France" : ileDeFrance1598,
			"1570 France" : france1570,
			"1644 Europe" : europe1644
			};


//Now we similar create the opacity control box
		L.control.opacity(
			opacityLayers, //the variable containing all the maps
			{label: "Opacity", //the label for the box
			collapsed: true} //if we want the opacity box to be collapsed or not. We can do the same thing for the control layers box if desired
			).addTo(map);




//This is where we import the .geoJson file exported from ArcGIS Pro
//Each "part" of the book should have its own geojson, with information listed
//This also tells the pop up boxes to come up on each feature (see fuction popup below)
//As well as to swap the style for each line according to the book/character attributes of the geojson
	var part1 =  new L.GeoJSON.AJAX("movementTesting.geojson", {
		onEachFeature: popUp,
		style: swapStyle});
	part1.addTo(map);
		
//This will need to be updated for future characters and book parts		
	function swapStyle(feature) {
		if (feature.properties.Book_Part == 1) {
				switch (feature.properties.Character) {
					case 'Prince de Cleves': return {color: "#ff0000", "dashArray": '15, 15, 5, 10' };
					case 'Duc de Nemours': return {color: "#0000ff", "dashArray": '15, 15, 5, 10'};
				}
			}
		}; 
		
     
//Function to allow for popup box containing attributes of .geoJSON files
//This can be customized further when the final characteristics fo the .geoJSON are set up
	function popUp(f,l){
		var out = [];
				if (f.properties){
					for(key in f.properties){
						out.push(key+": "+f.properties[key]); //pushes out .geoJSON attributes exported from ArcGIS
					}
				}
		l.bindPopup(out.join("<br />"))		
	}





//The following portion of the code is all about the timeline
//This portion of the code sets up the style of the timeline. 
//Here you can pick the max/min of the slider, the number of ticks, the width between ticks, etc
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

//This portion of the code sets up the size attributes of the of the timeline
  d3.select('#slider') 
    .append('svg')
    .attr('width', 200)
    .attr('height', 50)
    .append('g')
    .attr('transform', 'translate(20,10)')
    .call(slider); 
	
//This portion of the code says what happens when different values (1, 2, 3, 4) of the timeline are chosen
//Right now, since there is only one part of the book with data, it turns on part 1 when part 1 is chosen, and turns if off when any other part is chosen
//It will need to be updated when more parts are available
	function onSlider(val) { //function receives the value on the slider
		if (val==1) {
		part1.addTo(map);}
		else {
		part1.remove();}
	}
//This is the initial filter to open the map with
	onSlider(1); 					


//Creation of pan/scale function in the top left cornder of the map.
		L.control.pan().addTo(map);
		L.control.scale().addTo(map);


//This sets the style of the arrows on the geojson characters. It will need to be updated for future geoJSON files.
//It uses the leaflet.text plug in
	part1.on('mouseover', function () {
        this.setText('  ►  ', {repeat: true, offset: 6, attributes: {fill: 'red', 'font-size': 20}});
		});
    part1.on('mouseout', function () {
        this.setText(null);
    }); 



//This section of the code creates the legend. 
//the .css info for the legend can be found in the .css file
//getColor will need to be updated with future character colors, along with the categories array for character names
	function getColor(d) {
		return 	d === 'Prince de Cleves' ? '#ff0000' :
				d === 'Duc de Nemours'? '#0000ff' :
										'#0000ff';
}

	var legend = L.control({position: 'bottomright'});
	legend.onAdd = function (map) {
		var div = L.DomUtil.create('div', 'info legend'),
			labels= ['Characters'],
			categories = ['Prince de Cleves', 'Duc de Nemours'];


		// loop through our characters and generate a label with a colored square for each character
		for (var i = 0; i < categories.length; i++) {
            div.innerHTML += 
            labels.push(
                '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
            (categories[i] ? categories[i] : '+'));

        }
        div.innerHTML = labels.join('<br>');
		return div;
	};
	legend.addTo(map);