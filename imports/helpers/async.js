export const LaunchAsync = (func) => {
    Meteor.setTimeout(func, 1)
}