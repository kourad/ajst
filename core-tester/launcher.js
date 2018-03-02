const Test = require( './clases/test.js') 
const Group = require( './clases/group.js') 


let tests = {}


tests['Other'] =  new Group('Other')
tests['Other'].addCategory( 'Other' )

function $test(name, callback, capture)
{
    tests['Other']['Other'].addTest(name, callback, capture)
}
global.$test = $test;

function $execute()
{
    //tests['Other'].execute()
    for( let i in tests )
    {
        tests[i].execute()
    }
}
global.$execute = $execute