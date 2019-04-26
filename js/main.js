$(document).ready(function(){	
	var game;
	$(".read-music-game-init").on("click", function(){
		try {
			$("#read-music-game").show();
			$("#read-music-game-init").hide();
			var gameType = $(this).attr("data-game");
			game = new ReadMusicGame("#read-music-game-container", "#read-music-game-keyboard", gameType);
		}catch(err){
			$("#read-music-game").hide();
			$("#read-music-game-init").hide();
			$("#read-music-game-browser").show();
		}
	});
	$("#try-again").on("click", function(){
		game.tryToSave();
	});
	$(".read-music-game-restart").on("click", function(){
		location.reload();	
	});
	$(document).on("topScore", function(){
		$("#read-music-top").show();
	});
	$(document).on("myScore", function(){
		$("#read-music-my").show();
	});
	$(document).on("score", function(){
		$("#read-music-game").hide();
		$("#read-music-notconnected").hide();
		$("#read-music-scores").show();
		$("#loading").hide();	
	});
	$(document).on("notconnected", function(){
		$("#read-music-game").hide();
		$("#read-music-notconnected").show();
		$("#loading").hide();
	});
	$(".read-music-get-scores").on("click", function(){
		game.getTheScores();
	});
	$(".read-music-try-save").on("click", function(){
		game.tryToSave();
	});
});

function ReadMusicGame(container, keyboardContainer, staffType){
	
	// PRIVATE PROPERTIES
	var that = this;
	var gameContent;
	var musicNotes = [];
	var keyboard;
	var staff;
	var sameNotes = {
		cs: "db",
		ds: "eb",
		fs: "gb",
		gs: "ab",
		as: "bb"
	};
	var sameNotesReverse = {
		db: "cs",
		eb: "ds",
		gb: "fs",
		ab: "gs",
		bb: "as"
	};
	var level = 0;
	var noteToShow = 0;
	var score = 0;
	var saveScoreGameID = 0;
	var allPlayedNotes = [];
	var token;
	var playID;
	var lostText = "";
	var hasLost = false;
	
	// PRIVATE METHODS
	var testNote = function(noteToTest){
		var musicNotesFirst = musicNotes[0];
		// CHORD
		if(musicNotesFirst.constructor === Array){
			if(musicNotesFirst.indexOf(noteToTest) >= 0){
				scoreUp();
				allPlayedNotes.push(noteToTest);
				return noteToTest;
			}else{
				if(noteToTest.charAt(1) == "s"){
					if(musicNotesFirst.indexOf(sameNotes[noteToTest.substring(0, 2)] + noteToTest.substring(2)) >= 0){
						scoreUp();
						allPlayedNotes.push(sameNotes[noteToTest.substring(0, 2)] + noteToTest.substring(2));
						return sameNotes[noteToTest.substring(0, 2)] + noteToTest.substring(2);
					}else{
						scoreDown();
						allPlayedNotes.push(noteToTest);
						return false;
					}
				}else{
					scoreDown();
					allPlayedNotes.push(noteToTest);
					return false;
				}
			}
		// NOTE
		}else{
			if(noteToTest == musicNotesFirst){
				scoreUp();
				allPlayedNotes.push(noteToTest);
				return noteToTest;
			}else{
				if(noteToTest.charAt(1) == "s"){
					if(musicNotesFirst == sameNotes[noteToTest.substring(0, 2)] + noteToTest.substring(2)){
						scoreUp();
						allPlayedNotes.push(sameNotes[noteToTest.substring(0, 2)] + noteToTest.substring(2));
						return sameNotes[noteToTest.substring(0, 2)] + noteToTest.substring(2);
					}else{
						scoreDown();
						allPlayedNotes.push(noteToTest);
						return false;
					}
				}else{
					scoreDown();
					allPlayedNotes.push(noteToTest);
					return false;
				}	
			}
		}
	};
	var scoreUp = function(){
		score++;
		$("#read-music-game-actual-score span").html(score);
	};
	var scoreDown = function(){
		score--;
		$("#read-music-game-actual-score span").html(score);
	};
	var removeNote = function(noteToRemove){
		$(container + " .moving-staff-note[data-note='" + noteToRemove + "']:first").remove();
		if(musicNotes[0].constructor === Array){
			if(musicNotes[0].length <= 1){
				musicNotes.splice(0, 1);
			}else{
				musicNotes[0].splice(musicNotes[0].indexOf(noteToRemove), 1);
			}
		}else{
			musicNotes.splice(0, 1);
		}
		showNextNote();
		if(musicNotes.length <= 0){
			$(container).trigger("ended");
		}
	};
	var loadGame = function(){
		$("#loading").show();
		$.ajax({
			type: "POST",
			url: "php/readMusicInit.php",
			data: {staff: staffType}
		}).done(function(msg){
			if(msg != null){
				gameContent = JSON.parse(msg);
				token = gameContent.info.token;
				playID = gameContent.info.id;
				lostText = gameContent.info.lost;
				setLevel();
			}
		});
	};
	var setLevel = function(){
		if(level < gameContent["game"].length){
			musicNotes = gameContent["game"][level]["guide"].concat(gameContent["game"][level]["song"]);
			staff.emptyStaff();
			staff.stopMoving();
			staff.addNotes(gameContent["game"][level]["guide"].concat(gameContent["game"][level]["song"]));
			noteToShow = 0;
			showAlert(gameContent["game"][level]["text"], "OK");
		}else{
			saveScore();
		}
		$("#loading").hide();
	}
	var playLevel = function(){
		$("#read-music-game-message").hide();
		staff.startMoving();
		level++;
		showNextNote();
	};
	var showNextNote = function(){
		if(noteToShow < gameContent["game"][level - 1]["guide"].length){
			var noteToHighlight = gameContent["game"][level - 1]["guide"][noteToShow];
			if(noteToHighlight.constructor === Array){
				for(var theNote in noteToHighlight){
					var theNoteToHighlight = noteToHighlight[theNote];
					if(theNoteToHighlight.substring(1, 2) == "b"){
						theNoteToHighlight = sameNotesReverse[theNoteToHighlight.substring(0, 2)] + theNoteToHighlight.substring(2);
					}
					$(keyboardContainer + " [data-note='" + theNoteToHighlight + "']").addClass("pressed");
					$(container + " .moving-staff-notes-container .moving-staff-notes [data-note='" + theNoteToHighlight + "']:first").addClass("moving-staff-color-note");
				}
			}else{
				if(noteToHighlight.substring(1, 2) == "b"){
					noteToHighlight = sameNotesReverse[noteToHighlight.substring(0, 2)] + noteToHighlight.substring(2);
				}
				$(keyboardContainer + " [data-note='" + noteToHighlight + "']").addClass("pressed");
				$(container + " .moving-staff-notes-container .moving-staff-notes [data-note='" + noteToHighlight + "']:first").addClass("moving-staff-color-note");
			}
			noteToShow++;
		}
	};
	var showAlert = function(message, button){
		$("#read-music-game-message div p").html(message);
		$("#read-music-game-message div button").html(button);
		$("#read-music-game-message").show();
	};
	var getTheScore = function(){
		staff.stopMoving();
		var score = new GameScore("#read-music-scores-content", saveScoreGameID);
		score.getScore();
	};
	var saveScore = function(){
		$("#loading").show();
		staff.stopMoving();
		staff.emptyStaff();
		var score = new GameScore("#read-music-scores-content", saveScoreGameID);
		score.setScore(JSON.stringify(allPlayedNotes), playID, token);
	};
	
	// PUBLIC METHODS
	this.tryToSave = function(){
		saveScore();
	};
	this.getTheScores = function(){
		$("#loading").show();
		staff.stopMoving();
		var score = new GameScore("#read-music-scores-content", saveScoreGameID);
		score.getScore();
	};
	
	// CONSTRUCTOR
	try {
		// STAFF
		staff = new MovingStaff(container, staffType);
		// KEYBOARD
		if(staffType == "G"){
			keyboard = new VirtualKeyboard(keyboardContainer, 4, 5, true);
			saveScoreGameID = 3;
		}else if(staffType == "F"){
			keyboard = new VirtualKeyboard(keyboardContainer, 2, 3, true);
			saveScoreGameID = 4;
		}else if(staffType == "C"){
			keyboard = new VirtualKeyboard(keyboardContainer, 3, 4, true);
			saveScoreGameID = 5;
		}else{
			keyboard = new VirtualKeyboard(keyboardContainer, 2, 5, true);
			saveScoreGameID = 6;
		}
		$(keyboardContainer).on("noteon", function(){
			var playedNotes = keyboard.getPlayedNotes();
			var test = testNote(playedNotes[playedNotes.length - 1]);
			if(test){
				removeNote(test);
			}
		});
		// EVENTS
		$(container).on("ended", function(){
			setLevel();
		});
		$(container).on("lost", function(){
			staff.stopMoving();
			staff.emptyStaff();
			showAlert(lostText, "OK");
		});
		var gameInterval = setInterval(function(){
			if(staff.notesContent.find(".moving-staff-note:first").length){
				var firstNoteLeft = staff.notesContent.find(".moving-staff-note:first").offset();
				if(staff.notesContainer.offset().left >= firstNoteLeft.left){
					clearInterval(gameInterval);
					hasLost = true;
					$(container).trigger("lost");
				}
			}
		}, 250);
		$("#read-music-game-message div button").on("click", function(){
			if(!hasLost){
				playLevel();
			}else{
				$("#read-music-game-message").hide();
				saveScore();
			}
		});
		// INIT
		loadGame();
	}catch(err){
		throw 1;
	}
}