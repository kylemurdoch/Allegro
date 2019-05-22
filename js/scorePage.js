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

let ref = database.ref("scores/users/");
ref.on(
    "value",
    data => {
        let users = data.val();
        let usera = [];
        let i = 0;
        for (var key in users) {
            if (users.hasOwnProperty(key)) {
                data = {
                    name: users[key].name,
                    staticTreble: users[key].staticTreble,
                    dynamicTreble: users[key].dynamicTreble,
                    staticBass: users[key].staticBass,
                    dynamicBass: users[key].dynamicBass,
                    mixed: users[key].mixed,
                    pitch: users[key].pitch
                };
                usera[i] = data;
            }
            i++;
        }
        setTreble(usera);
        setAdvTreble(usera);
        setBass(usera);
        setAdvBass(usera);
        setMixed(usera);
        setPitch(usera);
    },
    err => {}
);

function setTreble(list) {
    let temp;
    let n = list.length;
    let el = document.getElementById("globaltreble");
    el.innerHTML = "<tr><th>Rank</th><th>Name</th><th>Score</th></tr>";

    for (let m = n; m >= 0; m--) {
        for (let i = 0; i < n - 1; i++) {
            k = i + 1;
            if (list[i].staticTreble < list[k].staticTreble) {
                temp = list[k];
                list[k] = list[i];
                list[i] = temp;
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (list[i].staticTreble > 0) {
            let newHTML =
                "<tr>" +
                "<td>" +
                (i + 1) +
                "</td>" +
                "<td>" +
                list[i].name +
                "</td>" +
                "<td>" +
                list[i].staticTreble +
                "</td>" +
                "</tr>";
            el.innerHTML = el.innerHTML + newHTML;
        }
    }
}

function setBass(list) {
    let temp;
    let n = list.length;
    let el = document.getElementById("globalbass");
    el.innerHTML = "<tr><th>Rank</th><th>Name</th><th>Score</th></tr>";

    for (let m = n; m >= 0; m--) {
        for (let i = 0; i < n - 1; i++) {
            k = i + 1;
            if (list[i].staticBass < list[k].staticBass) {
                temp = list[k];
                list[k] = list[i];
                list[i] = temp;
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (list[i].staticBass > 0) {
            let newHTML =
                "<tr>" +
                "<td>" +
                (i + 1) +
                "</td>" +
                "<td>" +
                list[i].name +
                "</td>" +
                "<td>" +
                list[i].staticBass +
                "</td>" +
                "</tr>";
            el.innerHTML = el.innerHTML + newHTML;
        }
    }
}

function setMixed(list) {
    let temp;
    let n = list.length;
    let el = document.getElementById("globalmixed");
    el.innerHTML = "<tr><th>Rank</th><th>Name</th><th>Score</th></tr>";

    for (let m = n; m >= 0; m--) {
        for (let i = 0; i < n - 1; i++) {
            k = i + 1;
            if (list[i].mixed < list[k].mixed) {
                temp = list[k];
                list[k] = list[i];
                list[i] = temp;
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (list[i].mixed > 0) {
            let newHTML =
                "<tr>" +
                "<td>" +
                (i + 1) +
                "</td>" +
                "<td>" +
                list[i].name +
                "</td>" +
                "<td>" +
                list[i].mixed +
                "</td>" +
                "</tr>";
            el.innerHTML = el.innerHTML + newHTML;
        }
    }
}

function setAdvTreble(list) {
    let temp;
    let n = list.length;
    let el = document.getElementById("globaladvtreble");
    el.innerHTML = "<tr><th>Rank</th><th>Name</th><th>Score</th></tr>";

    for (let m = n; m >= 0; m--) {
        for (let i = 0; i < n - 1; i++) {
            k = i + 1;
            if (list[i].dynamicTreble < list[k].dynamicTreble) {
                temp = list[k];
                list[k] = list[i];
                list[i] = temp;
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (list[i].dynamicTreble > 0) {
            let newHTML =
                "<tr>" +
                "<td>" +
                (i + 1) +
                "</td>" +
                "<td>" +
                list[i].name +
                "</td>" +
                "<td>" +
                list[i].dynamicTreble +
                "</td>" +
                "</tr>";
            el.innerHTML = el.innerHTML + newHTML;
        }
    }
}

function setAdvBass(list) {
    let temp;
    let n = list.length;
    let el = document.getElementById("globaladvbass");
    el.innerHTML = "<tr><th>Rank</th><th>Name</th><th>Score</th></tr>";

    for (let m = n; m >= 0; m--) {
        for (let i = 0; i < n - 1; i++) {
            k = i + 1;
            if (list[i].dynamicBass < list[k].dynamicBass) {
                temp = list[k];
                list[k] = list[i];
                list[i] = temp;
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (list[i].dynamicBass > 0) {
            let newHTML =
                "<tr>" +
                "<td>" +
                (i + 1) +
                "</td>" +
                "<td>" +
                list[i].name +
                "</td>" +
                "<td>" +
                list[i].dynamicBass +
                "</td>" +
                "</tr>";
            el.innerHTML = el.innerHTML + newHTML;
        }
    }
}

function setPitch(list) {
    let temp;
    let n = list.length;
    let el = document.getElementById("globalpitch");
    el.innerHTML = "<tr><th>Rank</th><th>Name</th><th>Score</th></tr>";

    for (let m = n; m >= 0; m--) {
        for (let i = 0; i < n - 1; i++) {
            k = i + 1;
            if (list[i].pitch < list[k].pitch) {
                temp = list[k];
                list[k] = list[i];
                list[i] = temp;
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (list[i].pitch > 0) {
            let newHTML =
                "<tr>" +
                "<td>" +
                (i + 1) +
                "</td>" +
                "<td>" +
                list[i].name +
                "</td>" +
                "<td>" +
                list[i].pitch +
                "</td>" +
                "</tr>";
            el.innerHTML = el.innerHTML + newHTML;
        }
    }
}

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
