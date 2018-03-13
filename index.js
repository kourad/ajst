
//require( './core-tester/checker.js') 

const TrailCode = require('./core-tester/clases/trailcode.js') 
const path = require('path')


// esto no es buena idea
let config = {
    base_dir: path.join(__dirname,'unit-test')
}


module.exports = (() => 
{
    new TrailCode(config.base_dir)   
})()