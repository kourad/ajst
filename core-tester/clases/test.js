const { performance } = require('perf_hooks');
const resultEntry = require('../interfaces/resultEntry.js');
const resultError = require('../interfaces/resultError.js');
const Checker = require('../statics/checker.js')
let assert = require('assert');


/**
 * Representacion de un test
 * 
 * Clase que guarda un test, lo ejecuta y pinta el resultado.
 * 
 * @version 0.1.0
 */
module.exports = class Test
{
    /**
     * Crea un nuevo test
     * 
     * Este metodo crea un nuevo test y define sus opciones.
     * 
     * Se admiten dos opciones por ahora, async que define 
     * si el test es asincrono o el numero de repeticiones que 
     * se debe hacer al ejecutar un test que por lo general es 1 vez.
     * 
     * @param {string} name - Nombre del test
     * @param {Function} callback - Test a realizar
     * @param {boolean} async=false - Tipo de test que vamos a realizar (sincrono o asincrono)
     * @param {number} repeats=1 - Numero de repeticiones del test
     * 
     * @since 0.1.0
     */
    constructor( name, callback, async = false, repeats = 1 )
    {
        /**
         * Nombre del test
         * 
         * Nombre con el que buscaremos el test, ahora mismo es completamente libre 
         * pero mas adelante llevara alguna restricciones (SUPONGO)
         * 
         * @type {string}
         * @since 0.1.0
         */
        this.name = name;
        /**
         * Test
         * 
         * Metodo definido por el usuario al ejecutar el test.
         * 
         * @example <caption>Ejemplo de un Test</caption>
         * 
         * function test(assert)
         * {
         *     assert.deepEqual( fun.arrayFunction(), [1,2,3,"hola"] )
         * } 
         * 
         * @type {Funcion}
         * @since 0.1.0
         */
        this._callback = callback
        /**
         * Test asincrono
         * 
         * Booleano que nos indica si el test a realizar es sincrono o asincrono
         * 
         * @type {boolean}
         * @since 0.1.0
         */
        this._async = async
        /**
         * Resultados de los test
         * 
         * Array de resultados en los test, por lo general solo habra un resultado,
         * pero en caso de haber mas se deberia calcular la media de resultados y el
         * tiempo medio.
         * 
         * @type {resultEntry[]}
         * @since 0.1.0
         */
        this._tests = [];
        /**
         * Repeticiones
         * 
         * Numero de veces que hay que ejecutar el test.
         * @type {number}
         * @since 0.1.0
         */
        this.repeats = repeats;
    }

    /**
     * Resuelve una marca de tiempo
     * 
     * Metodo que añade una marca final de tiempo y calcula junto a la inicial la cantidad de
     * tiempo transcurrido entre ellas en milisegundos, luego limpia las marcas temporales
     * y devuelve el tiempo calculado.
     * 
     * Este metodo se basa en la API de perfomance de nodeJs que aun es experimental
     * por lo que podria dar algun fallo o dar tiempos erroneos.
     * 
     * @experimental
     * @return {number} Devuelve el tiempo entre dos marcas en ms.
     * @since 0.1.0
     */
    _resolveMark()
    {
        let start = `${this.name}_start`
        let end = `${this.name}_end`
        let entry = `${start} to ${end}`
        performance.mark(end);
        performance.measure(entry, start, end);
        let duration = performance.getEntriesByName(entry)[0].duration;    
        performance.clearMarks(start)
        performance.clearMarks(end)
        performance.clearMeasures(entry)
        return duration;
    }

    /**
     * Pinta el resultado del test.
     * 
     * Pinta el primer resultado del test por consola.
     * 
     * @since 0.1.0
     */
    print()
    {
        if(this._tests[0].result === 'SUCCESS')
        console.log(`${this.name}: [\x1b[32m${this._tests[0].result}\x1b[0m] (${this._tests[0].duration}ms) [${this._tests[0].error !== null ? this._tests[0].error.name : ''}]`)
        else
        console.log(`${this.name}: [\x1b[31m${this._tests[0].result}\x1b[0m] (${this._tests[0].duration}ms) [${this._tests[0].error !== null ? this._tests[0].error.name : ''}]`)
    }

    /**
     * Metodo asincrono que ejecuta el test
     * 
     * Este metodo es el encargado de realizar el test, primero mira el numero de repeticiones
     * que debe realizar y luego decide si utilizar el modo sincrono o asincrono, y al final 
     * pinta el resultado del test.
     * 
     * Para el modo asincrono se realiza un bucle usando el oprador await
     * 
     * @since 0.1.0
     */
    async execute()
    {
        try
        {
            for( let i = 1; i <= this.repeats; i++)
                if( !this._async  )
                    this._executeSync(i)
                else
                    await this._executeAsync()
    
            this.print()

        }catch(e)
        {
            // test erroneo
            console.log(e)
        }
    }



    /**
     * Ejecuta un test sincrono
     * 
     * Este metodo crea en primera instancia una marca de tiempo, prepara los argumentos
     * del callback para el test, lo ejecuta y obtiene su resultado.
     * 
     * Para la preparacion de los argumentos del test se ha obtado por obtener
     * el modulo assert nativo de nodeJs y agregarle un par de metodos para 
     * trabajar comparando esquemas de ajv.
     * 
     * Si el test se generado correctamente entonces se crea un resultado a traves de
     * {@link resultEntry} y se añade al array de resultados ({@link _tests})
     * 
     * Si por el contrario el test falla, (ya sea que la salida comparada es erronea o 
     * hubo un error durante la ejecucion del test) se lanzara una excepcion encargada de
     * recoger dicho fallo y analizarlo a traves de la interfaz {@link resultError} antes 
     * de colocar el resultado en el array de {@link _tests}.
     * 
     * 
     * @todo Ajustar el calculo de tiempo a la llamada del callback
     * 
     * @param {number} i - Numero de repeticion del test 
     * @since 0.1.0
     */
    _executeSync(i)
    {
        performance.mark(this.name+'_start');
        let data = {retry: i};
        try
        {
            assert.equalSchema = Checker.equalSchemaSync.bind(this, this, assert)
            assert.notEqualSchema = Checker.notEqualSchemaSync.bind(this, this, assert)
            this._callback(assert);
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
    }


    /**
     * Ejecuta un test asincrono
     * 
     * Ejecucion de un test asincrono. INESTABLE
     * 
     * @experimental
     * @return {Promise}
     * @since 0.1.0
     */
    _executeAsync()
    {
        return new Promise((resolve, reject)=>
        {
            performance.mark(this.name+'_start');

            // llamar al callback Asincrono

            // metodo done -> resolve, reject
            // hacer que done encapsule todos los metodos de assert
            let done = Checker.simpleChecker.bind(this,this, resolve, reject)
            done.prueba = () => {} 
            
            this._callback(done)

        })
    }



}






