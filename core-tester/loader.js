const fs = require('fs')
const path = require('path')


function isFile( file )
{
    return file.includes('.js')
}

function getDirectories( dir )
{
    return fs.readdirSync( dir, 'utf8' );
}

exports.$loader = (dir) =>
{
    let directories = getDirectories(dir);
    
    directories.map( obj => 
    {
        if( isFile(obj) )
            require(path.join(dir, obj) )
        else
            this.$loader( path.join(dir, obj) )
    } )
}
