/* Logic for practice static notes game */

openNav();
var navOpen;

/* ---------------1. Setting up Music score ----------------------------*/

var treble = true;

note = document.querySelector(".nowplaying");

function setBass() {
    treble = false;
    changeNote();
    closeNav();
}

function setTreble() {
    treble = true;
    closeNav();
}

let database = firebase.database();

document.getElementById("boo").innerHTML = "";
var div = document.getElementById("boo");

VF = Vex.Flow;

var curNote = "C";

//Player's score
var score = 0;

// Create an SVG renderer and attach it to the DIV element named "boo".
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

var width = screen.width;
var height = screen.height;
// Configure the rendering context.

//Desktop
if (width > 770 && height > 400) {
    renderer.resize(202, 160);
}
//Mobile Portrait
if (width < 770 && height > 400) {
    renderer.resize(152, 160);
}

//Mobile Landscape 
if (width < 770 && height < 400) {
    renderer.resize(202, 120);
}

var context = renderer.getContext();
render("c/4");
changeNote();

//for rerendering the context
function render(x) {
    // Open a group to hold all the SVG elements in the measure:
    group = context.openGroup();


    // Create a stave
    //Desktop
    if (width > 770 && height > 400) {
        stave = new VF.Stave(0, 20, 200);
    }
    //Mobile Portrait
    if (width < 770 && height > 400) {
        stave = new VF.Stave(0, 20, 150);
    }

    //Mobile Landscape 
    if (width < 770 && height < 400) {
        stave = new VF.Stave(0, 0, 200);
    }

    if (treble) {
        // Add a clef.
        stave.addClef("treble");
    } else {
        stave.addClef("bass");
    }

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    if (treble) {
        // Create the notes
        notes = [
            new VF.GhostNote({
                duration: "q"
            }),

            new VF.StaveNote({
                keys: [x],
                duration: "q"
            })
        ];
    } else {
        notes = [

            new VF.GhostNote({
                duration: "q"
            }),

            new VF.StaveNote({
                clef: "bass",
                keys: [x],
                duration: "q"
            }),
        ];
    }

    // Create a voice and add above notes
    voice = new VF.Voice({
        num_beats: 2,
        beat_value: 4
    });
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    formatter = new VF.Formatter().joinVoices([voice]).format([voice], 100);

    // Render voice
    voice.draw(context, stave);

    // Then close the group:
    context.closeGroup();
}

function changeNote() {
    //Generate random number between 0-6
    var rando = Math.floor(Math.random() * 7);
    var noteLetter;

    if (treble) {
        switch (rando) {
            case 0:
                noteLetter = "a/" + Math.floor(Math.random() * 3 + 3);
                curNote = "A";
                break;
            case 1:
                noteLetter = "b/" + Math.floor(Math.random() * 3 + 3);
                curNote = "B";
                break;
            case 2:
                noteLetter = "c/" + Math.floor(Math.random() * 3 + 4);
                curNote = "C";
                break;
            case 3:
                noteLetter = "d/" + Math.floor(Math.random() * 3 + 4);
                curNote = "D";
                break;
            case 4:
                noteLetter = "e/" + Math.floor(Math.random() * 2 + 4);
                curNote = "E";
                break;

            case 5:
                noteLetter = "f/" + Math.floor(Math.random() * 2 + 4);
                curNote = "F";
                break;

            case 6:
                noteLetter = "g/" + Math.floor(Math.random() * 3 + 3);
                curNote = "G";
                break;

            default:
                // code block
        }
    } else {

        switch (rando) {
            case 0:
                noteLetter = "a/" + Math.floor(Math.random() * 2 + 2);
                curNote = "A";
                break;
            case 1:
                noteLetter = "b/" + Math.floor(Math.random() * 3 + 1);
                curNote = "B";
                break;
            case 2:
                noteLetter = "c/" + Math.floor(Math.random() * 3 + 2);
                curNote = "C";
                break;
            case 3:
                noteLetter = "d/" + Math.floor(Math.random() * 3 + 2);
                curNote = "D";
                break;
            case 4:
                noteLetter = "e/" + Math.floor(Math.random() * 3 + 2);
                curNote = "E";
                break;

            case 5:
                noteLetter = "f/" + Math.floor(Math.random() * 3 + 2);
                curNote = "F";
                break;

            case 6:
                noteLetter = "g/" + Math.floor(Math.random() * 2 + 2);
                curNote = "G";
                break;

            default:
                // code block
        }

    }
    note.innerHTML = curNote;
    // And when you want to delete it, do this:
    context.svg.removeChild(group);
    render(noteLetter);
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
                setTimeout(function () {
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
    if (!navOpen) {
        if (e.keyCode !== undefined) {
            key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
        } else {
            key = document.querySelector(`.key[data-key="${e}"]`);
        }

        if (!key) return;

        const keyNote = key.getAttribute("data-note");

        key.classList.add("playing");

        if (keyNote === curNote) {
            $(".fancy-button").bind("animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd", function () {
                $(".fancy-button").removeClass("active");
            });
            $(".fancy-button").addClass("active");

            key.classList.add("right");
        } else {
            $(".fancy-button").bind("animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd", function () {
                $(".fancy-button").removeClass("animated shake faster");
            });
            $(".fancy-button").addClass("animated shake faster");

            //Make curNote key flash
            for (var i = 0; i < keys.length; i++) {
                if (keys[i].getAttribute("data-note") === curNote) {
                    keys[i].classList.add("wrong");
                }
            }
        }
        changeNote();
    }
}

/*----------------------------------------------------------------------*/

function removeTransition(e) {
    this.classList.remove("playing");
    this.classList.remove("right");
    this.classList.remove("wrong");
}

keys.forEach(key => key.addEventListener("transitionend", removeTransition));

window.addEventListener("keydown", playNote);

/* ---------------4. Create an Overlay ----------------------------*/

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