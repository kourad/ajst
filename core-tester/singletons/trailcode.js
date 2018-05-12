const fs = require('fs')
const path = require('path')
const Group = require( '../clases/group.js') 

/**
 * Clase Principal de la aplicacion
 * 
 * Clase que sigue el patron **Singleton** y que inicia la app. Se encarga de
 * leer los directorios, crear los tests y posteriormente ejecutarlos
 * 
 * @version 0.1.0
 */
class TrailCode
{
        
    /**
     * Constructor
     * 
     * Metodo que crea el grupo de test *Other* y la categoria *Other*. 
     * Lee el directorio suministrado recursivamente, crea los tests 
     * definidos y a continuacion los ejecuta
     * 
     * @param {string} dir - Directorio donde se encuentran los tests
     * @return {Object} Devuelve la propia instancia de la clase
     * 
     * @since 0.1.0
     */
    constructor(dir)
    {
        if(TrailCode._instance !== null) return TrailCode._instance;
            
        TrailCode._instance = this;
        /**
         * Mapa de tests
         * 
         * Objeto con un mapa de todos los grupos, categorias y tests almacenados
         * 
         * @type {Object}
         * @since 0.1.0
         */
        this._tests = {}
        this._tests['Other'] =  new Group('Other')
        this._tests['Other'].addCategory( 'Other' )

        this.loader(dir)
        this.execute()
        return TrailCode._instance;
    }

    /**
     * Obtiene la instancia de la clase
     * 
     * @return {Object} Devuelve la instancia de la clase
     * @since 0.1.0
     */
    static get instance()
    {
        return TrailCode._instance; 
    }

    /**
     * Cargador de directorios
     * 
     * Lee recusivamente todos los directorios y hace un require de los
     * archivos javascript
     * 
     * @param {string} dir - Directorio donde estan ubicados los tests.
     * @since 0.1.0
     */
    loader(dir)
    {
        let directories = this.getDirectories(dir);
        
        directories.map( obj => 
        {
            if( this.isFile(obj) )
                require(path.join(dir, obj) )
            else
                this.loader( path.join(dir, obj) )
        } )
    }


    /**
     * Lee un directorio de forma sincrona.
     * 
     * @param {string} dir - Directorio a obtener 
     * @return {Array} Array de archivos y directorios de la direccion actual
     */
    getDirectories( dir )
    {
        return fs.readdirSync( dir, 'utf8' );
    }



    isFile( file )
    {
        return file.includes('.js')
    }


    async execute()
    {
        for( let i in this._tests )
        {
            await this._tests[i].execute()
        }
        process.exit()
    }


    static _test(name, callback, capture)
    {
        TrailCode._instance._tests['Other']['Other'].addTest(name, callback, capture)
    }
}
TrailCode._instance = null;
global.$test = TrailCode._test;

module.exports = TrailCode