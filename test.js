const YF = require('./index.js');

/*
let
    count_limiter = 0,
    limiter = YF.limiter(() => {
    console.log( 'limiter' ) 
}, 5, 10 )

setInterval(function () {
    console.log('call: '+ count_limiter)
    
    if (limiter()) {
        console.log('done')
    } else {
        //console.log('fail')
    }

    count_limiter++
}, 100 )
*/


/*
let
    count_throttle = 0,
    throttle = YF.throttle(() => {
    console.log( 'throttle' ) 
}, 1000 )

setInterval(function () {
    console.log('call: ' + count_throttle)
    
    if (throttle()) {
        console.log('done')
    } else {
        //console.log('fail')
    }

    count_throttle++
}, 100 )
*/


let
    count_debounce = 0,
    timer_debounce,
    debounce = YF.debounce(() => {
    console.log( 'debounce' ) 
}, 2000 )

timer_debounce = setInterval(function () {
    console.log('call: '+count_debounce)
    debounce()
    count_debounce++

    if (count_debounce == 15) {
        clearInterval( timer_debounce )
    }
}, 100 )
