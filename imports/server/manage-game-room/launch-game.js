import { mainGameLoop } from '/imports/server/gameplay/main-game-loop.js';

import { sendMainServerMessage } from '/imports/server/server-messages/main-server-messages.js';
import { constructCountDownMessage, constructGameStartedMessage } from '/imports/server/server-messages/server-message-format.js';

import { Wait } from '/imports/helpers/wait.js';

import { initGameStartDate } from '/imports/server/global-data/global-data.js';

export const launchGame = (gameData) => {

    initGameStartDate();
    
    // sendMainServerMessage(constructCountDownMessage(getCountDownMessageDelay()));

    // Wait(getCountDownMessageDelay());

    // sendMainServerMessage(constructGameStartedMessage(gameData));

    // Wait(getGameStartDelay());

    mainGameLoop(gameData);
};