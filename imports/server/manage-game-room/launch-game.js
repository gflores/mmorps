import { mainGameLoop } from '/imports/server/gameplay/main-game-loop.js';

import { sendMainServerMessage } from '/imports/server/server-messages/main-server-messages.js';
import { constructCountDownMessage, constructGameStartedMessage } from '/imports/server/server-messages/server-message-format.js';

import { Wait } from '/imports/helpers/wait.js';
import { countDownMessageDelay, gameStartDelay } from '/imports/shared/global-variables.js';

export const launchGame = (gameData) => {

    sendMainServerMessage(constructCountDownMessage(countDownMessageDelay));

    Wait(countDownMessageDelay);

    sendMainServerMessage(constructGameStartedMessage(gameData));

    Wait(gameStartDelay);

    mainGameLoop(gameData);
};