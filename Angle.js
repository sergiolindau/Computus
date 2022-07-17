/***********************************************************************
 JavaScript Angle Object
 Angle object that abstracts representation and do roundings and
 format strings.
 Copyright (c) 2018 Sergio Lindau
***********************************************************************/
class Angle {
    constructor(...args) {
        this.dec = 0;
        this.roundms = false;
        if (args.length == 1) { // decimal
            this.dec = args[0];
        }
        else if (args.length == 2) { // signed degree, min
            this.dec = args[0] + args[1] / 60;
        }
        else if (args.length == 3) { // signed degree , min , sec
            this.dec = args[0] + (args[1] * 60 + args[2]) / 3600;
        }
        else if (args.length == 4) { // sig,degree,min,sec
            this.dec = ((args[0] != 0) ? (args[0] / Math.abs(args[0])) : 0) * (args[1] + (args[2] * 60 + args[3]) / 3600);
        }
    }
    /***********************************************************************/
    _minute(fraction) {
        return Math.abs(~~(fraction * 60)) + ~~(this._second(this.dec - ~~this.dec) / 60);
    }
    /***********************************************************************/
    _second(fraction) {
        return Math.abs(Math.round((fraction - (~~(fraction * 60)) / 60) * 3600 * 1e9) / 1e9);
    }
    /***********************************************************************/
    set_sigdegminsec(sig, deg, min, sec) {
        this.dec = sig * (deg + (min * 60 + sec) / 3600);
    }
    /***********************************************************************/
    get(field) {
        if (arguments.length < 1)
            field = Angle.DEC;
        switch (field) {
            case Angle.DEC:
                return this.dec;
            case Angle.RAD:
                return this.dec * Angle.RAD_FROM_DEG;
            case Angle.SIG:
                return (this.dec != 0) ? (this.dec / Math.abs(this.dec)) : 0;
            case Angle.DIR:
                return (this.dec < 0) ? 1 : 0;
            case Angle.DEG:
                return Math.abs(~~this.dec) + ~~(this._minute(this.dec - ~~this.dec) / 60);
            case Angle.HOURS:
                return Math.abs(this.dec / 15);
            case Angle.HOUR:
                return Math.abs(~~this.dec / 15) + ~~(this._minute(this.dec / 15 - ~~(this.dec / 15)) / 60);
            case Angle.MIN:
                return this._minute(this.dec - ~~this.dec) % 60;
            case Angle.HMIN:
                return this._minute(this.dec / 15 - ~~(this.dec / 15)) % 60;
            case Angle.SEC:
                return this._second(this.dec - ~~this.dec) % 60;
            case Angle.HSEC:
                return this._second(this.dec / 15 - ~~(this.dec / 15)) % 60;
            case Angle.MSEC:
                return (this._second(this.dec - ~~this.dec) % 60) * 1e-3;
            case Angle.HMSEC:
                return (this._second(this.dec / 15 - ~~(this.dec / 15)) % 60) * 1e-3;
            case Angle.DEGSTR:
                return (this.get(Angle.SIG) * this.get(Angle.DEG)) + "º" + this.get(Angle.MIN) + "'" + this.get(Angle.SEC) + "''";
            case Angle.RADSTR:
                return (Math.round(this.dec / 180 * 1e9) / 1e9) + "π";
            case Angle.HSTR:
                return (this.get(Angle.SIG) * this.get(Angle.HOUR)) + "<sup>h</sup>" + this.get(Angle.MIN) + "<sup>m</sup>" + this.get(Angle.SEC) + "<sup>s</sup>";
            case Angle.SIN:
                return Math.sin(this.dec * Angle.RAD_FROM_DEG);
            case Angle.COS:
                return Math.cos(this.dec * Angle.RAD_FROM_DEG);
            case Angle.TAN:
                return Math.tan(this.dec * Angle.RAD_FROM_DEG);
            case Angle.DATE:
                var temp = new Date();
                temp.setUTCHours(this.get(Angle.HOURS));
                temp.setUTCMinutes(this.get(Angle.HMIN));
                temp.setUTCSeconds(this.get(Angle.HSEC));
                temp.setUTCMilliseconds(this.get(Angle.HMSEC));
                return temp;
            default:
                return this.dec;
        }
    }
    /***********************************************************************/
    set(field, x, y) {
        if ((arguments.length < 2) && (typeof (arguments[0] == 'number')))
            field = Angle.DEC;
        if ((arguments.length < 2) && (typeof (arguments[0] == 'string')))
            field = Angle.DEGSTR;
        switch (field) {
            case Angle.DEC:
                this.dec = x;
                break;
            case Angle.RAD:
                this.dec = x * Angle.DEG_FROM_RAD;
                break;
            case Angle.SIG:
                this.dec = ((x != 0) ? (x / Math.abs(x)) : 0) * Math.abs(this.dec);
                break;
            case Angle.DIR:
                this.dec = ((x == 0) ? 1 : -1) * Math.abs(this.dec);
                break;
            case Angle.DEG:
                this.dec = (this.get(Angle.SIG) ? this.get(Angle.SIG) : 1) * (x + Math.abs(this.dec - ~~this.dec));
                break;
            case Angle.HOURS:
                this.dec = x * 15;
                break;
            case Angle.HOUR:
                this.dec = (this.get(Angle.SIG) ? this.get(Angle.SIG) : 1) * (x * 15 + Math.abs(this.dec / 15 - ~~(this.dec / 15)));
                break;
            case Angle.MIN:
                this.set_sigdegminsec((this.get(Angle.SIG) ? this.get(Angle.SIG) : 1), this.get(Angle.DEG), x, this.get(Angle.SEC));
            case Angle.HMIN:
                this.set_sigdegminsec((this.get(Angle.SIG) ? this.get(Angle.SIG) : 1), this.get(Angle.HOUR) * 15, x, this.get(Angle.HSEC));
                break;
            case Angle.SEC:
                this.set_sigdegminsec((this.get(Angle.SIG) ? this.get(Angle.SIG) : 1), this.get(Angle.DEG), this.get(Angle.MIN), x);
                break;
            case Angle.HSEC:
                this.set_sigdegminsec((this.get(Angle.SIG) ? this.get(Angle.SIG) : 1), this.get(Angle.HOUR) * 15, this.get(Angle.HMIN), x);
                break;
            case Angle.ASIN:
                this.dec = Angle.DEG_FROM_RAD * Math.asin(x);
                break;
            case Angle.ACOS:
                this.dec = Angle.DEG_FROM_RAD * Math.acos(x);
                break;
            case Angle.ATAN:
                this.dec = Angle.DEG_FROM_RAD * Math.atan(x);
                break;
            case Angle.DATE:
                this.dec = Angle.DEG_FROM_RAD * Math.atan2(x, y ? y : 0);
                break;
            case Angle.UNIXTIME: //*******
                this.dec = Angle.DEG_FROM_RAD * Math.atan2(x, y ? y : 0);
                break;
        }
        return this;
    }
    /***********************************************************************/
    static log(angle) {
        console.log("angle.get(Angle.DEC): " + angle.get(Angle.DEC));
        console.log("angle.get(Angle.RAD): " + angle.get(Angle.RAD));
        console.log("angle.get(Angle.RADSTR): " + angle.get(Angle.RADSTR));
        console.log("angle.get(Angle.SIG): " + angle.get(Angle.SIG));
        console.log("angle.get(Angle.DIR): " + angle.get(Angle.DIR));
        console.log("angle.get(Angle.DEG): " + angle.get(Angle.DEG));
        console.log("angle.get(Angle.MIN): " + angle.get(Angle.MIN));
        console.log("angle.get(Angle.SEC): " + angle.get(Angle.SEC));
        console.log("angle.get(Angle.DEGSTR): " + angle.get(Angle.DEGSTR));
        console.log("===============================");
    }
    static ParseAngle(s, max) {
        // Look for 1..3 floating pointer numbers, delimited by colons.
        // For example:  37.35   or   43:15.373   or  23:44:55.7  
        // These represent degrees[:minutes[:seconds]].
        // We ignore any white space outside the floating point numbers.
        var RegExp_Float = /[0-9]/;
        var angle = null;
        var array = s.split(/\s*:\s*/);
        if (array.length >= 1 && array.length <= 3) {
            var denom = 1.0;
            angle = 0.0;
            for (var i = 0; i < array.length; ++i) {
                if (!RegExp_Float.test(array[i])) {
                    return null; // does not look like a valid floating point number
                }
                var x = parseFloat(array[i]);
                if (isNaN(x)) {
                    return null; // could not parse a floating point number
                }
                if (x < 0) {
                    return null; // user must specify direction by using E/W, N/S controls, not '+' or '-'.
                }
                if (i > 0) {
                    if (x >= 60.0) {
                        return null; // not a valid minute or second value
                    }
                }
                angle += x / denom;
                denom *= 60.0;
            }
            if (angle < 0.0 || angle > max) {
                return null;
            }
        }
        return angle;
    }
}
// Angle field get/set descriptors
Angle.DEC = 0;
Angle.RAD = 1;
Angle.SIG = 2;
Angle.DIR = 3;
Angle.DEG = 4;
Angle.HOURS = 5;
Angle.HOUR = 6;
Angle.MIN = 7;
Angle.HMIN = 8;
Angle.SEC = 9;
Angle.HSEC = 10;
Angle.MSEC = 11;
Angle.HMSEC = 12;
Angle.DEGSTR = 13;
Angle.RADSTR = 14;
Angle.HSTR = 15;
Angle.SIN = 16;
Angle.COS = 17;
Angle.TAN = 18;
Angle.ASIN = 19;
Angle.ACOS = 20;
Angle.ATAN = 21;
Angle.ATAN2 = 22;
Angle.DATE = 23;
Angle.UNIXTIME = 24;
Angle.DOTPROD = 25;
Angle.DEG_FROM_RAD = 180.0 / Math.PI;
Angle.RAD_FROM_DEG = Math.PI / 180.0;
Angle.HOURS_FROM_RAD = 12.0 / Math.PI;
Angle.RAD_FROM_HOURS = Math.PI / 12.0;
//export { Angle };
