const Category = require( './category.js' )

module.exports = class Group
{
    constructor(name)
    {
        this.$$name = name
    }

    addCategory(name)
    {
        this[name] = new Category(name)
    }

    execute()
    {
        for( let i in this )
        {
            if( i.startsWith( '$$' ) ) continue
            this[i].execute()
        }
    }
}