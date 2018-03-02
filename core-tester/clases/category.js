const Test = require( './test.js') 

module.exports = class Category
{
    constructor(name)
    {
        this.$$name = name
    }

    addTest(name, callback, capture)
    {
        this[name] = new Test(name, callback, capture)
    }

    execute()
    {
        for( let i in this )
        {
            if( i.startsWith('$$') ) continue;
            this[i].execute()
        }
    }
}