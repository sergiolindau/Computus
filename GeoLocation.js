//import { Angle } from "./Angle";
/**
 * Name: GeoLocation
 * Purpose: Use navigator.geolocation to get latitude and longitude
 */
class GeoLocation {
    constructor() {
        this.coords2latLng = (pos) => {
            this.position = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            this.status = 0;
            this.onset(this.position);
        };
        this.position = { lat: 0, lng: 0 };
        this.status = 2;
        this.onset = function (position) { alert("GeoLocation.onset({ lat:" + position.lat + ", lng:" + position.lng + "})"); };
    }
    reset() {
        this.position = { lat: 0, lng: 0 };
        this.status = 2;
    }
    isLocationResponse() {
        return this.status ? false : true;
    }
    isLocationResponseWaiting() {
        return (this.status == 1) ? true : false;
    }
    getPosition() {
        return this.position;
    }
    setPosition(pos) {
        this.position.lat = pos.lat;
        this.position.lng = pos.lng;
        this.status = 2;
    }
    getPositionAngle() {
        return { lat: new Angle(this.position.lat), lng: new Angle(this.position.lng) };
    }
    setPositionAngle(pos) {
        this.position.lat = pos.lat.dec;
        this.position.lng = pos.lng.dec;
        this.status = 2;
    }
    getLocation() {
        switch (this.status) {
            case 2:
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.coords2latLng);
                }
                else {
                    throw "Geolocation is not supported by this browser.";
                }
                this.status = 1;
                break;
            case 1:
            case 0:
                break;
        }
        return this.status;
    }
}
