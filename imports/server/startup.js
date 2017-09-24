import '/imports/server/gameplay/methods.js';

import '/imports/server/manage-game-room/methods.js';

import '/imports/server/users/publications.js';

import '/imports/server/server-messages/setup-server-messages';

import { getMainGameData } from '/imports/server/global-data/global-data.js';
import { initializeRoom } from '/imports/server/manage-game-room/setup-room.js';

initializeRoom(getMainGameData());