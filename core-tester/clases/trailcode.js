const fs = require('fs')
const path = require('path')
const Group = require( './group.js') 


class TrailCode
{
        
    constructor(dir)
    {
        if(TrailCode._instance !== null) return TrailCode._instance;
            
        TrailCode._instance = this;
        this._tests = {}
        this._tests['Other'] =  new Group('Other')
        this._tests['Other'].addCategory( 'Other' )

        this.loader(dir)
        this.execute()
        return TrailCode._instance;
    }

    static get instance()
    {
        return TrailCode._instance; 
    }


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



    getDirectories( dir )
    {
        return fs.readdirSync( dir, 'utf8' );
    }



    isFile( file )
    {
        return file.includes('.js')
    }


    execute()
    {
        for( let i in this._tests )
        {
            this._tests[i].execute()
        }
    }


    static _test(name, callback, capture)
    {
        TrailCode._instance._tests['Other']['Other'].addTest(name, callback, capture)
    }
}
TrailCode._instance = null;
global.$test = TrailCode._test;

module.exports = TrailCode