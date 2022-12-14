"use strict";

let RESULT = new String();

let goodMatch = (_firstname, _secondName) => {
    let firstname = document.getElementById('fname').value.trim();
    let secondname = document.getElementById('sname').value.trim();
    let charCount = new Array();

    const combined = firstname != "" && secondname != "" ? new String (`${firstname} matches  ${secondname}` ): "";

    if(combined != ""){
        compare(combined,  charCount, 0);
    
        const callback = setInterval( showResults(combined), 1000);
    }
}

//Compare the characters in a string and skip the ones we have checked
let compare = (str, charCount, index) => {
    if(Number(index) < str.length) {
        let char = str[index].trim();
        
        if(!charCount.some(el => el.char === char) && char != "") {
            charCount = [...charCount, {char: char, count: str.split( new RegExp( str[index], "gi" ) ).length-1}];
        }
        
        compare(str, charCount, Number(index) + 1);

    } else {
        RESULT = getCharFoundCount(charCount);
        calculatePercentage(RESULT);   
    }
}

//Get the number of matching character and return as a string
let getCharFoundCount = (arr) => {
    let strcount = new String ();

    arr.forEach(element => {
        strcount = strcount + element.count;
        
    });

    return strcount;
}

//Calculate the total percentage based on the number of matches
let calculatePercentage = (str) => {
    let temp = String();
    let _length = Math.ceil(str.length/2);

    for (var i = 0, j = str.length-1; i < _length; i++, j--) {
        
        if(i === j){
            x = str[i];
        } else {
            var x = Number(str[i]) + Number(str[j]);
        }

        temp += (x).toString();
    }

    if(temp.length > 2) {
        calculatePercentage(temp);
    } else {
        RESULT = Number(temp);
    }
}

let showResults = (combined) => {
    let message = Number(RESULT) >= 80 ? `${combined} ${RESULT}%, good match` : `${combined} ${RESULT}%`;
    document.getElementById('results').innerHTML = message;
}