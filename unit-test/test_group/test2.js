const path = require('path')
let fun = require( path.join(__dirname, '../../nodeServer/controller/testController')  )
let assert = require('assert')


$test( 'Test de $getType 2', () => 
{    
    assert.strictEqual(fun.$getType({}), 'object' )
} )

/* $test( 'Test promesas', (done) => {


    fun.promiseFunction().then( (response) => {
        done(response, 'undefined');
    } )

}, true ) */