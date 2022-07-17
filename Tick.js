"use strict";
function Tick(run_action, start_action, stop_action, tick_ms) {
    let that = this;
    let tick_handle = 0;
    let is_running = false;
    let interval = (tick_ms) ? tick_ms : 200;
    this.runAction = function (tick) {
        console.log("Tick[handle:" + tick.getHandle() + "].runAction() at interval " + tick.getInterval());
    };
    this.startAction = function (tick) {
        console.log("Tick[handle:" + tick.getHandle() + "].startAction(), isRunning: " + tick.isRunning());
    };
    this.stopAction = function (tick) {
        console.log("Tick[handle:" + tick.getHandle() + "].stopAction(), isRunning: " + tick.isRunning());
    };
    if (run_action) {
        this.runAction = run_action;
        if (start_action) {
            this.startAction = start_action;
            if (stop_action) {
                this.stopAction = stop_action;
            }
        }
    }
    this.run = function () {
        if (!is_running) {
            tick_handle = setInterval(that.runAction, interval, that);
            is_running = true;
            that.startAction(that);
        }
    };
    this.stop = function () {
        if (is_running) {
            clearInterval(tick_handle);
            is_running = false;
            that.stopAction(that);
        }
    };
    this.runStop = function () {
        if (is_running) {
            clearInterval(tick_handle);
            is_running = false;
            that.stopAction(that);
        }
        else {
            tick_handle = setInterval(that.runAction, interval, that);
            is_running = true;
            that.startAction(that);
        }
    };
    this.setInterval = function (i) {
        if (is_running) {
            clearInterval(tick_handle);
            interval = i;
            tick_handle = setInterval(that.runAction, interval, that);
        }
        else {
            interval = i;
        }
    };
    this.getInterval = function () {
        return interval;
    };
    this.getHandle = function () {
        return tick_handle;
    };
    this.isRunning = function () {
        return is_running;
    };
}
/** */
/*
class Tick {
    protected tick_handle: number | undefined;
    protected is_running: boolean;
    protected interval: number;
    public runAction;
    public startAction;
    public stopAction;
    constructor(run_action?: Function, start_action?: Function, stop_action?: Function) {
        this.runAction = function(){console.log("executou default Tick.runAction()")};
        this.startAction = function(){console.log("executou default Tick.startAction()")};
        this.stopAction = function(){console.log("executou default Tick.stopAction()")};
        this.is_running = false;
        this.interval = 250;
        if (run_action) {
            this.runAction = run_action;
            if (start_action) {
                this.startAction = start_action;
                if (stop_action) {
                    this.stopAction = stop_action;
                }
            }
        }
    
    }
    run() {
        if (!this.is_running) {
            this.tick_handle = setInterval(this.runAction, this.interval);
            this.is_running = true;
            this.startAction();
        }
    }
    stop() {
        if (this.is_running) {
            clearInterval(this.tick_handle);
            this.is_running = false;
            this.stopAction();
        }
    }
    runStop() {
        if (this.is_running) {
            clearInterval(this.tick_handle);
            this.is_running = false;
            this.stopAction();
        }
        else {
            this.tick_handle = setInterval(this.runAction, this.interval);
            this.is_running = true;
            this.startAction();
        }
    }
    setInterval(i: number) {
        if (this.is_running) {
            clearInterval(this.tick_handle);
            this.interval = i;
            this.tick_handle = setInterval(this.runAction, this.interval);
        }
        else {
            this.interval = i;
        }
    }
    isRunning() {
        return this.is_running;
    }
}
/** */
/*
// Original Tick.js
function Tick(run_action, start_action, stop_action) {
    var tick_handle;
    var is_running = false;
    var interval = 250;
    this.runAction = function(){console.log("executou default Tick.runAction()")};
    this.startAction = function(){console.log("executou default Tick.startAction()")};
    this.stopAction = function(){console.log("executou default Tick.stopAction()")};
    this.run = function() {
        if (!is_running) {
            tick_handle = setInterval(Tick.runAction, interval);
            is_running = true;
            Tick.startAction();
        }
    }
    this.stop = function() {
        if (is_running) {
            clearInterval(tick_handle);
            is_running = false;
            Tick.stopAction();
        }
    }
    this.runStop = function() {
        if (is_running) {
            clearInterval(tick_handle);
            is_running = false;
            Tick.stopAction();
        }
        else {
            tick_handle = setInterval(Tick.runAction, interval);
            is_running = true;
            Tick.startAction();
        }
    }
    if (arguments.length>0) {
        Tick.runAction = run_action;
        if (arguments.length>1){
            Tick.startAction = start_action;
            if (arguments.length>2){
                Tick.stopAction = stop_action;
            }
        }
    }
    this.setInterval = function(i) {
        if (is_running) {
            clearInterval(tick_handle);
            interval = i;
            tick_handle = setInterval(Tick.runAction, interval);
        }
        else {
            interval = i;
        }
    }
    this.isRunning = function() {
        return is_running;
    }
}
*/ 
