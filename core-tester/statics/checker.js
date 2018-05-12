const AJV = require('ajv')
const resultEntry = require('../interfaces/resultEntry.js');
const resultError = require('../interfaces/resultError.js');

/**
 * Analizador de resultados
 * 
 * Clase que agrupa los comparadores de resultados especiales definidos por 
 * por la libreria, se incluyen entre ellos la comparacion de esquemas 
 * con ajv
 * 
 * @version 0.1.0
 */
class Checker
{
    /**
     * Constructor basico
     * 
     * @since 0.1.0
     */
    constructor()
    {}

    /**
     * Compara que el resultado del test coincide con el esquema de ajv
     * 
     * Metodo que recoge el resultado del test sincrono ejecutado por el 
     * usuario y lo compara con el esquema de ajv esperado, el resultado de 
     * ajv es comparado con la instancia de assert, por lo que si este falla
     * entonces se recogen los datos del error siguiendo el patron de la clase
     * {@link Test}
     * 
     * @param {Test} context - Contexto de la clase de {@link Test}
     * @param {Assert} assert - Instancia de la clase assert de NodeJs
     * @param {*} data - Resultado del test
     * @param {*} schema - Esquema a comparar el resultado
     * @param {string} message - Mensaje predefinido del usuario
     * 
     * @since 0.1.0
     */
    static equalSchemaSync( context, assert, data, schema, message )
    {
        try
        {
            assert.ok(Checker.ajv.validate(schema, data), message)
        }
        catch(e)
        {
            let error = {
                operator: 'equalSchema'
            };
            error.schemaError = Checker.ajv.errors
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

    /**
     * Compara que el resultado del test no coincide con el esquema de ajv
     * 
     * Metodo que recoge el resultado del test sincrono ejecutado por el 
     * usuario y lo compara con el esquema de ajv esperado, el resultado de 
     * ajv es comparado con la instancia de assert, por lo que si este falla
     * entonces se recogen los datos del error siguiendo el patron de la clase
     * {@link Test}
     * 
     * @param {Test} context - Contexto de la clase de {@link Test}
     * @param {Assert} assert - Instancia de la clase assert de NodeJs
     * @param {*} data - Resultado del test
     * @param {*} schema - Esquema a comparar el resultado
     * @param {string} message - Mensaje predefinido del usuario
     * 
     * @since 0.1.0
     */
    static notEqualSchemaSync( context, assert, data, schema, message )
    {
        try
        {
            assert.fail(Checker.ajv.validate(schema, data), message)
        }
        catch(e)
        {
            let error = {
                operator: 'notEqualSchema'
            };
            error.schemaError = Checker.ajv.errors
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

    /**
     * Metodo que espera un test asincrono
     * @deprecated
     * @param {*} context 
     * @param {*} resolve 
     * @param {*} reject 
     * @param {*} response 
     * @param {*} expected 
     */
    static simpleChecker(context,resolve, reject, response, expected)
    {
        context._resolveMark()
        context.$result = 'SUCCESS'
        resolve()
    }
    
    static okAsync(assert, i, resolve, reject, value, message)
    {
        console.log('este estaria cancelado?????')
        let data = { retry: i }
        try
        {
            
            assert.ok(value, message)
            data.result = 'SUCCESS'
        }
        catch(e)
        {
            if( e.code === 'ERR_ASSERTION' )
                data.result = 'FAIL'
            else
                data.result = 'ERROR'
            
            data.error = new resultError(e)
        }
        data.duration = this._resolveMark();
        this._tests.push( new resultEntry(data) );
        resolve();
    }

}
Checker.ajv = new AJV();


module.exports = Checker