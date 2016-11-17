Meteor.publish('user', () => {
    return Meteor.users.find({_id: this.userId});
});