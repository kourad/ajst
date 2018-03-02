require( './core-tester/checker.js') 
require( './core-tester/launcher.js' )
const loaderModule = require('./core-tester/loader.js')

const path = require('path')


// esto no es buena idea
let config = {
    base_dir: path.join(__dirname,'unit-test')
}


module.exports = (() => 
{
    
    loaderModule.$loader( config.base_dir )
    $execute()
})()