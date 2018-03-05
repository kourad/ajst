const { performance } = require('perf_hooks');
const resultEntry = require('../interfaces/resultEntry.js');
const resultError = require('../interfaces/resultError.js');
let assert = require('assert');
let {
    $getType, 
    $checker,
    $EqualSchemaSync,
    $notEqualSchemaSync
} = require('../checker.js');



/**
 * Representacion de un test
 * 
 * Clase que guarda un test y lo ejecuta.
 * 
 * @version 1.0.0
 */
module.exports = class Test
{
    /**
     * Crea un nuevo test
     * 
     * Este metodo crea un nuevo test y lo ejecuta segun las opciones 
     * dadas
     * 
     * @param {string} name - Nombre del test
     * @param {Function} callback - Test a realizar
     * @param {boolean} async=false - Tipo de test que vamos a realizar (sincrono o asincrono)
     * @param {number} repeats=1 - Numero de repeticiones del test
     * 
     * @todo comprobar el rango de repeats...
     */
    constructor( name, callback, async = false, repeats = 1 )
    {
        this.name = name;
        this._callback = callback
        this._async = async
        this._tests = [];
        this.repeats = repeats;
    }

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


    print()
    {
        console.log(`${this.name}: [${this._tests[0].result}] (${this._tests[0].duration}ms) [${this._tests[0].error !== null ? this._tests[0].error.name : ''}]`)
    }


    async execute()
    {
        for( let i = 1; i <= this.repeats; i++)
            if( !this._async  )
                this._executeSync(i)
            else
                await this._executeAsync()

        this.print()
    }



 
    _executeSync(i)
    {
        performance.mark(this.name+'_start');
        let data = {retry: i};
        try
        {
            assert.equalSchema = $EqualSchemaSync.bind(this, this, assert)
            assert.notEqualSchema = $notEqualSchemaSync.bind(this, this, assert)
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


    
    _executeAsync()
    {
        return new Promise((resolve, reject)=>
        {
            performance.mark(this.name+'_start');

            // llamar al callback Asincrono

            // metodo done -> resolve, reject
            // hacer que done encapsule todos los metodos de assert
            let done = $checker.bind(this,this, resolve, reject)
            
            this._callback(done)

        })
    }



}






