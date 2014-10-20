var url = document.URL;
/*if(url.indexOf("UserDocList.page") > -1) {
	alert("We are currently on the private reports page.");
}*/
/*cellArray = $('table.ed-formTable > tbody > tr > td');
console.log(cellArray);

var reportLink = new Array();
var nameArray = new Array();*/

/*var j = 0;
for(i=14; i<cellArray.length; i+=7) {
	var temp = cellArray[i].firstChild.textContent;
	temp = temp.trim();
	temp = temp.replace(" ", "_");
	nameArray[j] = temp;
	temp = cellArray[i-1].childNodes[1].href;
	temp = temp.split("Classes/");
	reportLink[j] = temp[1];
	j++;
}
console.log(nameArray);
console.log(reportLink);
var school = $('a.lochomepage:first');
var temp = school[0].href;
temp = temp.split("pages/");
temp = temp[1].split("/Classes");
school = temp[0];
console.log(school);

var pages = new Array();
for(i=0; i<nameArray.length; i++) {
	pages[i] = "https://www.edline.net/pages/" + school + "/Classes/" + reportLink[i] + "/" + nameArray[i].replace(" ", "_");
	$.get(pages[i], function(data) {
		pages[i] = data;
	})
}
console.log(pages);*/
//I may have to scrap all this due to the fact that I just realized that edline has no data on the page I just spent all that time grabbing...
//Instead of coming from there it loads an iframe that contains the data and uses - you guessed it - that refid number I deleted a while ago.

linkArray = $('table.ed-formTable > tbody > tr > td > a');

var reportLink = new Array();
var o = 0;
for(i=0; i<(linkArray.length)-1; i++) {
	if((linkArray[i].href).indexOf("javascript")>-1) {
		var link = linkArray[i].href;
		var exploded = link.split("'");
		var temp = exploded[1];
		//console.log(temp);
		reportLink[o] = "https://www.edline.net/DocViewBody.page?currentDocEntid=";
		reportLink[o] = reportLink[o].concat(temp,"&returnPage=%2FUserDocList.page");
		o++;
		//console.log(ttemp);
	}
}
//console.log(reportLink);
var contents = new Array();
var length = reportLink.length - 1;
//console.log(length);
var j = 0;
nextGet(j);
function nextGet(j) {
	$.ajax({
	     async: false,
	     type: 'GET',
	     url: reportLink[j],
	     success: function(data) {
      		contents[j] = data;
			//console.log(data);
			if(j<length){
				nextGet(j+1);
			}
	    }
	});
}
console.log(contents);

//Removed because I'm going to go for the popup idea rather than try to build an entirely new virtual page on the actual site.
/*var raw = '<li id="myContents0"><div class="dbtop"></div><a href="https://Edline.net" tabindex="0">Private Reports</a><div class="dbbtm"></div></li>';
console.log(raw);
$('div.ed-columnRight ul:first li#myContents1').before("")*/
//console.log(toc);