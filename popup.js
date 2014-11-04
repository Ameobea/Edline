function processClassInfo(info) {
    console.log(info);
    console.log(info.length);
    var parsed = new Array();
    for(i=0; i<(info.length); i++) {
        parsed[i] = $.parseHTML(info[i]);
    }
    console.log(parsed);
    var rawScores = new Array();
    for(i=0; i<parsed.length; i++) {
        var rows = parsed[i][13].children[0].children[0].children[0].children[5].children[1].children[0];
        console.log(rows);
        var scoresLength = 0;
        for(j=0; j<rows.length; i++){
            if(rows.children[i].length==7){

            }
        }
        //Date, Category, Score, Assignment Name, Points, Grade (unparsed)
        //rawScores[i] = new Array(
    }
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