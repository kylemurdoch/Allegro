var i, tabcontents, tablinks;

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