import { publishCustomCursor } from '/imports/server/modules/customer-collection-publisher.js';
import { MainServerMessages } from '/imports/server/server-messages/main-server-messages.js';

var getCursorFunc = (publisher, publisherArguments) => {
    return MainServerMessages.find({date: {$gte: new Date}});
}

publishCustomCursor("server-messages", "serverMessages", getCursorFunc)