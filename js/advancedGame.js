openNav();
var navOpen;

var curNote = "B";
var score = 0;

/*
function enhancedNote(VFNote, key){

  this.key = key;
  this.VFNote = VFNote;
  
}

enhancedNote.prototype.getVFNote = function () {
  return this.VFNote;
};

enhancedNote.prototype.getKey = function () {
  return this.key;
};
*/


// Basic setup boilerplate for using VexFlow with the SVG rendering context:
VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "boo".
var div = document.getElementById("boo")
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);


function randomNote() {
  //Generate random number between 0-6
  var rando = Math.floor((Math.random() * 7));
  var noteLetter;
  var durations = ['8', '4', '2', '1'];
  switch (rando) {
    case 0:
      noteLetter = "a/" + Math.floor((Math.random() * 3) + 3);
      //curNote = "A";
      break;
    case 1:
      noteLetter = "b/" + Math.floor((Math.random() * 3) + 3);
      //curNote = "B";
      break;
    case 2:
      noteLetter = "c/" + Math.floor((Math.random() * 3) + 4);
      //curNote = "C";
      break;
    case 3:
      noteLetter = "d/" + Math.floor((Math.random() * 3) + 4);
      //curNote = "D";
      break;
    case 4:
      noteLetter = "e/" + Math.floor((Math.random() * 2) + 4);
      //curNote = "E";
      break;

    case 5:
      noteLetter = "f/" + Math.floor((Math.random() * 2) + 4);
      //curNote = "F";
      break;

    case 6:
      noteLetter = "g/" + Math.floor((Math.random() * 3) + 3);
      //curNote = "G";
      break;

    default:
      // code block
  }
 
  randoNote = new VF.StaveNote({
    keys: [noteLetter],
    duration: durations[Math.floor(Math.random()*durations.length)]
  });
  /*
  randoNote = new enhancedNote(new VF.StaveNote({
    keys: [noteLetter],
    duration: durations[Math.floor(Math.random()*durations.length)]
  }), noteLetter);

  console.log(randoNote.getKey());*/
  return randoNote;
}

// Configure the rendering context.
renderer.resize(402, 160);
var context = renderer.getContext();

var tickContext = new VF.TickContext();

// Create a stave of width 400 at position 0, 20 on the canvas.
var stave = new VF.Stave(0, 20, 400)
.addClef('treble');

// Connect it to the rendering context and draw!
stave.setContext(context).draw();

tickContext.preFormat().setX(400);

// This will contain any notes that are currently visible on the staff,
// before they've either been answered correctly, or plumetted off
// the staff when a user fails to answer them correctly in time.
const visibleNoteGroups = [];

// Add a note to the staff from the notes array (if there are any left).
function addNote(){
  randomNote();
  //note = randomNote().getVFNote();
  note = randomNote();
  note.setContext(context).setStave(stave);
  tickContext.addTickable(note);
  
  const group = context.openGroup();
  visibleNoteGroups.push(group);
	note.draw();
  context.closeGroup();
	group.classList.add('scroll');
	// Force a dom-refresh by asking for the group's bounding box. Why? Most
  // modern browsers are smart enough to realize that adding .scroll class
  // hasn't changed anything about the rendering, so they wait to apply it
  // at the next dom refresh, when they can apply any other changes at the
  // same time for optimization. However, if we allow that to happen,
  // then sometimes the note will immediately jump to its fully transformed
  // position -- because the transform will be applied before the class with
  // its transition rule. 
  const box = group.getBoundingClientRect();
	group.classList.add('scrolling');

	// If a user doesn't answer in time make the note fall below the staff
	window.setTimeout(() => {
		const index = visibleNoteGroups.indexOf(group);
		if(index === -1) return;
		group.classList.add('too-slow');
    visibleNoteGroups.shift();
	}, 5000);
};

// If a user plays/identifies the note in time, send it up to note heaven.
function removeNote() {
	group = visibleNoteGroups.shift();
  group.classList.add('correct');
	// The note will be somewhere in the middle of its move to the left -- by
  // getting its computed style we find its x-position, freeze it there, and
  // then send it straight up to note heaven with no horizontal motion.
	const transformMatrix = window.getComputedStyle(group).transform;
  // transformMatrix will be something like 'matrix(1, 0, 0, 1, -118, 0)'
  // where, since we're only translating in x, the 4th property will be
  // the current x-translation. You can dive into the gory details of
  // CSS3 transform matrices (along with matrix multiplication) if you want
  // at http://www.useragentman.com/blog/2011/01/07/css3-matrix-transform-for-the-mathematically-challenged/
	const x = transformMatrix.split(',')[4].trim();
	// And, finally, we set the note's style.transform property to send it skyward.
	group.style.transform = `translate(${x}px, -800px)`;
};



/* ---------------2. Setting up Timer ----------------------------*/

var timeoutHandle;
var timerOn = true;

function countdown(minutes, seconds) {
    function tick() {
        var counter = document.getElementById("time");
        counter.innerHTML =
            minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        
            
        if(timerOn){
        seconds--;
        //addNote();
        } else{
          return;
        }
        if (seconds >= 0) {
            timeoutHandle = setTimeout(tick, 1000);
        } else {
            if (minutes >= 1) {
                // countdown(mins-1);   never reach “00″ issue solved:Contributed by Victor Streithorst
                setTimeout(function () {
                    countdown(minutes - 1, 59);
                }, 1000);
            }
            //WHEN TIMER RUNS OUT
            else{
              timesUp() 
            }
        }
    }
    tick();
    closeNav();
}

function timesUp(){
  openGameOver();
}

/* ---------------3. Setting up Piano Keys ----------------------------*/

const keys = document.querySelectorAll(".key");


function playNote(e) {

  if(!navOpen){

  key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

  if (!key) return;

  const keyNote = key.getAttribute("data-note");

  key.classList.add("playing");
  

  if (keyNote === curNote) {
    $(".fancy-button").bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function () {
      $(".fancy-button").removeClass('active');
    })
    $(".fancy-button").addClass("active");
    
    key.classList.add("right");
    document.getElementById('score').innerHTML = ++score;

  } else {

    $(".fancy-button").bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function () {
      $(".fancy-button").removeClass('animated shake faster');
    })
    $(".fancy-button").addClass("animated shake faster");
    document.getElementById('score').innerHTML = --score;

    //Make curNote key flash 
    for (var i = 0; i < keys.length; i++) {
      if(keys[i].getAttribute("data-note") === curNote){
        keys[i].classList.add("wrong");
      }
    }
  }
  //changeNote();
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
  navOpen = true;
}

function closeNav() {
  document.getElementById("myNav").style.display = "none";
  document.getElementsByClassName("menu-toggle")[0].style.display = "block";
  start();
  navOpen = false;
}

function closeGameOver() {
  document.getElementById("gameOver").style.display = "none";
  document.getElementsByClassName("menu-toggle")[0].style.display = "block";
  navOpen = false;
}

/* ---------------5. Replaying a game ----------------------------*/

function newGame(){
  location.reload();
}

var started = false;
function start(){
  if (started) return;
  started = true;
  console.log("started");
  setInterval(function(){addNote()}, 1000);}





  

