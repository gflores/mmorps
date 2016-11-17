import { createNewPlayer } from '/imports/server/gameplay/players/create-new-player';

export const addPlayerToRoom = (gameData, userId) => {
    var newPlayer = createNewPlayer(userId);
    gameData[userId] = newPlayer;
    console.log(gameData);
}