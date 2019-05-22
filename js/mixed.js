openNav();
var navOpen;

/* ---------------1. Setting up Music score ----------------------------*/

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
//changeNote();

//for rerendering the context
function render(x, treble) {
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
        stave.addClef("treble");
    } else {
        // Add a clef.
        stave.addClef("bass");
    }

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    // Create the notes
    notes = [
        new VF.GhostNote({
            duration: "q"
        })
    ];

    if (treble) {
        notes[1] = new VF.StaveNote({
            keys: [x],
            duration: "q"
        });
    } else {
        notes[1] = new VF.StaveNote({
            clef: "bass",
            keys: [x],
            duration: "q"
        });
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

function changeNoteTreble() {
    //Generate random number between 0-6
    var rando = Math.floor(Math.random() * 7);
    var noteLetter;
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
    // And when you want to delete it, do this:
    context.svg.removeChild(group);
    render(noteLetter, true);
}

function changeNoteBass() {
    //Generate random number between 0-6
    var rando = Math.floor(Math.random() * 7);
    var noteLetter;
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
    // And when you want to delete it, do this:
    context.svg.removeChild(group);
    render(noteLetter, false);
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
    if (!navOpen) {
        if (e.keyCode !== undefined) {
            key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
            console.log(e.keyCode);
        } else {
            key = document.querySelector(`.key[data-key="${e}"]`);
        }

        if (!navOpen) {
            if (e.keyCode !== undefined) {
                key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
                console.log(e.keyCode);
            } else {
                key = document.querySelector(`.key[data-key="${e}"]`);
            }

            if (!key) return;

            const keyNote = key.getAttribute("data-note");

            key.classList.add("playing");

            if (keyNote === curNote) {
                $(".fancy-button").bind("animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd", function() {
                    $(".fancy-button").removeClass("active");
                });
                $(".fancy-button").addClass("active");

                key.classList.add("right");
                document.getElementById("score").innerHTML = ++score;
            } else {
                $(".fancy-button").bind("animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd", function() {
                    $(".fancy-button").removeClass("animated shake faster");
                });
                $(".fancy-button").addClass("animated shake faster");
                if (score > 0) {
                    document.getElementById("score").innerHTML = --score;
                }

                //Make curNote key flash
                for (var i = 0; i < keys.length; i++) {
                    if (keys[i].getAttribute("data-note") === curNote) {
                        keys[i].classList.add("wrong");
                    }
                }
            }
            if (Math.random() >= 0.5) {
                changeNoteTreble();
            } else {
                changeNoteBass();
            }
        }
    }
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

/* ---------------7. Saving the score ----------------------------*/

function saveScore() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let ref = database.ref("scores/users/" + user.uid + "/mixed");
            ref.once("value").then(data => {
                if (data.val() < score) {
                    ref.set(score);
                }
            });

            //global high score
            let ref2 = database.ref("scores/global/mixed");
            newData = {};
            ref2.once("value").then(data => {
                if (data.val().first.score < score) {
                    newData.first = {
                        name: user.displayName,
                        score: score
                    };
                    newData.second = data.val().first;
                    newData.third = data.val().second;
                    ref2.set(newData);
                } else if (data.val().second.score < score) {
                    newData.first = data.val().first;
                    newData.second = {
                        name: user.displayName,
                        score: score
                    };
                    newData.third = data.val().second;
                    ref2.set(newData);
                } else if (data.val().third.score < score) {
                    newData.first = data.val().first;
                    newData.second = data.val().second;
                    newData.third = {
                        name: user.displayName,
                        score: score
                    };
                    ref2.set(newData);
                }
            });
        } else {
            console.log("user not signed in");
        }
    });
}
