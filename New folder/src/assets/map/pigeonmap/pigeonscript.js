/******** MAP INITIALIZATION***** *******************************/
var map;
var postSearchZoom = 21;
result = '';
var fleetTypeAttr = [];
var floorIds = new Array();
var allfloorIds = [];
var fleetinfo;
var nontransactable;
var isSpecialstatus;
var reload = '';
var customControl = L.Control.extend({

  options: {
    position: 'topleft'
  },

  onAdd: function (map) {
    var container = L.DomUtil.create('div', 'leaflet-control-locate leaflet-bar leaflet-control');
    container.icon = '';
    container.innerHTML = '<a class="leaflet-bar-part leaflet-bar-part-single"><span class="fa fa-refresh"></span></a>';
    // container.className = 'fa fa-refresh'
    container.style.backgroundColor = 'white';
    // container.style.backgroundImage = "url(../dist/images/reload1.png)";
    // container.style.backgroundSize = "30px 30px";
    // container.style.width = '30px';
    // container.style.height = '30px';
    container.onclick = function () {
      check();
    }
    return container;
  }
});
function getdisplaymapsettings(feature, popupLocation, displayproperties, displayColumns) {
  if (getAllUrlParams().ut === 'locate') {
    var displaypropertieslc;
    var fleetstatus;
    if (feature.feature.fleetReservationId) {
      fleetstatus = false;
    } else {
      fleetstatus = true;
    }
    var url = localStorage.getItem('apiendpoint') + '/api/v1/displaytomapsetting/maplocate';
    url = url + '/' + feature.properties.enterpriseid + '/' + this.getAllUrlParams().pn + '/' + fleetstatus;
    $.ajax({
      url: url,
      type: 'GET',
      headers: {
        "token": window.localStorage.getItem('token')
      },
      error: function (err) {
        popupFeatureProperties(feature, popupLocation, displayproperties, displayColumns);
      },
      success: function (data) {
        displaypropertieslc = data;
        if (displaypropertieslc && displaypropertieslc.result.length > 0) {
          for (i = 0; i < displaypropertieslc.result.length; i++) {
            displayproperties.push(displaypropertieslc.result[i].baseTableColumnName);
            displayColumns.push(displaypropertieslc.result[i].labelToShowInMap);
          }
        }
        popupFeatureProperties(feature, popupLocation, displayproperties, displayColumns)
      }
    });
  } else {
    displayproperties = ['address', 'contactDetails'];
  }
}

function gaPopupCallback(e) {
  displayMapPopup(e.target, e.latlng);
  // spinLocation = e.latlng;
}

function displayMapPopup(feature, popupLocation) {
  var url = localStorage.getItem('apiendpoint') + '/api/v1/maplocate/viewpopup/' + getAllUrlParams().pn;
  var floorPlan = getAllUrlParams().fp;
  var recordname = '';
  var recordid = '';
  var displayproperties = [];
  var displayColumns = [];

  if (floorPlan === 'true') {
    if (feature.feature.fleetReservationId) {

      recordname = 'fleetreservation';
      recordid = feature.feature.fleetReservationId;
    } else {

      recordname = 'fleet';
      recordid = feature.feature.fleetId;
    }
    url = url + '/' + recordname + '/' + recordid;
    // var url = localStorage.getItem('apiendpoint') + '/api/v1/maplocate/viewpopup/fleets/fleet/27';
    $.ajax({
      url: url,
      type: 'GET',
      headers: {
        "token": window.localStorage.getItem('token')
      },
      error: function (err) {
        //popupFeatureProperties(feature, popupLocation, displayproperties, displayColumns);
        getdisplaymapsettings(feature, popupLocation, displayproperties, displayColumns);
      },
      success: function (data) {
        fleetTypeAttr = [];
        var resp = data.result;
        feature.feature = resp;
        //popupFeatureProperties(feature, popupLocation, displayproperties, displayColumns)
        getdisplaymapsettings(feature, popupLocation, displayproperties, displayColumns)
      }
    });
  } else {
    //popupFeatureProperties(feature, popupLocation, displayproperties, displayColumns)
    getdisplaymapsettings(feature, popupLocation, displayproperties, displayColumns)
  }
}

function popupFeatureProperties(feature, popupLocation, displayproperties, displayColumns) {
  var popupContent = "";
  feature.otherproperties = {};
  //  if (getAllUrlParams().ut === 'locate') {
  //     var displaymapsettings = getdisplaymapsettings(feature.properties.enterpriseid);
  //     var displaypropertieslc = JSON.parse(displaymapsettings)
  //   }
  //   if (getAllUrlParams().ut === 'locate') {
  //     if (displaypropertieslc && displaypropertieslc.result.length > 0) {
  //       for (i = 0; i < displaypropertieslc.result.length; i++) {
  //         displayproperties.push(displaypropertieslc.result[i].dataElementColumnName);
  //         displayColumns.push(displaypropertieslc.result[i].dataElementDisplayName)
  //       }
  //     }
  //   } else {
  //     displayproperties = ['address', 'contactDetails'];
  //   }
  updateOtherProperties(feature.feature, displayproperties, feature.otherproperties, displayColumns);

  if ((feature.properties) && !(feature.otherproperties)) { // && feature.properties.fleetid) {
    if (feature.properties.fleetname)
      popupContent += "<p align='center'><B>" + feature.properties.fleetname + "</B>test</p>";
    $.each(feature.properties, function (index, value) {
      /*
       if (index === "level" || index === "fleetType")
         popupContent += "<p align='center'>" + index + ": " + value + "</p>";
       if (index === "iconcolor" && value === "Green")
         console.log(index, 'value' , value);
         popupContent += "<p align='center'>status: Available</p>";
       if (index === "iconcolor" && value === "Amber")
       console.log('index', 'Amber');
         popupContent += "<p align='center'>status: Reserved</p>";
       if (index === "iconcolor" && value === "Red")
          console.log('2=====', 'Red');
         popupContent += "<p align='center'>status: Checked-In</p>";
       if (index === "image")
         popupContent += '<p align="center"><img src="' + value + '"></img></p>';
       if (index === "video")
         popupContent +=
           '<iframe width="210" height="170" src="https://www.youtube.com/embed/' + value + '?autoplay=1"></iframe>';*/

    });
  } else {
    //   popupContent = "<p>No Fleet Name</p>";
  }
  this.feature = feature.feature;
  nontransactable = this.feature.isTransactable;
  isSpecialstatus = this.feature.isTransactable;
  var element = document.getElementById('actionicons');
  if (element !== null) {
    element.outerHTML = "";
  }
  popupContent += '<table class="mappopup-title"><tr>';
  if (feature.feature.imagePath && feature.feature.imageName) {
    popupContent += '<td><img onerror="this.onerror=null;this.src=\'' + localStorage.getItem('apiendpoint') + '/' + localStorage.getItem('EnterpriseImage') +
      '\'" style="border-radius: 50%; margin-right:5px" src="' +
      localStorage.getItem('apiendpoint') + '/' +
      feature.feature.imagePath + '/' + feature.feature.imageName + '" height="35" width="35"></img></td>';
  } else if ((feature.feature.enterpriseResourcesImageFilePath && feature.feature.enterpriseResourcesImageFileName) && ((getAllUrlParams().pn == 'users' || getAllUrlParams().pn == 'messagehistory' || getAllUrlParams().pn == 'people' || getAllUrlParams().pn == 'callhistory'))) {
    popupContent += '<td><img onerror="this.onerror=null;this.src=\'' + localStorage.getItem('enterpriseImage') +
      '\'" style="border-radius: 50%; margin-right:5px" src="' +
      localStorage.getItem('apiendpoint') + '/' +
      feature.feature.enterpriseResourcesImageFilePath + '/' + feature.feature.enterpriseResourcesImageFileName + '" height="35" width="35"></img></td>';
  } else {
    popupContent += "<td style='font-weight: bold;font-size: 15px;float:left; margin-right:5px'>" + ' <i class="' + feature.properties.iconname + '" style="color:' + feature.properties.iconcolor + '; text-align:left;vertical-align:top;position:relative" ></i>' + "</td>";
  }
  if ((getAllUrlParams().pn == 'users' || getAllUrlParams().pn == 'messagehistory' || getAllUrlParams().pn == 'people' || getAllUrlParams().pn == 'callhistory')) {
    if (this.feature.firstName) {
      var userName = this.feature.firstName + ' ' + this.feature.lastName;
      popupContent += "<td style='font-weight: bold;font-size: 15px; line-height:13px'>" + userName + "</td>";
    } else {
      if (feature.properties.fleetname) {
        popupContent += "<td style='font-weight: bold;font-size: 15px; line-height:13px'>" + feature.properties.fleetname + "</td>";
      }
    }
  } else {
  if (feature.properties.fleetname) {
    popupContent += "<td style='font-weight: bold;font-size: 15px; line-height:13px'>" + feature.properties.fleetname + "</td>";
  }
  }
  if (this.feature._id) {
    var resourceid = this.feature._id;
  } else {
    var resourceid = this.feature.reservedResourceId;
  }
  popupContent += '</tr></table>';
  popupContent += "<div class='col-md-12 p0 text-right' id='actionicons'><div id='reservefleet'><span class='icon fa-15x asset-icon-plus'  onclick='reservefleet(\"" + this.feature + "\",\"" + this.getAllUrlParams().pn + "\")'></span></div><div id='message' class ='icon fa-15x asset-icon-envelope notification-unread'  title='Message' onclick='message(\"" + resourceid + "\",\"" + this.getAllUrlParams().pn + "\")'></div><div id='call' ><span title='Call' class='icon fa-15x asset-icon-phone call-history'></span></div><div id='checkin'  ><span class ='icon fa-15x asset-icon-sign-in checkin' title='Check In' onclick='checkedin(\"" + this.feature + "\",\"" + this.getAllUrlParams().pn + "\")'></span></div><div id='checkout' > <span class ='icon fa-15x asset-icon-sign-out checkout' title='Check-out' onclick='checkedout(\"" + this.feature + "\",\"" + this.getAllUrlParams().pn + "\")'></span></div><div id='extend' title='Extend Record' style='cursor:pointer' class ='icon fa-15x asset-icon-extend' onclick='extendevent(\"" + this.feature + "\",\"" + this.getAllUrlParams().pn + "\")'></div><div id='cancel' ><span class ='icon fa-15x asset-icon-cancel cancle-action' title='Cancel Record' onclick='cancel(\"" + this.feature + "\",\"" + this.getAllUrlParams().pn + "\")'></span></div><div id='eventReg'><span class='asset-icon fa-15x asset-icon-registered'  onclick='eventRegistration(\"" + this.feature + "\",\"" + this.getAllUrlParams().pn + "\")'></span></div></div>";
  popupContent += "<div class='table-scroll'> <div class='table-responsie'><table class='table table-condensed table-hover table-bordered'>";

  if (feature.otherproperties) {
    if (feature.otherproperties['Start Date Time']) {
      feature.otherproperties['Start Datetime'] = feature.otherproperties['Start Date Time'];
      delete feature.otherproperties['Start Date Time'];
    }
    if (feature.otherproperties['End Date Time']) {
      feature.otherproperties['End Datetime'] = feature.otherproperties['End Date Time'];
      delete feature.otherproperties['End Date Time'];
    }
    feature.otherproperties = updateOrder(feature.otherproperties, displayColumns);
    var nameIndex = '';
    var addressIndex = '';
    $.each(feature.otherproperties, function (index, value) {
      if (value !== undefined && index !== '') {
        if (getAllUrlParams().ut !== 'locate') {
          popupContent += "<p class='col-md-12'><h5 class='bg-primary text-capitalize text-center'>" + index + "</h5></p>";
        }

        if (typeof (value) == 'string') {
          if (index === 'First Name' || index === 'Last Name') {
            nameIndex = nameIndex + ' ' + value;
            if (index !== 'First Name') {
              popupContent += "<tr><td class='minw100'>" + "<b>" + 'Name' + ": " + "</b></td><td>" + nameIndex + "</td></tr>";
            }
          } else if (index === 'Work Number' && value !== 'null' && value !== '' && value !== undefined) {
            popupContent += "<tr><td class='minw100'>" + "<b>" + 'Work#' + ": " + "</b></td><td>" + value + "</td></tr>";
          } else if (index === 'Mobile Number' && value !== 'null' && value !== '' && value !== undefined) {
            popupContent += "<tr><td class='minw100'>" + "<b>" + 'Mobile#' + ": " + "</b></td><td>" + value + "</td></tr>";
          } else if (index === 'Enterprise Name' && value !== 'null' && value !== '' && value !== undefined) {
            popupContent += "<tr><td class='minw100'>" + "<b>" + 'Enterprise' + ": " + "</b></td><td>" + value + "</td></tr>";

          } else {
            if (index === 'Reserve Start Date Time' || index === 'Reserve End Date Time' ||
              index === 'Start Date Time' || index === 'End Date Time' ||
              index === 'Start Datetime' || index === 'End Datetime' ||
              index === 'Reserve StartDatetime' || index === 'Reserve EndDatetime' ||
              index === 'Check In Date Time' || index === 'Check Out Date Time' ||
              index === 'Event Registration Close Date' || index === 'Message Date' ||
              index === 'Credit Card Expiry Date' || index === 'Call Start Date' ||
              index === 'Call End Date' || index === 'Reservation Start Date' || index === 'Reservation End Date') {
              value = loginUserDateConversion(value);
            }
            popupContent += "<tr><td class='minw100'>" + "<b>" + index + ": " + "</b></td><td class='minw150'><span>" + value + "</span></td></tr>";
          }
          // popupContent += "<tr><td class='minw100 col-md-12'>" + "<b>" + index + "</b></td><td>" + ": " + value + "</td></tr>";
        } else {

          $.each(value, function (index2, value2) {
            if (typeof (value2) === 'object' && value2 !== null && value2 !== undefined) {
              value2 = JSON.stringify(value2);
            }

            popupContent += "<tr><td class='minw100 col-md-12'>" + "<b>" + index + "</b></td><td>" + ": " + value2 + "</td></tr>";
          });
        }
      }
      //     popupContent += "</div>";
    });
  }
  popupContent += "</table></div></div>";
  var popup = L.popup({
    maxHeight: 290,
    maxWidth: 290,
    autoPanPaddingBottomRight: L.point(999, 999),
    //  autoPanPaddingTopLeft: L.point(0, 0),
    //  autoPanPadding: L.point(5, 5),
     autoPan: true,
    // keepInView: true
    // autoPan:true,
    // autoPanPadding:L.Point(0,0),
  });
  popup
    .setLatLng(popupLocation)
    .setContent(popupContent)
    .openOn(map);
  /* start of code related to button actions */

  document.getElementById('checkin').style.display = 'none';
  document.getElementById('checkout').style.display = 'none';
  document.getElementById('extend').style.display = 'none';
  document.getElementById('message').style.display = 'none';
  document.getElementById('call').style.display = 'none';
  document.getElementById('cancel').style.display = 'none';
  document.getElementById('eventReg').style.display = 'none';
  document.getElementById('reservefleet').style.display = 'none';
  var loggedinjson = window.localStorage.getItem('loggedindata');
  var pagename = this.getAllUrlParams().pn;
  if (pagename === 'events' || pagename === 'fleetreservations') {
    if (getAllUrlParams().fp === 'true' && (nontransactable !== false || isSpecialstatus !== false)) {
      document.getElementById('checkin').style.display = 'inline-block';
      document.getElementById('checkout').style.display = 'inline-block';
      document.getElementById('extend').style.display = 'inline-block';
      document.getElementById('cancel').style.display = 'inline-block';
      document.getElementById('reservefleet').style.display = 'none';
      document.getElementById('eventReg').style.display = 'none';
      if (this.feature.fleetReservationStatus === 'Reserved') {
        if (this.feature.eventId) {
          if ((this.feature.eventOwner.userId._id.toString() !== localStorage.getItem('user_id'))) {
            if (window.localStorage.getItem('userrole') !== 'Super Admin') {
              document.getElementById("checkin").setAttribute("disabled", "disabled");
              document.getElementById("cancel").setAttribute("disabled", "disabled");
              document.getElementById("checkin").style.pointerEvents = 'none';
              document.getElementById("cancel").style.pointerEvents = 'none';
            }
          } else if ((this.feature.eventOwner.userId._id.toString() === localStorage.getItem('user_id')) || window.localStorage.getItem('userrole') === 'Super Admin'
        || window.localStorage.getItem('userrole') === 'Enterprise Admin') {
            document.getElementById("checkin").style.pointerEvents = 'auto';
            document.getElementById("cancel").style.pointerEvents = 'auto';
          } else {}
          document.getElementById("eventReg").style.pointerEvents = 'inline-block';
          document.getElementById("checkout").setAttribute("disabled", "disabled");
          document.getElementById("checkout").style.pointerEvents = 'none';
          document.getElementById("reservefleet").setAttribute("disabled", "disabled");
          document.getElementById("reservefleet").style.pointerEvents = 'none';
          document.getElementById("extend").setAttribute("disabled", "disabled");
          document.getElementById("extend").style.pointerEvents = 'none';
        } else {
          // conditions for fleet reservations when event id null
          if (this.feature.userId.toString() === localStorage.getItem('user_id') || window.localStorage.getItem('userrole') === 'Super Admin'
          || window.localStorage.getItem('userrole') === 'Enterprise Admin') {
            document.getElementById("checkin").style.pointerEvents = 'auto';
            document.getElementById("cancel").style.pointerEvents = 'auto';
          } else {
            document.getElementById("checkin").setAttribute("disabled", "disabled");
            document.getElementById("checkin").style.pointerEvents = 'none';
            document.getElementById("cancel").setAttribute("disabled", "disabled");
            document.getElementById("cancel").style.pointerEvents = 'none';
          }
          document.getElementById("checkout").setAttribute("disabled", "disabled");
          document.getElementById("checkout").style.pointerEvents = 'none';
          document.getElementById("extend").setAttribute("disabled", "disabled");
          document.getElementById("extend").style.pointerEvents = 'none';
          document.getElementById("eventReg").setAttribute("disabled", "disabled");
          document.getElementById("eventReg").style.pointerEvents = 'none';
          document.getElementById("reservefleet").setAttribute("disabled", "disabled");
          document.getElementById("reservefleet").style.pointerEvents = 'none';
        }
      } else if (this.feature.fleetReservationStatus === '' || this.feature.fleetReservationStatus === undefined) {
        document.getElementById('reservefleet').style.display = 'inline-block';
        document.getElementById("checkin").setAttribute("disabled", "disabled");
        document.getElementById("checkout").setAttribute("disabled", "disabled");
        document.getElementById("checkout").style.pointerEvents = 'none';
        document.getElementById("checkin").style.pointerEvents = 'none';
        document.getElementById("cancel").setAttribute("disabled", "disabled");
        document.getElementById("cancel").style.pointerEvents = 'none';
        document.getElementById("extend").setAttribute("disabled", "disabled");
        document.getElementById("extend").style.pointerEvents = 'none';
      } else if (this.feature.fleetReservationStatus === 'Checked In') {
        if (this.feature.eventId) {
          if ((this.feature.eventOwner.userId._id.toString() !== localStorage.getItem('user_id')) || this.feature.eventId === '' || this.feature.eventId === undefined) {
            if (window.localStorage.getItem('userrole') !== 'Super Admin') {
              document.getElementById("checkout").style.pointerEvents = 'none';
            }
          } else if ((this.feature.eventOwner.userId._id.toString() === localStorage.getItem('user_id')) || window.localStorage.getItem('userrole') === 'Super Admin'
          || window.localStorage.getItem('userrole') === 'Enterprise Admin') {
            document.getElementById("checkout").style.pointerEvents = 'auto';
            document.getElementById("extend").style.pointerEvents = 'auto';
          }
          document.getElementById("checkin").setAttribute("disabled", "disabled");
          document.getElementById("checkin").style.pointerEvents = 'none';
          document.getElementById("reservefleet").setAttribute("disabled", "disabled");
          document.getElementById("reservefleet").style.pointerEvents = 'none';
          document.getElementById("cancel").setAttribute("disabled", "disabled");
          document.getElementById("cancel").style.pointerEvents = 'none';
        } else {
          // conditions for fleet reservations when event id null
          if (this.feature.userId.toString() === localStorage.getItem('user_id') || window.localStorage.getItem('userrole') === 'Super Admin'
          || window.localStorage.getItem('userrole') === 'Enterprise Admin') {
            document.getElementById("checkout").style.pointerEvents = 'auto';
            document.getElementById("extend").style.pointerEvents = 'auto';
          } else {
            document.getElementById("checkout").setAttribute("disabled", "disabled");
            document.getElementById("checkout").style.pointerEvents = 'none';
            document.getElementById("extend").setAttribute("disabled", "disabled");
            document.getElementById("extend").style.pointerEvents = 'none';
          }
          document.getElementById("checkin").setAttribute("disabled", "disabled");
          document.getElementById("checkin").style.pointerEvents = 'none';
          document.getElementById("cancel").setAttribute("disabled", "disabled");
          document.getElementById("cancel").style.pointerEvents = 'none';
        }
      }
    }
  } else {
  switch (pagename) {
      case 'fleets':
        document.getElementById('checkin').style.display = 'none';
        document.getElementById('checkout').style.display = 'none';
        document.getElementById('extend').style.display = 'none';
        document.getElementById('message').style.display = 'none';
        document.getElementById('call').style.display = 'none';
        document.getElementById('cancel').style.display = 'none';
        document.getElementById('eventReg').style.display = 'none';
        document.getElementById('reservefleet').style.display = 'inline-block';
        if (nontransactable !== false || isSpecialstatus !== false) {
          document.getElementById('reservefleet').style.display = 'auto';
        } else {
          document.getElementById('reservefleet').style.display = 'none';
        }
        if (this.feature.fleetReservationStatus === 'Reserved' || this.feature.fleetReservationStatus === 'Checked In') {
          document.getElementById("reservefleet").setAttribute("disabled", "disabled");
          document.getElementById("reservefleet").style.pointerEvents = 'none';
        }
        break;
      case 'people':
        // if ((getAllUrlParams().fp === 'true') && (nontransactable !== false || isSpecialstatus 
        if (this.feature.userAccount !== window.localStorage.getItem('user_Account') || 
        window.localStorage.getItem('userrole') === 'Super Admin') {
          document.getElementById('message').style.display = 'inline-block';
          document.getElementById('call').style.display = 'inline-block';
        }
        break;
      case 'users':
        // if ((getAllUrlParams().fp === 'true') && (nontransactable !== false || isSpecialstatus !== false)) {
          if (this.feature.userAccount !== window.localStorage.getItem('user_Account') || 
          window.localStorage.getItem('userrole') === 'Super Admin') {
          document.getElementById('message').style.display = 'inline-block';
          document.getElementById('call').style.display = 'inline-block';
        }
        break;
      case 'messagehistory':
        // if ((getAllUrlParams().fp === 'true') && (nontransactable !== false || isSpecialstatus !== false)) {
          if (this.feature.userAccount !== window.localStorage.getItem('user_Account') || 
          window.localStorage.getItem('userrole') === 'Super Admin') {
          document.getElementById('message').style.display = 'inline-block';
          document.getElementById('call').style.display = 'inline-block';
        }
        break;
      case 'callhistory':
        // if ((getAllUrlParams().fp === 'true') && (nontransactable !== false || isSpecialstatus !== false)) {
          if (this.feature.userAccount !== window.localStorage.getItem('user_Account') || 
          window.localStorage.getItem('userrole') === 'Super Admin') {
          document.getElementById('call').style.display = 'inline-block';
          document.getElementById('message').style.display = 'inline-block';
        }
        break;
      case 'eventregistrations':
        if (getAllUrlParams().fp === 'true' && (nontransactable !== false || isSpecialstatus !== false)) {
          document.getElementById('checkout').style.display = 'inline-block';
          document.getElementById('checkin').style.display = 'inline-block';
          document.getElementById('cancel').style.display = 'inline-block';
          document.getElementById('extend').style.display = 'none';
          document.getElementById('message').style.display = 'none';
          document.getElementById('call').style.display = 'none';
          document.getElementById('reservefleet').style.display = 'none';
          document.getElementById('eventReg').style.display = 'none';
          if (this.feature.eventRegArray === undefined || this.feature.eventRegArray.length === 0 || this.feature.eventId === '' || this.feature.eventId === undefined) {
            document.getElementById("checkin").setAttribute("disabled", "disabled");
            document.getElementById("checkout").setAttribute("disabled", "disabled");
            document.getElementById('checkin').style.pointerEvents = 'none';
            document.getElementById('checkout').style.pointerEvents = 'none';
            document.getElementById("cancel").setAttribute("disabled", "disabled");
            document.getElementById('cancel').style.pointerEvents = 'none';
            document.getElementById('reservefleet').style.display = 'inline-block';
          } else if (this.feature.eventRegArray.length !== 0) {
            for (i = 0; i < this.feature.eventRegArray.length; i++) {
              if (this.feature.eventRegArray[i].userAccount !== window.localStorage.getItem('user_Account')
                    && (window.localStorage.getItem('userrole') === 'Enterprise End User')) {
                document.getElementById("checkin").setAttribute("disabled", "disabled");
                document.getElementById("checkout").setAttribute("disabled", "disabled");
                document.getElementById('checkin').style.pointerEvents = 'none';
                document.getElementById('checkout').style.pointerEvents = 'none';
                document.getElementById("cancel").setAttribute("disabled", "disabled");
                document.getElementById('cancel').style.pointerEvents = 'none';
              } else if (this.feature.eventRegArray[i].userAccount === window.localStorage.getItem('user_Account') || window.localStorage.getItem('userrole') === 'Super Admin'
              || window.localStorage.getItem('userrole') === 'Enterprise Admin')  {
                if (this.feature.eventRegArray[i].status === 'Registered') {
                  document.getElementById("checkin").removeAttribute("disabled", "disabled");
                  document.getElementById('checkin').style.pointerEvents = 'auto';
                  document.getElementById("cancel").removeAttribute("disabled", "disabled");
                  document.getElementById('cancel').style.display = 'auto';
                  document.getElementById("checkout").setAttribute("disabled", "disabled");
                  document.getElementById('checkout').style.pointerEvents = 'none';
                } else if (this.feature.eventRegArray[i].status === 'Closed' || this.feature.eventRegArray[i].status === 'Canceled' || this.feature.eventRegArray[i].status === 'Unregistered' || this.feature.eventRegArray[i].status === 'Waiting') {
                  document.getElementById("checkin").setAttribute("disabled", "disabled");
                  document.getElementById("checkout").setAttribute("disabled", "disabled");
                  document.getElementById("cancel").setAttribute("disabled", "disabled");
                  document.getElementById('cancel').style.pointerEvents = 'none';
                  document.getElementById('checkin').style.pointerEvents = 'none';
                  document.getElementById('checkout').style.pointerEvents = 'none';
                } else if (this.feature.eventRegArray[i].status === 'Checked In') {
                  document.getElementById("checkout").removeAttribute("disabled", "disabled");
                  document.getElementById('checkout').style.pointerEvents = 'auto';
                  document.getElementById('checkin').setAttribute("disabled", "disabled");
                  document.getElementById('checkin').style.pointerEvents = 'none';
                  document.getElementById("cancel").setAttribute("disabled", "disabled");
                  document.getElementById('cancel').style.pointerEvents = 'none';
                }
                window.localStorage.setItem('eventregisterationid', this.feature.eventRegArray[i]._id);
                break;
              }
            }
          }
        }
        break;
    }
  }
};

var onloadInit = function () {
  /******** MAP VARIABLES INITIALISED FROM THE URL PARAMETERS *****/
  document.getElementById('mapspinnerId').style.display = 'none';
  document.getElementById('mapspinnerbackgroundId').style.display = 'none';
  $.ajaxSetup({
    headers: {
      'token': window.localStorage.getItem('token')
    },
    async: false
  });
  urlType = getAllUrlParams().ut;

  if (urlType && urlType === 'locate') {
    lat = +39.3917603; // 17.4227310000000;
    lon = -84.361278; // 78.5449200000000;
    floorslist = [];
    showFloorMaps = "1";
    if ((getAllUrlParams().sr) !== undefined) {
   fleetinfo = JSON.parse(localStorage.getItem(getAllUrlParams().sr));

      if (fleetinfo.length != undefined) {
        lat = fleetinfo[0].geometry.coordinates[1];
        lon = fleetinfo[0].geometry.coordinates[0];
        if (fleetinfo[0].features !== undefined && fleetinfo[0].features.length > 0) {
          floorToShow = localStorage.getItem(getAllUrlParams().cfn); //fleetinfo[0].features[0].properties.level;
        }
      } else {
        if (getAllUrlParams().pn === 'pickticket') { // to get pick list data
          lat = fleetinfo.geometry.coordinates[1];
          lon = fleetinfo.geometry.coordinates[0];
          floorToShow = fleetinfo.features[0].properties.level;
        } else {
          lat = fleetinfo.geometry.coordinates[1];
          lon = fleetinfo.geometry.coordinates[0];
          floorToShow = "0";
        }
    }
    } else {
      floorToShow = "0";
    }
    gaToShow = false; // getAllUrlParams().sga; //-1 implies show all geo areas
    displayControls = "1"; // getAllUrlParams().dc;
    if (getAllUrlParams().fp == 'true' && getAllUrlParams().pn != 'pickticket') {
      zoominit = fleetinfo[0].floorPlanDetails.startZoom; //getAllUrlParams().zi;
      zoomfinal = fleetinfo[0].floorPlanDetails.finalZoom; //20; //getAllUrlParams().zf;
    } else {
     if(getAllUrlParams().pn == 'pickticket'){
      zoominit = 3;
      zoomfinal = 21;
     }
    }

    startLat = lat; // +39.391732; //getAllUrlParams().sla;
    startLon = lon //-84.3612785; //getAllUrlParams().slo;
    endLat = lat; // +39.3917289;//lat;
    endLon = lon //-84.3622501//lon;
    configurl = getAllUrlParams().cu;
    /**GeoArea 1**/
    if (getAllUrlParams().fp === undefined) {
      floormapCoords = {
        floorToShow: null
      };
      geojsonUrl = configurl;
      floormapUrls = {
        floorToShow: null
      };
      floorPathsUrls = {
        floorToShow: null
      };
      floorPathsBounds = null;
    }  // check floor plan is Available or not 
    else if (getAllUrlParams().fp === 'true') {
       floormapUrls = [];
      floorPathsUrls = [];
      floormapCoords = [];
      $.getJSON(localStorage.getItem('apiendpoint') + '/' + fleetinfo[0].fleetImageFilePath + '/' + fleetinfo[0].floorPlanDetails.floorMetaDataJSON, function (floorcoordinatesdata) {
        $.getJSON(localStorage.getItem('apiendpoint') + '/' + fleetinfo[0].fleetImageFilePath + '/' + fleetinfo[0].floorPlanDetails.pathBoundariesJSON, function (floorplanboundaries) {
          fleetinfo = JSON.parse(localStorage.getItem(getAllUrlParams().sr));
          fleetinfo[0].floorPlanDetails.coordinates = floorcoordinatesdata;
          floorPathsBounds = floorplanboundaries.pathboundaries;
          if (getAllUrlParams().pn !== 'pickticket') {
            for (i = 0; i < fleetinfo.length; i++) {
              var floorName = fleetinfo[i].features[0].properties.level;
              floorIds[floorName] = fleetinfo[i]._id;
              floorslist.push(floorName);
              var floorcoorinates = fleetinfo[0].floorPlanDetails.coordinates;
              for (j = 0; j < floorcoorinates.length; j++) {
                floor0mapCoords = [
                  [floorcoorinates[j].floorNorthWestCoordinates[0], floorcoorinates[j].floorNorthWestCoordinates[1]],
                  [floorcoorinates[j].floorNorthEastCoordinates[0], floorcoorinates[j].floorNorthEastCoordinates[1]],
                  [floorcoorinates[j].floorSouthWestCoordinates[0], floorcoorinates[j].floorSouthWestCoordinates[1]]
                ];
                floormapCoords[floorName] = floor0mapCoords;
              }
              floormapUrls[floorName] = localStorage.getItem('apiendpoint') + '/' + fleetinfo[i].fleetImageFilePath + '/' + fleetinfo[i].floorPlanDetails.floorPlanImageFileName;
              floorPathsUrls[floorName] = localStorage.getItem('apiendpoint') + '/' + fleetinfo[i].fleetImageFilePath + '/' + fleetinfo[i].floorPlanDetails.navPathJSON;
            }
            startLat = fleetinfo[0].floorPlanDetails.coordinates[0].floorEntryCoordinates[0];
            startLon = fleetinfo[0].floorPlanDetails.coordinates[0].floorEntryCoordinates[1];
            geojsonUrl = getAllUrlParams().sr;
            floorPathsBounds = floorPathsBounds;
          }
        });
      });


    }
    else if (getAllUrlParams().fp === 'true' && getAllUrlParams().pn == 'pickticket') { // check floor plan is Available or not 
      var fleetinfo = JSON.parse(localStorage.getItem(getAllUrlParams().sr));
      startLat = fleetinfo.floorPlanDetails.floorEntryCoordinates[0];
      startLon = fleetinfo.floorPlanDetails.floorEntryCoordinates[1];

      floor0mapCoords = [
        [fleetinfo.floorPlanDetails.floorNorthWestCoordinates[0], fleetinfo.floorPlanDetails.floorNorthWestCoordinates[1]],
        [fleetinfo.floorPlanDetails.floorSouthWestCoordinates[0], fleetinfo.floorPlanDetails.floorSouthWestCoordinates[1]],
        [fleetinfo.floorPlanDetails.floorNorthEastCoordinates[0], fleetinfo.floorPlanDetails.floorNorthEastCoordinates[1]]
      ];
      floormapCoords = [];
      floormapCoords[floorToShow] = floor0mapCoords;

      geojsonUrl = getAllUrlParams().sr;
      floormapUrls = [];
      floormapUrls[floorToShow] = 'http://dev.blizzard.srisys.com:3000/assets/fleets/6/vedic-snehapuri-warehouse.png'; // localStorage.getItem('apiendpoint') + '/' + fleetinfo.fleetImageFilePath + '/' + fleetinfo.floorPlanDetails.floorPlanImageFileName;
      floorPathsUrls = [];
      floorPathsUrls[floorToShow] = 'http://dev.blizzard.srisys.com:3000/assets/fleets/6/vedicsnehapurif0paths.json'; // localStorage.getItem('apiendpoint') + '/' + fleetinfo.fleetImageFilePath + '/' + fleetinfo.floorPlanDetails.floorPlanJSONFileName;
      floorPathsBounds = [
        [17.42284646943844, 78.54490748606624],
        [17.422825089882295, 78.54488463138297],
        [17.422819011895527, 78.54488924142971],
        [17.42271629924568, 78.54478379717095],
        [17.422601990206836, 78.54490145117973],
        [17.42268740207903, 78.54498988017441],
        [17.4226917206517, 78.54498703032733],
        [17.422730401222868, 78.54502703991784]
      ];
      floorslist = [floorToShow];
      //  floorPathsBounds = L.geoJSON(fleetinfo).getBounds();
    } else if (getAllUrlParams().fp === 'false') {
      zoominit = 4; //getAllUrlParams().zi;
      zoomfinal = 3; //getAllUrlParams().zf;
      var fleetinfo = JSON.parse(localStorage.getItem(getAllUrlParams().sr));
      floormapCoords = {
        floorToShow: null
      };
      geojsonUrl = getAllUrlParams().sr;
      floormapUrls = {
        floorToShow: null
      };
      floorPathsUrls = [];
      floorPathsUrls[floorToShow] = "vedicsnehapurif0paths.json";
      floorPathsBounds = null;
      floorslist = [floorToShow];
    }
    var buildiingName = getAllUrlParams().cbn;
    if (buildiingName) {
      name = buildiingName.replace(/%20/g, " ");
    } else {
      name = "Vedic";
    }
    /**Construct Input Data for Mapping**/
    floormapcoords = [floormapCoords];
    geojsonurls = [geojsonUrl];
    floormapurls = [floormapUrls];
    floorpathurls = [floorPathsUrls];
     allfloorIds = [floorIds];
    floorpathbounds = [floorPathsBounds];
    floors = [floorslist];
    // disableClusterAtZoom = [-1];
    disableClusterAtZoom = [19];
    names = [name];
  } else {
    lat = getAllUrlParams().x;
    lon = getAllUrlParams().y;
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
    //	lat=17.419932691739724;lon=78.54950973764063;
    //Church
    // lat=-41.1821;lon=174.96009;
    lon = -84.3944140000000;
    lat = 39.3578180000000;
    //Cincinatti zoo
    //lat=39.14487485818;lon=-84.50819045573;
    //currentFloor = "1";
    showFloorMaps = "0";
    if (!floorToShow) floorToShow = "0";
    gaToShow = false; //"2";//false;
    displayControls = "1";
    zoominit = 17;
    zoomfinal = 2;
    /********* MAP VARIABLES TO BE INITIALIZED FROM CONFIG URL ******/
    /**Define GeoAreas(Plots)*****/
    /**GeoArea 1**/
    floor0mapChurchCoords = [
      [-41.18181, 174.95945],
      [-41.18181, 174.96093],
      [-41.18231, 174.95945]
    ];
    floormapChurchCoords = {
      "0": floor0mapChurchCoords
    };
    geojsonChurchUrl = "samplejsondatachurch.json";
    floormapChurchUrls = {
      "0": "sampleplanchurch.png"
    };
    floorPathsChurchUrls = {
      "0": "networkchurch.json"
    };
    floorPathsChurchBounds = [
      [-41.18181, 174.95945],
      [-41.18230182811538, 174.96083199977878]
    ];
    //floormapChurchUrlurls = {"0": null};
    floorsChurch = ["0"];
    nameChurch = "Christ Church";
    /**Construct Input Data for Mapping**/
    floormapcoords = [floormapChurchCoords];
    geojsonurls = [geojsonChurchUrl];
    floormapurls = [floormapChurchUrls];
    floorpathurls = [floorPathsChurchUrls];
    floorpathbounds = [floorPathsChurchBounds];
    floors = [floorsChurch];
    // disableClusterAtZoom = [-1];
    disableClusterAtZoom = [19];
    names = [nameChurch];
  }
  var showFloorResizeMarkers = false;
  var showFloorPathNetwork = false;
  /********* Initialize Map *************************************/
  var MAXZOOM = 25; //For intialization of the map layers
  var ZOOMTHRESHOLD = 19; //Controls after what zoom level bing changes to mapbox
  var overlayMapsLayers = {};
  var baseMapsLayers = initBaseMapLayers(MAXZOOM);
  map = initMap(lat, lon, ZOOMTHRESHOLD, baseMapsLayers, "Bing", "Mapbox");
  //markLocation(map, lat, lon, fleetname);
  flyToLocationAfterDelay(lat, lon, zoomfinal, 0);
  setClickEventsToGetMapLatLon(map);
  /********* Update Map with Input Data *************************************/
  var numGeoAreas = geojsonurls.length;
  //	var searchDataLayer = L.layerGroup();
  geoArea = 0;
  if (gaToShow) { //Modify loop parameters to show only the gaToShow or all layers
    geoArea = parseInt(gaToShow);
    if (geoArea >= 0 && geoArea < numGeoAreas)
      numGeoAreas = geoArea + 1;
  }
  for (; geoArea < numGeoAreas; ++geoArea) {
    gaName = names[geoArea];
    //	overlayMapsLayers[gaName]=L.layerGroup.GeoArea();
    overlayMapsLayers[gaName] = L.layerGroup.GeoArea();
    overlayMapsLayers[gaName].addGeoAreaDetails({
      gaName: gaName,
      gaGeojsonurl: geojsonurls[geoArea],
      gaFloorMapsUrls: floormapurls[geoArea],
      gaFloormapcoords: floormapcoords[geoArea],
      gaFloorPathUrls: floorpathurls[geoArea],
      gaFloorPathBounds: floorpathbounds[geoArea],
      gaFloors: floors[geoArea],
      gaFloorIds: floorIds,
      gaShowFloorMaps: showFloorMaps,
      gaShowFloorPathNetwork: showFloorPathNetwork,
      showFloorResizeMarkers: showFloorResizeMarkers,
      floorToShow: floorToShow,
      disableClusterAtZoom: disableClusterAtZoom[geoArea],
      map: map,
      gaPopupCallback: gaPopupCallback,
    });
    //	searchDataLayer.addLayer(overlayMapsLayers[gaName]);

    overlayMapsLayers[gaName].addTo(map);

    // if (geoArea > 1) {
    // 	overlayMapsLayers[gaName] = L.layerGroup.GeoArea();
    // 	overlayMapsLayers[gaName].addGeoAreaDetails({
    // 		gaName: gaName,
    // 		gaGeojsonurl: geojsonurls[geoArea],
    // 		gaFloorMapsUrls: floormapurls[geoArea],
    // 		gaFloormapcoords: floormapcoords[geoArea],
    // 		gaFloorPathUrls: floorpathurls[geoArea],
    // 		gaFloorPathBounds: floorpathbounds[geoArea],
    // 		gaFloors: floors[geoArea],
    // 		gaShowFloorMaps: showFloorMaps,
    // 		gaShowFloorPathNetwork: showFloorPathNetwork,
    // 		showFloorResizeMarkers: showFloorResizeMarkers,
    // 		floorToShow: floorToShow,
    // 		disableClusterAtZoom: disableClusterAtZoom[geoArea],
    // 		map: map,
    // 		hideSingleBase: true,
    // 	});
    // 	//	console.log(overlayMapsLayers[gaName]);
    // 	searchDataLayer.addLayer(overlayMapsLayers[gaName]);
    // 	//addSearchControl(overlayMapsLayers[gaName]);
    // 	overlayMapsLayers[gaName].addTo(map);
    // } else if (getAllUrlParams().fp === 'true') {
    // 	overlayMapsLayers = L.layerGroup.GeoArea();
    // 	overlayMapsLayers.addGeoAreaDetails({
    // 		gaName: gaName,
    // 		gaGeojsonurl: geojsonurls[geoArea],
    // 		gaFloorMapsUrls: floormapurls[geoArea],
    // 		gaFloormapcoords: floormapcoords[geoArea],
    // 		gaFloorPathUrls: floorpathurls[geoArea],
    // 		gaFloorPathBounds: floorpathbounds[geoArea],
    // 		gaFloors: floors[geoArea],
    // 		gaShowFloorMaps: showFloorMaps,
    // 		gaShowFloorPathNetwork: showFloorPathNetwork,
    // 		showFloorResizeMarkers: showFloorResizeMarkers,
    // 		floorToShow: floorToShow,
    // 		disableClusterAtZoom: disableClusterAtZoom[geoArea],
    // 		map: map,
    // 	});
    // 	searchDataLayer.addLayer(overlayMapsLayers);
    // 	//addSearchControl(overlayMapsLayers[gaName]);
    // 	overlayMapsLayers.addTo(map);
    // } else {
    // 	overlayMapsLayers[gaName] = L.layerGroup.GeoArea();
    // 	overlayMapsLayers[gaName].addGeoAreaDetails({
    // 		gaName: gaName,
    // 		gaGeojsonurl: geojsonurls[geoArea],
    // 		gaFloorMapsUrls: floormapurls[geoArea],
    // 		gaFloormapcoords: floormapcoords[geoArea],
    // 		gaFloorPathUrls: floorpathurls[geoArea],
    // 		gaFloorPathBounds: floorpathbounds[geoArea],
    // 		gaFloors: floors[geoArea],
    // 		gaShowFloorMaps: showFloorMaps,
    // 		gaShowFloorPathNetwork: showFloorPathNetwork,
    // 		showFloorResizeMarkers: showFloorResizeMarkers,
    // 		floorToShow: floorToShow,
    // 		disableClusterAtZoom: disableClusterAtZoom[geoArea],
    // 		map: map,
    // 		hideSingleBase: true,
    // 	});
    // 	searchDataLayer.addLayer(overlayMapsLayers[gaName]);
    // 	//addSearchControl(overlayMapsLayers[gaName]);
    // 	overlayMapsLayers[gaName].addTo(map);
    // }
  }
  // 171214th changes. 
  /*if (displayControls && parseInt(displayControls) === 1) {
  	L.control.layers(baseMapsLayers, overlayMapsLayers, {
  			position: 'bottomleft'
  		}).addTo(map);
  	addSearchControl(searchDataLayer);
  	map.addControl(new L.Control.Zoom());
  	map.addControl(new L.control.fullscreen());
  	lc = L.control.locate({
  		strings: {
  			title: "Show me where I am, yo!"
  		}
  	}).addTo(map);
  }*/
  if (displayControls && parseInt(displayControls) === 1) {
    reload = new customControl();
    layerControl = L.control.layers(baseMapsLayers, overlayMapsLayers, {
      position: 'bottomleft'
    });
    zoomControl = new L.Control.Zoom({
      position: 'topleft'
    });
    lc = L.control.locate({
      strings: {
        title: "Show me where I am, yo!"
      },
      position: 'topleft'
    })
  }


  if (startLat && startLon && endLat && endLon && getAllUrlParams().fp === 'true') {
    thisGeoArea = overlayMapsLayers[gaName];
    flShow = thisGeoArea.floorToShow;
    if (getAllUrlParams().pn !== 'pickticket') {
      setTimeout(function () {
        //   showIndoorRoute(thisGeoArea.map, thisGeoArea.gaFloorPathUrls[flShow], thisGeoArea.gaShowFloorPathNetwork, startLat, startLon, endLat, endLon, false);
      }, 3000)
    } else {
      showIndoorRoute(thisGeoArea.map, thisGeoArea.gaFloorPathUrls[flShow], thisGeoArea.gaShowFloorPathNetwork, startLat, startLon, endLat, endLon, false);
      setTimeout(function () {
        // showRoute(startLat, startLon, endLat, endLon);
        showIndoorShortestMultiplePOIRoute(
          thisGeoArea.map,
          thisGeoArea.gaFloorPathUrls[thisGeoArea.floorToShow],
          thisGeoArea.gaShowFloorPathNetwork,
          // startLat, startLon,
          17.42273, 78.54501,
          thisGeoArea.specialPOIs['Fireexit'],
          true
        );
      }, 3000)
    }
  }
  if (urlType && urlType === 'locate') {
    setTimeout(function () {
      map.flyToBounds(overlayMapsLayers[names[0]].getBounds(), {
        maxZoom: 18
      });
    }, 2000)
  }
}

function showControls() {
  if (typeof layerControl !== 'undefined') map.addControl(layerControl);
  if (typeof searchControl !== 'undefined') map.addControl(searchControl);
  if (typeof zoomControl !== 'undefined') map.addControl(zoomControl);
  if (typeof fullscreenControl !== 'undefined') map.addControl(fullscreenControl);
  if (typeof lc !== 'undefined') map.addControl(lc);
  if (typeof customControl !== 'undefined') map.addControl(reload);
}

function hideControls() {
  if (typeof layerControl !== 'undefined') map.removeControl(layerControl);
  if (typeof searchControl !== 'undefined') map.removeControl(searchControl);
  if (typeof zoomControl !== 'undefined') map.removeControl(zoomControl);
  if (typeof fullscreenControl !== 'undefined') map.removeControl(fullscreenControl);
  if (typeof lc !== 'undefined') map.removeControl(lc);
  if (typeof customControl !== 'undefined') map.removeControl(reload);
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
      icon: '../dist/images/zoom-in.png',
      index: 0,
      callback: zoomIn
    }, {
      text: 'Zoom out',
      icon: '../dist/images/zoom-out.png',
      index: 1,
      callback: zoomOut
    }, '-', {
      text: 'Outdoors',
      disabled: true
    }, {
      text: 'Directions from',
      icon: '../dist/images/play.png',
      callback: setOFromLatLon
    }, {
      text: 'Directions to',
      icon: '../dist/images/pause.png',
      callback: setOToLatLon
    }, {
      text: 'Clear',
      icon: '../dist/images/layers.png',
      callback: clearOPath
    }]
  }).setView([lat, lon], zoominit);
  //L.control.zoom({
  //	position:'topleft'
  //}).addTo(map);
  L.control.scale({
    imperial: false
  }).addTo(map);
  baseMapsLayers[initialMapLayer].addTo(map);
  map.on('zoomend', function () {
    if (map.getZoom() > zoomthreshold) {
      if (map.hasLayer(baseMapsLayers.Bing)) map.removeLayer(baseMapsLayers.Bing);
      baseMapsLayers.Bing.addTo(map);
    }
    /*
    					else {
    						if (map.hasLayer(baseMapsLayers.Mapbox)) map.removeLayer(baseMapsLayers.Mapbox);
    						baseMapsLayers.Bing.addTo(map);
    					}*/
  });
  return map;
}

function showCoordinates(e) {
  // alert(e.latlng.lat + ', ' + e.latlng.lng);
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
  // console.log("pigeonmapcontrol:setOFromLatLon:" + e.latlng);
  showRoute(e.latlng.lat, e.latlng.lng, null, null);
}

function setOToLatLon(e) {
  // console.log("pigeonmapcontrol:setOToLatLon:" + e.latlng);
  showRoute(null, null, e.latlng.lat, e.latlng.lng);
}

function clearOPath(e) {
  // console.log("pigeonmapcontrol:clearOPath:" + e.latlng);
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
  return {
    "Mapbox": mapboxMapLayer,
    "OSM": osmMapLayer,
    "Bing": bingMapLayer
  };
}
//*********************END MAP PROVIDERS ********************************//
/****** START GEOJSON LOADING **************************/
function createSearchControl(geojson) {
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
      circle: {
        radius: 20,
        color: '#0a0'
      }
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
  // map.addControl(controlSearch);
  //		map.removeLayer(geojson);
  return controlSearch;
}
/************************** END GEOJSON LOADING **************************/
var selectedMarker = null;

function markLocation(map, mlat, mlon, mfleetname) {
  if (selectedMarker != null) map.removeLayer(selectedMarker);
  selectedMarker = L.marker([mlat, mlon], {
    icon: redIcon
  });
  selectedMarker.addTo(map).on('click', displayFleetInfo2).fleetname = mfleetname;
}

function animateToLocationAfterDelay(mlat, mlon, zfinal, delay) {
  var ilat = -41.1821,
    ilon = 174.96056;
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
    map.flyTo([mlat, mlon], zfinal, {
      animate: true
    });
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
    showControls();
    if (typeof controltimeout !== 'undefined')
      clearTimeout(controltimeout);
    controltimeout = setTimeout(function () {
      hideControls();
    }, 5000);
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
var fromLatLon = null,
  toLatLon = null;

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
  } else if (fromLatLon) {
    startLat = fromLatLon.lat;
    startLon = fromLatLon.lng;
  } else
    return;
  if (routingControl != null) {
    // Remove previous routes
    routingControl.setWaypoints([
      L.latLng(startLat, startLon),
      L.latLng(endLat, endLon)
    ]);
  } else {
    routingControl = L.Routing.control({
      createMarker: function (i, wp) {
        return L.marker(wp.latLng, {
          icon: L.icon.glyph({
            prefix: '',
            glyph: i + 1
          }),
          draggable: true
        })
      },
      routeWhileDragging: true,
      waypoints: [
        L.latLng(startLat, startLon),
        L.latLng(endLat, endLon)
      ],
      //router: L.Routing.mapbox('sk.eyJ1Ijoic3JlZW5hZGgiLCJhIjoiY2o2dWh3YWtzMTVqOTMycW9oOGUzdXdndiJ9.pjOFFeVBwcjTmk71vxEomA'),
      router: L.Routing.graphHopper('dcd2db33-aafc-404b-ae96-2e0f098d7d31', {
        urlParameters: {
          vehicle: 'foot',
        }
      }),
      //router: L.Routing.graphHopper(undefined, {serviceUrl: 'http://localhost:8989/route',urlParameters: {vehicle: 'foot'}}),
      routeDragTimeout: 250,
      // waypointMode: 'snap',
      collapsible: true,
      summaryTemplate: '<h2>' + localStorage.getItem('directions') + ' {name}</h2><h3>' + localStorage.getItem('distance') + ': {distance}, ' + localStorage.getItem('duration') + ': {time}</h3>',
      // showAlternatives: true,
      altLineOptions: {
        styles: [{
          color: 'black',
          opacity: 0.15,
          weight: 9
        },
        {
          color: 'white',
          opacity: 0.8,
          weight: 6
        },
        {
          color: 'blue',
          opacity: 0.5,
          weight: 2
        }
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
// check in action for fleets, fleetsreservations, events, eventsregistrations
function checkedin(id, page) {
  showSpinner();
  if (page === 'fleets') {
    window.localStorage.setItem('pagefleets', 'fleets');
  } else if (page === 'eventregistrations') {
    window.localStorage.setItem('pageeventregistrations', 'eventregistrations');
    window.localStorage.setItem('eventregistrationscheckin', 'eventregistrationscheckin');
  } else if (page === 'events' || page === 'fleetreservations') {
    if (this.feature.fleetReservationStatus === 'Reserved' && this.feature.eventId === '') {
      window.localStorage.setItem('pagefleetreservations', 'fleetreservations');
      window.localStorage.setItem('fleetreservationid', this.feature.fleetReservationId);
      window.localStorage.setItem('fleetreservationcheckin', 'fleetreservationcheckin');
    } else {
      var page = 'events'
      window.localStorage.setItem('pageevents', page);
      window.localStorage.setItem('eventreservationid', this.feature.eventId);
      window.localStorage.setItem('eventscheckin', 'eventscheckin');
    }
  }
}

function checkedout(id, page) {
  showSpinner();
  if (page === 'fleets') {
    window.localStorage.setItem('pagefleets', 'fleets');
  } 
  else if (page === 'eventregistrations') {
    window.localStorage.setItem('pageeventregistrations', 'eventregistrations');
    window.localStorage.setItem('eventregistrationscheckout', 'eventregistrationscheckout');
  } else if (page === 'events' || page === 'fleetreservations') {
    if (this.feature.eventId === '' && this.feature.fleetReservationStatus === 'Checked In') {
      window.localStorage.setItem('pagefleetreservations', 'fleetreservations');
      window.localStorage.setItem('fleetreservationid', this.feature.fleetReservationId);
      window.localStorage.setItem('fleetreservationcheckout', 'fleetreservationcheckout');
    } else {
      window.localStorage.setItem('pageevents', 'events');
      window.localStorage.setItem('eventreservationid', this.feature.eventId);
      window.localStorage.setItem('eventscheckout', 'eventscheckout');
    }
  }
}
// extend acton for both events and fleet reservation
function extendevent(id, page) {
  showSpinner();
  if (page === 'events' || page === 'fleetreservations') {
    if (this.feature.eventId === '' && this.feature.fleetReservationStatus === 'Checked In') {
      window.localStorage.setItem('pagefleetreservations', 'fleetreservations');
      window.localStorage.setItem('fleetreservationid', this.feature.fleetReservationId);
      window.localStorage.setItem('fleetreservationsextent', 'fleetreservationsextent');
    } else {
      window.localStorage.setItem('pageevents', 'events');
      window.localStorage.setItem('eventreservationid', this.feature.eventId);
      window.localStorage.setItem('eventsextent', 'eventsextent');
    }
  }
}

function message(id, page) {
  showSpinner();
    window.localStorage.setItem('pagemessagehistory', 'messagehistory');
    window.localStorage.setItem('mapmessageuser', 'mapmessageuser');
    window.localStorage.setItem('id', id);
  // } else if (page === 'callhistory') {
  //   window.localStorage.setItem('pagecallhistory', 'callhistory');
  //   window.localStorage.setItem('mapmessageuser', 'mapmessageuser');
  //   window.localStorage.setItem('id', id);
  // } else if (page === 'messagehistory') {
  //   window.localStorage.setItem('pagemessagehistory', 'messagehistory');
  //   window.localStorage.setItem('mapmessageuser', 'mapmessageuser');
  //   window.localStorage.setItem('id', id);
  // } else if (page === 'users') {
  //   window.localStorage.setItem('pageusers', 'users');
  //   window.localStorage.setItem('mapmessageuser', 'mapmessageuser');
  //   window.localStorage.setItem('id', id);
  // }
}

function cancel(id, page) {
  showSpinner();
  if (page === 'events' || page === 'fleetreservations') {
    if (this.feature.fleetReservationStatus === 'Reserved' && this.feature.eventId === '') {
      window.localStorage.setItem('pagefleetreservations', 'fleetreservations');
      window.localStorage.setItem('reservationCancel', 'reservationCancel');
      window.localStorage.setItem('fleetreservationid', this.feature.fleetReservationId);
    } else {
      window.localStorage.setItem('pageevents', 'events');
      window.localStorage.setItem('eventsCancel', 'eventsCancel');
      window.localStorage.setItem('eventreservationid', this.feature.eventId);
    }
  }
   else if (page === 'eventregistrations') {
    window.localStorage.setItem('pageeventregistrations', 'eventregistrations');
    window.localStorage.setItem('eventregistrationCancel', 'eventregistrationCancel');
  }
}

function reservefleet(id, page) {
  showSpinner();
    if (this.feature.isEventsEnabled === false) {
      window.localStorage.setItem('reservefleet', 'reservefleet');
      var revvalue = 'fleetreserveCreate';
      window.localStorage.setItem('fleetreserveCreate', revvalue);
      var fleetrev = JSON.stringify(this.feature);
      window.localStorage.setItem('fleetDeatailsdata', fleetrev);
    } else {
      var eventvalue = 'eventsCreate';
      window.localStorage.setItem('pageevents', 'events');
      window.localStorage.setItem('eventsCreate', eventvalue);
      window.localStorage.setItem('entNamValue', this.feature.enterpriseName);
      window.localStorage.setItem('entIdValue', this.feature.enterpriseId);
      window.localStorage.setItem('fleetIdValue', this.feature._id);
      window.localStorage.setItem('fleetNameValue', this.feature.fleetName);
      window.localStorage.setItem('fleettypevalue', this.feature.fleetType);
    }
  }

function eventRegistration(id, page) {
  showSpinner();
  var eventId = this.feature.eventId;
  if (eventId != "") {
    var evenvalue = 'eventRegCreate';
    window.localStorage.setItem('pageeventregistrations', 'eventregistrations');
    window.localStorage.setItem('eventRegCreate', evenvalue);
    window.localStorage.setItem('eventIdValue', this.feature.eventId);
  } else {
    var eventvalue = 'eventsCreate';
    window.localStorage.setItem('pageevents', 'events');
    window.localStorage.setItem('eventsCreate', eventvalue);
    window.localStorage.setItem('entNamValue', this.feature.enterpriseName);
    window.localStorage.setItem('entIdValue', this.feature.enterpriseId);
    window.localStorage.setItem('fleetIdValue', this.feature.fleetId);
    window.localStorage.setItem('fleetNameValue', this.feature.fleetName);
  }
}
// dates conversion
function loginUserDateConversion(dateTime) {
  if (dateTime && dateTime != '') {
    var loginUsersTimezone = localStorage.getItem('loginUserTimezone');
    var loginUserDateFormat = localStorage.getItem('loginUserDateFormat');
    var timezonevalue = loginUsersTimezone.split('(UTC');
    var utcformat = timezonevalue[0].split('-');
    var timezoneCodes = utcformat[0].trim();
    var utcval = timezonevalue[1].split(')');
    var utctimezone = utcval[0];
    var utctimezonestring = utcval[0].toString();
    if (utctimezonestring.charAt(0) === '+') {
      var utctime = utctimezone.split('+');
      var utctimesplit = utctime[1].split(':');
      dateTime = moment(dateTime).utc().add(utctimesplit[0], 'hours');
      dateTime = moment(dateTime).add(utctimesplit[1], 'minutes');

    } else {
      var utctime = utctimezone.split('-');
      var utctimesplit = utctime[1].split(':');
      dateTime = moment(dateTime).utc().subtract(utctimesplit[0], 'hours');
      dateTime = moment(dateTime).subtract(utctimesplit[1], 'minutes');

    }
    dateTime = moment(dateTime).format(loginUserDateFormat + ' HH:mm') + ' ' + timezoneCodes;
    return dateTime;
  } else {
    return '';
  }
}
/*function updateOrder(JSONObject) {
	var page = getAllUrlParams().pn;
	var floorPlan = getAllUrlParams().fp;
	var returnJSON = {};
	dispColOdr = [];
	B1 = ['Designation', 'Department', 'Mobile #', 'Email', 'Permanent Address'];
	B2 = ['Fleet Address', 'Fleet Type'];
	B3 = ['Event Name', 'Event Owner', 'Start Date Time', 'End Date Time', 'Duration', 'Event Status'];
	if (page === 'eventregistrations' || page === 'events' || page === 'fleetreservations' || page === 'fleets') {
		dispColOdr = B2.concat(B3).concat(B1);
	} else if (page === 'people' || page === 'callhistory' || page === 'messagehistory' || page === 'users') {
		if (floorPlan === 'true') {
			dispColOdr = B1.concat(B2).concat(B3);
		} else {
			dispColOdr = B1;
		}
	}
	$.each(dispColOdr, function (index, value) {
		returnJSON[value] = JSONObject[value];
		delete JSONObject[value];
	});
	$.each(JSONObject, function (index, value) {
		returnJSON[index] = value;
	});
	return returnJSON;
}*/
function updateOrder(JSONObject, dispColOdr) {
  var page = getAllUrlParams().pn;
  var floorPlan = getAllUrlParams().fp;
  var returnJSON = {};
  $.each(dispColOdr, function (index, value) {
    if (!returnJSON[value]) {
      returnJSON[value] = JSONObject[value];
      delete JSONObject[value];
    }
  });
  $.each(JSONObject, function (index, value) {
    returnJSON[index] = value;
  });
  return returnJSON;
}
function showSpinner() {
  //   //Spinner code start
  //  $('#mapid').on('click', function () {
  document.getElementById('mapid').style.display = 'block';
  document.getElementById('mapspinnerbackgroundId').style.display = 'block';
  document.getElementById('mapspinnerId').style.display = 'block';
  // });
  //Spinner code end
  window.close();
}