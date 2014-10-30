$(function() {
	setTimeout(function() {
	}, 1500);
	$("#createCharacter").click(function() {
		$("#loadingDots").removeClass("hidden");
		var newName = $("#nameInput").val();
		var newClassType = $("#classInput").val();
		var newGender = $("#genderInput").val();
		var newLevel = $("#levelInput").val();
		var newMoney = $("#moneyInput").val();
        $.ajax({
		    type: 'POST',
		    url: "http://lmu-diabolical.appspot.com/characters",
		    data: JSON.stringify({
		        name: newName,
		        classType: newClassType,
		        gender: newGender,
		        level: newLevel,
		        money: newMoney
		    }),
		    contentType: "application/json",
		    dataType: "json",
		    accept: "application/json",
		    complete: function (jqXHR, textStatus) {
		        // The new character can be accessed from the Location header.
		        console.log("You may access the new character at:" +
		            jqXHR.getResponseHeader("Location"));
		        // Reload page after new character made
		        $("#createCharacter").attr("data-dismiss", "modal");

		        window.location.reload();
		    }
		});
	});

    /* Display characters in a table */
	$.getJSON(
	    "http://lmu-diabolical.appspot.com/characters",
	    function (characters) {
	        $("tbody").append(characters.map(function (character) {
	            var tr = $(".character-template").clone();
	            tr.find(".name").text(character.name);
	            tr.attr("id", character.id);
	            tr.find(".class").text(character.classType);
	            tr.find(".gender").text(character.gender);
	            tr.find(".level").text(character.level);
	            return tr;
	        }));
	    }
	);

	/* Go to character's page on click */
	$("tbody").click(function(event) {
		var id = $(event.target).closest("tr").attr("id");
        console.log(id);
        window.location.href = "character.html/#" + id;
	});

	$("#getCharacterById").click(function() {
		$.getJSON(
		    "http://lmu-diabolical.appspot.com/characters/" + id,
		    function (character) {
		        // Do something with the character.
		        console.log(character);
		    }
		);
	});

	$("#modifyCharacter").click(function() {
        $.ajax({
		    type: 'PUT',
		    url: "http://lmu-diabolical.appspot.com/characters/" + id,
		    data: JSON.stringify({
		        id: id,
		        name: "Sam",
		        classType: "rogue",
		        gender: "MALE",
		        level: 1,
		        money: 0
		    }),
		    contentType: "application/json",
		    dataType: "json",
		    accept: "application/json",
		    success: function (data, textStatus, jqXHR) {
		        console.log("Done: no news is good news.");
		    }
		});
	});

	$("#deleteCharacter").click(function() {
        $.ajax({
		    type: 'DELETE',
		    url: "http://lmu-diabolical.appspot.com/characters/" + id,
		    success: function (data, textStatus, jqXHR) {
		        console.log("Gone baby gone.");
		    }
        });
	});

});