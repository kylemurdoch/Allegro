var elem = document.querySelector('input[type="range"]');
var target = document.querySelector('.value');
var label = document.querySelector('.label');

var rangeValue = function () {
    switch (elem.value) {

        case '1':
            target.style.backgroundImage = "url('../img/treble.png')";
            label.innerHTML = "treble";
            break;
        case '2':
            target.style.backgroundImage = "url('../img/bass.png')";
            label.innerHTML = "bass";

            break;
        case '3':
            target.style.backgroundImage = "url('../img/mixed.svg')";
            label.innerHTML = "mixed";
            break;
        default:
    }

}

elem.addEventListener("input", rangeValue);

var elem2 = document.getElementById('slider2');
var target2 = document.getElementById('value2');
var label2 = document.getElementById('label2');

var rangeValue = function () {

    switch (elem2.value) {

        case '1':
            target2.style.backgroundImage = "url('../img/treble.png')";
            label2.innerHTML = "treble";
            break;
        case '2':
            target2.style.backgroundImage = "url('../img/bass.png')";
            label2.innerHTML = "bass";

            break;
        default:
    }

}

elem2.addEventListener("input", rangeValue);

function selectDynamic() {
    if (elem2.value === '1') {
        location.href = "./advancedGame.html";
    } else {
        location.href = "./advancedBass.html";
    }
}

function selectStatic() {
    if (elem.value === '1') {
        location.href = "./trebleGame.html";
    } else if (elem.value === '2') {
        location.href = "./bass.html";
    } else {
        location.href = "./mixed.html";
    }
}