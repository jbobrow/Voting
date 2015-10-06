/**
 * Created by jonathanbobrow on 9/30/15.
 */
var choices = [
    {"name": "red", "value": "#E54028", "count": 0},
    {"name": "orange", "value": "#F18D05", "count": 0},
    {"name": "yellow", "value": "#D0D102", "count": 0},
    {"name": "green", "value": "#61AE24", "count": 0},
    {"name": "blue", "value": "#00A1CB", "count": 0}
];

var leftCount = 0;
var rightCount = 0;

var leftChoice;
var rightChoice;

var combinations = [];
var numberLeft = 0;

var resetCombinations = function (n) {

    combinations = [];

    for (var i = 0; i < n; i++) {
        for (var j = i + 1; j < n; j++) {
            combinations.push({"components": [i, j], "completed": false});
        }
    }
    //for (var i = 0; i < numberChoose(n, 2); i++) {
    //    var a = 0;
    //    var b = 1;
    //    combinations.push({"components": [a, b], "completed": false});
    //}
    console.log("combinations: " + combinations.length);
    numberLeft = combinations.length;
    document.getElementById("numberLeft").innerHTML = numberLeft;
};

var selectChoices = function () {

    var hasSelectedPair = false;
    var idx = -1;

    while (!hasSelectedPair) {
        idx = Math.floor(Math.random() * combinations.length);
        if (!combinations[idx].completed) {
            combinations[idx].completed = true;
            hasSelectedPair = true;
        }
    }

    leftChoice = combinations[idx].components[0];
    document.getElementById("left").style.background = choices[leftChoice].value;
    rightChoice = combinations[idx].components[1];
    document.getElementById("right").style.background = choices[rightChoice].value;

    numberLeft--;
    document.getElementById("numberLeft").innerHTML = numberLeft;
    if (numberLeft == 0)
        document.getElementById("countIndicator").innerHTML = "Last Decision";
};

var isDoneWithCombinations = function () {
    for (var i = 0; i < combinations.length; i++) {
        if (!combinations[i].completed)
            return false;
    }
    return true;
};

var selectLeft = function () {
    if (!isDoneWithCombinations()) {
        choices[leftChoice].count++;
        document.getElementById("leftCount").innerHTML = leftCount;
        selectChoices();
    }
    else
        displayOrderedChoices();
};

var selectRight = function () {
    if (!isDoneWithCombinations()) {
        choices[rightChoice].count++;
        document.getElementById("rightCount").innerHTML = rightCount;
        selectChoices();
    }
    else
        displayOrderedChoices();
};

var selectNone = function () {
    if (!isDoneWithCombinations())
        selectChoices();
    else
        displayOrderedChoices();
};

var displayScores = function () {
    document.getElementById("redScore").innerHTML = choices[0].count;
    document.getElementById("orangeScore").innerHTML = choices[1].count;
    document.getElementById("yellowScore").innerHTML = choices[2].count;
    document.getElementById("greenScore").innerHTML = choices[3].count;
    document.getElementById("blueScore").innerHTML = choices[4].count;
};

var displayOrderedChoices = function () {
    // hide choices
    document.getElementById("choices").style.display = "none";
    document.getElementById("countIndicator").style.display = "none";

    // change header
    document.getElementById("header").innerHTML="<h2>This is how you ordered your favorite colors</h2>";

    // show results
    var orderedChoices = "<ul>";
    var copyChoices = $.extend(true, [], choices);
    copyChoices.sort(compare);
    copyChoices.reverse();
    for (var i = 0; i < copyChoices.length; i++) {
        orderedChoices = orderedChoices + "<li style='background-color:" + copyChoices[i].value + "'>" + copyChoices[i].name + " | " + copyChoices[i].count + "</li>";
    }
    orderedChoices = orderedChoices + "</ul>";
    document.getElementById("orderedChoices").innerHTML = orderedChoices;
};

function compare(a, b) {
    if (a.count < b.count)
        return -1;
    if (a.count > b.count)
        return 1;
    return 0;
}

// main function
$(function () {
    resetCombinations(5);
    selectChoices();

});


// helpers
var factorial = function (val) {
    if ($.isNumeric(val)) {
        val = parseInt(val);
        if (val < 0) {
            return "invalid value";
        } else if (val === 1 || val === 0) {
            return 1;
        } else {
            return val * factorial(val - 1);
        }
    }
    return "value passed is not valid";
};

var numberChoose = function (n, c) {

    return factorial(n) / (factorial(n - c) * factorial(c));
};