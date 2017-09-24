export const initializeRoom = (gameData) => {
    gameData.players = {};
    gameData.player_keys = [];
    gameData.canDuelAction = false;
    gameData.isGameLaunched = false;
    gameData.currentRoundStartTime = null;
}