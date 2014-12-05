$(function () {
    var charId = window.location.hash.substr(1);

    $("#toMenu").click(function() {
        window.location.href = "rpg.html";
    });

    // Gets attributes and displays them on the character page.
    $.getJSON(
        "http://lmu-diabolical.appspot.com/characters/" + charId,
        function (character) {
            // Do something with the character list.
            $("#name").text(character.name);

            // If not provided, level and money should be 1 and 0, respectively
            var level = 1;
            var money = 0;
            if (character.level) {
                level = character.level;
            }
            if (character.money) {
                money = character.money;
            }
            $("#attributes").text("Class: " + character.classType + " - Gender: " + character.gender + " - Level: " + level + " - Money: " + money);
        });

    // Get character again and populate input fields
    $("#editChar").click(function () {
        $.getJSON(
            "http://lmu-diabolical.appspot.com/characters/" + charId,
            function (character) {
                // Do something with the character list.
                [ 
                    {selector: '#nameInput', property: 'name'},
                    {selector: '#classInput', property: 'classType'},
                    {selector: '#genderInput', property: 'gender'},
                    {selector: '#levelInput', property: 'level'},
                    {selector: '#moneyInput', property: 'money'}

                ].forEach(function (spec) {
                    $(spec.selector).val(character[spec.property]);
                });
        });
    });
    
    // Make API call and reload current page to reflect changes
    $("#editCharConfirm").click(function () {
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

    $("#deleteChar").click(function () { 
        $("#loadingDots").removeClass("hidden");
        $.ajax({
            type: 'DELETE',
            url: "http://lmu-diabolical.appspot.com/characters/" + charId,
            success: function (data, textStatus, jqXHR) {
                console.log("GG");
                window.location.href = "rpg.html";
            }
});
});

    $("#spawnItem").click(function() {
        $.getJSON(
            "http://lmu-diabolical.appspot.com/items/spawn",
            {
                level: 50,
                slot: "body"
            },
            function (item) {
                [
                    {selector: '#absorption', property: 'absorption'},
                    {selector: '#atkspeed', property: 'atkspeed'},
                    {selector: '#blockchance', property: 'blockchance'},
                    {selector: '#critchance', property: 'critchance'},
                    {selector: '#defense', property: 'defense'},

                ].forEach(function (spec) {
                    $(spec.selector).text(item[spec.property]);
                });
            }
        );
    });
});