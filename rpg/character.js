$(function() {

	$("#toMenu").click(function() {
        window.location.href = "../rpg.html";
	});

	//Gets attributes and displays them on the character page.
    $.getJSON(
        "http://lmu-diabolical.appspot.com/characters/" + window.location.hash.substr(1),
        function (character) {
            // Do something with the character list.
        	$("#name").text(character.name);
        	$("#attributes").text("Class: " + character.classType + " - Gender: " + character.gender + " - Level: " + character.level + " - Money: " + character.money);
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

	$("#deleteCharacter").click(function(){
        $.ajax({
		    type: 'DELETE',
		    url: "http://lmu-diabolical.appspot.com/characters/" + id,
		    success: function (data, textStatus, jqXHR) {
		        console.log("Gone baby gone.");
		    }
        });
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