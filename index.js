'use strict';

let YF = {

    
    /**
    * Limit a function called times in a time period.
    * @param {function} fn // function
    * @param {int} limit // number of allowed times
    * @param {int} cycle // time in second
    * 
    * @return {function} // the limited function
    */
    limiter: (fn, limit, cycle)=> {
        
        let 
            ary = [];

            cycle = cycle * 1000;

        function filter(now) {
            ary = ary.filter( (item)=> now < item + cycle )
            return ary.length
        }

        let fuc = function() {
            let now = new Date().getTime();

            if (ary.length >= limit && filter(now) >= limit) {
                return false
            }

            ary.push( now );
            fn.apply(this, arguments);
            return true
        }

        fuc.cancel = function() {
            ary = []
        }

        return fuc
    },


    /**
    * Debounce a function called.
    * @param {function} fn // function
    * @param {int} timeout // time in million second
    * 
    * @return {function} // the debounced function
    */
    debounce: (fn, timeout)=> {

        let timer,
            context,
            args;

        let fuc = function() {

            context = this;
            args = arguments;

            if( timer ) {
                clearTimeout( timer )
                timer = null
            }

            timer = setTimeout( ()=>{
                fn.apply( context, args )
            }, timeout )
        }

        fuc.cancel = () => {
            clearTimeout( timer )
            context = args = timer = null
        }

        return fuc
    },


    /**
    * Throttle a function called.
    * @param {function} fn // function
    * @param {int} timeout // time in million second
    * 
    * @return {function} // the throttled function
    */
    throttle: (fn, timeout) => {
        
         let 
            timer;

        let fuc = function() {
            let now = new Date().getTime();

            if( !timer || now > timer + timeout ) {
                timer = now;

                fn.apply(this, arguments)
                return true
            } else {
                return false
            }
        }

        fuc.cancel = function() {
            timer = null;
        }

        return fuc
    }

    
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = YF
} else if (typeof exports !== 'undefined') {
    exports.YF = YF
} else if( window ){
    window.YF = YF
}
