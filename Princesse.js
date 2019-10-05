//This is where you define the map start up options, here defined to center on Paris and to have a particular zoom. 
		var mapOptions = {
			center: [48.86, 2.33],
			zoom: 12,
			maxZoom : 20,
			}

//This creates the map variable itself based on the options you have chosen. Note that its size is set in the html file	
		var map = new L.map('map', mapOptions); 
			
		var sidebar = L.control.sidebar('sidebar', {position: 'left'});
			map.addControl(sidebar);
			
			map.on('click', function() {
				sidebar.hide();
				louvre1.setIcon(blueIcon);
				louvre2.setIcon(blueIcon);
				})
		
		var greenIcon = L.icon({
			iconUrl: './Images/marker-icon-green.png',
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowSize: [41, 41]
		});
		
		var blueIcon = L.icon({
			iconUrl: './Images/marker-icon-blue.png'
		});
		
		
//Here is where the marker creation takes place. Simply name your variable and use the specified code to insert the lat/long. 
//The lat/long for a particular point can be found either online or by opening the console box of the map and clicking the desired spot
//Then, use the following code if you have an image you want to add, or just insert text, or do both with the bindPopup command
			
			//Image and Text in sidebar
			var louvre1 = L.marker([48.860352821094246, 2.3385858535766606], {myCustomID: "abc123"});
			var louvre1Description = 
			"<b> I am a sketch of the Louvre from the past </b>"
			+ "<br>" + "<img src='./Images/Fig. 1 Louvre Israel Silvestre.jpeg' width=400px/>" + "<br>" + "See my metadata " + "<a target='_blank' href=''>here</a>" + "<br>" +
			"<i>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet </i>"
			+ "<br>" + "<br>" + 
			"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet"
;		
			louvre1.on("click", function (e) {
				var visible = sidebar.isVisible();
				sidebar.setContent(louvre1Description);
				if (!visible){
					sidebar.toggle();
				}
				louvre1.setIcon(greenIcon);
				louvre2.setIcon(blueIcon);
			});

			
			var louvre2= L.marker([48.86104454579249, 2.3360109329223637]);
			var louvre2Description = "<b> I am the Louvre too! </b>" + "<br>" + "<img src='./Images/Fig. 2 Louvre Israel Silvestre.jpeg' width=400px/>" ;

				louvre2.on("click", function (e) {
				var visible = sidebar.isVisible();
				sidebar.setContent(louvre2Description);
				
				if (!visible){
					sidebar.toggle();
				}
				louvre2.setIcon(greenIcon);
				louvre1.setIcon(blueIcon);
			});	
			
			
			
			var coulommiers= L.marker([48.72358515157852, 3.0514526367187504]);
			var photoImg3= "<img src='./Images/Coulommiers_vers_1600.JPG' width=300px/>" ;
			coulommiers.bindPopup(photoImg3);

			var coulommiers2= L.marker([48.72258515157852, 3.0534526367187504]);
			var photoImg4= "<img src='./Images/Prospect_du_Chasteau_de_Coulommiers_en_Brie.jpg' width=500px/>" ;
			coulommiers2.bindPopup(photoImg4 + "<br>" + "I am Coulommiers as well");

			var brussels = L.marker([51.09662294502995, 5.158081054687501]);
			
			brussels.bindPopup("I am Brussels!");


			var leCercamp = L.marker([50.24720490139267, 2.6312255859375004]);
			
			leCercamp.bindPopup("Le Cercamp");

			var cateauCambresis = L.marker([50.0289165635219, 4.084167480468751]);
			
			cateauCambresis.bindPopup('I am Cateau-Cambresis');

			var chantilly = L.marker([49.189781745417484, 2.5007629394531254]);
			
			chantilly.bindPopup('I am Chantilly');


			var bayonne = L.marker([44.04811573082351,-2.2796630859375004]);
			bayonne.bindPopup('I am Bayonne');
			
			
//Lastly, add the point to your Points of Focus group so all places can be turned on/off together
			var pointsOfFocus = L.layerGroup([louvre1, louvre2, coulommiers, coulommiers2, brussels, chantilly, cateauCambresis, bayonne, leCercamp]).addTo(map);




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
	var paris1675 = L.tileLayer('./tiledMaps/1675/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 9, maxZoom: 16}).addTo(map);
	
//Note that these last 3 have a "pane" that is definined in their options. This is so that they will appear beneath the smaller maps instead of on top
//See just above for the z values of the different panes
	var ileDeFrance1598 = L.tileLayer('./tiledMaps/1598/{z}/{x}/{y}.png', {tms: true, pane: 'iledeFrance', attribution: "", minZoom: 9, maxZoom: 13}).addTo(map);
	var france1570 = L.tileLayer('./tiledMaps/1570/{z}/{x}/{y}.png', {tms: true, pane: 'france', attribution: "", minZoom: 6, maxZoom: 10}).addTo(map);
	var europe1644 = L.tileLayer('./tiledMaps/1644/{z}/{x}/{y}.png', {tms: true, pane: 'europe', attribution: "", minZoom: 1, maxZoom: 8}).addTo(map);


//This is where we import the .geoJson file exported from ArcGIS Pro
//Each "part" of the book should have its own geojson, with information listed
//This also tells the pop up boxes to come up on each feature (see fuction popup below)
//As well as to swap the style for each line according to the book/character attributes of the geojson
	var movement =  new L.GeoJSON.AJAX("PdCMovement_all.geojson", {
		
		onEachFeature: function (feature, layer) {
			/*L.polylineDecorator(layer, {
				patterns: [
				{offset: 25, repeat: 150, symbol: L.Symbol.arrowHead({pixelSize: 15, pathOptions: {fillOpacity: 1, weight: 0, color: '#000000'}})}
				]
			}).addTo(map);*/  /// Adds each decorator to the map!!!!
			var out = [];
				if (feature.properties){
					out.push("<b>Character: </b>" +feature.properties.Character);
					out.push("<b>Travel From: </b>" +feature.properties.Start);
					out.push("<b>Travel To: </b>" +feature.properties.End);
					out.push("<b>Book Part: </b>" +feature.properties.Book_Part);
					/*for(key in f.properties){
						out.push(key+": "+f.properties[key]); //pushes out .geoJSON attributes exported from ArcGIS
					}*/
				}
			layer.bindPopup(out.join("<br />"));		
		},
		style: swapStyle
	});
	movement.addTo(map);

  
  /*var decorator = L.polylineDecorator(movement, {
    patterns: [
        // defines a pattern of 10px-wide dashes, repeated every 20px on the line
        {offset: 0, repeat: 20, symbol: L.Symbol.dash({pixelSize: 10})}
    ]
}).addTo(map); */



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
			"<a target='_blank' href=''>1578 Paris</a>": paris1578,
			"<a target='_blank' href=''>1615 Paris</a>" : paris1615,
			"<a target='_blank' href=''>1652 Paris</a>" : paris1652,
			"<a target='_blank' href=''>1675 Paris</a>" : paris1675,
			"<a target='_blank' href=''>1598 Ile de France</a>" : ileDeFrance1598,
			"<a target='_blank' href=''>1570 France</a>" : france1570,
			"<a target='_blank' href=''>1644 Europe</a>" : europe1644,
			"Points of Focus" : pointsOfFocus,
			"Character Movement" : movement
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
			position: 'topright',
			collapsed: true} //if we want the opacity box to be collapsed or not. We can do the same thing for the control layers box if desired
			).addTo(map);


//This will need to be updated for future characters and book parts		
	function swapStyle(feature) {
		if (feature.properties.Book_Part == 1) {
				switch (feature.properties.Character) {
					case 'Prince de Clèves': return {color: "#ff0000" };
					case 'Duc de Nemours': return {color: "#0000ff"};
					case 'Cardinal Lorraine': return {color: "#d9ff15"};
					case 'Connétable de Montmorency': return {color: "#5e8d46"};
					case 'Maréchal de Saint André' : return {color: "#c59be9"};
					case 'Henri II': return {color: "#000000"};
					case 'Duc de Savoie': return {color: "#a66c32"};
					case 'Comte de Radan': return {color: "#c400ff"};
					case 'Lignerolles': return {color: "#ffab00"};
					case 'Connétable de Bourbon': return {color: "#ffff00"};
					case 'Madame la Régente': return {color: "#00ff77"};
					case 'Court Assembly': return {color: "#78f2ee"};
					case 'Princesse de Clèves': return {color: "#e931be"};
					case 'Vidame de Chartres': return {color: "#CACFD2" };
					case "Duc d'Albe": return {color: "#B7950B" };
					case "Médecin du roi d'Espagne": return {color: "#D7BDE2" };
					case 'Le Roi': return {color: "#2ECC71"};
					case 'La Cour': return {color: "#A04000"};
					case 'Roi de Navarre': return {color: "#FDFEFE"};
					case 'Prince de Condé': return {color: "#A93226"};
					case 'Élisabeth de France': return {color: "#85C1E9"};
					case 'Gentilhomme': return {color: "#1D8348"};
					case 'Madame Martigues': return {color: "#FAD7A0"};
				}
			}
		
		if (feature.properties.Book_Part === 2) {
				switch (feature.properties.Character) {
					case 'Prince de Clèves': return {color: "#ff0000" };
					case 'Duc de Nemours': return {color: "#0000ff"};
					case 'Cardinal Lorraine': return {color: "#d9ff15"};
					case 'Connétable de Montmorency': return {color: "#5e8d46"};
					case 'Maréchal de Saint André' : return {color: "#c59be9"};
					case 'Henri II': return {color: "#000000"};
					case 'Duc de Savoie': return {color: "#a66c32"};
					case 'Comte de Radan': return {color: "#c400ff"};
					case 'Lignerolles': return {color: "#ffab00"};
					case 'Connétable de Bourbon': return {color: "#ffff00"};
					case 'Madame la Régente': return {color: "#00ff77"};
					case 'Court Assembly': return {color: "#78f2ee"};
					case 'Princesse de Clèves': return {color: "#e931be"};
					case 'Vidame de Chartres': return {color: "#CACFD2" };
					case "Duc d'Albe": return {color: "#B7950B" };
					case "Médecin du roi d'Espagne": return {color: "#D7BDE2" };
					case 'Le Roi': return {color: "#2ECC71"};
					case 'La Cour': return {color: "#A04000"};
					case 'Roi de Navarre': return {color: "#FDFEFE"};
					case 'Prince de Condé': return {color: "#A93226"};
					case 'Élisabeth de France': return {color: "#85C1E9"};
					case 'Gentilhomme': return {color: "#1D8348"};
					case 'Madame Martigues': return {color: "#FAD7A0"};
				}
			}
		if (feature.properties.Book_Part === 3) {
				switch (feature.properties.Character) {
					case 'Prince de Clèves': return {color: "#ff0000" };
					case 'Duc de Nemours': return {color: "#0000ff"};
					case 'Cardinal Lorraine': return {color: "#d9ff15"};
					case 'Connétable de Montmorency': return {color: "#5e8d46"};
					case 'Maréchal de Saint André' : return {color: "#c59be9"};
					case 'Henri II': return {color: "#000000"};
					case 'Duc de Savoie': return {color: "#a66c32"};
					case 'Comte de Radan': return {color: "#c400ff"};
					case 'Lignerolles': return {color: "#ffab00"};
					case 'Connétable de Bourbon': return {color: "#ffff00"};
					case 'Madame la Régente': return {color: "#00ff77"};
					case 'Court Assembly': return {color: "#78f2ee"};
					case 'Princesse de Clèves': return {color: "#e931be"};
					case 'Vidame de Chartres': return {color: "#CACFD2" };
					case "Duc d'Albe": return {color: "#B7950B" };
					case "Médecin du roi d'Espagne": return {color: "#D7BDE2" };
					case 'Le Roi': return {color: "#2ECC71"};
					case 'La Cour': return {color: "#A04000"};
					case 'Roi de Navarre': return {color: "#FDFEFE"};
					case 'Prince de Condé': return {color: "#A93226"};
					case 'Élisabeth de France': return {color: "#85C1E9"};
					case 'Gentilhomme': return {color: "#1D8348"};
					case 'Madame Martigues': return {color: "#FAD7A0"};
				}
			}
			
		if (feature.properties.Book_Part === 4) {
				switch (feature.properties.Character) {
					case 'Prince de Clèves': return {color: "#ff0000" };
					case 'Duc de Nemours': return {color: "#0000ff"};
					case 'Cardinal Lorraine': return {color: "#d9ff15"};
					case 'Connétable de Montmorency': return {color: "#5e8d46"};
					case 'Maréchal de Saint André' : return {color: "#c59be9"};
					case 'Henri II': return {color: "#000000"};
					case 'Duc de Savoie': return {color: "#a66c32"};
					case 'Comte de Radan': return {color: "#c400ff"};
					case 'Lignerolles': return {color: "#ffab00"};
					case 'Connétable de Bourbon': return {color: "#ffff00"};
					case 'Madame la Régente': return {color: "#00ff77"};
					case 'Court Assembly': return {color: "#78f2ee"};
					case 'Princesse de Clèves': return {color: "#e931be"};
					case 'Vidame de Chartres': return {color: "#CACFD2" };
					case "Duc d'Albe": return {color: "#B7950B" };
					case "Médecin du roi d'Espagne": return {color: "#D7BDE2" };
					case 'Le Roi': return {color: "#2ECC71"};
					case 'La Cour': return {color: "#A04000"};
					case 'Roi de Navarre': return {color: "#FDFEFE"};
					case 'Prince de Condé': return {color: "#A93226"};
					case 'Élisabeth de France': return {color: "#85C1E9"};
					case 'Gentilhomme': return {color: "#1D8348"};
					case 'Madame Martigues': return {color: "#FAD7A0"};
				}
			}
		
		}; 
			


//This section of the code creates the legend. 
//the .css info for the legend can be found in the .css file
//getColor will need to be updated with future character colors, along with the categories array for character names
	function getColor(d) {
		return 	d === 'Prince de Clèves' ? '#ff0000' :
				d === 'Duc de Nemours'? '#0000ff' :			
				d === 'Cardinal Lorraine'? "#d9ff15":
				d === 'Connétable de Montmorency'?  "#5e8d46":
				d === 'Maréchal de Saint André' ? "#c59be9":				
				d === 'Henri II'?  "#000000":
				d === 'Duc de Savoie'?  "#a66c32":
				d === 'Comte de Radan'?  "#c400ff":
				d === 'Lignerolles'?  "#ffab00":
				d === 'Connétable de Bourbon'?  "#ffff00":
				d === 'Madame la Régente'?  "#00ff77":		
				d === 'Court Assembly'?  "#78f2ee":
				d === 'Princesse de Clèves'? "#e931be":
				d === 'Vidame de Chartres'? "#CACFD2":
				d === "Duc d'Albe"? "#B7950B":
				d === "Médecin du roi d'Espagne"? "#D7BDE2" :
				d === 'Le Roi'? "#2ECC71" :
				d === 'La Cour'? "#A04000" :
				d === 'Roi de Navarre'? "#FDFEFE" :
				d === 'Prince de Condé'? "#A93226" :
				d === 'Élisabeth de France'? "#85C1E9" :
				d === 'Gentilhomme'? "#1D8348" :
				d === 'Madame Martigues'? "#FAD7A0":
										'#0000ff';
}

	var legend = L.control({position: 'bottomleft'});
	function showLegend() {
		legend.addTo(map);
    }
	function hideLegend() {
        var div = document.getElementById("info legend")
        div.innerHTML = "<h2>Legend</h2>";
    }
	legend.onAdd = function (map) {
		var div = L.DomUtil.create('div', 'info legend'),
			labels= ['<b>Characters</b>'],
			categories = ['Prince de Clèves', 'Duc de Nemours', 'Cardinal Lorraine', 'Connétable de Montmorency', 'Maréchal de Saint André','Henri II', 'Duc de Savoie',
							'Comte de Radan', 'Lignerolles', 'Connétable de Bourbon', 'Madame la Régente', 'Court Assembly', 'Princesse de Clèves',
							'Vidame de Chartres', "Duc d'Albe", "Médecin du roi d'Espagne", 'Le Roi', 'La Cour', 'Roi de Navarre', 'Prince de Condé', 'Élisabeth de France', 'Gentilhomme','Madame Martigues' ];


		// loop through our characters and generate a label with a colored square for each character
		for (var i = 0; i < categories.length; i++) {
            div.innerHTML += 
            labels.push(
                '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
            (categories[i] ? categories[i] : '+'));

        }
        div.innerHTML = labels.join('<br>');
		div.setAttribute("onmouseenter", "showLegend()");
		div.setAttribute("onmouseleave", "hideLegend()");
		    div.id = "info legend"
		return div;
	};
	legend.addTo(map);
	hideLegend();

//code for filtering by book part	
var partDropdown = L.control({position: 'topright'});
	
	partDropdown.onAdd = function (map) {
		var div = L.DomUtil.create('div', 'info legend');
		div.innerHTML = '<select><option>Show All Parts</option><option>Part 1</option><option>Part 2</option><option>Part 3</option><option>Part 4</option></select>';
		div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
		return div;
		};
		partDropdown.addTo(map);
		$('select').change(function(){
			var value = $(this).val();
				
				if (value === 'Show All Parts') {
					movement.refilter(function(feature){
							feature.properties.turnOn = 1;
							
						return feature.properties.turnOn == 1 && feature.properties.showOnMap==1;})	}

			if (value == 'Part 1') {
				movement.refilter(function(feature){
					if (feature.properties.Book_Part==1) {
						feature.properties.turnOn = 1; }
					else 
						feature.properties.turnOn=0;
			 return feature.properties.turnOn == 1 && feature.properties.showOnMap==1;})	} 
			
			if (value == 'Part 2') {
				movement.refilter(function(feature){
				if (feature.properties.Book_Part==2) {
					feature.properties.turnOn = 1; }
				else 
						feature.properties.turnOn=0;
			 return feature.properties.turnOn == 1 && feature.properties.showOnMap==1;})	}
			
			if (value == 'Part 3') {
				movement.refilter(function(feature){
				if (feature.properties.Book_Part==3) {
					feature.properties.turnOn = 1; }
					else 
						feature.properties.turnOn=0;
			 return feature.properties.turnOn == 1 && feature.properties.showOnMap==1;})	}

			if (value == 'Part 4') {
				movement.refilter(function(feature){
				if (feature.properties.Book_Part==4) {
					feature.properties.turnOn = 1; }
					else 
						feature.properties.turnOn=0;
			 return feature.properties.turnOn == 1 && feature.properties.showOnMap==1;})	} 

			 
});


//creates and controls character filter. showOnMap is the character associated attribute and turnOn is the part associated attribute
var characterDropdown = L.control({position: 'topright'});
	characterDropdown.onAdd = function (map) {
		var div = L.DomUtil.create('div', 'info legend');
		div.innerHTML = "<select><option>Show All Characters</option><option>Prince de Clèves</option><option>Duc de Nemours</option><option>Cardinal Lorraine</option><option>Connétable de Montmorency</option><option>Maréchal de Saint André</option><option>Henri II</option><option>Duc de Savoie</option><option>Comte de Radan</option><option>Lignerolles</option><option>Connétable de Bourbon</option><option>Madame la Régente</option><option>Court Assembly</option><option>Princesse de Clèves</option><option>Duc d'Albe</option><option>Médecin du roi d'Espagne</option><option>Vidame de Chartres</option><option>'Madame Martigues'</option><option>'Gentilhomme'</option><option>'Élisabeth de France'</option><option>'Prince de Condé'</option><option>'Roi de Navarre'</option><option>'La Cour'</option><option>'Le Roi'</option></select>";
		div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
		return div;
		};
		characterDropdown.addTo(map);
		
		$('select').change(function(){
			var value = $(this).val();
			
			if (value == 'Show All Characters') {
				movement.refilter(function(feature){
					feature.properties.showOnMap = 1;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Prince de Clèves') {
				movement.refilter(function(feature){
					if (feature.properties.Character=='Prince de Clèves') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
					
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Duc de Nemours') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Duc de Nemours') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Cardinal Lorraine') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Cardinal Lorraine') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Connétable de Montmorency') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Connétable de Montmorency') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Maréchal de Saint André') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Maréchal de Saint André') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Henri II') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Henri II') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Duc de Savoie') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Duc de Savoie') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Comte de Radan') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Comte de Radan') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Connétable de Bourbon') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Connétable de Bourbon') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Lignerolles') {
				movement.refilter(function(feature){
			if (feature.properties.Character=='Lignerolles') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Madame la Régente') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Madame la Régente') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Court Assembly') {
				movement.refilter(function(feature){
			if (feature.properties.Character=='Court Assembly') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Princesse de Clèves') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Princesse de Clèves') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			
			if (value == 'Vidame de Chartres') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Vidame de Chartres') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == "Duc d'Albe") {
				movement.refilter(function(feature){
				if (feature.properties.Character=="Duc d'Albe") {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == "Médecin du roi d'Espagne") {
				movement.refilter(function(feature){
				if (feature.properties.Character=="Médecin du roi d'Espagne") {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
		
    if (value == 'Le Roi') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Le Roi') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
	
	if (value == 'La Cour') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='La Cour') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
	
	if (value == 'Roi de Navarre') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Roi de Navarre') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
	
	if (value == 'Prince de Condé') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Prince de Condé') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
	
	if (value == 'Élisabeth de France') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Élisabeth de France') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			
			if (value == 'Gentilhomme') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Gentilhomme') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			
			
			if (value == 'Madame Martigues') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Madame Martigues') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
	}); 

//Creation of pan/scale function in the top left cornder of the map.
		L.control.pan().addTo(map);
		L.control.scale().addTo(map);
	
	/*Removed timeline to use dropdown box instead
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
		movement.addTo(map);}
		else {
		movement.remove();}
	}
//This is the initial filter to open the map with
	onSlider(1); 					
*/



/* Arrows currently broken on filtering
//This sets the style of the arrows on the geojson characters. It will need to be updated for future geoJSON files.
//It uses the leaflet.text plug in
	movement.on('mouseover', function () {
        this.setText('  ►  ', {repeat: true, offset: 6, attributes: {fill: 'black', 'font-size': 17}});
		});
    movement.on('mouseout', function () {
        this.setText(null);
    }); 
*/

/* Added to inside of onEachFeature function 
//Function to allow for popup box containing attributes of .geoJSON files
//This can be customized further when the final characteristics fo the .geoJSON are set up
	function popUp(f,l){
		var out = [];
				if (f.properties){
					out.push("<b>Character: </b>" +f.properties.Character);
					out.push("<b>Travel From: </b>" +f.properties.Start);
					out.push("<b>Travel To: </b>" +f.properties.End);
					out.push("<b>Book Section: </b>" +f.properties.Book_Part);
					/*for(key in f.properties){
						out.push(key+": "+f.properties[key]); //pushes out .geoJSON attributes exported from ArcGIS
					}
				}
		l.bindPopup(out.join("<br />"))		
	}*/	
	
	
	
	
	