
var lrObj = '';
L.LayerGroup.GeoArea = L.FeatureGroup.extend({
    //***** Input Parameters ************
    gaName: null,
    gaGeojsonurl: null,
    floorid: null,
    gaFloorMapsUrls: [],
    gaFloormapcoords: [],
    gaFloorPathUrls: [],
    gaFloorPathBounds: [],
    gaFloors: [],
    gaFloorIds: [], // to get floors ids
    gaShowFloorMaps: true,
    showFloorResizeMarkers: false,
    gaShowFloorPathNetwork: false,
    floorToShow: "0",
    disableClusterAtZoom: "17",
    map: null,
    feature: null, // To get feature data
    gaPopupCallback: null,
    gaHitMapCallback: null,
    //***** Processed Parameters ********
    gaFloorSelectionControl: null,
    // gaFloorSelectionControlHeatMap: null,
    gafloorMap: null,
    rectForIndoorContextMenu: null,
    specialPOIs: {},

    createFloorSelectionControl: function () {
        var localFloorIds = this.gaFloorIds; // floor ids
        if (this.gaFloors === 0) {
            // Name & level show only when the floor map is Available.
            options = [];
        } else {
            options = [];
            for (i = 0; i < this.gaFloors.length; i++) {
                options[i] = {};
                options[i].content = "" + this.gaFloors[i];
                options[i].bgColor = 'grey';
                options[i].position = 'bottomright';
                options[i].highColor = '#555599';
            }
            options[i] = {};
            options[i].content = '<p style="color:white">' + this.gaName + '</p>';
            options[i].bgColor = '#333333';
            options[i].position = 'bottomright';
            options[i].highColor = '#333333';
        }

        // Initialize floor selection control
        this.gaFloorSelectionControl = L.functionButtons(options);
        // Set initial floor selection based on floorToShow
        floorIndex = this.gaFloors.indexOf(this.floorToShow);
        if (floorIndex < 0) floorIndex = this.gaFloors.length;
        this.gaFloorSelectionControl.setSelectedButton(floorIndex);
        // Initialize onClick of the floor selection callback
        var thisLayer = this; //Needed to access this in callback
        this.gaFloorSelectionControl.on('clicked', function (data) {
            map.closePopup();
            if (data.idx == thisLayer.gaFloors.length) { //if allfloors are selected
                thisLayer.floorToShow = "";
                thisLayer.updateMap();
            } else {
                this.floorid = localFloorIds[thisLayer.gaFloors[data.idx]]
                lrObj.floorid = this.floorid;
                thisLayer.floorToShow = thisLayer.gaFloors[data.idx];
                thisLayer.enableHeatMap(this.floorid);
            }
            //  thisLayer.updateMap();
        });
    },

    createFloorSelectionControlHeatMap: function () {
        // options = { content: "Reload", bgColor: "grey", position: "topleft", highColor: "#555599" }
        // Initialize floor selection control
        // this.gaFloorSelectionControlHeatMap = L.functionButtons(options);
        // Set initial floor selection based on floorToShow
        var thisLayer = this; //Needed to access this in callback
        lrObj = this;
        // this.gaFloorSelectionControlHeatMap.on('clicked', function (data) {
        // }
        // );
    },
    addGeoAreaDetails: function (options) {
        this.gaName = options.gaName;
        this.gaGeojsonurl = options.gaGeojsonurl;
        this.gaFloorMapsUrls = options.gaFloorMapsUrls;
        this.gaFloormapcoords = options.gaFloormapcoords;
        this.gaFloorPathUrls = options.gaFloorPathUrls;
        this.gaFloorPathBounds = options.gaFloorPathBounds;
        this.gaFloors = options.gaFloors;
        this.gaFloorIds = options.gaFloorIds;
        this.gaShowFloorMaps = options.gaShowFloorMaps;
        this.gaShowFloorPathNetwork = options.gaShowFloorPathNetwork;
        this.showFloorResizeMarkers = options.showFloorResizeMarkers;
        this.floorToShow = options.floorToShow; //a==> all floors
        this.disableClusterAtZoom = options.disableClusterAtZoom;
        this.map = options.map;
        this.gaPopupCallback = options.gaPopupCallback;
        if (this.gaFloors != 0) { // hide heat map button 
            this.createFloorSelectionControl();
            this.createFloorSelectionControlHeatMap();
        }
    },
    enableHeatMap: function (floorid) { // To enable heat map 
        this.clearLayers(); //Clear any existing markers, images.. in layers
        this.removeFloorMap();
        this.specialPOIs = {};
        var hitmaprul;
        if ((floorid != null) && (parseInt(getAllUrlParams().cufloorid) !== floorid)) {
            hitmaprul = localStorage.getItem('apiendpoint') + '/api/v1/fleet/' + floorid; // To get floor level heat map data based on floor level fleet id api
     } else {
            hitmaprul = localStorage.getItem('apiendpoint') + '/api/v1/' + 'fleet/' + getAllUrlParams().cfid; // To get floor level heat map data based on current fleet id api
     }
        addGeoAreaOverlayToenableHeatMap(this,
            hitmaprul, this.gaFloorMapsUrls, this.gaFloormapcoords, this.gaFloors, this.floorToShow, this.disableClusterAtZoom);
        this.addFloorMap();
    },
    updateMap: function () {
        this.clearLayers(); //Clear any existing markers, images.. in layers
        this.removeFloorMap();
        this.specialPOIs = {};
        // lrObj.enableHeatMap(lrObj.floorid);
        addGeoAreaOverlay(this,
            this.gaGeojsonurl, this.gaFloorMapsUrls, this.gaFloormapcoords, this.gaFloors, this.floorToShow, this.disableClusterAtZoom);
        this.addFloorMap();
    },
    addFloorMap: function () {
        if (!this.gaShowFloorMaps) return;
        floor = this.floorToShow;
        if (this.gaFloors.indexOf(floor) >= 0)
            this.gafloorMap = addFloorMapOverlay(this.gaFloorMapsUrls[floor], this.gaFloormapcoords[floor], this.showFloorResizeMarkers);
        else
            this.gafloorMap = null;
        if (this.gafloorMap != null) this.gafloorMap.addTo(this.map);

    },
    addIndoorContextMenu: function () {
        if (this.rectForIndoorContextMenu != null) this.map.removeLayer(this.rectForIndoorContextMenu); //Clear any previous rects
        removeIndoorRoute();
        removePrevIndoorCoords();
        if (this.gaFloorPathBounds != null) {
            this.rectForIndoorContextMenu = L.polygon(this.gaFloorPathBounds, {
                color: 'black',
                weight: 3.5,
                fillOpacity: 0.03,
                interactive: true
            });
            this.rectForIndoorContextMenu.addTo(this.map);
            bindIndNavContextMenu(this.rectForIndoorContextMenu, this);
            //  bindIndNavContextMenu(this.rectForIndoorContextMenu, this);
            this.rectForIndoorContextMenu.on('contextmenu', function (e) {
                flShow = this.floorToShow;
                if (flShow === "") flShow = this.gaFloors[0];
                initializeRouter(this.map, this.gaFloorPathUrls[flShow]);
                //   showIndoorRoute(this.map, this.gaFloorPathUrls[flShow], this.gaShowFloorPathNetwork, null, null, null, null, false);
            }.bind(this));
        }
    },
    addFloorMapSelectionControl: function () {
        if (!this.gaShowFloorMaps) return;
        if (this.gaFloorSelectionControl != null) {
            this.gaFloorSelectionControl.addTo(this.map)
            // if (this.gaFloorSelectionControlHeatMap != null)
            //     this.gaFloorSelectionControlHeatMap.addTo(this.map)
        };
    },
    removeFloorMap: function () {
        console.log(this.gafloorMap);
        if (this.gafloorMap != null) this.gafloorMap.remove();

    },
    removeFloorMapSelectionControl: function () {
        if (this.gaFloorSelectionControl != null) {
            this.gaFloorSelectionControl.remove();
            // if (this.gaFloors != 0)
            // this.gaFloorSelectionControlHeatMap.remove()
        };
    },
    onRemove: function () {
        this.clearLayers();
        this.removeFloorMap();
        this.removeFloorMapSelectionControl();
        L.LayerGroup.prototype.onRemove.call(this, this.map);
    },
    onAdd: function () {
        this.clearLayers(); //Clear any existing markers, images.. in layers
        this.removeFloorMap();
        this.removeFloorMapSelectionControl();
        this.specialPOIs = {};
        addGeoAreaOverlay(this,
            this.gaGeojsonurl, this.gaFloorMapsUrls, this.gaFloormapcoords, this.gaFloors, this.floorToShow, this.disableClusterAtZoom);
       // this.addFloorMap(); // Already calling addFloorMap function in enableHeatMap function at layer loading time
        this.addFloorMapSelectionControl();
        L.LayerGroup.prototype.onAdd.call(this, this.map);
    },
    /****** START GEOJSON LOADING **************************/
    onEachFeature: function (feature, layer) {
        //Store the JSON feature properties to the layer to retrieve and display during onclick
        layer.properties = feature.properties;
        if (this.gaPopupCallback) {
            layer.on('click', gaPopupCallback);
        } else {
            layer.on('click', displayFleetInfo);
        }
        if (feature.properties.special === "true") {
            if (!(feature.properties.fleetType in this.specialPOIs)) {
                this.specialPOIs[feature.properties.fleetType] = [
                    [feature.geometry.coordinates[1], feature.geometry.coordinates[0]]
                ];
                this.specialPOIs[feature.properties.fleetType].icontype = feature.properties.iconname;
            }
            else
                this.specialPOIs[feature.properties.fleetType].push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]);
        }
        return;
    },
    pointToLayer: function (feature, latlng) {
        //return L.marker(latlng);
        if (feature.fleetId == parseInt(getAllUrlParams().cfleetid)) { // to set pin for normal floor plan
            feature.properties.pin = "asset-icon-marker bgcolor";
        }
        if (feature.properties) {
            var iconName = feature.properties.iconname;
            var iconColor = feature.properties.iconcolor;
            if (iconColor) {
                var gIcon;
                if (iconName) {
                    gIcon =
                        createIcon(iconName, iconColor, feature.properties.pin);
                }
                //        gIcon = createDivIcon(iconColor);
                else {
                    if (getAllUrlParams().fp == 'true' && iconName == '') {
                        if (feature.properties.pin != undefined) {
                            iconName = 'asset-icon-marker bgcolor';
                            iconColor = 'red';
                        } else {
                            iconName = '';
                            iconColor = '';
                        }
                    } else {
                        iconName = 'asset-icon-marker bgcolor';
                    }
                    gIcon =
                        createIcon(iconName, iconColor, feature.properties.pin);
                }
                //                gIcon = createDivIcon(iconColor);
                return L.marker(latlng, { icon: gIcon });
            }
        }
    },
    filterGeoJsonOpts: function (mIconColor, floor) {
        var geojsonOpts = {
            pointToLayer: this.pointToLayer.bind(this),
            onEachFeature: this.onEachFeature.bind(this),
            filter: function (feature, layer) {
                if (feature.properties.iconcolor && feature.properties.iconcolor === mIconColor) {
                    //iconcolor matches the cluster color
                    if (floor === null) return true; // Show all floors
                    if ((!feature.properties.level && floor === "0") //level is not defined in json or current floor is zero
                        ||
                        (feature.properties.level === floor)) // level is defined in json and matches the current floor
                        return true;
                    else return false;
                } else return false;
            }
        };
        return geojsonOpts;
    },
    filterGeoJsonOptsNotIn: function (mIconColors, floor) {
        var geojsonOpts = {
            pointToLayer: this.pointToLayer.bind(this),
            onEachFeature: this.onEachFeature.bind(this),
            filter: function (feature, layer) {
                if (mIconColors.indexOf(feature.properties.iconcolor) > -1)
                    return false;
                //iconcolor not in the set of predefined cluster colors
                if (floor === null) return true; // Show all floors
                if ((!feature.properties.level && floor === "0") //level is not defined in json but current floor is zero
                    ||
                    (feature.properties.level === floor)) // level is defined in json and matches the current floor
                    return true;
                else
                    return false;
            }
        };
        return geojsonOpts;
    },
    createMarkerCluster: function (mColor, position, disableClusterAtZoom) {
        return L.markerClusterGroup({
            iconCreateFunction: function (cluster) {
                var markers = cluster.getAllChildMarkers();
                numPins = 0;
                for (i = 0; i < markers.length; i++) {
                    if (markers[i].properties.pin) numPins++;
                }
                var options = {
                    iconSize: [30, 30],
                    iconAnchor: position,
                    isAlphaNumericIcon: true,
                    text:
                    // '<div style="line-height:70%;">' +
                    // numPins +
                    //   '<br>--<br>' +
                    markers.length,
                    //  '</div>',
                    iconShape: 'circle',
                    borderColor: 'white',
                    backgroundColor: mColor,
                    textColor: 'white',
                    innerIconStyle:
                    'font-weight:bold;font-size:10px;padding-top:8px;'
                };
                return L.BeautifyIcon.icon(options);
            },
            // spiderfyOnMaxZoom: true,
            //singleMarkerMode: true,
            disableClusteringAtZoom: disableClusterAtZoom
        });
    }
});

function updateOtherProperties(dataObj, displayproperties, otherproperties, displayColumns) {
    $.each(dataObj, function (index, value) {
        if (displayproperties.indexOf(index) > -1) {
            var concatOp = '';
            var oldValue = otherproperties[displayColumns[displayproperties.indexOf(index)]];
            var indexValue = displayColumns[displayproperties.indexOf(index)];
            if (indexValue == 'Fleet Address' || indexValue == 'Resource Address' || indexValue == 'Address') {
                concatOp = ', ';
            } else if (indexValue == 'Resource Name' || indexValue == 'User Name') {
                concatOp = ' ';
            } else if (indexValue == 'Work #' || indexValue == 'Mobile #') {
                var valuearr = value.split('-');
                if (valuearr.length == 2) {
                    value = valuearr[0].trim();
                }
                var concatOp = '-';
            }
            if (!oldValue) {
                otherproperties[displayColumns[displayproperties.indexOf(index)]] = value;
            } else if (oldValue && value && value != 'null' && concatOp) {
                otherproperties[displayColumns[displayproperties.indexOf(index)]] = otherproperties[displayColumns[displayproperties.indexOf(index)]] + concatOp + value;
            }
        } else if (typeof (value) == 'object' && value != null && displayproperties.indexOf(index) <= -1) {
            updateOtherProperties(value, displayproperties, otherproperties, displayColumns);
        }
    });
}

function displayFleetInfo(e) {
    feature = e.target;
    popupLocation = e.latlng;
    var popupContent = '<iframe src="https://www.youtube.com/embed/1?autoplay=1"></iframe>';
    var popup = L.popup({ maxHeight: 100, maxWidth: 100 });
    popup
        .setLatLng(popupLocation)
        .setContent(popupContent)
        .openOn(map);
};

/*
** Create separate clusters for each of the iconColors and club the
remaining in blue
*/
function addGeoJsonFloorLayer(geoAreaLayer, json, floor, disableClusterAtZoom) {
    //geoAreaLayer.gaGeoJsonLayers[floor]=new L.LayerGroup();
    // this.totaljson = json;
    var iconColors = getUniqueColorPropertiesFromJson(json);// ["Red", "Yellow", "Green"];
    var i, s, len = iconColors.length;
    var geojsonOpts, geojson, markercluster;
    var geojsonOpts =
        geoAreaLayer.filterGeoJsonOptsNotIn(iconColors, floor);
    // Automatically calculate the disablecluster at zoom if it is -1
    if (disableClusterAtZoom === -1) {
        var geojson = L.geoJSON(json);
        disableClusterAtZoom = map.getBoundsZoom(geojson.getBounds());
    }
    geojson = L.geoJSON(json, geojsonOpts);
    var cIconX = 0,
        cIconY = 0; //to prevent overlap of cluster icons
    if (Object.keys(geojson._layers).length > 0) {
        var markerCluster =
            geoAreaLayer.createMarkerCluster("blue", [0, 0], disableClusterAtZoom);
        markerCluster.addLayer(geojson);
        geoAreaLayer.addLayer(markerCluster);
        cIconX += 30;
    }

    for (i = 0; i < len; ++i) {
        mColor = iconColors[i];
        geojsonOpts = geoAreaLayer.filterGeoJsonOpts(mColor, floor);
        geojson = L.geoJSON(json, geojsonOpts);
        if (Object.keys(geojson._layers).length > 0) {
            markerCluster =
                geoAreaLayer.createMarkerCluster(mColor, [cIconX, cIconY], disableClusterAtZoom);
            cIconX += 30;
            markerCluster.addLayer(geojson);
            geoAreaLayer.addLayer(markerCluster);
        }
    }
}
function addGeoAreaOverlayToenableHeatMap(geoAreaLayer, gaGeojsonurl, gaFloorMapsUrls, gaFloormapcoords, gaFloors, floorToShow, disableClusterAtZoom) {
    if (gaGeojsonurl != null) {
        $.getJSON(gaGeojsonurl,
            createCallback(geoAreaLayer, gaGeojsonurl, gaFloorMapsUrls, gaFloormapcoords, gaFloors, floorToShow, disableClusterAtZoom));
    }
}
function addGeoAreaOverlay(geoAreaLayer, gaGeojsonurl, gaFloorMapsUrls, gaFloormapcoords, gaFloors, floorToShow, disableClusterAtZoom) {
    if (getAllUrlParams().ut === 'locate' && geojsonUrl.substring(0, 2) === 'lc') {
        fn = createCallback(geoAreaLayer, gaGeojsonurl, gaFloorMapsUrls, gaFloormapcoords, gaFloors, floorToShow, disableClusterAtZoom);
        fn(JSON.parse(localStorage.getItem(gaGeojsonurl)));
        if (floorToShow) { // If floortoshow not equal to empty we can call Heat map method
            // this.removeFloorMap();
            geoAreaLayer.enableHeatMap(lrObj.floorid); // Enabled heatmap
        }
    } else if (gaGeojsonurl != null) {
        $.getJSON(gaGeojsonurl,
            createCallback(geoAreaLayer, gaGeojsonurl, gaFloorMapsUrls, gaFloormapcoords, gaFloors, floorToShow, disableClusterAtZoom));
    }
}

function createCallback(geoAreaLayer, gaGeojsonurl, gaFloorMapsUrls, gaFloormapcoords, gaFloors, floorToShow, disableClusterAtZoom) {
    return function (json) {

        if (json.result !== undefined) { // check fleet json data formate
            json = json.result; 
        }
        var numFloors = gaFloors.length;

        if ((floorToShow === null) || (gaFloors.indexOf(floorToShow) < 0)) {
            addGeoJsonFloorLayer(geoAreaLayer, json, null, disableClusterAtZoom);
        } else {
            addGeoJsonFloorLayer(geoAreaLayer, json, floorToShow, disableClusterAtZoom);
        }
        geoAreaLayer.addIndoorContextMenu();
    }
}
//***************************FLOOR MAP FUNCTIONS******************************************/
function addFloorMapOverlay(imgurl, mFloorMapCoords, showEdgeMarkers) {
    var overlay;
    var marker1, marker2, marker3;

    function repositionFloorMap() {
        overlay.reposition(marker1.getLatLng(), marker2.getLatLng(), marker3.getLatLng());
    };
    if (imgurl == null) {
        return null;
    }
    var point1 = mFloorMapCoords[0], //L.latLng(mltx, mlty),
        point2 = mFloorMapCoords[1], //L.latLng(mrtx, mrty),
        point3 = mFloorMapCoords[2]; //L.latLng(mrbx, mrby);
    // Infer coordinate of bottom right
    // var point4 = [point2[0]-point1[0]+point3[0],point2[1]-point1[1]+point3[1]]
    // rect=   L.rectangle([point1,point2,point3,point4], {color: 'red', weight: 1, fillOpacity: 0.03, interactive: true}).addTo(map);
    // rect.bindContextMenu({
    //      contextmenu: true,
    //      contextmenuInheritItems: true,
    //      contextmenuItems: [ {
    //      text: 'Polygon marker item' }]
    //  });
    if (showEdgeMarkers) {
        marker1 = L.marker(point1, {
            draggable: true
        }).addTo(map).bindPopup("HELLO: " + imgurl);
        marker2 = L.marker(point2, {
            draggable: true
        }).addTo(map).bindPopup("HELLO: " + imgurl);;
        marker3 = L.marker(point3, {
            draggable: true
        }).addTo(map).bindPopup("HELLO: " + imgurl);;
        marker1.on('drag dragend', repositionFloorMap).on('click', getPreciseLocationDetails);
        marker2.on('drag dragend', repositionFloorMap).on('click', getPreciseLocationDetails);
        marker3.on('drag dragend', repositionFloorMap).on('click', getPreciseLocationDetails);

        function getPreciseLocationDetails(ev) {
            var latlng = map.mouseEventToLatLng(ev.originalEvent);

        }
    }
    //overlay = L.imageOverlay(imgurl,[point2,point3]);
    overlay = L.imageOverlay.rotated(imgurl, point1, point2, point3, {
        opacity: 1,
        //	interactive: true
        //	attribution: "&copy; <a href='http://christ-church.org.nz/'>CHRIST CHURCH</a>"
    });
    //map.addLayer(overlay);
    return overlay;
}

function getContextMenuItems(thisGeoArea) {
    var t = [{
        text: thisGeoArea.gaName + ": " + thisGeoArea.floorToShow,
        disabled: true
    }, {
        text: 'Directions from',
        icon: '../dist/images/play.png',
        callback: setIFromLatLon
    }, {
        text: 'Directions to',
        icon: '../dist/images/pause.png',
        callback: setIToLatLon
    }, {
        text: 'Clear',
        icon: '../dist/images/layers.png',
        callback: clearIPath
    }
    ];
    /*

       for (var poi in thisGeoArea.specialPOIs) {

           menuItem={
               text: poi,
               icon: 'dist/images/run.png',
               callback: (function(mPoi){
                               return function(e){
                                   showIndoorNearestPOIRoute(
                                       thisGeoArea.map,
                                       thisGeoArea.gaFloorPathUrls[thisGeoArea.floorToShow],
                                       thisGeoArea.gaShowFloorPathNetwork,
                                       e.latlng.lat,e.latlng.lng,
                                       thisGeoArea.specialPOIs[mPoi],
                                       true
                                   )
                               }
                           })(poi)
           };
           t.push(menuItem);
       }
       */
    /*Another iteration syntax*/
    Object.keys(thisGeoArea.specialPOIs)
        .map(function (poi) {

            menuItem = {
                text: poi,
                iconCls: thisGeoArea.specialPOIs[poi].icontype,
                /* callback: function (e) {
                     showIndoorNearestPOIRoute(
                         thisGeoArea.map,
                         thisGeoArea.gaFloorPathUrls[thisGeoArea.floorToShow],
                         thisGeoArea.gaShowFloorPathNetwork,
                         e.latlng.lat, e.latlng.lng,
                         thisGeoArea.specialPOIs[poi],
                         true
                     )
                 }*/
                callback: function (e) {
                    //showIndoorNearestPOIRoute(
                    showIndoorShortestMultiplePOIRoute(
                        // thisGeoArea.map,
                        // thisGeoArea.gaFloorPathUrls[thisGeoArea.floorToShow],
                        //  thisGeoArea.gaShowFloorPathNetwork,
                        e.latlng.lat, e.latlng.lng,
                        thisGeoArea.specialPOIs[poi],
                        true,
                        thisGeoArea.gaShowFloorPathNetwork
                    )
                }
            };
            t.push(menuItem);
        });

    function setIFromLatLon(e) {
        flShow = thisGeoArea.floorToShow;
        if (flShow === "") flShow = thisGeoArea.gaFloors[0];
        showIndoorRoute(e.latlng.lat, e.latlng.lng, null, null, false, thisGeoArea.gaShowFloorPathNetwork);
        // showIndoorRoute(thisGeoArea.map, thisGeoArea.gaFloorPathUrls[flShow], thisGeoArea.gaShowFloorPathNetwork, e.latlng.lat, e.latlng.lng, null, null, false);
    }

    function setIToLatLon(e) {
        flShow = thisGeoArea.floorToShow;
        if (flShow === "") flShow = thisGeoArea.gaFloors[0];
        showIndoorRoute(null, null, e.latlng.lat, e.latlng.lng, false, thisGeoArea.gaShowFloorPathNetwork);
        //  showIndoorRoute(thisGeoArea.map, thisGeoArea.gaFloorPathUrls[flShow], thisGeoArea.gaShowFloorPathNetwork, null, null, e.latlng.lat, e.latlng.lng, false);
    }

    function clearIPath(e) {

        removeIndoorRoute();
        removePrevIndoorCoords();
    }
    return t;
}

function bindIndNavContextMenu(mObject, thisGeoArea) {
    mObject.bindContextMenu({
        contextmenu: true,
        contextmenuInheritItems: true,
        contextmenuItems: getContextMenuItems(thisGeoArea)
    });
}

function getUniqueColorPropertiesFromJson(varjson) {
    //return ["red","orange","blue"];  
    temp = {}

    // Store each of the elements in an object keyed of of the name field.  If there is a collision (the name already exists) then it is just replaced with the most recent one.
    if (varjson.features) {
        for (var i = 0; i < varjson.features.length; i++) {
            temp[varjson.features[i].properties.iconcolor] = varjson.features[i].properties.iconcolor;
        }
    }
    colorArray = [];
    // Push each of the values back into the array.
    for (var o in temp) {
        colorArray.push(temp[o]);
    }
    return colorArray;
}
//**** Factory function for L.LayerGroup.GeoArea class
L.layerGroup.GeoArea = function (options) {
    return new L.LayerGroup.GeoArea(options);
}
//  To call function Reload 
function check() {
    lrObj.enableHeatMap(lrObj.floorid);
}