/**
 * Representacion de un error en el **test**.
 * 
 * Esta clase se encarga de generar un objeto con la informacion de un fallo en el test. 
 * Tambien captura la informacion sobre un error inesperado durante dicho **test**. 
 * Basicamente se deben dar 3 tipos de error:
 * - Errores de tipo *AssertionError*
 * - Errores provenientes de AJV 
 * - Errores generales (ReferenceError, SyntaxError...)
 *
 * 
 * @interface
 * @version 0.1.0
 * @see https://github.com/epoberezkin/ajv
 * @see https://nodejs.org/dist/latest-v9.x/docs/api/assert.html
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
 */
module.exports =  class resultError
{
    /**
     * Construye el objeto de error que almacenara el test.
     * @param {Object} data - Datos necesarios para crear el error
     * @param {Any} [data.actual=null] - Datos obtenidos en el test
     * @param {Any} [data.expected=null] - Datos que se esperaba obtener en el test
     * @param {string} [data.operator=''] - Operador del assert que ha lanzado el error
     * @param {string} [data.message=''] - Mensaje lanzado por la instancia de assert
     * @param {string} [data.code=''] - Codigo del error generado
     * @param {string} [data.name=''] - Nombre del error generado
     * @param {Object} [data.stack=null] - Stack del error generado
     * @param {Object} [data.schemaError=null] - Array de errores generado por AJV cuando el schema no es valido
     * @return {Object} Devuelve la propia instancia del objeto de error
     */
    constructor( data = {} )
    {
        /** 
         * Datos obtenidos en el test.
         * 
         * Dato proporcionado genralmente por la API de assert. Tambien es generado por los nuevos
         * metodos añadidos en la API de assert({@link $notEqualSchemaSync}, {@link $EqualSchemaSync}). 
         * Este parametro acepta cualquier tipo de dato que le llegue dado que a priory no podemos 
         * saber que tipo de datos espera el usuario.
         * 
         * Si ocurre un error es posible que este dato se coloque automaticamente a null ya que el 
         * test no se abra completado correctamente.
         * @type {Any} 
         * @since 0.1.0
         */
        this.actual         = data.actual || null;
        /**
         * Datos esperados obtener en el test.
         * 
         * Al igual que en el parametro acepta cualquier tipo de dato, ademas es posible que el tipo de dato sea un schema de **AJV**
         * 
         * Si ocurre un error es posible que este dato se coloque automaticamente a null ya que el test no se abra completado correctamente.
         * @type {Any} 
         * @since 0.1.0
         */
        this.expected       = data.expected || null;
        /** 
         * Tipo de operador usado en el **test**.
         * 
         * Da informacion sobre el tipo de operador que se ha usado en el test y ha generado la exepcion.
         * Usualmente este parametro viene generado a traves de la API de assert. Este parametro estara 
         * vacio si el error que se genere no viene del modulo assert.
         * 
         * Operador | Descripcion | Procedencia
         * --- | --- | ---
         * *ok* | Se esperaba que el resultado del test fuera un tipo *boolean* a **true** | assert
         * *fail* | Se esperaba que el resultado del test fuera un tipo *boolean* a **false** | assert
         * *equal* | Comparacion simple | assert
         * *StrictEqual* | Comparacion estricta simple | assert
         * *notEqual* | Se esperaba que la comparacion simple fallara | assert
         * *notStrictEqual* | Se esperaba que la comparacion estricta simple fallara | assert
         * *deepEqual* | Se hizo una comparacion en profundidad | assert
         * *deepStrictEqual* | Se hizo una comparacion estricta en profundidad | assert
         * *notDeepEqual* | Se esperaba que la comparacion en profundidad fallara | assert
         * *notDeepStrictEqual* | Se esperaba que la comparacion en profundidad estricta fallara | assert
         * *throws* | Se esperaba que el test lanzara un error | assert
         * *doesNotThrow* | Se esperaba que el test no lanzara un error | assert
         * *EqualSchema* | Se comparo el resultado contra un schema de AJV | {@link $EqualSchemaSync} 
         * *notEqualSchema* | Se comparo el resultado contra un schema de AJV | {@link $notEqualSchemaSync} 
         * 
         * @type {string} 
         * @since 0.1.0
         */
        this.operator       = data.operator || '';
        /** 
         * Mensaje que informa del fallo ocurrido.
         * 
         * Mensaje usualmente obtenido de assert o del error ocurrido. Es posible personalizar este
         * mensaje a traves de la api de assert. SI no se proporciona este se rellenado con el valor
         * por defecto generado por assert o por la API de error. En caso de que el error se genere 
         * a traves de la API de AJV el mensaje pòr defecto sera *AJV Error*
         * 
         * @example <caption>Personalizar mensajes de error</caption>
         * try
         * {
         *      assert.ok(true, false, 'mensaje personalizado')
         * }
         * catch(error)
         * {
         *      console.log( error.message )
         * }
         * // output: mensaje personalizado
         * 
         * @type {string}
         * @since 0.1.0 
         */
        this.message        = data.message || '';
        /** 
         * Codigo del error.
         * 
         * Codigo de error generado por la API de assert y que hace referencia al error generado. 
         * Es posible que este valor sea rellenado a traves de la API general de error.
         * 
         * @type {string}
         * @since 0.1.0
         */
        this.code           = data.code || '';
        /**
         * Nombre del error
         * 
         * Usualmente usuado por la API de assert y Error
         * @type {string} 
         * @since 0.1.0
         */
        this.name           = data.name || '';
        /**
         * Traza del error 
         * 
         * Usualmente usuado por la API de assert y Error. Cuando el error es generado 
         * por AJV al fallar el test entonces es pasado a null
         * @type {Object} 
         * @since 0.1.0
         */
        this.stack          = data.stack || null;
        /** 
         * Fallo de AJV al validar un schema
         * 
         * Este error proviene de la API de AJV cuando se genera un error, ya sea una excepcion
         * al validar un schema como a la hora de comprobarlo
         * 
         * @type {array|null} 
         * @since 0.1.0
         */
        this.schemaError    = data.schemaError || null;
        return this;
    }
}