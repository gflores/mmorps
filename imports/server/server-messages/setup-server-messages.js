import { publishCustomCursor } from '/imports/server/modules/customer-collection-publisher.js';
import { MainServerMessages } from '/imports/server/server-messages/main-server-messages.js';
import { removePlayerFromRoom } from '/imports/server/manage-game-room/remove-player-from-room.js';

var onStopFunc = function(publisher, publisherArguments){
    removePlayerFromRoom(publisher.userId);
}

var getCursorFunc = function(publisher, publisherArguments){
    return MainServerMessages.find({date: {$gte: new Date}});
}

publishCustomCursor("server-messages", "serverMessages", getCursorFunc, {onStopFunc: onStopFunc});