var url = document.URL;
/*if(url.indexOf("UserDocList.page") > -1) {
	alert("We are currently on the private reports page.");
}*/
linkArray = $('table.ed-formTable > tbody > tr > td > a');

var reportLink = new Array();
var o = 0;
for(i=0; i<(linkArray.length)-1; i++) {
	if((linkArray[i].href).indexOf("javascript")>-1) {
		var link = linkArray[i].href;
		var exploded = link.split("'");
		reportLink[o] = exploded[1];
		o++;
	}
}
console.log(reportLink);