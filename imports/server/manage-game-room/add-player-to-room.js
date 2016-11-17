import { createNewPlayer } from '/imports/server/gameplay/players/create-new-player';

export const addPlayerToRoom = (gameData, userId) => {
    var newPlayer = createNewPlayer();
    gameData.players[userId] = newPlayer;
    gameData.player_keys.push(userId);
    console.log(gameData);
}