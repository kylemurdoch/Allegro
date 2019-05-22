var i, tabcontents, tablinks;

//initialize firebase database
let database = firebase.database();

// Set Player Scores //////////////////////////////////////////////////////////////////////////////////////

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        let ref = database.ref("scores/users/" + user.uid);
        ref.on(
            "value",
            data => {
                document.getElementById("trebleScore").innerHTML = data.val().staticTreble;
                document.getElementById("advTrebleScore").innerHTML = data.val().dynamicTreble;
                document.getElementById("bassScore").innerHTML = data.val().staticBass;
                document.getElementById("advBassScore").innerHTML = data.val().dynamicBass;
                document.getElementById("mixedScore").innerHTML = data.val().mixed;
                document.getElementById("pitchScore").innerHTML = data.val().pitch;
            },
            err => {}
        );
    } else {
        console.log("user not signed in");
    }
});

// Set Global Scores //////////////////////////////////////////////////////////////////////////////////////

let ref = database.ref("scores/global/");
ref.on(
    "value",
    data => {
        // static treble
        document.getElementById("treble1name").innerHTML = data.val().staticTreble.first.name;
        document.getElementById("treble2name").innerHTML = data.val().staticTreble.second.name;
        document.getElementById("treble3name").innerHTML = data.val().staticTreble.third.name;
        document.getElementById("treble1score").innerHTML = data.val().staticTreble.first.score;
        document.getElementById("treble2score").innerHTML = data.val().staticTreble.second.score;
        document.getElementById("treble3score").innerHTML = data.val().staticTreble.third.score;

        // dynamic treble
        document.getElementById("advTreble1name").innerHTML = data.val().dynamicTreble.first.name;
        document.getElementById("advTreble2name").innerHTML = data.val().dynamicTreble.second.name;
        document.getElementById("advTreble3name").innerHTML = data.val().dynamicTreble.third.name;
        document.getElementById("advTreble1score").innerHTML = data.val().dynamicTreble.first.score;
        document.getElementById("advTreble2score").innerHTML = data.val().dynamicTreble.second.score;
        document.getElementById("advTreble3score").innerHTML = data.val().dynamicTreble.third.score;

        // static bass
        document.getElementById("bass1name").innerHTML = data.val().staticBass.first.name;
        document.getElementById("bass2name").innerHTML = data.val().staticBass.second.name;
        document.getElementById("bass3name").innerHTML = data.val().staticBass.third.name;
        document.getElementById("bass1score").innerHTML = data.val().staticBass.first.score;
        document.getElementById("bass2score").innerHTML = data.val().staticBass.second.score;
        document.getElementById("bass3score").innerHTML = data.val().staticBass.third.score;

        // dynamic bass
        document.getElementById("advBass1name").innerHTML = data.val().dynamicBass.first.name;
        document.getElementById("advBass2name").innerHTML = data.val().dynamicBass.second.name;
        document.getElementById("advBass3name").innerHTML = data.val().dynamicBass.third.name;
        document.getElementById("advBass1score").innerHTML = data.val().dynamicBass.first.score;
        document.getElementById("advBass2score").innerHTML = data.val().dynamicBass.second.score;
        document.getElementById("advBass3score").innerHTML = data.val().dynamicBass.third.score;

        // mixed
        document.getElementById("mixed1name").innerHTML = data.val().mixed.first.name;
        document.getElementById("mixed2name").innerHTML = data.val().mixed.second.name;
        document.getElementById("mixed3name").innerHTML = data.val().mixed.third.name;
        document.getElementById("mixed1score").innerHTML = data.val().mixed.first.score;
        document.getElementById("mixed2score").innerHTML = data.val().mixed.second.score;
        document.getElementById("mixed3score").innerHTML = data.val().mixed.third.score;

        // pitch
        document.getElementById("pitch1name").innerHTML = data.val().pitch.first.name;
        document.getElementById("pitch2name").innerHTML = data.val().pitch.second.name;
        document.getElementById("pitch3name").innerHTML = data.val().pitch.third.name;
        document.getElementById("pitch1score").innerHTML = data.val().pitch.first.score;
        document.getElementById("pitch2score").innerHTML = data.val().pitch.second.score;
        document.getElementById("pitch3score").innerHTML = data.val().pitch.third.score;
    },
    err => {}
);

// Treble //////////////////////////////////////////////////////////////////////////////////////
function openBoard(evt, board) {
    tabcontents = document.getElementsByClassName("trebletable");
    for (i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("trebletabs");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" tabactive", "");
    }
    document.getElementById(board).style.display = "block";
    evt.currentTarget.className += " tabactive";
}

// Bass //////////////////////////////////////////////////////////////////////////////////////
function openBoard2(evt, board) {
    tabcontents = document.getElementsByClassName("basstable");
    for (i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("basstabs");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" tabactive", "");
    }
    document.getElementById(board).style.display = "block";
    evt.currentTarget.className += " tabactive";
}

// Mixed //////////////////////////////////////////////////////////////////////////////////////
function openBoard3(evt, board) {
    tabcontents = document.getElementsByClassName("mixedtable");
    for (i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("mixedtabs");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" tabactive", "");
    }
    document.getElementById(board).style.display = "block";
    evt.currentTarget.className += " tabactive";
}

// adv Treble //////////////////////////////////////////////////////////////////////////////////////
function openBoard4(evt, board) {
    tabcontents = document.getElementsByClassName("advtrebletable");
    for (i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("advtrebletabs");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" tabactive", "");
    }
    document.getElementById(board).style.display = "block";
    evt.currentTarget.className += " tabactive";
}

// adv Bass //////////////////////////////////////////////////////////////////////////////////////
function openBoard5(evt, board) {
    tabcontents = document.getElementsByClassName("advbasstable");
    for (i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("advbasstabs");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" tabactive", "");
    }
    document.getElementById(board).style.display = "block";
    evt.currentTarget.className += " tabactive";
}

// Pitch //////////////////////////////////////////////////////////////////////////////////////
function openBoard6(evt, board) {
    tabcontents = document.getElementsByClassName("pitchtable");
    for (i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("pitchtabs");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" tabactive", "");
    }
    document.getElementById(board).style.display = "block";
    evt.currentTarget.className += " tabactive";
}

document.getElementById("trebledefault").click();
document.getElementById("bassdefault").click();
document.getElementById("mixeddefault").click();
document.getElementById("advtrebledefault").click();
document.getElementById("advbassdefault").click();
document.getElementById("pitchdefault").click();
