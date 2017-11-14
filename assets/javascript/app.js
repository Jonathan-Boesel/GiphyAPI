var arrGames = ["Dark Souls", "Ark Survival Evolved", "The Witcher 3", "Dragons Dogma", "Smite", "Elite Dangerous", "GTA V", "Super Mario 64", "Super Smash Brothers 64", "Rainbow Six Seige", "Payday 2", "Sniper Elite 3", "Sonic Adventures 2", "Myst"];

function renderButtons() {
	$("#game-buttons").empty();
	for (var i = 0; i < arrGames.length; i++) {
		var a = $("<button>");
		a.addClass("game")
		a.attr("data-name", arrGames[i])
		a.text(arrGames[i]);
		$("#game-buttons").append(a)
	}
}

$("#add-game").on("click", function(event) {
	event.preventDefault();

	if (($("#game-input").val().trim()) !== ("")) {
		var game = $("#game-input").val().trim();
		arrGames.push(game);
		$("#game-input").val("")
		renderButtons();
	}
});

$(document).on("click", ".game", function() {
	$("#games").empty()
	var game = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
		encodeURIComponent(game) + "&api_key=dc6zaTOxFJmzC&limit=10";
	$.ajax({
			url: queryURL,
			method: "GET"
		})
		.done(function(response) {
			console.log(queryURL);
			console.log(response);
			var results = response.data;
			for (var i = 0; i < results.length; i++) {
				var gameDiv = $("<span>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var gameImage = $("<img>");
				gameImage.attr("src", results[i].images.fixed_height_still.url);
				gameImage.attr("data-still", results[i].images.fixed_height_still.url)
				gameImage.attr("data-animate", results[i].images.fixed_height.url)
				gameImage.attr("data-state", "still")
				gameImage.addClass("gameGif")
				console.log("for")


				gameDiv.append(p);
				gameDiv.append(gameImage);
				$("#games").append(gameDiv);
			}
		});
});

$(document).on("click", ".gameGif", function() {
	var state = $(this).attr("data-state");
	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	}
	else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
})

renderButtons()
