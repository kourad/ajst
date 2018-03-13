const AJV = require('ajv')
let ajv = new AJV()

function $getType( obj )
{
    if( obj === void 0 )
        return 'undefined'
    return {}.toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
}
exports.$getType = $getType


function $checker(context,resolve, reject, response, expected)
{
    context._resolveMark()
    context.$result = 'SUCCESS'
    resolve()
}
exports.$checker = $checker

function $EqualSchemaSync(context, assert, data, schema, message)
{
    try
    {
        assert.ok(ajv.validate(schema, data), message)
    }
    catch(e)
    {
        let error = {
            operator: 'equalSchema'
        };
        error.schemaError = ajv.errors
        if( e.code === 'ERR_ASSERTION' )
        {
            // no pasa el test -> cambiar el actual y el expected
            error.code = e.code;
            error.actual = data;
            error.expected = schema;
            error.message = e.message
            error.name = e.name;
            error.stack = e.stack;
        }
        else
        {
            // error en ajv
            error.code = 'AJV Error'
            error.name = 'AJV Error'
            error.message = e.message || message || 'Schema not valid'
            error.stack = e.stack   
        }
        throw error;
    }
    
}
exports.$EqualSchemaSync = $EqualSchemaSync


function $notEqualSchemaSync(context, assert, data, schema, message)
{
    try
    {
        assert.fail(ajv.validate(schema, data), message)
    }
    catch(e)
    {
        let error = {
            operator: 'notEqualSchema'
        };
        error.schemaError = ajv.errors
        if( e.code === 'ERR_ASSERTION' )
        {
            // no pasa el test -> cambiar el actual y el expected
            error.code = e.code;
            error.actual = data;
            error.expected = schema;
            error.message = e.message
            error.name = e.name;
            error.stack = e.stack;
        }
        else
        {
            // error en ajv
            error.code = 'AJV Error'
            error.name = 'AJV Error'
            error.message = e.message || message || 'Schema not valid'
            error.stack = e.stack
        }
        throw error;
    }
}
exports.$notEqualSchemaSync = $notEqualSchemaSync;