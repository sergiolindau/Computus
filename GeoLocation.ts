import { Angle } from "./Angle";

/**
 * Name: LatLng
 * Purpose: Type definition for geographic coordinates
 */
type LatLng = {
	lat: number;
	lng: number;
};

type LatLngCallback = (position: LatLng) => void;

/**
 * Name: GeoLocation
 * Purpose: Use navigator.geolocation to get latitude and longitude
 */
class GeoLocation {
	public position: LatLng;
	protected status: number;
	public onset: LatLngCallback;
	constructor() {
	  this.position = {lat:0,lng:0};
	  this.status = 2;
	  this.onset = function(position: LatLng){alert("GeoLocation.onset({ lat:"+position.lat+", lng:"+position.lng+"})")};
	}
	public reset() {
		this.position = {lat:0,lng:0};
		this.status = 2;
	}
	protected coords2latLng: PositionCallback = (pos: GeolocationPosition) => {
		this.position = {lat: pos.coords.latitude, lng:pos.coords.longitude};
		this.status = 0;
		this.onset(this.position);
	}
	public isLocationResponse() {
		return this.status?false:true;
	}
	public isLocationResponseWaiting() {
		return (this.status==1)?true:false;
	}
	public getPosition() {
		return this.position;
	}
	public setPosition(pos: LatLng) {
		this.position.lat = pos.lat;
		this.position.lng = pos.lng;
		this.status = 2;
	}
	public getPositionAngle() {
		return {lat:new Angle(this.position.lat),lng:new Angle(this.position.lng)};
	}
	public setPositionAngle(pos: any) {
		this.position.lat = pos.lat.dec;
		this.position.lng = pos.lng.dec;
		this.status = 2;
	}
	public getLocation() {
		switch (this.status) {
			case 2:
			    if (navigator.geolocation) {
    		    	navigator.geolocation.getCurrentPosition(this.coords2latLng);
	    		} else { 
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