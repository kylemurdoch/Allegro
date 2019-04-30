document.getElementById('boo').innerHTML = "";
var div = document.getElementById("boo");

VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "boo".
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(120, 150);
var context = renderer.getContext();

// Open a group to hold all the SVG elements in the measure:
group = context.openGroup();

// Create a stave of width 400 at position 10, 40 on the canvas.
var stave = new VF.Stave(10, 10, 100);

// Add a clef.
stave.addClef("treble");


// Connect it to the rendering context and draw!
stave.setContext(context).draw();

//var noteLetter = "d/6";
// Create the notes
var notes = [
  new VF.StaveNote({
    keys: ["g/5"],
    duration: "q"
  }),
];


// Create a voice and add above notes
var voice = new VF.Voice({
  num_beats: 1,
  beat_value: 4
});
voice.addTickables(notes);

// Format and justify the notes to 400 pixels.
var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 100);

// Render voice
voice.draw(context, stave);

// Then close the group:
context.closeGroup();





function changeNote() {


  //Generate random number between 0-6

  var rando = Math.floor((Math.random() * 7));
  var noteLetter;
  switch (rando) {
    case 0:
      noteLetter = "a/" +  Math.floor((Math.random() * 3)+4);
      break;
    case 1:
      noteLetter = "b/" +  Math.floor((Math.random() * 3)+4);
      break;
    case 2:
      noteLetter = "c/" +  Math.floor((Math.random() * 3)+4);
      break;
    case 3:
      noteLetter = "d/" +  Math.floor((Math.random() * 3)+4);
      break;
    case 4:
      noteLetter = "e/" + Math.floor((Math.random() * 2)+4);
      break;

    case 5:
      noteLetter = "f/" + Math.floor((Math.random() * 2)+4);
      break;

    case 6:
      noteLetter = "g/" + Math.floor((Math.random() * 3)+3);
      break;

    default:
      // code block
  }

  document.getElementById("demo").innerHTML = noteLetter;

  // And when you want to delete it, do this:
  context.svg.removeChild(group);

  render(noteLetter);

}

function render(x) {


  // Open a group to hold all the SVG elements in the measure:
  group = context.openGroup();

  // Create a stave of width 400 at position 10, 40 on the canvas.
  stave = new VF.Stave(10, 10, 100);

  // Add a clef.
  stave.addClef("treble");


  // Connect it to the rendering context and draw!
  stave.setContext(context).draw();

  //var noteLetter = "d/6";
  // Create the notes
  notes = [
    new VF.StaveNote({
      keys: [x],
      duration: "q"
    }),
  ];


  // Create a voice and add above notes
  voice = new VF.Voice({
    num_beats: 1,
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