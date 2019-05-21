var o = null;
var g = null;
var octave = null;
let database = firebase.database();
var notes = [
    [27.5, 30.87, 32.7, 36.71, 41.2, 43.65, 49.0],
    [55.0, 61.74, 65.41, 73.42, 82.41, 87.31, 98.0],
    [110.0, 123.5, 130.8, 146.8, 164.8, 174.6, 196.0],
    [220.0, 246.9, 261.6, 293.7, 329.6, 349.2, 392.2],
    [440.0, 493.9, 523.3, 587.3, 659.3, 698.5, 784.0],
    [880.0, 987.8, 1047, 1175, 1319, 1397, 1568],
    [1760, 1976, 2093, 2349, 2637, 2794, 3136],
    [3520, 3951, 4186, 4699, 5274, 5588, 6272]
];
openWarning();
var navOpen;

/* ---------------1. Setting up Music score ----------------------------*/

var div = document.getElementById("sound");

VF = Vex.Flow;

var curNote = "C";

//Player's score
var score = 0;

var newFreq = 0;

var key = 0;

var keyNote = 0;

function changeNote() {
    //Generate random number between 0-6
    newFreq = Math.floor(Math.random() * 7);
    setTimeout(playRandomNote, 1500);
}

/* ---------------2. Setting up Timer ----------------------------*/

var timeoutHandle;
var timerOn = true;

function countdown(minutes, seconds) {
    function tick() {
        var counter = document.getElementById("time");
        counter.innerHTML = minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);

        if (timerOn) {
            seconds--;
        } else {
            return;
        }
        if (seconds >= 0) {
            timeoutHandle = setTimeout(tick, 1000);
        } else {
            if (minutes >= 1) {
                // countdown(mins-1);   never reach “00″ issue solved:Contributed by Victor Streithorst
                setTimeout(function() {
                    countdown(minutes - 1, 59);
                }, 1000);
            }
            //WHEN TIMER RUNS OUT
            else {
                timesUp();
            }
        }
    }
    tick();
    closeNav();
}

function timesUp() {
    openGameOver();
}

/* ---------------3. Setting up Piano Keys ----------------------------*/

const keys = document.querySelectorAll(".key");

function playNote(e) {
    if (navOpen) return;

    if (e.keyCode !== undefined) {
        key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
        console.log(e.keyCode);
    } else {
        key = document.querySelector(`.key[data-key="${e}"]`);
    }

    if (!key) return;

    keyNote = key.getAttribute("data-note");
    playSound(keyNote);
    isEqual(keyNote);
    changeNote();
}

/*----------------------------------------------------------------------*/

function removeTransition(e) {
    /*if (e.propertyName !== "transform") return;*/ //Causes keys to get stuck.
    this.classList.remove("playing");
    this.classList.remove("right");
    this.classList.remove("wrong");
}

keys.forEach(key => key.addEventListener("transitionend", removeTransition));

window.addEventListener("keydown", playNote);

/* ---------------4. Create an Overlay ----------------------------*/

function openWarning() {
    document.getElementById("warning").style.display = "block";
    document.getElementsByClassName("menu-toggle")[0].style.display = "none";
    navOpen = true;
}

function openOctave() {
    document.getElementById("pickOctave").style.display = "block";
    document.getElementsByClassName("menu-toggle")[0].style.display = "none";
    navOpen = true;
}

function openNav() {
    document.getElementById("myNav").style.display = "block";
    document.getElementsByClassName("menu-toggle")[0].style.display = "none";
    navOpen = true;
}

function openGameOver() {
    timerOn = false;
    document.getElementById("gameOver").style.display = "block";
    document.getElementsByClassName("menu-toggle")[0].style.display = "none";
    document.getElementById("finalScore").innerHTML = "Your Score: " + score;
    saveScore();
    navOpen = true;
}

function closeWarning() {
    document.getElementById("warning").style.display = "none";
    document.getElementsByClassName("menu-toggle")[0].style.display = "block";
    navOpen = false;
}

function closeOctave() {
    document.getElementById("pickOctave").style.display = "none";
    document.getElementsByClassName("menu-toggle")[0].style.display = "block";
    navOpen = false;
}

function closeNav() {
    document.getElementById("myNav").style.display = "none";
    document.getElementsByClassName("menu-toggle")[0].style.display = "block";
    navOpen = false;
}

function closeGameOver() {
    document.getElementById("gameOver").style.display = "none";
    document.getElementsByClassName("menu-toggle")[0].style.display = "block";
    navOpen = false;
}

/* ---------------5. Replaying a game ----------------------------*/

function newGame() {
    location.reload();
}

/*--------------------------6. Play a given frequemcy and type of wave--------------------------*/
function playSound(freq) {
    var context = new AudioContext();
    o = context.createOscillator();
    g = context.createGain();
    o.type = "sine";
    o.connect(g);
    o.frequency.value = notes[octave][freq];
    g.connect(context.destination);
    o.start(0);
    g.gain.exponentialRampToValueAtTime(0.000000000000000000000000000000001, context.currentTime + 1);
}
/*--------------------------7. Get the octave and apply it to the buttons--------------------------*/
function getOctave(oct) {
    octave = oct;
    closeOctave();
}
/*--------------------------8. Play a random note for the user--------------------------*/
function playRandomNote() {
    playSound(newFreq);
}
/*--------------------------9. Checks to see if the user gets points or loses points--------------------------*/
function isEqual(k) {
    if (k !== newFreq) {
        document.getElementById("score").innerHTML = --score;
    } else {
        document.getElementById("score").innerHTML = ++score;
    }
}

/* ---------------10. Saving the score ----------------------------*/

function saveScore() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let ref = database.ref("scores/users/" + user.uid + "/notes");
            ref.once("value").then(data => {
                if (data.val() < score) {
                    ref.set(score);
                }
            });
        } else {
            console.log("user not signed in");
        }
    });
}
