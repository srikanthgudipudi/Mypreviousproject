/*
var old = alert;
alert = function() {
	console.log(new Error().stack);
	old.apply(window, arguments);
};
*/
/******** MAP INITIALIZATION***** *******************************/
var map;
//var resizeSmallIcon = L.AwesomeMarkers.icon({icon: 'crosshairs',  prefix: 'fa', markerColor: 'white', iconColor: 'grey' });
//var greenSmallIcon 	= L.AwesomeMarkers.icon({icon: 'cog', prefix: 'glyphicon', spin: true, markerColor: 'green', iconColor: 'white' }),
//		redSmallIcon 		= L.AwesomeMarkers.icon({icon: 'move',  prefix: 'fa', markerColor: 'red', iconColor: 'white' }),
//		orangeSmallIcon = L.AwesomeMarkers.icon({icon: 'star', prefix: 'glyphicon', markerColor: 'orange', iconColor: 'white' });
var postSearchZoom = 21;
var onloadInit = function () {
	/******** MAP VARIABLES INITIALISED FROM THE URL PARAMETERS *****/
	//configurl = ....;
	//lat = getAllUrlParams().x;
	//lon = getAllUrlParams().y;
	showFloorMaps = getAllUrlParams().fm === "1" ? true : false;
	floorToShow = getAllUrlParams().fl;
	gaToShow = getAllUrlParams().sga; //-1 implies show all geo areas
	displayControls = getAllUrlParams().dc;
	zoominit = getAllUrlParams().zi;
	zoomfinal = getAllUrlParams().zf;
	startLat = getAllUrlParams().sla;
	startLon = getAllUrlParams().slo;
	endLat = getAllUrlParams().ela;
	endLon = getAllUrlParams().elo;
	//configurl = getAllUrlParams().cu;
	//Overriding parameters for demos
	//Vedic Office
	//lat=17.419932691739724;lon=78.54950973764063;
	//Church
	// lat=-41.18213124945968;
	// lon=174.96020168066025;
	//vedic 2 office
	lat=17.422732747087014;
	lon=78.54488376528025;
	//lat=-41.1821;lon=174.96009;
	//Cincinatti zoo
	//lat=39.14487485818;lon=-84.50819045573;
	//currentFloor = "1";
	zoominit = 20;
	zoomfinal = 20;
	// fm = 1;
	showFloorMaps = "1";
	if (!floorToShow) floorToShow = "0";
	gaToShow = false; //"2";//false;
	displayControls = "1";
	var showFloorResizeMarkers = false;
	var showFloorPathNetwork = false;
	/********* Initialize Map *************************************/
	var MAXZOOM = 25; //For intialization of the map layers
	var ZOOMTHRESHOLD = 19; //Controls after what zoom level bing changes to mapbox
	var overlayMapsLayers = {};
	var baseMapsLayers = initBaseMapLayers(MAXZOOM);
	map = initMap(lat, lon, ZOOMTHRESHOLD, baseMapsLayers, "Bing", "Mapbox");
	flyToLocationAfterDelay(lat, lon, zoomfinal, 0);
	setClickEventsToGetMapLatLon(map);
	
	//var marker = L.marker([lat, lon]).addTo(map);
	/********* MAP VARIABLES TO BE INITIALIZED FROM CONFIG URL ******/
	/**Define GeoAreas(Plots)*****/
	/**GeoArea 1**/
	floor0mapChurchCoords = [[-41.18181, 174.95945], [-41.18181, 174.96093], [-41.18231, 174.95945]];
	floormapChurchCoords = { "0": floor0mapChurchCoords };
	geojsonChurchUrl = "assets/sampledata/samplejsondatachurch.json";
	floormapChurchUrls = { "0": "assets/sampledata/sampleplanchurch.png" };
	floorPathsChurchUrls = { "0": "assets/sampledata/networkchurch.json" };
	floorPathsChurchBounds = [[-41.18181, 174.95945], [-41.18230182811538, 174.96083199977878]];
	//floormapChurchUrlurls = {"0": null};
	floorsChurch = ["0"];
	nameChurch = "Christ Church";
	/**GeoArea 2**/
	floor0mapVedicCoords = [[17.41992213504464, 78.54959540069103], [17.419847278635093, 78.54951795190573], [17.420024302797703, 78.54948304127903]];
	floor1mapVedicCoords = [[17.41991829625516, 78.54958768934013], [17.419848878131347, 78.54951459914447], [17.420010427180593, 78.54949146509172]];
	//floor0mapVedicCoords = [[17.42002, 78.54948],[17.41992, 78.54959],[17.42002, 78.54959]];
	//floor1mapVedicCoords = [[17.42001, 78.54949],[17.41991, 78.54958],[17.41994, 78.54960]];
	floormapVedicCoords = { "0": floor0mapVedicCoords, "1": floor1mapVedicCoords };
	geojsonVedicUrl = "assets/sampledata/samplejsondatavedic.json";
	//floormapVedicUrlurls = {"0":"assets/sampledata/vedic-HMT-F00.png","1":"assets/sampledata/vedic-HMT-F01.png"};
	floormapVedicUrls = { "0": "assets/sampledata/vedic-hmt-f00.png", "1": "assets/sampledata/vedic-hmt-f01.png" };
	floorPathsVedicUrls = { "0": "assets/sampledata/hmt_path.geojson", "1": "assets/sampledata/hmt_path2.geojson" };
	floorPathsVedicBounds = [[17.420021623644043, 78.54941971600057], [17.419844399541805, 78.54960009455681]];
	floorsVedic = ["1", "0"];
	nameVedic = "Vedic Systems";
	/**GeoArea 3**/
	floormapCinzooCoords = { "0": null };
	geojsonCinzooUrl = "assets/sampledata/samplejsondatacinzoo.json";
	floormapCinzooUrls = { "0": null };
	floorPathsCinzooUrls = { "0": "assets/sampledata/networkcinzoo.json" };
	floorPathsCinzooBounds = [[39.1472, -84.51098], [39.14246, -84.50641]];
	floorsCinzoo = ["0"];
	nameCinzoo = "Cincinatti Zoo";
	/**GeoArea 4**/
	floor0mapVedic2Coords = [[17.42284598959744, 78.54490756988527], [17.422726669097184, 78.54502994567157], [17.422721710736894, 78.5447789914906]];
	floor1mapVedic2Coords = [[17.42284598959744, 78.54490756988527], [17.422726669097184, 78.54502994567157], [17.422721710736894, 78.5447789914906]];
	floor2mapVedic2Coords = [[17.42284598959744, 78.54490756988527], [17.422726669097184, 78.54502994567157], [17.422721710736894, 78.5447789914906]];
	floormapVedic2Coords = { "0": floor0mapVedic2Coords, "1": floor1mapVedic2Coords, "2": floor2mapVedic2Coords };
	geojsonVedic2Url = "assets/sampledata/jsondatavedicsnehapuri.json";
	floormapVedic2Urls = { "0": "assets/sampledata/vedic-snehapuri-f00.png", "1": "assets/sampledata/vedic-snehapuri-f01.png", "2": "assets/sampledata/vedic-snehapuri-f02.png" };
	floorPathsVedic2Urls = { "0": "assets/sampledata/vedicsnehapurif0paths.json", "1": "assets/sampledata/vedicsnehapurif1paths.json" };
	floorPathsVedic2Bounds = [[17.422868702069906, 78.54473859071733],[17.422577598335792, 78.54507923126222]];
	// floorPathsVedic2Bounds = ["null"];
	floorsVedic2 = ["2", "1", "0"];
	nameVedic2 = "Vedic 2";
	/**Construct Input Data for Mapping**/
	floormapcoords = [floormapCinzooCoords, floormapVedicCoords, floormapVedic2Coords, floormapChurchCoords];
	geojsonurls = [geojsonCinzooUrl, geojsonVedicUrl, geojsonVedic2Url, geojsonChurchUrl];
	floormapurls = [floormapCinzooUrls, floormapVedicUrls, floormapVedic2Urls, floormapChurchUrls];
	floorpathurls = [floorPathsCinzooUrls, floorPathsVedicUrls, floorPathsVedic2Urls, floorPathsChurchUrls];
	floorpathbounds = [floorPathsCinzooBounds, floorPathsVedicBounds, floorPathsVedic2Bounds, floorPathsChurchBounds];
	floors = [floorsCinzoo, floorsVedic, floorsVedic2, floorsChurch];
	disableClusterAtZoom = [17, 22, 19, 19];
	names = [nameCinzoo, nameVedic, nameVedic2, nameChurch];
	/********* Update Map with Input Data *************************************/
	var numGeoAreas = geojsonurls.length;
	var searchDataLayer = L.layerGroup();
	geoArea = 0;
	if (gaToShow) { //Modify loop parameters to show only the gaToShow or all layers
		geoArea = parseInt(gaToShow);
		if (geoArea >= 0 && geoArea < numGeoAreas)
			numGeoAreas = geoArea + 1;
	}
	for (; geoArea < numGeoAreas; ++geoArea) {
		gaName = names[geoArea];
		//overlayMapsLayers[gaName]=L.layerGroup.GeoArea();
		overlayMapsLayers[gaName] = L.layerGroup.GeoArea();
		overlayMapsLayers[gaName].addGeoAreaDetails({
			gaName: gaName,
			gaGeojsonurl: geojsonurls[geoArea],
			gaFloorMapsUrls: floormapurls[geoArea],
			gaFloormapcoords: floormapcoords[geoArea],
			gaFloorPathUrls: floorpathurls[geoArea],
			gaFloorPathBounds: floorpathbounds[geoArea],
			gaFloors: floors[geoArea],
			gaShowFloorMaps: showFloorMaps,
			gaShowFloorPathNetwork: showFloorPathNetwork,
			showFloorResizeMarkers: showFloorResizeMarkers,
			floorToShow: floorToShow,
			disableClusterAtZoom: disableClusterAtZoom[geoArea],
			map: map
		});
		searchDataLayer.addLayer(overlayMapsLayers[gaName]);
		//addSearchControl(overlayMapsLayers[gaName]);
		overlayMapsLayers[gaName].addTo(map);
	}
	if (displayControls && parseInt(displayControls) === 1) {
		L.control.layers(baseMapsLayers, overlayMapsLayers, { position: 'bottomleft' }).addTo(map);
		addSearchControl(searchDataLayer);
		map.addControl(new L.Control.Zoom());
		map.addControl(new L.control.fullscreen());
		lc = L.control.locate({
			strings: {
				title: "Show me where I am, yo!"
			}
		}).addTo(map);
	}
	if (startLat && startLon && endLat && endLon) {
		thisGeoArea = overlayMapsLayers[gaName];
		flShow = thisGeoArea.floorToShow;
		setTimeout(function () {
			showRoute(startLat, startLon, endLat, endLon);
			// showIndoorRoute(thisGeoArea.map,thisGeoArea.gaFloorPathUrls[flShow],thisGeoArea.gaShowFloorPathNetwork,startLat,startLon,endLat,endLon,false);
		}, 2000)
	}
}
function initMap(lat, lon, zoomthreshold, baseMapsLayers, initialMapLayer) {
	var map = L.map('mapid', {
		fullscreenControl: false,
		zoomControl: false,
		//zoomAnimationThreshold: 10,
		zoomAnimation: false, //needed during zooming
		//markerZoomAnimation: false,
		contextmenu: true,
		contextmenuWidth: 140,
		contextmenuItems: [{
			text: 'Show coordinates',
			callback: showCoordinates
		}, {
			text: 'Center map here',
			callback: centerMap
		}, '-', {
			text: 'Zoom in',
			icon: 'dist/images/zoom-in.png',
			index: 0,
			callback: zoomIn
		}, {
			text: 'Zoom out',
			icon: 'dist/images/zoom-out.png',
			index: 1,
			callback: zoomOut
		}, '-', { text: 'Outdoors', disabled: true }, {
			text: 'Directions from',
			icon: 'dist/images/play.png',
			callback: setOFromLatLon
		}, {
			text: 'Directions to',
			icon: 'dist/images/pause.png',
			callback: setOToLatLon
		}, {
			text: 'Clear',
			icon: 'dist/images/layers.png',
			callback: clearOPath
		}]
	}).setView([lat, lon], zoominit);
	
	L.control.scale({
		imperial: false
	}).addTo(map);
	baseMapsLayers[initialMapLayer].addTo(map);
	map.on('zoomend', function () {
		if (map.getZoom() > zoomthreshold) {
			if (map.hasLayer(baseMapsLayers.Bing)) map.removeLayer(baseMapsLayers.Bing);
			baseMapsLayers.Mapbox.addTo(map);
		}/*
					else {
						if (map.hasLayer(baseMapsLayers.Mapbox)) map.removeLayer(baseMapsLayers.Mapbox);
						baseMapsLayers.Bing.addTo(map);
					}*/
	});
	return map;
}
function showCoordinates(e) {
	alert(e.latlng);
}
function centerMap(e) {
	map.panTo(e.latlng);
}
function zoomIn(e) {
	map.zoomIn();
}
function zoomOut(e) {
	map.zoomOut();
}
function setOFromLatLon(e) {
	console.log("pigeonmapcontrol:setOFromLatLon:" + e.latlng);
	showRoute(e.latlng.lat, e.latlng.lng, null, null);
}
function setOToLatLon(e) {
	console.log("pigeonmapcontrol:setOToLatLon:" + e.latlng);
	showRoute(null, null, e.latlng.lat, e.latlng.lng);
}
function clearOPath(e) {
	console.log("pigeonmapcontrol:clearOPath:" + e.latlng);
	removeOutdoorRoute();
}
//*******************START MAP PROVIDERS ********************************//
function initBaseMapLayers(mZoom) {
	mapboxMapLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: mZoom,
		attribution: 'Pigeon © <a href="http://www.srisys.com">SRISYS</a>',
		id: 'mapbox.streets',
		//id: 'mapbox.satellite',
		//These should reduce memory usage
		opacity: 0.8,
		zIndex: -1,
		unloadInvisibleTiles: true,
		updateWhenIdle: true,
		reuseTiles: true
	});
	osmMapLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: mZoom,
		attribution: 'Pigeon © <a href="http://www.srisys.com">SRISYS</a>',
		//These should reduce memory usage
		opacity: 0.8,
		zIndex: -1,
		unloadInvisibleTiles: true,
		updateWhenIdle: true,
		reuseTiles: true
	});
	var BING_KEY = 'AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L';
	var bingOptions = {
		bingMapsKey: BING_KEY, // Required
		imagerySet: 'AerialWithLabels',
		maxZoom: mZoom,
		attribution: 'Pigeon © <a href="http://www.srisys.com">SRISYS</a>',
		//These should reduce memory usage
		opacity: 0.8,
		zIndex: -1,
		unloadInvisibleTiles: true,
		updateWhenIdle: true,
		reuseTiles: true
	};
	bingMapLayer = L.tileLayer.bing(bingOptions);
	return { "Mapbox": mapboxMapLayer, "OSM": osmMapLayer, "Bing": bingMapLayer };
}
//*********************END MAP PROVIDERS ********************************//
/****** START GEOJSON LOADING **************************/
function addSearchControl(geojson) {
	var controlSearch = new L.Control.Search({
		// use buildTip for customising info in the search dropdown
		buildTip: function (text, val) {
			var fleetid = val.layer.feature.properties.fleetid;
			var mImg = val.layer.feature.properties.image;
			if (mImg)
				return '<a><img src="' + mImg + '"></img>' + fleetid + ' <b>' + text + '</b></a>';
			else
				return '<a>' + fleetid + ' <b>' + text + '</b></a>';
		},
		position: 'topleft',
		propertyName: 'fleetname', // lookup property in geoJson
		layer: geojson,
		initial: false,
		//zoom: 10,
		moveToLocation: function (latlng, title, map) {
			//        console.log(title); 
			map.flyTo(latlng, postSearchZoom, {
				duration: 5,
				animate: true
			});
		},
		//marker: false
		marker: {
			//icon: L.AwesomeMarkers.icon({icon: 'user',  prefix: 'fa', markerColor: 'blue', iconColor: 'white' }),
			icon: null,
			//circle: {radius: 20,color: '#0a0',opacity: 1}
			circle: { radius: 20, color: '#0a0' }
		}
	});
	controlSearch.on('search:locationfound', function (e) {
		var focussedMarker = e.layer;
		popupFeatureProperties(focussedMarker, e.latlng);
		e.layer.openPopup();
	});
	controlSearch.on('search:collapsed', function (e) {
		//e.layer.closePopup();
	});
	map.addControl(controlSearch);
	//		map.removeLayer(geojson);
}
/************************** END GEOJSON LOADING **************************/
var selectedMarker = null;
function markLocation(map, mlat, mlon, mfleetname) {
	if (selectedMarker != null) map.removeLayer(selectedMarker);
	selectedMarker = L.marker([mlat, mlon], { icon: redIcon });
	selectedMarker.addTo(map).on('click', displayFleetInfo2).fleetname = mfleetname;
}
function animateToLocationAfterDelay(mlat, mlon, zfinal, delay) {
	var ilat = -41.1821, ilon = 174.96056;
	showRoute(ilat, ilon, mlat, mlon);
	setTimeout(function () {
		map.flyTo([(ilat + 3 * mlat) / 4, (ilon + 3 * mlon) / 4], zfinal - 0.5);
		map.on('zoomend', mf = function () {
			//Sreenadh: Needed for the manual zoom to work after flyto
			map.off('zoomend', mf);
			map.setZoom(zfinal);
		});
	}, delay);
}
function flyToLocationAfterDelay(mlat, mlon, zfinal, delay) {
	setTimeout(function () {
		map.flyTo([mlat, mlon], zfinal, { animate: true });
		map.on('zoomend', mf = function () {
			//Sreenadh: Needed for the manual zoom to work after flyto
			map.off('zoomend', mf);
			map.setZoom(zfinal);
		});
	}, delay);
}
function setClickEventsToGetMapLatLon(map) {
	map.on('click', function (e) {
		var popup = L.popup();
		var rlayer;
		var latlng = map.mouseEventToLatLng(e.originalEvent);
		console.log("pigeonmapcontrol-->setClickEventsToGetMapLatLon-->" + latlng.lat + ', ' + latlng.lng);
		//alert("You clicked the map at " + e.latlng);
		/*
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(map);
		*/
		//showRoute(e.latlng.lat,e.latlng.lng,174.960,lat,lon);
		//showRoute(e.latlng.lat,e.latlng.lng,-41.1821, 174.96056);
	})
}
var routingControl = null;
var fromLatLon = null, toLatLon = null;
function removeOutdoorRoute() {
	map.removeControl(routingControl);
	routingControl = null;
	fromLatLon = null;
	toLatLon = null;
}
function showRoute(startLat, startLon, endLat, endLon) {
	if (startLat) {
		fromLatLon = L.latLng(startLat, startLon);
	}
	if (endLat) {
		toLatLon = L.latLng(endLat, endLon);
	}
	if (fromLatLon && toLatLon) {
		startLat = fromLatLon.lat;
		startLon = fromLatLon.lng;
		endLat = toLatLon.lat;
		endLon = toLatLon.lng;
	} else
		return;
	if (routingControl != null) {
		alert("set waypoint: " + startLat + ":" + startLon + "::" + endLat + ":" + endLon);
		// Remove previous routes
		routingControl.setWaypoints([
			L.latLng(startLat, startLon),
			L.latLng(endLat, endLon)
		]);
	}
	else {
		//alert("create control: "+startLat+":"+startLon+"::"+endLat+":"+endLon);
		routingControl = L.Routing.control({
			createMarker: function (i, wp) {
				return L.marker(wp.latLng, {
					icon: L.icon.glyph({ prefix: '', glyph: i + 1 }),
					draggable: true
				})
			},
			routeWhileDragging: true,
			waypoints: [
				L.latLng(startLat, startLon),
				L.latLng(endLat, endLon)
			],
			//router: L.Routing.mapbox('sk.eyJ1Ijoic3JlZW5hZGgiLCJhIjoiY2o2dWh3YWtzMTVqOTMycW9oOGUzdXdndiJ9.pjOFFeVBwcjTmk71vxEomA'),
			router: L.Routing.graphHopper('dcd2db33-aafc-404b-ae96-2e0f098d7d31', { urlParameters: { vehicle: 'foot' } }),
			//router: L.Routing.graphHopper(undefined, {serviceUrl: 'http://localhost:8989/route',urlParameters: {vehicle: 'foot'}}),
			routeDragTimeout: 250,
			waypointMode: 'snap',
            collapsible: true,
            summaryTemplate: '<h2>'+localStorage.getItem('directions')+' {name}</h2><h3>'+localStorage.getItem('distance')+': {distance}, '+localStorage.getItem('duration')+': {time}</h3>',
			showAlternatives: true,
			altLineOptions: {
				styles: [
					{ color: 'black', opacity: 0.15, weight: 9 },
					{ color: 'white', opacity: 0.8, weight: 6 },
					{ color: 'blue', opacity: 0.5, weight: 2 }
				]
			}
		});
		routingControl.addTo(map);
		routingControl.on('routingerror', function (e) {
			try {
				map.getCenter();
			} catch (e) {
				map.fitBounds(L.latLngBounds(waypoints));
			}
			handleError(e);
		});
		L.Routing.errorControl(routingControl).addTo(map);
	}
}
