import { mainGameLoop } from '/imports/server/gameplay/main-game-loop.js';

import { sendMainServerMessage } from '/imports/server/server-messages/main-server-messages.js';
import { getCountDownMessage, getGameStartedMessage } from '/imports/server/server-messages/server-message-format.js';

export const launchGame = (gameData) => {

    sendMainServerMessage(getCountDownMessage(2000));

    sendMainServerMessage(getGameStartedMessage(gameData));
    
    mainGameLoop(gameData);
}