var obj = new Function();

obj.print = function(object){
    
    var output = "";
	for(var i in object){  
		var property=object[i];  
		output += "\n" +  i +" = " + property; 
	} 
    return output;
};

module.exports = obj;