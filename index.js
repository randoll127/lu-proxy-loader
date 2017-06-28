var fs = require('fs');
var _ = require('lodash')
var fileList = function(dir){
    return fs.readdirSync(dir).reduce(function(list,file){
        var name = file;
        return list.concat(name);
    },[]);
};


var HEADER = "var proxy = [];\n";
var TEMPLATE = "import Proxy_<%= index %> from './impl/<%= name %>';\n" +
    "proxy.push(Proxy_<%= index %>);\n";

module.exports = function(source, map){
    //对source进行解析
    var filelist = fileList(this.context+"/impl");
    count = filelist.length;
    filelist.forEach(function(el,index){
        var str = _.template(TEMPLATE);
        source = str({name:el,index:index})+source;
    });
    source = HEADER+source;
    console.log(source);
    return  source;
}

//console.log(process.execPath)
//console.log(__dirname)
//console.log(process.cwd())