function processClassInfo(info) {
    //console.log(info);
    //console.log(info.length);
    var parsed = new Array();
    for(i=0; i<(info.length); i++) {
        parsed[i] = $.parseHTML(info[i]);
    }
    console.log(parsed);
    var rawScores = new Array();
    var rows;
    var scoresLength = 0;
    var temp1;
    for(i=0; i<parsed.length; i++) {
        rows = parsed[i][13].children[0].children[0].children[0].children[5].children[1].children[0].childNodes;
        console.log(rows);
        //console.log(rows.length);
        rawScores[i] = new Array();
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
}

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