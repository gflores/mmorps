generateHandlerForSync = (publisher, cursor, collectionName) => {
    return cursor.observeChanges({
        added: (id, fields) => {
            publisher.added(collectionName, id, fields)
        },
        removed: (id) => {
            publisher.removed(collectionName, id)
        },
        changed: (id, fields) => {
            publisher.changed(collectionName, id, fields)
        }
    })
}

export const publishCustomCursor = function(publicationName, collectionName, getCursorFunc, options = {}) {
    Meteor.publish(publicationName, function (){ //arguments will be the arguments passed to subscribe
        console.log("User:", this.userId, " REQUESTS for subscription to ", publicationName);

        var publisherArguments = arguments;
        if (options.isAllowedFunc != null && options.isAllowedFunc(this, publisherArguments) == false){
            console.log("User:", this.userId, " DENIED subscription to ", publicationName);

            if (options.onUnallowedFunc != null)
                options.onUnallowedFunc(this, publisherArguments);
            return null;
        } else {
            console.log("User:", this.userId, " ACCEPTED for subscription to ", publicationName);

            var collectionHandle = generateHandlerForSync(this, getCursorFunc(this, publisherArguments), collectionName);
            this.ready();

            if (options.onAllowedFunc != null)
                options.onAllowedFunc(this, publisherArguments);

            var publisher = this;
            this.onStop( function() {
                console.log("User:", publisher.userId, " UNSUBSCRIBED from ", publicationName);
                if (options.onStopFunc != null)
                    options.onStopFunc(publisher, publisherArguments);
                collectionHandle.stop()                
            });
        }
    });
}