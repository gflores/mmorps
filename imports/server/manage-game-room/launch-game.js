import { mainGameLoop } from '/imports/server/gameplay/main-game-loop.js';

export const launchGame = (gameData) => {
    mainGameLoop(gameData);
}