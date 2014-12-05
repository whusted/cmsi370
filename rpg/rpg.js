$(function() {
    $("#newChar").click(function () {
        $.getJSON(
            "http://lmu-diabolical.appspot.com/characters/spawn",
            function (character) {
                [ 
                    {selector: '#nameInput', property: 'name'},
                    {selector: '#classInput', property: 'classType'},
                    {selector: '#genderInput', property: 'gender'},
                    {selector: '#moneyInput', property: 'money'}

                ].forEach(function (spec) {
                    $(spec.selector).val(character[spec.property]);
                });
            }
        );
    });
    $("#createCharacter").click(function () {
        $("#loadingDots").removeClass("hidden");
        var newName = $("#nameInput").val();
        var newClassType = $("#classInput").val();
        var newGender = $("#genderInput").val();
        var newLevel = $("#slider").children().text();
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
                character.level ? tr.find(".level").text(character.level) : tr.find(".level").text("1");
                character.money ? tr.find(".money").text(character.money) : tr.find(".money").text("0");
                return tr;
            }));
        }
    );

    /* Go to character's page on click */
    $("tbody").click(function(event) {
        var id = $(event.target).closest("tr").attr("id");
        window.location.href = "character.html#" + id;
    });

});