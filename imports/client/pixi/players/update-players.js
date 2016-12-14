export const updatePlayers = function(players){
    for (var i = 0; i != players.length; ++i){
        var player = players[i];
        // console.log("player: ", player);
        player.renderContainer.x += 1;
    }
}