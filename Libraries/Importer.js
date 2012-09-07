


var imports = 0;
var count = 0;


function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function importfile(filename){
 	if(trim(filename) != ""){

	  	var fileref=document.createElement('script')
	  	fileref.setAttribute("type","text/javascript")
	  	fileref.setAttribute("src", filename)


	  	fileref.onload = function(){
			count++;
	  	}


	 	if (typeof fileref!="undefined"){
	  		document.getElementsByTagName("head")[0].appendChild(fileref);
	  		imports++;
	  	}

	  	
	 }
}


function  loadImports (callback) {
	if(count < imports)
		window.setTimeout(function(){loadImports(callback);},50);
	else
		callback();

};

