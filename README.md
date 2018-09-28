# yf-limiter

  version: 2.0.0

  A limiter that **prevent overflow** from action / event / request ..



## Installation

  Node:

    $ npm install yf-limiter



## Example

### Import

```js
const YF = require('yf-limiter');
```


### Debounce
```js
let count = 1,
    debounced = YF.debounce( function(){
        console.log( 'called' )
    }, 2000 )

setInterval( function() {
    if( count < 5 ) {
        debounced();
    }
    count++;
} , 1000 );

// '', '', '', '', called ...
```


### Throttle
```js
let throttled = YF.throttle( function(){
        console.log( 'called' )
    }, 2000 )

setInterval( throttled , 1000 );

// called, '', called, '', called, '', called, '', called ...
```

or:

```js
let throttled = YF.throttle( 2000 )

setInterval( ()=>{
    if( throttled() ) {
        console.log( 'called' )
    } else {
        console.log( '' )
    }
} , 1000 );

// called, '', called, '', called, '', called, '', called ...
```


### Limiter
5 times function called will be allowed in every 10 second, the other would be rejected
```js
let limited = YF.limiter( function(){
          console.log( 'called' )
     }, 5, 10 )

setInterval( limited , 1000 );

// called, called, called, called, called, '', '', '', '', '', called, called ...
```

or:

```js
let limited = YF.limiter( 5, 10 )

setInterval( ()=>{
    if( limited() ) {
        console.log( 'called' )
    } else {
        console.log( '' )
    }
    
}, 1000 );

// called, called, called, called, called, '', '', '', '', '', called, called ...
```

or:

```js
let limited = YF.limiter( function(a){
          console.log( a )
     }, 5, 10 )

setInterval( ()=>{

    limited('1')
    if(run % 3) limited('2')
    if(run % 6 && run < 50) limited('3')
    
}, 1000 );

// [1] 1, 1, 1, 1, 1, '', '', '' ...
// [2] '', 2, 2, '', 2, 2, '', 2, '' ...
// [3] '', 3, 3, 3, 3, 3, '', '' ...
```



## API

### YF.limiter(fn, limit, cycle)
```
* Limit a function called times in a time period.
* @param {function} fn // function
* @param {int} limit // number of allowed times
* @param {int} cycle // time in second
* @param {string} split // split the timeline by name
* 
* @param {string} name // timeline name
* 
* @return {function} // the limited function
```

### YF.debounce(fn, timeout)
```
* Debounce a function called.
* @param {function} fn // function
* @param {int} timeout // time in million second
* 
* @return {function} // the debounced function
```

### YF.throttle(fn, timeout)
```
* Throttle a function called.
* @param {function} fn // function
* @param {int} timeout // time in million second
* 
* @return {function} // the throttled function
```



## License

  MIT
