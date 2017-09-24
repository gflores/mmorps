import { gameLoop } from '/imports/server/gameplay/game-loop.js';

import { sendMainServerMessage } from '/imports/server/server-messages/main-server-messages.js';
import { constructCountDownMessage, constructGameStartedMessage } from '/imports/server/server-messages/server-message-format.js';

import { Wait } from '/imports/helpers/wait.js';
import { countDownMessageDelay, gameStartDelay } from '/imports/shared/global-variables.js';

export const launchGame = (gameData) => {
    if (gameData.isGameLaunched == false){
        gameData.isGameLaunched = true;
        sendMainServerMessage(constructCountDownMessage(countDownMessageDelay));

        Wait(countDownMessageDelay);

        sendMainServerMessage(constructGameStartedMessage(gameData));

        Wait(gameStartDelay);

        gameLoop(gameData);
    } else {
        console.log("That game room is already launched");
    }
};