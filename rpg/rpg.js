$(function() {
	$("#createCharacter").click(function() {
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
		    }
		});
        
	});
});