/**
 * swipable.js v0.2.0
 *
 * 2014-03-19
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

(function () {
    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    };

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

;( function(window) {

    'use strict';

    var Swipable = function(el) {

        this.el = el;
        this._init();

        return this.el;
    };

    Swipable.prototype._init = function() {
        this.el.addEventListener('touchstart',   this.touchStart.bind(this), false);
        this.el.addEventListener('touchend',     this.touchEnd.bind(this), false);
        this.el.addEventListener('touchmove',    this.touchMove.bind(this), false);
        this.el.addEventListener('touchcancel',  this.touchCancel.bind(this), false);
    }

    Swipable.prototype._reset = function() {

        this.fingerCount = 0;
        this.startX = 0;
        this.startY = 0;
        this.curX = 0;
        this.curY = 0;
        this.deltaX = 0;
        this.deltaY = 0;
        this.horzDiff = 0;
        this.vertDiff = 0;
        this.minLength = 72; // minimum swipe distance (px) to be recognized
        this.swipeLength = 0;
        this.swipeAngle = null;
        this.swipeDirection = null;
    };

    Swipable.prototype.touchStart = function(event) {

        event.preventDefault();
        this.fingerCount = event.touches.length;

        if ( this.fingerCount == 1 ) {
            this.startX = event.touches[0].pageX;
            this.startY = event.touches[0].pageY;
        } else {
            this.touchCancel();
        }
    };

    Swipable.prototype.touchMove = function(event) {

        event.preventDefault();

        if ( event.touches.length == 1 ) {
            this.curX = event.touches[0].pageX;
            this.curY = event.touches[0].pageY;
        } else {
            this.touchCancel();
        }
    };

    Swipable.prototype.touchEnd = function(event) {

        event.preventDefault();

        if ( this.fingerCount == 1 && this.curX != 0 ) {

            this.swipeLength = Math.round(Math.sqrt(Math.pow(this.curX - this.startX,2) + Math.pow(this.curY - this.startY,2)));

            if ( this.swipeLength >= this.minLength ) {
                this.caluculateAngle();
                this.determineSwipeDirection();
                this.triggerEvent();
                this.touchCancel();
            } else {
                this.touchCancel();
            }
        } else {
            this.touchCancel();
        }
    };

    Swipable.prototype.touchCancel = function() {
        this._reset();
    };

    /**
     * Calculate touch angel
     */
    Swipable.prototype.caluculateAngle = function() {

        var X = this.startX - this.curX;
        var Y = this.curY - this.startY;
        var Z = Math.round(Math.sqrt(Math.pow(X,2)+Math.pow(Y,2)));
        var r = Math.atan2(Y,X);

        this.swipeAngle = Math.round(r*180/Math.PI);

        if ( this.swipeAngle < 0 ) {
            this.swipeAngle =  360 - Math.abs(this.swipeAngle);
        }
    };

    /**
     * Determine swipe direction
     */
    Swipable.prototype.determineSwipeDirection = function() {

        if ( (this.swipeAngle <= 45) && (this.swipeAngle >= 0) ) {
            this.swipeDirection = 'left';
        } else if ( (this.swipeAngle <= 360) && (this.swipeAngle >= 315) ) {
            this.swipeDirection = 'left';
        } else if ( (this.swipeAngle >= 135) && (this.swipeAngle <= 225) ) {
            this.swipeDirection = 'right';
        } else if ( (this.swipeAngle > 45) && (this.swipeAngle < 135) ) {
            this.swipeDirection = 'down';
        } else {
            this.swipeDirection = 'up';
        }
    };

    /**
     * Trigger the swipe event
     */
    Swipable.prototype.triggerEvent = function() {

        // dispatch the concrete swipe event
        this.el.dispatchEvent(new CustomEvent('swipe'+this.swipeDirection, {
            cancelable: true
        }));

        // dispatch the general swipe event, direction is stored in detail property
        this.el.dispatchEvent(new CustomEvent('swipe', {
            cancelable  : true,
            detail      : {
                direction : this.swipeDirection
            }
        }));
    };

    window.Swipable = Swipable;

})(window);