'use strict';

let YF = {

    
    /**
    * Limit a function called times in a time period.
    * @param {function} fn // function
    * @param {int} limit // number of allowed times
    * @param {int} cycle // time in second
    * @param {string} split // split the timeline by name
    * 
    * @param {string} name // timeline name
    * 
    * @return {function} // the limited function
    */
    limiter: (fn, limit, cycle, split)=> {
        
        if (typeof fn != 'function') {
            split = cycle,
            cycle = limit,
            limit = fn,
            fn = null
        }
        
        if (split) {
            split = gettime();
        }
        
        cycle = cycle * 1000;

        let
            fuc,
            split_checkpoint = split ? cycle*3 : null,
            ary = split ? {} : [];

        function gettime() {
            return new Date().getTime()
        }
        
        function check_split(now) {
            
            if (now > split) {
                split = now + split_checkpoint;
            } else {
                return
            }

            for (let i in ary) { 
                if (ary[i][ary[i].length - 1] < now - cycle) {
                    delete ary[i]
                }
            }
        }
        
        function f_split(name) {
            let now = gettime();

            check_split(now);
            
            if (!ary[name]) {
                ary[name] = []
            } else if (ary[name].length && ary[name].length >= limit && (() => {
                ary[name] = ary[name].filter((item) => now < item + cycle )
                return ary[name].length
            })() >= limit ){
                return false
            }
                
            ary[name].push(now);
            if(typeof fn === 'function') fn.apply(this, arguments);
            
            return true
        }
        
        function f_no_split() {
            let now = gettime();

            if (ary.length >= limit && (() => {
                ary = ary.filter( (item)=> now < item + cycle )
                return ary.length
            })() >= limit) {
                return false
            }

            ary.push( now );
            if(typeof fn === 'function') fn.apply(this, arguments);
            return true
        }

        if (split) {
            fuc = f_split
        } else {
            fuc = f_no_split
        }

        fuc.cancel = function() {
            ary = split ? {} : []
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
        
        if (typeof fn != 'function') {
            timeout = fn,
            fn = null;
        }
        
         let 
            timer;

        let fuc = function() {
            let now = new Date().getTime();

            if( !timer || now > timer + timeout ) {
                timer = now;

                if (typeof fn === 'function') {
                    fn.apply(this, arguments)
                }
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
