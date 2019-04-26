function MovingStaff(container, staffType){
		
	// PUBLIC PROPERTIES
	this.notesContent = $("<div />").addClass("moving-staff-notes");
	this.notesContainer = $("<div />").addClass("moving-staff-notes-container").append(this.notesContent);
	this.noteHeight = 8;
	this.noteWidth = 12;
	this.noteMargin = 30;
	this.mainTopBottomPadding = 5;
	this.images = {
		g: "images/web/gclef.png",
		f: "images/web/fclef.png",
		c: "images/web/cclef.png",
		flat: "images/web/flat.png",
		sharp: "images/web/sharp.png",
		natural: "images/web/natural.png"
	};
	
	// PRIVATE PROPERTIES
	var that = this;
	var highestNote;
	var lowestNote;
	var staffLines;
	var notesWithExtraLine;
	var notesOrder = ["c", "d", "e", "f", "g", "a", "b"];
	var indexNotes = false;
	var i;
	var h;
	var indexedNotes = {};
	var indexedNumbers = 0;
	var noteLeftPos = 0;
	var notesInStaff = [];
	var latestNotesWithSigns = [];
	var setFinish = true;
	var numberOfNotesToSpeedUp = 8;
	var initialSpeed = 20000;
	var actualSpeed = 0;
	var speedChange = 2000;
	var initialNotesLeftPos = 220;
	
	
	// PUBLIC METHODS
	this.emptyStaff = function(){
		noteLeftPos = 0;
		notesInStaff = [];
		latestNotesWithSigns = [];
		this.notesContent.html("");
	};
	this.addNotes = function(theNotes){
		for(var theNote in theNotes){
			// CHORD
			if(theNotes[theNote].constructor === Array){
				for(var theNoteInChord in theNotes[theNote]){
					that.addNote(theNotes[theNote][theNoteInChord], false);
				}
				noteLeftPos++;
			// NOTE
			}else{
				that.addNote(theNotes[theNote], true);
			}
		}
	};
	this.addNote = function(aNote, addPos){
		var simpleNote = aNote;
		if(aNote.length == 3){
			simpleNote = aNote.slice(0, 1) + aNote.slice(2);
		}
		if(indexedNotes.hasOwnProperty(simpleNote)){
			var newNote = $("<div />").addClass("moving-staff-note").attr("data-note", aNote);
			newNote.css("width", that.noteWidth + "px");
			newNote.css("height", that.noteHeight + "px");
			newNote.css("left", ((that.noteMargin + that.noteWidth) * noteLeftPos) + "px");
			newNote.css("top", ((indexedNotes[simpleNote] * that.noteHeight) + that.mainTopBottomPadding) + "px");
			that.notesContent.append(newNote);
			if(notesWithExtraLine.indexOf(simpleNote) >= 0){
				newNote.addClass("moving-staff-note-with-line");
			}
			// flats and sharps
			if(aNote.length == 3){
				var newNoteSign;
				if(aNote.slice(1, 2) == "s"){
					newNoteSign = $("<img />").attr("src", this.images.sharp).addClass("moving-staff-note-sharp");
				}else{
					newNoteSign = $("<img />").attr("src", this.images.flat).addClass("moving-staff-note-flat");
				}
				newNote.append(newNoteSign);
				if(latestNotesWithSigns.indexOf(simpleNote) == -1){
					latestNotesWithSigns.push(simpleNote);
				}
			// natural sign
			}else{
				if(latestNotesWithSigns.indexOf(aNote) >= 0){
					var newNoteSign = $("<img />").attr("src", this.images.natural).addClass("moving-staff-note-natural");
					newNote.append(newNoteSign);
					latestNotesWithSigns.splice(latestNotesWithSigns.indexOf(aNote), 1);
				}
			}
			notesInStaff.push(aNote);
			if(addPos){
				noteLeftPos++;
			}
		}
	};
	this.startMoving = function(){
		initialNotesLeftPos = $(container + " .moving-staff-notes").position().left;
		letsMove();
	};
	this.stopMoving = function(){
		$(container + " .moving-staff-notes").velocity("stop");
		$(container + " .moving-staff-notes").css("left", initialNotesLeftPos + "px");
		setFinish = true;
		actualSpeed = initialSpeed;
	};
	
	// PRIVATE METHODS
	var letsMove = function(){
		actualSpeed -= speedChange;
		if(actualSpeed <= 0){
			actualSpeed = initialSpeed;
		}
		var notesContainerLeftPos = $(container + " .moving-staff-notes").position().left;
		$(container + " .moving-staff-notes")
			.velocity({ left: notesContainerLeftPos - (42 * numberOfNotesToSpeedUp) }, actualSpeed, "linear", function(){
				letsMove();
			})
	};
	
	// CONSTRUCTOR
	// G CLEF
	if(staffType == "G"){
		highestNote = "b5";
		lowestNote = "c4";
		staffLines = ["e4", "g4", "b4", "d5", "f5"];
		notesWithExtraLine = ["c4", "a5"];
		$(container).append(
			$("<img />").attr("src", this.images.g).addClass("moving-staff-clef-g")
		);
	// F CLEF
	}else if(staffType == "F"){
		highestNote = "b3";
		lowestNote = "c2";
		staffLines = ["g2", "b2", "d3", "f3", "a3"];
		notesWithExtraLine = ["c2", "e2"];
		$(container).append(
			$("<img />").attr("src", this.images.f).addClass("moving-staff-clef-f")
		);
	// C CLEF THIRD LINE
	}else if(staffType == "C"){
		highestNote = "b4";
		lowestNote = "c3";
		staffLines = ["f3", "a3", "c4", "e4", "g4"];
		notesWithExtraLine = ["d3", "b4"];
		$(container).append(
			$("<img />").attr("src", this.images.c).addClass("moving-staff-clef-c")
		);
	// GRAND STAFF
	}else{
		highestNote = "b5";
		lowestNote = "c2";
		staffLines = ["g2", "b2", "d3", "f3", "a3", "e4", "g4", "b4", "d5", "f5"];
		notesWithExtraLine = ["c2", "e2", "c4", "a5"];
		$(container).append(
			$("<img />").attr("src", this.images.g).addClass("moving-staff-clef-grand-g")
		);
		$(container).append(
			$("<img />").attr("src", this.images.f).addClass("moving-staff-clef-grand-f")
		);
	}
	// ADD STAFF
	$(container).css("padding", this.mainTopBottomPadding + "px 0");
	$(container).addClass("moving-staff");
	$(container).append(this.notesContainer);
	// LOOP ALL OCTAVES
	notesOrder.reverse();
	for(i = 7;i >= 0;i--){
		// LOOP NOTES IN OCTAVE
		for(var key in notesOrder){
			// MAX REACHED
			if(highestNote == notesOrder[key] + i){
				indexNotes = true;
			}
			// ADD NOTES SPACES
			if(indexNotes){
				var noteSpace = $("<div />").addClass("moving-staff-note-space").css("height", this.noteHeight + "px");
				if(staffLines.indexOf(notesOrder[key] + i) >= 0){
					noteSpace.addClass("moving-staff-note-space-with-line");
				}
				$(container).append(noteSpace);
				indexedNotes[notesOrder[key] + i] = indexedNumbers;
				indexedNumbers++;
			}
			// MIN REACHED
			if(lowestNote == notesOrder[key] + i){
				indexNotes = false;
			}
		}
	}
	// TIMER
	setInterval(function(){
		if(setFinish && that.notesContent.html() != ""){
			var lastNoteLeft = that.notesContent.find(".moving-staff-note:last-child").offset();
			if(that.notesContainer.offset().left >= lastNoteLeft.left){
				setFinish = false;
				that.stopMoving();
				$(container).trigger("finished");
			}
		}
		
	}, 250);
}