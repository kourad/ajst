
 /**
 * Test numero 1
 * @param {*} obj - Dato del que queremos obtener su tipo.
 * @return {string}
 * @author Antonio Lopez Navarro
 */
exports.$getType = function( obj )
{
    if( obj === void 0 )
        return 'undefined'

    return {}.toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
}

exports.promiseFunction = () => 
{
    return new Promise( ( resolve, reject ) => {
        setTimeout( () => { resolve(); }, 3000 )
    }  )
}

exports.arrayFunction = () => 
{
    return [1,2,3,"hola"]
}

exports.objectFunction = () =>
{
    return {
        name: 'antonio',
        surname: 'lopez'
    }
}