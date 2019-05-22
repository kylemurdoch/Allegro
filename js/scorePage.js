var i, tabcontents, tablinks;

//initialize firebase database
let database = firebase.database();

// Set Player Scores //////////////////////////////////////////////////////////////////////////////////////
/*
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
*/
// Set Global Scores //////////////////////////////////////////////////////////////////////////////////////

let ref = database.ref("scores/users/");
ref.on(
    "value",
    data => {
        let users = data.val();
        console.log(users);
        for (var key in users) {
            if (users.hasOwnProperty(key)) {
                console.log(users[key]);
            }
        }
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
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(board).style.display = "block";
    evt.currentTarget.className += " active";
}

// Bass //////////////////////////////////////////////////////////////////////////////////////
function openBoard2(evt, board) {
    tabcontents = document.getElementsByClassName("basstable");
    for (i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("basstabs");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(board).style.display = "block";
    evt.currentTarget.className += " active";
}

// Mixed //////////////////////////////////////////////////////////////////////////////////////
function openBoard3(evt, board) {
    tabcontents = document.getElementsByClassName("mixedtable");
    for (i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("mixedtabs");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(board).style.display = "block";
    evt.currentTarget.className += " active";
}

// adv Treble //////////////////////////////////////////////////////////////////////////////////////
function openBoard4(evt, board) {
    tabcontents = document.getElementsByClassName("advtrebletable");
    for (i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("advtrebletabs");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(board).style.display = "block";
    evt.currentTarget.className += " active";
}

// adv Bass //////////////////////////////////////////////////////////////////////////////////////
function openBoard5(evt, board) {
    tabcontents = document.getElementsByClassName("advbasstable");
    for (i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("advbasstabs");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(board).style.display = "block";
    evt.currentTarget.className += " active";
}

// Pitch //////////////////////////////////////////////////////////////////////////////////////
function openBoard6(evt, board) {
    tabcontents = document.getElementsByClassName("pitchtable");
    for (i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("pitchtabs");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(board).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementById("trebledefault").click();
document.getElementById("bassdefault").click();
document.getElementById("mixeddefault").click();
document.getElementById("advtrebledefault").click();
document.getElementById("advbassdefault").click();
document.getElementById("pitchdefault").click();
