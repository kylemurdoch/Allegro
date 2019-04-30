
/*
VF = Vex.Flow;


var div = document.getElementById("boo")
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(500, 500);
var context = renderer.getContext();
context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

// Create a stave of width 400 at position 10, 40 on the canvas.
var stave = new VF.Stave(10, 40, 400);

// Add a clef and time signature.
stave.addClef("treble").addTimeSignature("4/4");

// Connect it to the rendering context and draw!
stave.setContext(context).draw();

// Create the notes
var notes = [
  // A quarter-note C.
  new VF.StaveNote({ keys: ["c/4"], duration: "q" }),

  // A quarter-note D.
  new VF.StaveNote({ keys: ["d/4"], duration: "q" }),

  // A quarter-note rest. Note that the key (b/4) specifies the vertical
  // position of the rest.
  new VF.StaveNote({ keys: ["b/4"], duration: "qr" }),

  // A C-Major chord.
  new VF.StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" })
];

// Create a voice in 4/4 and add above notes
var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
voice.addTickables(notes);

// Format and justify the notes to 400 pixels.
var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

// Render voice
voice.draw(context, stave);

*/



/*

SINGLE NOTE

document.getElementById('boo').innerHTML = "";
var div = document.getElementById("boo");

VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "boo".
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(120, 150);
var context = renderer.getContext();

// Create a stave of width 400 at position 10, 40 on the canvas.
var stave = new VF.Stave(10, 10, 100);

// Add a clef.
stave.addClef("treble");


// Connect it to the rendering context and draw!
stave.setContext(context).draw();

//var noteLetter = "d/6";
// Create the notes
var notes = [
new VF.StaveNote({keys: ["g/5"],duration: "q"}),
];


// Create a voice and add above notes
var voice = new VF.Voice({num_beats: 1, beat_value: 4});
voice.addTickables(notes);

// Format and justify the notes to 400 pixels.
var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 100);

// Render voice
voice.draw(context, stave);

*/