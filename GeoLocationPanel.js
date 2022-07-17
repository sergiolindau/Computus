"use strict";
/***********************************************************************/
var mylocation = { lat: new Angle(0), lng: new Angle(0) };
var TheLocation = new GeoLocation();
/***********************************************************************/
function updateCoordSelect(axis) {
    DOM$.i(axis + "deg").selectedIndex = mylocation[axis].get(Angle.DEG);
    DOM$.i(axis + "min").selectedIndex = mylocation[axis].get(Angle.MIN);
    DOM$.i(axis + "sec").selectedIndex = mylocation[axis].get(Angle.SEC);
    DOM$.i(axis + "dir").selectedIndex = mylocation[axis].get(Angle.DIR);
    DOM$.i(axis + "dec").value = mylocation[axis].get(Angle.DEC).toFixed(6);
}
/***********************************************************************/
function updateLocationFlags() {
    var temp = TheLocation.isLocationResponse();
    DOM$.i("isLocationResponse").checked = temp;
    DOM$.i("isLocationResponse").disabled = temp;
    DOM$.i("isLocationResponseWaiting").checked = TheLocation.isLocationResponseWaiting();
}
/***********************************************************************/
TheLocation.onset = function (pos) {
    mylocation.lat.dec = pos.lat;
    mylocation.lng.dec = pos.lng;
    updateCoordSelect("lat");
    updateCoordSelect("lng");
    updateLocationFlags();
    updateGeoHack();
};
/***********************************************************************/
function clickCurrentLocation() {
    if (DOM$.i("isLocationResponse").checked) {
        TheLocation.setPosition({ lat: 0, lng: 0 });
        DOM$.i("isLocationResponseWaiting").checked = true;
        TheLocation.getLocation();
    }
}
/***********************************************************************/
function updateGeoHack() {
    const scale = 10000;
    DOM$.i("GeoHack").href = "javascript:window.open('https://geohack.toolforge.org/geohack.php?params=" +
        (mylocation.lat.get(Angle.DEG)) + "_" +
        (mylocation.lat.get(Angle.MIN)) + "_" +
        (Math.round(mylocation.lat.get(Angle.SEC))) + "_" +
        ((mylocation.lat.get(Angle.SIG) >= 0) ? "N" : "S") + "_" +
        (mylocation.lng.get(Angle.DEG)) + "_" +
        (mylocation.lng.get(Angle.MIN)) + "_" +
        (Math.round(mylocation.lng.get(Angle.SEC))) + "_" +
        ((mylocation.lng.get(Angle.SIG) >= 0) ? "E" : "W") + "_" +
        "scale:" + scale +
        "', '_blank')";
    DOM$.i("GeoHack").innerHTML = "GeoHack(" + (mylocation.lat.get(Angle.DEC).toFixed(6)) + "," + (mylocation.lng.get(Angle.DEC).toFixed(6)) + ")";
}
/***********************************************************************/
function changeCoordElement(axis, field) {
    if (field == "dec") {
        mylocation[axis].set(Angle.DEC, parseFloat(DOM$.i(axis + field).value));
        updateCoordSelect(axis);
    }
    else {
        mylocation[axis].set(eval("Angle." + field.toUpperCase()), DOM$.i(axis + field).selectedIndex);
        DOM$.i(axis + "dec").value = mylocation[axis].get(Angle.DEC).toFixed(6);
    }
    TheLocation.setPositionAngle(mylocation);
    updateLocationFlags();
    updateGeoHack();
}
/***********************************************************************/
function initLocationPanel() {
    DOM$.select.fillRange("latdeg", 0, 90);
    DOM$.select.fillRange("latmin", 0, 59);
    DOM$.select.fillRange("latsec", 0, 59);
    DOM$.select.fillRange("lngdeg", 0, 180);
    DOM$.select.fillRange("lngmin", 0, 59);
    DOM$.select.fillRange("lngsec", 0, 59);
    TheLocation.setPosition({ lat: 0, lng: 0 });
    DOM$.i("isLocationResponseWaiting").checked = true;
    TheLocation.getLocation();
}
