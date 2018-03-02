const path = require('path')
let fun = require( path.join(__dirname, '../nodeServer/controller/testController')  )
//let assert = require('assert')


$test( 'Test de assert.strictEqual', (assert) => 
{    
    assert.strictEqual( fun.$getType([]), 'array' )
} )


$test( 'Test assert.equal', (assert) => {
    assert.equal( fun.$getType('rehr'), 'string' )
} )

$test( 'Test assert.notEqual', (assert) => {
    assert.notEqual( fun.$getType('rehr'), 'boolean' )
} )

$test( 'Test assert.notStrictEqual', (assert) => {
    assert.notStrictEqual( fun.$getType('rehr'), 'boolean' )
} )


$test( 'Test assert.deepEqual', (assert) => {
    assert.deepEqual( fun.arrayFunction(), [1,2,3,"hola"] )
} )


$test( 'Test error JS', (assert) => {

    console.log(hola)

    assert.deepEqual( fun.arrayFunction(), [1,2,3,"hola",4] )
} )



$test( 'Test schema invalido', (assert) => 
{
    assert.EqualSchema( fun.objectFunction(), )
} )


$test( 'Test schema valido', (assert) => 
{
    let schema = {
        type: 'object',
        properties: {
            name: {type: 'string'},
            surname: {type: 'string'}
        }
    }
    assert.EqualSchema( fun.objectFunction(), schema )
} )

$test( 'Test no pasamos el schema (ERROR)', (assert) => 
{
    let schema = {
        type: 'object',
        required: ['apellido'],
        properties: {
            name: {type: 'string'},
            surname: {type: 'string'}
        }
    }
    assert.EqualSchema( fun.objectFunction(), schema )
} )