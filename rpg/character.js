$(function() {
	var charId = window.location.hash.substr(1);

	$("#toMenu").click(function() {
        window.location.href = "../rpg.html";
	});

	// Gets attributes and displays them on the character page.
    $.getJSON(
        "http://lmu-diabolical.appspot.com/characters/" + charId,
        function (character) {
            // Do something with the character list.
        	$("#name").text(character.name);
        	$("#attributes").text("Class: " + character.classType + " - Gender: " + character.gender + " - Level: " + character.level + " - Money: " + character.money);
    });

    // Get character again and populate input fields
    $("#editChar").click(function() {
        $.getJSON(
	        "http://lmu-diabolical.appspot.com/characters/" + charId,
	        function (character) {
	            // Do something with the character list.
	        	$("#nameInput").val(character.name);
	        	$("#classInput").val(character.classType);
	        	$("#genderInput").val(character.gender);
	        	$("#levelInput").val(character.level);
	        	$("#moneyInput").val(character.money);
	    });
    });
    
    // Make API call and reload current page to reflect changes
    $("#editCharConfirm").click(function() {
        $("#loadingDots").removeClass("hidden");
    	var newName = $("#nameInput").val();
		var newClassType = $("#classInput").val();
		var newGender = $("#genderInput").val();
		var newLevel = $("#levelInput").val();
		var newMoney = $("#moneyInput").val();
        $.ajax({
		    type: 'PUT',
		    url: "http://lmu-diabolical.appspot.com/characters/" + charId,
		    data: JSON.stringify({
		        id: charId,
		        name: newName,
		        classType: newClassType,
		        gender: newGender,
		        level: newLevel,
		        money: newMoney
		    }),
		    contentType: "application/json",
		    dataType: "json",
		    accept: "application/json",
		    success: function (data, textStatus, jqXHR) {
		        console.log("Done: no news is good news.");
		        // Reload page after edit made
		        $("#editCharConfirm").attr("data-dismiss", "modal");
		        window.location.reload();
		    }
		});


    });

	$("#modifyCharacter").click(function() {
        
	});

	$("#deleteChar").click(function() {
		if (confirm("Are you sure you want to delete this character? This action can't be undone.")) {
			$.ajax({
			    type: 'DELETE',
			    url: "http://lmu-diabolical.appspot.com/characters/" + charId,
			    success: function (data, textStatus, jqXHR) {
			        console.log("Gone baby gone.");
			        window.location.href = "../rpg.html";
			    }
	        });
		}
	});

	$("#createRandomItem").click(function(){
        $.getJSON(
		    "http://lmu-diabolical.appspot.com/items/spawn",
		    {
		        level: 50,
		        slot: "body"
		    },
		    function (item) {
		        // Mmmmm, new item.
		        console.log(item);
		    }
		);

	});


});