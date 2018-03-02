/**
 * Representacion de un resultado del **test**
 * 
 * Esta clase captura el objeto resultante de un test y lo almacena en su instancia. 
 * Tambien guarda el resultado producido por {@link resulError}
 * 
 * 
 * @interface
 * @version 0.1.0
 */
module.exports =  class resultEntry
{
    /**
     * Crea un nuevo resultado para el **test**
     * @param {Object} data - Datos necesatios para crear el resultado
     * @param {string} data.result - Resultado del test.
     * @param {number} data.duration - Duracion del test en milisegundos
     * @param {number} data.retry - Identificador del resultado del test.
     * @param {resultError} data.error - Representacion del error ocurrido.
     * @return {Object} Deveule la propia instancia de la clase.
     */
    constructor( data = {} )
    {
        /** 
         * Resultado del test.
         * 
         * Este es el resultado del test que puede tener 3 valores distintos:
         * - **SUCCESS**: El test se completo correctamente
         * - **FAIL**: El test fallo
         * - **ERROR**: El test produjo un error inesperado
         * 
         * @since 0.1.0
         * @type {string} 
         */
        this.result = data.result;
        /** 
         * Duracion del test.
         * 
         * Duracion del test en milisegundos calculada a partir de los 
         * perfomace hooks definidos por NodeJs. Esta API es experimental por lo que
         * puede ser que los datos ofrecidos no sean correctos.
         * 
         * @since 0.1.0
         * @see https://nodejs.org/dist/latest-v9.x/docs/api/perf_hooks.html
         * @type {number} 
         */
        this.duration = data.duration || null;
        /** 
         * Id de resultado del test.
         * 
         * Esta propiedad identifica el numero de intento al realizar el test. 
         * En principio no es necesario ejecutar mas de un test, pero dado que
         * podemos comprobar salidas contra un schema dinamico podemos ver los 
         * errores y calcular tiempos de ejecucion
         * 
         * @type {number} 
         * @since 0.1.0
         */
        this.retry = data.retry || 0;
        /** 
         * Error del test.
         * 
         * Error generado por el test. Si el test se completo correctamente entoces este 
         * valor sera **null**, en caso contrario contendra una instancia de {@link resultError}
         * 
         * 
         * @type {resultError} 
         * @since 0.1.0
         */
        this.error = data.error || null;
        return this;
    }
}