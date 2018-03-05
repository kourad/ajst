# TrailCode (Another JavaScript Testing Tool)

Nombre provisional bajo construccion...

## How to Use

> Tener en cuenta que aun no es capaz de comprobar metodos que devuelvan promesas o callbacks


Los test deben colocarse en una carpeta llamada **uni-test**

Ejemplo de un test sencillo

```
$test( 'Nombre del test', (assert) => 
{    
    let a = true;
    assert.ok( a )
} )
```

El callback del test recibe como parametro una instancia del modulo assert definido por node, modificado para darle mas funcionalidad. Los metodos que se incluyen son:

- Todos los metodos basicos de assert
  - assert(value[, message])
  - assert.deepEqual(actual, expected[, message])
  - assert.deepStrictEqual(actual, expected[, message])
  - assert.doesNotThrow(block[, error][, message])
  - assert.equal(actual, expected[, message])
  - assert.fail([message])
  - assert.fail(actual, expected[, message[, operator[, stackStartFunction]]])
  - assert.ifError(value)
  - assert.notDeepEqual(actual, expected[, message])
  - assert.notDeepStrictEqual(actual, expected[, message])
  - assert.notEqual(actual, expected[, message])
  - assert.notStrictEqual(actual, expected[, message])
  - assert.ok(value[, message])
  - assert.strictEqual(actual, expected[, message])
  - assert.throws(block[, error][, message])
- Soporte para Schemas de AJV
  - equalSchema(actual, schema[, message])
  - notEqualSchema(actual, schema[, message])


Una vez definidos los test hay que correr node con el comando: 

```
$ npm install
$ node index.js
```