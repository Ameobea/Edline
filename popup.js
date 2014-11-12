var globalScores;
var globalMeta = new Array();

window.addEventListener('DOMContentLoaded', function() {
    /* ...query for the active tab... */
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        /* ...and send a request for the DOM info... */
        chrome.tabs.sendMessage(
            tabs[0].id,
            {from: 'popup', subject: 'classInfo'}, processClassInfo);
    });
});

function setClickListner(){
    $('.classid').click(function(){
        console.log($(this).attr('cid'));
        drawClassData($(this).attr('cid'), globalScores);
    })
}

function processClassInfo(info) {
    //console.log(info);
    //console.log(info.length);
    var parsed = new Array();
    for(i=0; i<(info.length); i++) {
        parsed[i] = $.parseHTML(info[i]);
    }
    console.log(parsed);
    drawClassList(parsed);
    var rawScores = new Array();
    var rows;
    var scoresLength = 0;
    var temp1;
    for(i=0; i<parsed.length; i++) {
        rows = parsed[i][13].children[0].children[0].children[0].children[5].children[1].children[0].childNodes;
        console.log(rows);
        //console.log(rows.length);
        rawScores[i] = new Array();
        scoresLength = 0;
        for(j=0; j<rows.length; j++){
            if(rows[j].childNodes.length==15){
                rawScores[i][scoresLength] = new Array(rows[j].children[1].textContent, rows[j].children[2].textContent, rows[j].children[3].textContent, rows[j].children[5].textContent, rows[j].children[6].textContent);
                //console.log(rawScores[i]);
                scoresLength++;
            }
        }
        //Date, Category, Assignment Name, Score, Points, Grade (unparsed)
        //rawScores[i] = new Array(
    }
    console.log(rawScores);
    globalScores = rawScores;
    calculateMeta(parsed);
    setClickListner();
    //drawClassData(0, rawScores);
    //13,0,0,0,4,1,0,1,1+2
}

function calculateMeta(parsed){
    //console.log("ran calculateMeta");
    for(i=0; i<parsed.length; i++) {
        //console.log("in loop");
        globalMeta[i] = new Array();
        globalMeta[i][0] = parsed[i][13].children[0].children[0].children[0].children[4].children[1].children[0].children[1].children[1].innerText;
        globalMeta[i][1] = parsed[i][13].children[0].children[0].children[0].children[4].children[1].children[0].children[1].children[2].innerText;
    }
    //console.log(globalMeta);
}

function drawClassData(id, scoreData) {
    $('.meta tbody').empty();
    $('.meta tbody').append("<tr><td>" + globalMeta[id][0] + "</td><td>" + globalMeta[id][1] + "</td></tr>");
    $('.overview tbody').empty();
    console.log(scoreData[id])
    for(i=0; i<scoreData[id].length; i++) {
        $('.overview tbody').append("<tr><td>" + scoreData[id][i][0] + "</td><td>" + scoreData[id][i][1] + "</td><td>" + scoreData[id][i][2] + "</td><td>" + scoreData[id][i][3] + "</td><td>" + scoreData[id][i][4] + "</td></tr>")
    }
}

function drawClassList(rawData) {
    console.log("test");
    for(i=0; i<rawData.length; i++) {
        //console.log(rawData[i][13]);
        temp1 = rawData[i][13].children[0].children[0].children[0].children[2].innerText;
        console.log(temp1);
        $('.class-list').append("<li><a class='classid' cid='" + i + "' href='#'>" + temp1 + "</a></li>");
    }
}